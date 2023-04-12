    const socketClient = io()
    const formulario = document.getElementById('formulario')
    const inputMessage = document.getElementById('message')
    const divChat = document.getElementById('chat')

    //Mensajes

    // formulario.onsubmit = (e) => {
    //     e.preventDefault()

    //         const info = {
    //         message: inputMessage.value
    //     }
    //     socketClient.emit('mensaje', info)
    //     inputMessage.value = ''

    //     formulario.submit()


    // }
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        const info = {
            message: inputMessage.value
        };

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            });

            const data = await response.json();
            // socketClient.emit('mensaje', data);
            // inputMessage.value = '';
        } catch (error) {
            console.log(error);
        }

        socketClient.emit('mensaje', info)
        inputMessage.value = ''

        inputMessage.value = '';
    });


    //Chat
    socketClient.on('chat', mensajes => {
        console.dir(mensajes)
        if (!Array.isArray(mensajes) || mensajes.length === 0) {
            console.log('mensajes no es un array o está vacío');
            return;
        }
    
        const chatParrafo = mensajes.map(obj => {
            console.log(obj.message + "mensaje")
            return `<p>${obj.message}</p>`
        }).join(' ');
    
        divChat.innerHTML = chatParrafo;
        console.log("chatParrafo", chatParrafo);
    });
    //Notificacion usuario nuevo conectado
