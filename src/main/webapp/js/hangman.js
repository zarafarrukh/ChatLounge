// Hangman game logic
const words = ["hangman", "javascript", "programming", "computer", "internet"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(selectedWord.length).fill("_");

const wordDisplay = document.getElementById("wordDisplay");
const guessesLeft = document.getElementById("guessesLeft");
const letterInput = document.getElementById("letterInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");

let remainingGuesses = 6;
guessesLeft.textContent = remainingGuesses;

function updateWordDisplay() {
    wordDisplay.textContent = guessedWord.join(" ");
}

function checkWin() {
    if (!guessedWord.includes("_")) {
        message.textContent = "Congratulations! You won!";
        guessBtn.disabled = true;
        letterInput.disabled = true;
    }
}

function checkLoss() {
    if (remainingGuesses === 0) {
        message.textContent = `Sorry, you lost! The word was "${selectedWord}".`;
        guessBtn.disabled = true;
        letterInput.disabled = true;
    }
}

updateWordDisplay();

guessBtn.addEventListener("click", function() {
    const letter = letterInput.value.toLowerCase();
    letterInput.value = "";

    if (!letter.match(/^[a-z]$/)) {
        message.textContent = "Please enter a valid letter (a-z).";
        return;
    }

    if (selectedWord.includes(letter)) {
        selectedWord.split("").forEach((char, index) => {
            if (char === letter) {
                guessedWord[index] = letter;
            }
        });
        updateWordDisplay();
        checkWin();
    } else {
        remainingGuesses--;
        guessesLeft.textContent = remainingGuesses;
        checkLoss();
    }

    if (message.textContent === "") {
        message.textContent = `You guessed "${letter}".`;
    }
});
