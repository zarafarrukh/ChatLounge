let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/* typed js */
const typed = new Typed('.typed-text', {
    strings: ['Zara Farrukh,', 'Syeda Bisha,', 'Rabia Chattha,', 'Manal Afzal,'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 900,
    loop: true
});

// trigger animation for about section as it comes into view
document.addEventListener("DOMContentLoaded", function() {
    var aboutSection = document.querySelector(".about");

    //Function to check if about is in viewport
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    //Function triggers animation for about section
    function triggerAnimation() {
        //if element is in viewport, proceed to animation
        if (isElementInViewport(aboutSection)) {
            aboutSection.querySelector(".about-content").classList.add("animation-active");
            // Remove the event listener after the animation is triggered to prevent unnecessary processing
            window.removeEventListener("scroll", triggerAnimation);
        }
    }
    //show animation on scroll
    window.addEventListener("scroll", triggerAnimation);
});

document.addEventListener("DOMContentLoaded", function() {
    var gamesColumn = document.querySelector(".games-right");
    var animationTriggered = false; // Flag to track whether animation has been triggered

    // Function to check if games column is in viewport
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.left >= 0 &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    // Function to trigger animation for games column
    function triggerAnimation() {
        // If animation already triggered or element not in viewport, do nothing
        if (animationTriggered || !isElementInViewport(gamesColumn)) {
            return;
        }

        // Trigger animation
        gamesColumn.classList.add("animation-active");
        // Set flag to true to indicate animation has been triggered
        animationTriggered = true;
        // Remove the event listener after the animation is triggered to prevent unnecessary processing
        window.removeEventListener("scroll", triggerAnimation);
    }

    // Show animation on scroll
    window.addEventListener("scroll", triggerAnimation);
});

document.addEventListener("DOMContentLoaded", function() {
    var gamesColumn = document.querySelector(".games-left"); // Updated selector
    var animationTriggered = false; // Flag to track whether animation has been triggered

    // Function to check if games column is in viewport
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.left >= 0 &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    // Function to trigger animation for games column
    function triggerAnimation() {
        // If animation already triggered or element not in viewport, do nothing
        if (animationTriggered || !isElementInViewport(gamesColumn)) {
            return;
        }

        // Trigger animation
        gamesColumn.classList.add("animation-active"); // Updated class to add
        // Set flag to true to indicate animation has been triggered
        animationTriggered = true;
        // Remove the event listener after the animation is triggered to prevent unnecessary processing
        window.removeEventListener("scroll", triggerAnimation);
    }

    // Show animation on scroll
    window.addEventListener("scroll", triggerAnimation);
});


/* ChatRooms */
let code = ""; // Variable to store the current room code
let ws;

//Function retrieves unique room code from Chatservlet upon clicking "create room"
function newRoom() {
    if (inRoom) { //alert user to leave room before creating and entering new one
        alert("Please leave the current room before creating a new one.");
        return;
    }

    fetch("http://localhost:8080/WSChatServer-1.0-SNAPSHOT/chat-servlet", {
        method: 'GET',
        headers: {
            'Accept': 'text/plain',
        },
    })
        //fetch unique code response and call enterRoom
        .then(response => response.text())
        .then(response => {
            document.getElementById("log").value = "";
            code = response; // Store the current room code
            enterRoom(code);
            inRoom = true;
        })
        .catch(error => { //else catch error if unable to create
            console.error('Error creating new room:', error);
        });
}

// Define a Map to store chat histories for each room
const roomHistories = new Map();
//
// // Function to fetch chat history for a room from the Map
// function fetchChatHistory(roomCode) {
//     return roomHistories.get(roomCode) || "";
// }

// Function to update chat history for a room in the Map
function updateChatHistory(roomCode, message) {
   const currentHistory = roomHistories.get(roomCode) || "";
     roomHistories.set(roomCode, currentHistory + message + "\n");
 }

function fetchChatHistory(roomID) {
    return fetch("http://localhost:8080/ChatAPI-1.0-SNAPSHOT/api/history/" + roomID)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch chat history');
            }
            return response.json();
        })
        .then(data => {
            return data.log; // Assuming the log is directly accessible from the JSON response
        });
}
let inRoom = false; // Variable to track if the user is in a room
let notJoined = true; //keep track if user has messaged in the room

