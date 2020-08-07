const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const { addUser, getUser, removeUser, getUsersInRoom } = require('./users')
const PORT = process.env.PORT || 4000
const cors = require('cors')
const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
app.use(router)
app.use(cors())
io.on('connection', (socket) => {
    socket.on('join', ({ username, room }, callback) => {
        const { user, error } = addUser({ id: socket.id, username, room })
        if (error) return callback(error)

        socket.emit('message', { user: 'server', text: `Hi ${user.username}, welcome to room ${user.room}.` })
        socket.broadcast.to(user.room).emit('message', { user: 'server', text: `${user.username} has joined!` })

        socket.join(user.room)

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

        callback()
    })
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', { user: user.username, text: message })
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

        callback()
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', { user: 'server', text: `${user.username} has left.` })
        }
    })
})

app.use(router)

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))