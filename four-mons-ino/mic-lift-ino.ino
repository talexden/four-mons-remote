
//#define GS_NO_ACCEL
#include "GyverStepper2.h"
GStepper2<STEPPER4WIRE> stepper(4096, 5, 3, 4, 2);

#define ASCII_CONVERT '0'
byte buffer[5];

void setup() {
  Serial.begin(9600);

  // устанавливаем ускорение и скорость
  stepper.setAcceleration(200);
  stepper.setMaxSpeed(900);
  stepper.setTarget(0);
  // stepper.setSpeed(100);
}

byte count = 0;
int16_t path[] = {0, 500, 1000, 0, 5000, -5000};

void loop() {
  // здесь происходит движение мотора, вызывать как можно чаще
  stepper.tick();


  // вернёт true, если все моторы доехали
  if (stepper.ready()) {
    stepper.setTarget(path[count]); // загружаем новую точку (начнётся с 0)
    if (++count >= sizeof(path) / 2) count = 0;
  }

  stepper.autoPower(true);
  
  // управляем процессом
  if (parsing()) {
    switch (buffer[0]) {  // согласно коду команды
      case 0:   // тут можно читать данные из buffer согласно коду команды
        stepper.stop();
        break;
      case 1:   // тут можно читать данные из buffer согласно коду команды
        stepper.resume();
        break;
      case 2:   // тут можно читать данные из buffer согласно коду команды
        
        break;
      case 3:   // тут можно читать данные из buffer согласно коду команды
        break;
    }
  }



  // асинхронно вывожу в порт графики
  static uint32_t tmr;
  if (millis() - tmr >= 20) {
    tmr = millis();
    Serial.print(stepper.getTarget());
    Serial.print(',');
    Serial.println(stepper.pos);
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