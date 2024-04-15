// getting values
const cells = document.querySelector(".cell");
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
let options = ["", "", "","", "", "","", "", ""];
let currentPlayer = "X";
let running = false; //will change to true when being played


initialiseGame();
function initialiseGame(){

    //event listener for cells
    cells.forEach(cell => cell.addEventListener("click",cellClicked));
    restart.addEventListener("click", restartGame());
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;

}

function cellClicked(){
    //get cellindex of cell clicked
    const cellIndex = this.getAttribute("cellIndex");

    //cehcks if the cell clicked is empty => does nothing if empty
    if(options[cellIndex] != "" || !running){
        return;
    }

    //updates cell and checks winner if the clciked cell is filled
    updateCell(this,cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    //marks current cell with x or o using standard text
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let winRound = false;

    //checking if any of the win conditions array is satified, matched
    for(let i = 0; i < winConditions.length; i++)
    {
        const condition = winConditions[i]; //getting a condition from the list of conditions
        //splitting values of the grid into individual cells at the same index of the winCOnditions to check
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

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
        running = false;
    }
    //no spaces left so it is a draw
    else if(options.includes(""))
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

}