import './app.css';
import Header from '../header/header';
import {useEffect, useState} from 'react';
import Button from '../button/button';
import Setting from '../setting/setting';
import Remote from '../remote/remote';
import {btn, Command} from '../../common/const';

const hostname = window.location.hostname;
const ws = new WebSocket(`ws://${hostname}:3300`);

const waitForConnection = function (callback: any, interval: number) {
  if (ws.readyState === 1) {
    callback();
  } else {
    // optional: implement backoff for interval here
    setTimeout(function () {
      waitForConnection(callback, interval);
    }, interval);
  }
};


const sendWsCommand = (messageType: string, messageBody: any = {}, callback: any) => {
  console.log(JSON.stringify({type: messageType, body: messageBody}));
  ws.send(JSON.stringify({type: messageType, body: messageBody}));
  if (typeof callback !== 'undefined') {
    callback();
  }
};

const sendMessage = (messageType: string, messageBody: any, callback?: any) => {
  waitForConnection(()=>sendWsCommand(messageType, messageBody, callback), 1000);
};


const SETTING_STATE_INIT = {
  "group": "",
  "title": "",
  "ip": "",
  "cableLength": "",
  "minMaxSpeedUp": [],
  "speedUp": "",
  "minMaxSpeed": [],
  "speeds": [],
  "minMaxParkingSpeed": [],
  "parkingSpeed": "",
  "parking": "",
  "top": "",
  "bottom": ""
}


function App() {
  const [currentPage, setCurrentPage] = useState(String(btn.remote.title));
  const [currentCommand, setCurrentCommand] = useState('');
  const [wsStatus, setWsStatus] = useState('Offline');
  const [setting, setSetting] = useState(SETTING_STATE_INIT);
  const [device, setDevice] = useState('')

  ws.onopen = () => setWsStatus('Online');
  ws.onclose = () => setWsStatus('Disconnect');
  ws.onmessage = (response) => {
    const message = (JSON.parse(response.data));
    console.log(message);
    switch (message.type) {
      case Command.LoadSetting:
      case Command.ResetSetting:
        setSetting(message.body);
        break;
      default:
        console.log('что за комманда?')
        break;

    }
  };

  const HandleOnChangePage = (title: string) => {
    setCurrentPage(title);
  }

  useEffect(()=>{
    sendMessage(Command.ResetSetting, setting);
  },[currentCommand] )

  const HandleSendCommand = (title: string, data: any) => {
    sendMessage(title, data);
  };

  const HandleSaveSettings = () => {
    sendMessage(Command.SaveSetting, setting);
  };

  const HandleResetSettings = () => {
    sendMessage(Command.ResetSetting, setting);
  };



  return (
      <>
        <Header page={currentPage} onClick={HandleOnChangePage} wsStatus={wsStatus}/>
        <main className="main">
          {currentPage === btn.loadSetting.title &&
            <Setting
              setting={setting}
              setFlour={setCurrentCommand}
              resetSetting={HandleResetSettings}
              setSetting={setSetting}/>}
          {currentPage === btn.remote.title &&
            <Remote
              onClick={HandleSendCommand}
              device={device}
              setDevice={setDevice}
            />}
        </main>
        <footer className='footer'>
          {currentPage === btn.loadSetting.title &&
            <Button
              btn={btn.saveSetting}
              action={HandleSaveSettings}
            />}
          {currentPage === btn.remote.title &&
            <Button
              btn={btn.footerDisplay}
              action={()=>{}}/>}
        </footer>
      </>
  )
}

export default App
