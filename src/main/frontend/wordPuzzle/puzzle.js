const words = ["apple", "banana", "cherry", "date", "watermelon"];
let currentWord = "";
let scrambledWord = "";

function scrambleWord(word){
    return word.split('').sort(()=>Math.random()-0.5).join('');
}

function startGame(){
    const randomIndex = Math.floor(Math.random()*words.length);
    currentWord = words[randomIndex];
    scrambledWord = scrambleWord(currentWord);
    document.getElementById('wordDisplay').textContent = scrambledWord;
    document.getElementById('message').textContent = '';
    document.getElementById('guessInput').value = '';
}

function submitGuess(event){
    event.preventDefault();
    const guess = document.getElementById('guessInput').value;
    if(guess.toLowerCase() === currentWord.toLowerCase()){
        console.log('guess is correct');
        document.getElementById('message').textContent = 'Correct! Well done';
    }
    else {
        console.log('guess is incorrect');
        document.getElementById('message').textContent = 'Wrong! Try again';
    }
    document.getElementById('guessInput').value='';
}

startGame();
