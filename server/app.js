const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const { Rooms }= require('./models')
const cors = require('cors')

app.use(cors())

io.on('connection', (socket) => {
  console.log('connect')
  // room dan konsep room
  // listen
  socket.on('createRoom', (payload) => {
    Rooms.create({
      name: payload.roomName
    })
      .then(room => {
        socket.join(room.id, (err) => {
          if(err) {
            console.log(err)
          } else {
            console.log('room created')
            io.emit('roomCreated', room)
          }
        })
      })
  })

  socket.on('fetchRooms', () => {
    Rooms.findAll()
      .then(rooms => {
        socket.emit('showRooms', rooms)
      })
  })

  socket.on('joinRoom', (payload) => {
    socket.join(payload.id, () => {
      io.to(payload.id).emit('someoneJoined', payload)
    })
  })
})
http.listen(3000, () => {
  console.log('connect to 3000')
})