
//#define GS_NO_ACCEL
#include "GyverStepper2.h"
  int lineMotorSteps = 1000;
  int radialMotorSteps = 3600;
  int kLine = 10;
  int kRadial = 100;
  int target = 20000;
  int kTarget = 1000;
  GStepper2<STEPPER2WIRE, STEPPER_VIRTUAL> stapper1(lineMotorSteps, 8, 9);
  GStepper2<STEPPER2WIRE, STEPPER_VIRTUAL> stapper2(radialMotorSteps, 10, 11);
  GStepper2<STEPPER2WIRE, STEPPER_VIRTUAL> steppers[] = {stapper1, stapper2};
  // GStepper2<STEPPER2WIRE> stapper1(lineMotorSteps * kLine, 8, 9);
  // GStepper2<STEPPER2WIRE> stapper2(radialMotorSteps * kRadial, 10, 11);
  // GStepper2<STEPPER2WIRE> steppers[] = {stapper1, stapper2};

#define ASCII_CONVERT '0'
byte buffer[5];
int dir = 1;

void setup() {
  Serial.begin(9600);

  // устанавливаем ускорение и скорость
  steppers[0].setAcceleration(300 * kLine);
  steppers[0].setMaxSpeed(100 * kLine);
  steppers[0].setTarget(0);
  // stepper.setSpeed(100);
  steppers[1].setAcceleration(300 * kRadial);
  steppers[1].setMaxSpeed(100 * kRadial);
  steppers[1].setTarget(0);
  // stepper.setSpeed(100);
}

void loop() {
  // здесь происходит движение мотора, вызывать как можно чаще
  steppers[0].tick();
  steppers[1].tick();


  // вернёт true, если все моторы доехали
  // if (stepper.ready()) {
  //   stepper.setTarget(path[count]); // загружаем новую точку (начнётся с 0)
  //   if (++count >= sizeof(path) / 2) count = 0;
  // }

  steppers[1].autoPower(true);
  steppers[2].autoPower(true);
  
  // управляем процессом
  if (parsing()) {
    switch (buffer[2]) {
      case 0:
        steppers[buffer[0] - 1].stop();
        break;
      case 1:
        int isStop = steppers[buffer[0] - 1].getStatus() == 0;
        int isDir = dir == buffer[1];
        if (isStop || isDir) {
          dir = buffer[1];
          steppers[buffer[0] - 1].reverse(buffer[1] == 1);
          steppers[buffer[0] - 1].reset();
          steppers[buffer[0] - 1].setTarget(target * kTarget);
        }
    }
  }



  // асинхронно вывожу в порт графики
  static uint32_t tmr;
  if (millis() - tmr >= 20) {
    tmr = millis();
    Serial.print("motor");
    Serial.print(buffer[0] - 1);
    Serial.print(',');
    Serial.print(steppers[buffer[0] - 1].getTarget());
    Serial.print(',');
    Serial.println(steppers[buffer[0] -1].pos);
  }
}


// парсер. Возвращает количество принятых байтов даты
int parsing() {
  static bool parseStart = false;
  static byte counter = 0;
  if (Serial.available()) {
    char in = Serial.read();    
    if (in == '\n' || in == '\r') return 0; // игнорируем перевод строки    
    if (in == ';') {        // завершение пакета
      parseStart = false;
      return counter;
    }    
    if (in == '$') {        // начало пакета
      parseStart = true;
      counter = 0;
      return 0;
    }    
    if (parseStart) {       // чтение пакета
      // - '0' это перевод в число (если отправитель print)
      buffer[counter] = in - ASCII_CONVERT;
      counter++;
    }
  }
  return 0;
}