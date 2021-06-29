require('dotenv').config();
var express = require('express');
var socket = require('socket.io');
var cors = require('cors');

var app = express();
app.use(cors());

var port = process.env.PORT || 4000;
var server = app.listen(port, ()=>{
  console.log('server up and running....');
});



app.use(express.static('public'));


var io = socket(server);

//here socket = the particular socket established between client and server
io.on('connection' , function(socket){
  console.log(`connection established between server and client @ ${socket.id}`);

  socket.on('chat', function(data){
    console.log(data);
    //io.sockets refers to all the sockets connected to the server
    io.sockets.emit('chat', data);
    io.sockets.emit('clear');
  });

  socket.on('typing' , (data)=>{
    //socket is the socket connected at the moment && broadcast means sending msg to every other socket
    socket.broadcast.emit('typing', data);
  });
});
