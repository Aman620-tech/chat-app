const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const http = require('http')
const path = require('path');
const server = http.createServer(app)
app.use(cors());
// http server to the socket io
const io = require('socket.io')(http);
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
    // res.josn("get method")
})

// create new new conection 
io.on('connection',socket=>{
console.log(socket.id)
})


server.listen(port, (err)=>{
    if (err) {
        return console.log(err.message);
    }else{
        console.log(`listening on http://localhost:${port} `)
    }

})