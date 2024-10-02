const { Socket } = require("dgram");
const express = require("express");
const http = require("http");
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server)

const port = 3000;


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

io.on('connection',(socket)=>{
    console.log("a user connected");

    socket.on('chat message',(msg)=>{

        console.log(`message: ${msg}`);

        io.emit('chat message',msg);
    });

    socket.on('disconnect',()=>{
        console.log('a user disconnected');
    })

})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
