const WebSocket = require('ws')
const server = new WebSocket.Server({port:8080});

const words = ["apple", "banana", "cherry", "date", "watermelon"];
let currentWord = "";

function scrambleWord(word){
    return word.split('').sort(()=>Math.random()-0.5).join('');
}

server.on('connection',function(socket){
    socket.on('message', function(message) {
        if(message === 'start'){
            currentWord = words[Math.floor(Math.random()*words.length)];
            socket.send(JSON.stringify({scrambled:scrambleWord(currentWord)}));
        } else {
            const guess = message.trim().toLowerCase();
            if(guess === currentWord){
                socket.send(JSON.stringify({correct:true,word:currentWord}));
            } else {
                socket.send(JSON.stringify({correct:false}));
            }
        }
    });
});