// Function to enter room with code retrieved from ChatServlet
function enterRoom(code) {
    // Close the WebSocket connection if it exists
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
    }

    // Establish WebSocket connection
    ws = new WebSocket("ws://localhost:8080/WSChatServer-1.0-SNAPSHOT/ws/" + code);

    // Check if the room code already exists in the list using a helper function
    if (!isRoomCodeInList(code)) {
        // Add the room code to the list only if it's unique
        const table = document.getElementById("room-list");
        const newRow = table.insertRow();
        const cell1 = newRow.insertCell();
        cell1.textContent = code;
    }

    //On open...
    ws.onopen = function () {
        // Display a welcome message in the chat log
        const welcomeMsg = "[" + timestamp() + "] (Server " + code.trim() + "): You are in room " + code.trim() + ", please enter your username to begin.";
        document.getElementById("log").value += "\n" + welcomeMsg;

        // Fetch and display chat history for the room
        fetchChatHistory(code)
            .then(history => {
                document.getElementById("log").value += "\n" + history;
            })
            .catch(error => {
                console.error('Error fetching chat history:', error);
            });
    };

    //On message send...
    ws.onmessage = function (event) {
        console.log(event.data);
        let message = JSON.parse(event.data);

        // Append received message to the chat log and UI
        const receivedMsg = "[" + timestamp() + "] " + message.message;
        document.getElementById("log").value += "\n" + receivedMsg;

        while(notJoined) {
            // User has joined, append entrance message to the chat log and UI
            const entranceMsg = "[" + timestamp() + "] (Server " + code.trim() + "): " + ws.username + " joined the room.";
            document.getElementById("log").value += "\n" + entranceMsg;
            notJoined = false;
        }
        // Update chat history for the room
        updateChatHistory(code, receivedMsg);
    };

    notJoined = true;

    // Ensuring first message is treated as a username
    const inputField = document.getElementById("input");
    if (!inputField.hasAttribute("messageListenerAttached")) {
        inputField.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                // If it's the first message, treat it as the username
                if (!ws.username) {
                    ws.username = event.target.value.trim();
                    // Send the username to the server
                    ws.send(JSON.stringify({"type": "username", "username": ws.username}));
                } else if (event.target.value.trim() !== "") {
                    // Only send message if the input field contains text
                    let request = {"type": "chat", "msg": event.target.value};
                    ws.send(JSON.stringify(request));
                }
                event.target.value = "";
            }
        });
        inputField.setAttribute("messageListenerAttached", true);
    }
}

// Function to populate the emoji list
function populateEmojiList() {
    const emojis = ['😀','👋', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌','😘',
        '😗', '😙', '😚', '😋', '😛', '😝', '😜', '😎', '🤩', '🥳', '😏', '😒',
        '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯',
        '😳', '🥺', '😱', '😨', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬',
        '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🤢', '🤮','👹', '👺', '💀',
        '❤️', '👋', '🤚', '🖐️', '🖖', '👌', '🤌', '✌️',
        '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆','👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜'];
    const emojiList = document.querySelector('.emoji-list');

    emojis.forEach(emoji => {
        const emojiButton = document.createElement('button');
        emojiButton.textContent = emoji;
        emojiButton.addEventListener('click', () => {
            // Insert the clicked emoji into the input field
            const inputField = document.querySelector('#input');
            inputField.value += emoji;
        });
        emojiList.appendChild(emojiButton);
    });
}

// Event listener for the emoji button
document.querySelector('#emoji-button').addEventListener('click', () => {
    const emojiList = document.querySelector('.emoji-list');
    emojiList.classList.toggle('show'); // Toggle visibility of the emoji list
});

// Populate the emoji list when the page loads
populateEmojiList();


// Helper function to check if the room code already exists in the list
function isRoomCodeInList(code) {
    //returning true if list contains the room code already
    const roomCodes = Array.from(document.querySelectorAll("#room-list td:first-child")).map(cell => cell.textContent.trim().toUpperCase().replace(/[\r\n]+/g, ''));
    return roomCodes.includes(code.toUpperCase().replace(/[\r\n]+/g, ''));
}

// Function to handle leaving the current room
function leaveRoom(code) {
    console.log("Entering leave room function");

    ws.onclose = function () {

        if(ws.username) {
            // Display a user left message to user
            const closeMsg = "[" + timestamp() + "] (Server " + code.trim() + "): " + ws.username + " has left the room.";
            document.getElementById("log").value += "\n" + closeMsg;
        }else{ // user left without setting a username, so display anonymous left
            const anonCloseMsg = "[" + timestamp() + "] (Server " + code.trim() + "): An anonymous user has left the room.";
            document.getElementById("log").value += "\n" + anonCloseMsg;
        }
    };

    // Check if a WebSocket connection exists
    if (ws && ws.readyState === WebSocket.OPEN) {
        // Send leaving message to the server
        console.log("Sending type to backend");
        ws.send(JSON.stringify({"type": "leave" ,"userID": ws.userID}));
        // Close the WebSocket connection
        console.log("Closing socket");
        ws.close();
        inRoom = false; //user has left
    }
}

// event listener for calling leaveRoom() on leave button click
document.getElementById("leaveRoomButton").addEventListener("click", function() {
    leaveRoom(code);
});

// event listener for calling leaveRoom() on leave button click
document.getElementById("enterButton").addEventListener("click", function() {
    preExistingRoom();
});

