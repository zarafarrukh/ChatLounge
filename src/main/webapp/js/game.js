// getting values
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restart = document.querySelector("#restartButton");

//defining win conditions- 2d array- checks 3 cells that should be same to win
const winConditions = [
    //rows
    [0,1,2],
    [3,4,5],
    [6,7,8],

    //columns
    [0,3,6],
    [1,4,7],
    [2,5,8],

    //diagonals
    [0,4,8],
    [2,4,6]
];

//placeholders
let gridCells = ["", "", "","", "", "","", "", ""];
let currentPlayer = "X";
let running = false; //will change to true when being played


initialiseGame();

// Add event listeners to emoji selection panel
const emojiPanel = document.getElementById('emojiPanel');
const emojis = emojiPanel.querySelectorAll('.emoji');
let selectedEmojis = [];

emojis.forEach(emoji => {
    emoji.addEventListener('click', () => {
        const emojiValue = emoji.getAttribute('data-emoji');
        if (!selectedEmojis.includes(emojiValue) && selectedEmojis.length < 2) {
            selectedEmojis.push(emojiValue);
            emoji.classList.add('selected');
        } else if (selectedEmojis.includes(emojiValue)) {
            selectedEmojis = selectedEmojis.filter(item => item !== emojiValue);
            emoji.classList.remove('selected');
        }
    });
});
function initialiseGame(){

    //event listener for cells
    cells.forEach(cell => cell.addEventListener("click",cellClicked));
    restart.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;

}

function cellClicked(){
    //get cellindex of cell clicked
    const cellIndex = this.getAttribute("cellIndex");

    //cehcks if the cell clicked is empty => does nothing if empty
    if(gridCells[cellIndex] != "" || !running){
        return;
    }

    //updates cell and checks winner if the clciked cell is filled
    updateCell(this,cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    // Check if selected emojis are available
    if (selectedEmojis.length < 2) {
        console.error("Please select 2 emojis first.");
        return;
    }

    // Determine which emoji to use based on currentPlayer
    const emojiToUse = currentPlayer === selectedEmojis[0] ? selectedEmojis[0] : selectedEmojis[1];
    gridCells[index] = emojiToUse;
    cell.textContent = emojiToUse;
}

function changePlayer() {
    //just changes current player
    currentPlayer = currentPlayer === selectedEmojis[0] ? selectedEmojis[1] : selectedEmojis[0];
    const emojiText = currentPlayer
    if (emojiText == null) {
        statusText.textContent = `Select an emoji`;
    } else {
        statusText.textContent = `${emojiText}'s turn`;
    }


}

function checkWinner(){
    let winRound = false;

    //checking if any of the win conditions array is satified, matched
    for(let i = 0; i < winConditions.length; i++)
    {
        const condition = winConditions[i]; //getting a condition from the list of conditions
        //splitting values of the grid into individual cells at the same index of the winCOnditions to check
        const cellA = gridCells[condition[0]];
        const cellB = gridCells[condition[1]];
        const cellC = gridCells[condition[2]];

        //checking for empty spaces in grid
        if(cellA == "" || cellB == "" || cellC == "")
        {
            continue;
        }
        //checking if the netered values match
        if(cellA==cellB && cellB==cellC)
        {
            winRound = true;
            break;
        }

    }

    if(winRound)
    {

        statusText.textContent = `${currentPlayer} wins!`;

        //triggering confetti
        const start = () => {
            setTimeout(function()
            {
                confetti.start();
            });
        }
        start();
        running = false;

    }
    //no spaces left so it is a draw
    else if(!gridCells.includes(""))
    {
        statusText.textContent = `Draw match!`;
        running = false;
    }
    else
    {
        changePlayer();
    }

}

function resetEmojis() {
    selectedEmojis = []; // Reset selected emojis array
    emojis.forEach(emoji => emoji.classList.remove('selected')); // Remove "selected" class from emoji elements
}

function restartGame(){
    //game starts and ends with X if draw
    currentPlayer = selectedEmojis.length > 0 ? selectedEmojis[0] : "X";

    //resetting grid values
    gridCells = ["", "", "","", "", "","", "", ""];

    statusText.textContent =`${currentPlayer}'s turn!`;

    //clearing cells
    cells.forEach(cell => cell.textContent = "");
    running = true;

    //stopping confettii if on
    const stop = () => {
        setTimeout(function()
        {
            confetti.stop();
        });
    }
    stop();

    resetEmojis();

}

// Add event listeners to emoji reactions
const reactionPanel = document.getElementById('reactionPanel');
const reactions = reactionPanel.querySelectorAll('.reaction');
const chatLog = document.getElementById('chatLog');

reactions.forEach(reaction => {
    reaction.addEventListener('click', () => {
        const selectedReaction = reaction.getAttribute('data-reaction');
        appendToChatLog(selectedReaction);
    });
});

// Function to append reaction to the chat log
function appendToChatLog(reaction) {
    const reactionElement = document.createElement('div');
    reactionElement.textContent = `Reaction: ${reaction}`;
    chatLog.appendChild(reactionElement);
}

