const express = require("express");
const socket = require("socket.io");
const app = express();

app.set("view engine" , "ejs");
//static files
app.use(express.static('public'));
app.get('/' , (req,res)=>{
    res.render("home" );
})



const server = app.listen(process.env.PORT ||3000 , ()=>{
    console.log("Working");
});
var io= socket(server);
io.on("connection" , (socket)=>{

    socket.on('chat' , (data)=>{
        io.sockets.emit('chat' , data)
    })

    socket.on('typing' , (data)=>{
        socket.broadcast.emit('typing' , data)
    })
})