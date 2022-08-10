import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
  ws.send('bustate');
  ws.send('busdata');
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
});



  //socket.connect();