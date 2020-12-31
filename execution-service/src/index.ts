import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

var clients = {};

const topics: { [unit: string]: any } =  {
    HANDSHAKE: (ws: WebSocket, body: any) => handshake(ws, body)
};

wss.on('connection', (ws: WebSocket) => {

    ws.send('Hi there, I am a WebSocket server');

    ws.on('message', (message: string) => {
        const data = JSON.parse(message);
        const topic: string = data.topic;
        topics[topic](ws, data.body);
    });
});

const handshake = (ws: WebSocket, body: any) => {
    console.log(body);
    ws.send(JSON.stringify(body));
}

//start our server
server.listen(5000, () => {
    console.log(`Server started on port 5000`);
});