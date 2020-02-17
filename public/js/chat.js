const socket = io()

socket.on('message', (msg) => {
    console.log(msg)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message
    socket.emit('sendMessage', message.value, (error) => {
        if(error) {
            return console.log(error)
        }

        console.log('Message delivered!')
    })
    message.value = ''
})

document.querySelector('#send-location').addEventListener('click', (e) => {
    if(!navigator.geolocation) {
        return alert('geolocation is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location shared!')
        })
    })
})

socket.on('sendLocation', (position) => {
    console.log(`this is user location: ${position}`)
})