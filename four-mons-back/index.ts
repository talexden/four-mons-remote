import * as express from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as WebSocket from 'ws';
import {Path} from './src/const';
import {dispatch} from './src/action';

dotenv.config();

//webserver express
//
const app = express();
const webPort = process.env.WEB_PORT;

app.use(express.static(Path.WebPath));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, Path.WebPath, 'index.html'));
});

app.listen(webPort, () => console.log(`Web Server Running on port ${webPort}`));



//Websocket API
//
const wsPort = process.env.WS_PORT;
export const wsServer = new WebSocket.Server({ port:  Number(wsPort) });

wsServer.on('connection', (ws) => {
  console.log('Websocket Connection established');
  ws.on('message', (message: string) => {
    const jsonMessage = JSON.parse(message);
    console.log('Websocket Message received: ', jsonMessage);
    dispatch(jsonMessage.type, jsonMessage.body);
  });
});
