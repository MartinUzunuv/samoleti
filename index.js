const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/main", (req, res) => {
  res.sendFile(__dirname + "/main.js");
});

app.get("/game", (req, res) => {
  res.sendFile(__dirname + "/game.js");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

games = [];

players = [];

io.on("connection", (socket) => {
  players.push({ name: socket.id, game: null, my:{x:50, y:90} });

  socket.on("disconnect", () => {
    let index = players.findIndex((obj) => obj.name === socket.id);

    if (index !== -1) {
      players.splice(index, 1);
      for(let i = 0; i < games.length; i++) {
        for(let j = 0; j < games[i].players.length; j++) {
          if(games[i].players[j] === socket.id){
            games[i].players.splice(j, 1);
          }
          if(games[i].players.length === 0){
            games.splice(i, 1);
            break;
          }
        }
      }
    }
  });

  socket.on("sesion", (sesion) => {
    let index = players.findIndex((obj) => obj.name === socket.id);
    if (index !== -1) {
      players[index].game = sesion;
    }
    let create = true;
    for (let i = 0; i < games.length; i++) {
      if (games[i].name === sesion) {
        create = false;
        games[i].players.push(socket.id);
      }
    }
    if (create) {
      games.push({ name: sesion, players: [socket.id] });
    }
  });

  socket.on('updateMe', (obj, callback) => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].name === socket.id) {
        players[i].my = obj.my;
        sesion = obj.sesion;
        let teammates = []
        for(let j = 0; j < players.length; j++) {
          if(players[j].game === sesion && players[j].name !== socket.id) {
            teammates.push(players[j].my)
          }
        }
        callback({teammates:teammates});
        break;
      }
    }
  });
  








});

setInterval(() => {
  // console.log("games:");
  // console.log(games);
  // console.log("players:");
  // console.log(players);
  // console.log("");
  // console.log("");
}, 1000);
