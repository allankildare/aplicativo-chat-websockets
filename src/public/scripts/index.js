const socket = io()

let user = ''
let chatBox = document.getElementById('chatBox')

Swal.fire({
    title: 'Login',
    input: 'text',
    text: 'Digite o nome de usuário para se identificar no chat',
    inputValidator: (value) => {
        if (!value || value.length <= 2) {
            return 'Nome precisa ter pelo menos 2 caracteres'
        }
    },
    allowOutsideClick: false,
}).then((result) => {
    console.log('result:\n', result)
    user = result.value
    console.log('user: ', user)
})

chatBox.addEventListener('keyup', (event) => {
    console.log('tecla é:\n', event.key)
    if (event.key === 'Enter') {
        console.log('é enter')
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user, message: chatBox.value })
            chatBox.value = ''
        }
    }
})

socket.on('messageLogs', (arrMessages) => {
    const log = document.getElementById('messageLogs');
    let messages = ''
    console.log('mensagens', arrMessages)

    arrMessages.forEach((message) => {
        messages += `${message.user} diz: ${message.message}<br>`
    })

    log.innerHTML = messages
})