var app = require('express')()
var express = require('express')
var http = require('http').Server(app)
var io = require('socket.io')(http)
var port = process.env.PORT || 3000

var Harmony = require('./miniGame/harmony/js/harmony')
var Culture = require('./miniGame/culture/index')

app.use(express.static('public'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/game/ouestpluggy/', function(req, res) {
  res.sendFile(__dirname + '/miniGame/ouestpluggy/index.html')
})

app.get('/game/harmony/', function(req, res) {
  res.sendFile(__dirname + '/miniGame/harmony/index.html')
})

var numUsers = 0
var ready = 0

let harmony = new Harmony(
  0, // Steps : 0=Intro, 1=instructions, 2=game, 3=results
  10 // Timer duration in seconds
)
let culture = new Culture()
var playing = false
io.on('connection', function(socket) {
  var addedUser = false
  console.log('socket')

  socket.on('chat message', function(msg) {
    io.emit('chat message', { msg: msg, user: socket.username || '' })
  })

  socket.on('add user', function(username) {
    addedUser = true
    socket.username = username
    ++numUsers
    socket.emit('loggedin', {
      username: socket.username,
      numUsers: numUsers
    })

    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    })
    console.log('user', socket.username, 'is logged in')
  })

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    console.log('meh il se casse')
    if (addedUser) {
      ;('')
      --numUsers

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      })
    }
  })
  socket.on('player ready', () => {
    console.log('user', socket.username, 'is Ready')
    ++ready
    if (ready >= numUsers) {
      console.log('All users are ready')
      ready = true
      socket.role = {}
      //harmony.setRole('hand', socket.role)
      //let step = harmony.nextStep(socket)
      let step = culture.nextStep(socket)
      socket.emit('game update', step.code)
      socket.broadcast.emit('game update', 'nié')
    }
  })
  socket.on('next step', data => {
    console.log('DATA :' + data)
    // let step = harmony.nextStep(socket)
    let step = culture.nextStep(socket, data)
    socket.emit('game update', step.code)
    if (step.event == true) {
      socket.emit('add event')
    }
  })
})

http.listen(port, function() {
  console.log('listening on *:' + port)
})
