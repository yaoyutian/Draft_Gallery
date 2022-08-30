import {WebSocket} from 'ws';

const ws = new WebSocket('ws://localhost:8080');

// ws.on('open', function open() {
//   console.log('connecting wss');
//   //ws.send('bustate');
//   //ws.send('busdata');
// });

ws.on('message', function message(data) {
  console.log('received: %s', data);
});

ws.on('error',(err)=>{
  console.log(err);
})
