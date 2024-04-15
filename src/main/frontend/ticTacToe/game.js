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


function initialiseGame(){

}

function cellClicked(){

}

function updateCell(cell, index){

}

function changePlayer() {

}

function checkWinner(){

}

function restartGame(){

}