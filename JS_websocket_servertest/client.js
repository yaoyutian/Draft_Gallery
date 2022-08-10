//import {io} from 'socket.io-client';

const { io } = require('socket.io-client');

const socket= require('socket.io-client')("ws://localhost:3000");

socket.on('connection', server => {
    console.log(server);

  });

socket.emit('bustate',()=>{
    console.log("query bus state");
})

socket.on('bustate',(d)=>{
    console.log(d); 
});

socket.emit('busdata',()=>{
   console.log("querybusdata: ");
});

socket.on('busdata',(data)=>{
    console.log(data);  
});



  //socket.connect();