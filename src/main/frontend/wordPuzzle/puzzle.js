document.addEventListener('DOMContentLoaded', function(){
    const form = document.querySelector('form');
    const wordDisplay = document.querySelector("#wordDisplay");
    const message = document.querySelector('#message');

    function setUpWebSocket() {
        const socket = new WebSocket('ws://localhost:8080');

        socket.onopen = function () {
            console.log("Socket has been opened");
            socket.send('start');
        };

        socket.onmessage = function (event) {
            const data = JSON.parse(event.data);
            if (data.scrambled) {
                wordDisplay.textContent = data.scrambled;
                message.textContent = 'Guess the word';
            } else if (data.correct) {
                message.textContent = `Correct! The word was ${data.word}.`;
            } else {
                message.textContent = 'Wrong! Try again!';
            }
        }

        socket.onclose = function () {
            console.log("Web socket connection closed.");
        }

        socket.onerror = function (error) {
            console.error("Web socket error:", error);
        }

        return socket;
    }

let socket = setUpWebSocket();

    form.onsubmit = function(event) {
        event.preventDefault();
        if (socket.readyState === WebSocket.OPEN) {

            socket.send(form.guess.value);
            form.guess.value = '';
        } else {
            console.error("Socket not open. Message not sent");
        }
    };
});