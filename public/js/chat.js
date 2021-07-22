const socket = io()

/* socket.on('emited', (count) => {
    console.log('Count has been updated..! ' + count)
})

document.querySelector('#increment').addEventListener('click', () => {
    socket.emit('increment')
}) */


socket.on('message', (message) => {

    console.log(message)
    console.log('Server' + socket.id);
})