//how it works -------------------------------------

// node server.js ------------------------------------- ye terminal par likhna hay to
//  link ay gi local host ki wo google par paste karo phir chalay ga kaam





// app.use(express.static(__dirname));

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);



app.use(express.static(__dirname));
// Store users
let users = {};

// When user connects
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join with username
  socket.on("join", (username) => {
    users[socket.id] = username;
    console.log(username + " joined");

    io.emit("message", {
      user: "System",
      text: `${username} joined the chat`
    });
  });

  // Receive message
  socket.on("sendMessage", (message) => {
    io.emit("message", {
      user: users[socket.id],
      text: message
    });
  });

  // Disconnect
  socket.on("disconnect", () => {
    const username = users[socket.id];
    console.log("User disconnected");

    io.emit("message", {
      user: "System",
      text: `${username} left the chat`
    });

    delete users[socket.id];
  });
});

// Simple route
app.get("/", (req, res) => {
  res.send("Chat server running...");
});

// Start server
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});





// TEXT MESSAGE
socket.on("sendMessage", (message) => {
  io.emit("message", {
    user: users[socket.id],
    text: message,
    type: "text"
  });
});

// IMAGE MESSAGE
socket.on("sendImage", (image) => {
  io.emit("message", {
    user: users[socket.id],
    image: image,
    type: "image"
  });
});