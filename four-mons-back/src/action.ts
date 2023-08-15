import {Command, Path} from './const';
import {wsServer} from '../index';
import {CallbacksType, CallbackType, WsMsgBodyType, WsMsgTypeType} from './types';
import * as jsonfile from 'jsonfile';
import {incLogPath} from './inc-log-path';
import {getSerialPort} from './uart-api';

const logPath = incLogPath(Path.Logs);
let remoteMon = '';

// Set of callback to be triggered are stored in a global JSON object
const callbacks: CallbacksType = {}

// Function to dispatch the events received by the API
export const dispatch = (event: Command, data?: WsMsgBodyType) => {
  // console.log('receive command: ', event, data);
  try {
    callbacks[event](data);
  } catch (err) {
    console.dir(err);
  }
}

// Function to dynamically bind the API event to specific functions
const bind = (event: Command, callback: CallbackType) => {
  console.log('create command: ', event);
  callbacks[event] = callback;
};

//function to send message all ws client
const wsSend = (type: WsMsgTypeType, body: WsMsgBodyType) => {
  wsServer.clients.forEach((client) => {
    client.send(JSON.stringify({type, body}));
  });
};

// bind action for serialPort

let stopTimeout: any = {};
let lastCommand: Command;
const motorAction = (serialPort: any, commandAction: Command, data: any) => {
  if (data) {
    const {motor, dir, command} = data;
    clearTimeout(stopTimeout[motor]);
    const stopCommand = () => {
      const serialCommand = `$${motor}${dir}${0};`
      serialPort.write(serialCommand);
      clearTimeout(stopTimeout[motor]);
      lastCommand = Command.Stop;
      console.log('send stop to serial ', serialCommand, lastCommand);
    }
    stopTimeout[motor] = setTimeout(stopCommand, 200);
    if (lastCommand !== commandAction) {
      lastCommand = commandAction;
      const serialCommand = `$${motor}${dir}${command};`
      serialPort.write(serialCommand);
      console.log('send start to serial ', serialCommand, lastCommand);
    }
  }
}

export const bindSerialPortActions = async () => {
  try {
    const serialPort = await getSerialPort()
    if (serialPort) {

      bind(Command.Rew, (data) => {
        motorAction(serialPort, Command.Rew, data);
      });

      bind(Command.Fwd, (data) => {
        motorAction(serialPort, Command.Fwd, data);
      });

      bind(Command.Ccw, (data) => {
        motorAction(serialPort, Command.Ccw, data);
      });

      bind(Command.Cw, (data) => {
        motorAction(serialPort, Command.Cw, data);
      });

      bind(Command.Stop, (data) => {
        motorAction(serialPort, Command.Stop, {...data, command: '0'});
      });
    } else {
      console.log('serialPort is undefined');
    }
  } catch (err) {
    console.log('actions error ', err)
  }
}

bindSerialPortActions();

bind(Command.Set1, () => {
  remoteMon = Command.Set1;
  wsSend(Command.Set1, {remoteMon });
});

bind(Command.Set2, () => {
  remoteMon = Command.Set2;
  wsSend(Command.Set2, {remoteMon });

});

bind(Command.Set3, () => {
  remoteMon = Command.Set3;
  wsSend(Command.Set3, {remoteMon });

});

bind(Command.Set4, () => {
  remoteMon = Command.Set4;
  wsSend(Command.Set4, {remoteMon });

});

bind(Command.LoadSetting, () => {
  jsonfile.readFile(Path.Setting, (err, liftsSettings) => {
    if (err) console.error(err);
    wsSend(Command.LoadSetting, liftsSettings);
  });
});

bind(Command.ResetSetting, () => {
  jsonfile.readFile(Path.SettingInit, (err, liftsSettings) => {
    if (err) console.error(err);
    wsSend(Command.ResetSetting, liftsSettings);
  });
});

bind(Command.SaveSetting, (data: any) => {
  jsonfile.writeFile(Path.Setting, data, { spaces: 2 },(err) => {
    if (err) console.error(err);
    dispatch(Command.LoadSetting);
  });
});

bind(Command.Remote, () => {
  const pathName = logPath();
  const data = {"lastPosition": "1600", "currentPosition": "530"};
  jsonfile.writeFile(pathName, data, { spaces: 2 },(err) => {
    if (err) console.error(err);
    console.dir(pathName, data);
  });
});
