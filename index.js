var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/game/ouestpluggy/", function(req, res) {
  console.log("yen a qui veulent jouer")
  res.sendFile(__dirname + "/miniGame/ouestpluggy/index.html");
});

var numUsers = 0;
var ready = 0;

var playing = false;
io.on("connection", function(socket) {
  var addedUser = false;
  console.log("socket");

  socket.on("chat message", function(msg) {
    io.emit("chat message", { msg: msg, user: socket.username || "" });
  });

  socket.on("add user", function(username) {
    addedUser = true;
    socket.username = username;
    ++numUsers;
    socket.emit("loggedin", {
      username: socket.username,
      numUsers: numUsers
    });

    socket.broadcast.emit("user joined", {
      username: socket.username,
      numUsers: numUsers
    });
    console.log("user", socket.username, "is logged in");
  });

  // when the user disconnects.. perform this
  socket.on("disconnect", () => {
    console.log("meh il se casse");
    if (addedUser) {
      ("");
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit("user left", {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
  socket.on("player ready", () => {
    console.log("user", socket.username, "is Ready");
    ++ready;
    if (ready >= numUsers) {
      console.log("All users are ready");
      ready = true;
      socket.emit("game start", "nié");
      socket.broadcast.emit("game start", "nié");
    }
  });
});

http.listen(port, function() {
  console.log("listening on *:" + port);
});
