document.addEventListener('DOMContentLoaded', function() {
    const words = ["Volcano", "Unicorn", "Rocket", "Marigold", "Treasure", "Whistle", "Galaxy", "Igloo", "Pakistan", "Guitar", "Brazil", "Egypt", "Norway", "Australia"];
    let currentWord = "";
    let scrambledWord = "";
    let score = 0;

    function scrambleWord(word) {
        return word.split('').sort(() => Math.random() - 0.5).join('');
    }

    function startGame() {
        const randomIndex = Math.floor(Math.random() * words.length);
        currentWord = words[randomIndex];
        scrambledWord = scrambleWord(currentWord);
        document.getElementById('wordDisplay').textContent = scrambledWord;
        document.getElementById('message').textContent = '';
        document.getElementById('guessInput').value = '';
    }

    document.getElementById('guessForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const guess = document.getElementById('guessInput').value;
        if (guess.toLowerCase() === currentWord.toLowerCase()) {
            score++;
            document.getElementById('message').textContent = 'Correct! Well done';
            console.log('Celebratory effects for correct guess');
            document.getElementById('scoreDisplay').textContent = 'Score: ' + score;
            startGame(); // Start a new game
        } else {
            score = 0; // Reset score to 0 if guess is wrong
            document.getElementById('message').textContent = 'Wrong! Try again';
            document.getElementById('scoreDisplay').textContent = 'Score: ' + score; // Update score display
        }
        document.getElementById('guessInput').value = '';
    });

    document.getElementById('restartGame').addEventListener('click', function(event) {
        score = 0;
        document.getElementById('scoreDisplay').textContent = 'Score: ' + score;
        startGame();
    });

    startGame();
});