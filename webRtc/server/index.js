const express = require("express");
const app = express();
const { Server } = require("socket.io");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
const io = new Server();

const emailToSocketMapping = new Map();
io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    const { roomId, emailId } = data;
    console.log("User", emailId, "Joined-Room", roomId);
    emailToSocketMapping.set(emailId, socket.id);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-joined", { emailId });
  });
});

app.listen(8000, () => console.log("the server is running on 8000"));
io.listen(8001);
