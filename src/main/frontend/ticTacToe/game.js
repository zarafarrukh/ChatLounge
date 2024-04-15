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
let currentPlayer = "❤️";
let running = false; //will change to true when being played


initialiseGame();
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
    gridCells[index] = currentPlayer;
    //marks current cell with x or o using standard text
    cell.textContent = currentPlayer;
}

function changePlayer() {
    //just changes current player
    currentPlayer = (currentPlayer == '❤️') ? "😼" : "❤️";
    statusText.textContent = `${currentPlayer}'s turn`;
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

function restartGame(){
    //game starts and ends with X if draw
    currentPlayer = "❤️";

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

}

// function triggerConfetti() {
//     confetti({
//         particleCount: 1000,
//         spread: 100,
//         origin: { y: 0.6 }
//     });
// }