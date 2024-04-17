document.addEventListener('DOMContentLoaded', function() {
    const words = ["Volcano", "Unicorn", "Rocket", "Marigold", "Treasure", "Whistle", "Galaxy", "Igloo", "Pakistan", "Guitar", "Brazil", "Egypt", "Norway", "Australia"];
    let currentWord = "";
    let scrambledWord = "";

    /* function that splits the words array which will be used to scrambled the word*/
    function scrambleWord(word) {
        return word.split('').sort(() => Math.random() - 0.5).join('');
    }

    /* Initializes the scrambled word, and initializes it to wordDisplay text*/
    function startGame() {
        const randomIndex = Math.floor(Math.random() * words.length);
        currentWord = words[randomIndex];
        scrambledWord = scrambleWord(currentWord);
        document.getElementById('wordDisplay').textContent = scrambledWord;
        document.getElementById('message').textContent = '';
        document.getElementById('guessInput').value = '';
    }

    /* The function checks the guess of the user and checks to see if it matches with the current word and if it matches, the user is returned the respective message*/
    document.getElementById('guessForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const guess = document.getElementById('guessInput').value;
        if (guess.toLowerCase() === currentWord.toLowerCase()) {
            console.log('guess is correct');
            document.getElementById('message').textContent = 'Correct! Well done';
        } else {
            console.log('guess is incorrect');
            document.getElementById('message').textContent = 'Wrong! Try again';
        }
        document.getElementById('guessInput').value = '';
    });

    /* Function to restart game*/
    document.getElementById('restartGame').addEventListener('click', function (event) {
        window.location.reload();
    })

    startGame();

});