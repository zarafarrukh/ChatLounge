document.addEventListener('DOMContentLoaded', function() {
    const words = ["Volcano", "Unicorn", "Rocket", "Marigold", "Treasure", "Whistle", "Galaxy", "Igloo", "Pakistan", "Guitar", "Brazil", "Egypt", "Norway", "Australia"];
    let currentWord = "";
    let scrambledWord = "";
    let score = 0; // Initialize score

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
            console.log('guess is correct');
            document.getElementById('message').textContent = 'Correct! Well done';
            score++; // Increment score for correct guess
            document.getElementById('scoreDisplay').textContent = 'Score: ' + score; // Update score display
            startGame(); // Start a new game
        } else {
            console.log('guess is incorrect');
            document.getElementById('message').textContent = 'Wrong! Try again';
            score = 0; // Reset score to 0 for incorrect guess
            document.getElementById('scoreDisplay').textContent = 'Score: ' + score; // Update score display
        }
        document.getElementById('guessInput').value = '';
    });

    document.getElementById('restartGame').addEventListener('click', function(event) {
        score = 0; // Reset score to 0 on restart
        document.getElementById('scoreDisplay').textContent = 'Score: ' + score; // Update score display
        startGame();
    });

    startGame();
});
