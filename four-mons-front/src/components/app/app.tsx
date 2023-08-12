import './app.css';
import Header from '../header/header';
import {useEffect, useState} from 'react';
import Button from '../button/button';
import Setting from '../setting/setting';
import Remote from '../remote/remote';
import {btn, Command} from '../../common/const';

const hostname = window.location.hostname;
const ws = new WebSocket(`ws://${hostname}:3300`);

const sendMessage = (messageType: string, messageBody: any) => {
  console.log(JSON.stringify({type: messageType, body: messageBody}));
  ws.send(JSON.stringify({type: messageType, body: messageBody}));
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
  const [setting, setSetting] = useState(SETTING_STATE_INIT)
  const [position, setPosition] = useState('')
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
      case  'position':
        setPosition(message.body);
        break
      default:
        console.log('что за комманда?')
        break;

    }
  };

  const HandleOnChangePage = (command: string, title: string, ) => {
    setCurrentPage(title);
    setCurrentCommand(command);
  }

  useEffect(()=>{
    if (currentCommand !== '') {
      switch (currentCommand) {
        case '':
          break;
        case btn.saveSetting.command:
          sendMessage(currentCommand, setting);
          break;
        default:
          sendMessage(currentCommand, currentCommand);
          break;
      }
      setCurrentCommand('');
    }


  },[currentCommand] )

  return (
      <>
        <Header page={currentPage} onClick={HandleOnChangePage} wsStatus={wsStatus}/>
        <main className="main">
          {currentPage === btn.loadSetting.title &&
            <Setting setting={setting} onClick={setCurrentCommand} onChange={setSetting}/>}
          {currentPage === btn.remote.title &&
            <Remote onClick={setCurrentCommand}/>}
        </main>
        <footer className='footer'>
          {currentPage === btn.loadSetting.title &&
            <Button btn={btn.saveSetting} onClick={setCurrentCommand}/>}
          {currentPage === btn.remote.title &&
            <Button btn={btn.footerDisplay} onClick={()=>{}}/>}
        </footer>
      </>
  )
}

export default App
