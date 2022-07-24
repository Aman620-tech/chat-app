const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const { Server, Socket } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: `http://localhost:3000`,
    methods: ["GET", "POST"],
  },
});
// console.log(io)
io.on("connection", (socket) => {
  console.log(`User connected on: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data1) => {
    // console.log("ok")
    socket.to(data1.room).emit("receive_message", data1);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected on:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
