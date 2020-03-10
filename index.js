var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

var numUsers = 0;

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
  });

  // when the user disconnects.. perform this
  socket.on("disconnect", () => {
    console.log("meh il se casse");
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit("user left", {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
http.listen(port, function() {
  console.log("listening on *:" + port);
});