// event listener for calling Play TicTacToe on  button click
document.getElementById('playTicTacToe').addEventListener('click', function() {
    if (inRoom) {
        //Open game in a new window
        window.open('indexGame.html', '_blank');
    } else {
        alert('Please join a room to play Tic Tac Toe!');
    }
});

// event listener for calling play Snake Game on button click
document.getElementById('playSnakeGame').addEventListener('click', function() {
    if (inRoom) {
        //Open game in a new window
        window.open('snakeGame.html', '_blank');
    } else {
        alert('Please join a room to play Snake!');
    }
});

// event listener for calling play Connect 4 on button click
document.getElementById('playConnect4Game').addEventListener('click', function() {
    if (inRoom) {
        //Open game in a new window
        window.open('connect4Game.html', '_blank');
    } else {
        alert('Please join a room to play Connect 4!');
    }
});

// event listener for calling playHangman on button click
document.getElementById('playHangman').addEventListener('click', function() {
    if (inRoom) {
        //Open game in a new window
        window.open('hangmanGame.html', '_blank');
    } else {
        alert('Please join a room to play Hangman!');
    }
});

// event listener for calling Play WordGame on  button click
document.getElementById('playWordGame').addEventListener('click', function() {
    if (inRoom) {
        //Open game in a new window
        window.open('wordGame.html', '_blank');
    } else {
        alert('Please join a room to play Word Game!');
    }
});

document.querySelectorAll('.emoji').forEach(emoji => {
    emoji.addEventListener('click', function() {
        if (ws && ws.readyState === WebSocket.OPEN) {
            let reaction = {"type": "reaction", "emoji": emoji.textContent};
            ws.send(JSON.stringify(reaction));
        }
    });
});

// getting reaction emoji and making it animate around the screen when clicked
document.querySelectorAll('.emoji').forEach(emoji => {
    emoji.addEventListener('click', function() {
        if (ws && ws.readyState === WebSocket.OPEN) {
            let reaction = {"type": "reaction", "emoji": emoji.textContent};
            ws.send(JSON.stringify(reaction));
        }

        // Create a new emoji element
        const emojiClone = emoji.cloneNode(true);
        emojiClone.classList.add('floating-emoji');
        document.body.appendChild(emojiClone);

        // Randomize initial position
        const randomX = Math.random() * (window.innerWidth - emojiClone.clientWidth);
        const randomY = Math.random() * (window.innerHeight - emojiClone.clientHeight);
        emojiClone.style.left = randomX + 'px';
        emojiClone.style.top = randomY + 'px';

        // Randomize animation duration
        const duration = Math.random() * 3000 + 1000;

        // Add animation to the emoji
        emojiClone.animate([
            { transform: 'translateY(0) rotate(0)' },
            { transform: 'translateY(-100px) rotate(360deg)' }
        ], {
            duration: duration,
            iterations: 1,
            easing: 'ease-in-out'
        });

        // Remove the emoji element after animation completes
        emojiClone.addEventListener('animationend', function() {
            emojiClone.remove();
        });
    });
});

//refresh chat function
function refreshChat() {
    // Clear the chat log on the frontend
    document.getElementById("log").value = "";

    // Check if a WebSocket connection exists and close it if open
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({"type": "refresh"})); // message to backend to clear chat history
        ws.close();
    }

    // Getting the room code from the input field if user has it typed
    let roomCodeInput = document.getElementById("room-code");
    if (roomCodeInput.value.trim() !== "") {
        let code = roomCodeInput.value.trim().toUpperCase().replace(/[\r\n]+/g, ''); // Remove \r\n characters
        enterRoom(code);
    }
}

// Function to handle entering a pre-existing room
function preExistingRoom() {
    let roomCode = document.getElementById("room-code").value.trim().toUpperCase().replace(/[\r\n]+/g, ''); // Remove \r\n characters
    if (roomCode !== "") {
        // Check if a WebSocket connection already exists
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            // Get the list of existing room codes
            const roomCodes = Array.from(document.querySelectorAll("#room-list td:first-child")).map(cell => cell.textContent.trim().toUpperCase().replace(/[\r\n]+/g, '')); // Remove \r\n characters

            // Check if the entered room code matches any existing room code
            if (roomCodes.includes(roomCode)) {
                // if codes match, call enterRoom function with the provided room code
                enterRoom(roomCode);
            } else {
                // No match; invalid room code entered
                alert("Room code not found. Please enter a valid room code.");
            }
        } else {
            // WebSocket connection already exists
            alert("You are already in a room. Please leave the current room before joining a new one.");
        }
    } else {
        // Empty room code entered
        alert("Please enter a room code.");
    }
}

// Add event listener so if user enters room code, go to preExistingRoom() function
document.getElementById("room-code").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        preExistingRoom();
    }
});

//Function to  keep track of chronological chats with timestamps
function timestamp() {
    var d = new Date();
    var hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    return hours + ':' + minutes;
}
