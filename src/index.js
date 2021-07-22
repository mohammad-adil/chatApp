const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)




const PORT = process.env.PORT || 3000
const pubDirectory = path.join(__dirname, '../public')
app.use(express.static(pubDirectory)

)


io.on('connection', () => {
    console.log('socket Io connected')
})


server.listen(PORT, () => {

    console.log("*************************")
    console.log("Server Started at: " + PORT)
    console.log("*************************")

})


