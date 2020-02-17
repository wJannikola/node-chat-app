const socket = io()

socket.on('countUpdated', (count) => {
    console.log('the count has beeen updated ' + count)
})

document.querySelector('#increment').addEventListener('click', () => {
    console.log('printing click')
    socket.emit('increment')
})