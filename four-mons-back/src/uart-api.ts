//UART https://serialport.io/
//

import {ReadlineParser, SerialPort} from 'serialport';

const PORT_INIT = '';
const BAUD_INIT = 9600;

export const getSerialPort = async () => {
  try {
    const serialPortList = await SerialPort.list();
    const portInfo = serialPortList.find((port)=> port.locationId);
    console.log(portInfo);
    const port = portInfo?.locationId ? portInfo.path : PORT_INIT
    const serialport = new SerialPort( { path: port, baudRate: BAUD_INIT })
    const parser = serialport.pipe(new ReadlineParser())
    parser.on('data', console.log)
    return serialport;
  } catch (err) {
    console.log('getSerialPort error ', err)
  }
}


// let serialport: any;
//
// SerialPort.list().then(( ports)=>{
//   const portInfo = ports.find((port)=> port.locationId);
//   console.log(portInfo);
//   let port = PORT_INIT;
//   if (portInfo) {
//     port = portInfo.locationId ? portInfo.path : PORT_INIT
//   }
//
//   serialport = new SerialPort( { path: port, baudRate: BAUD_INIT })
//   const parser = serialport.pipe(new ReadlineParser())
//   parser.on('data', console.log)
// })
//
// export const getSerialPort = () => serialport;