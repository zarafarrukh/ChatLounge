document.addEventListener("DOMContentLoaded", function() {
    const ROWS = 6;
    const COLS = 7;
    const EMPTY = 0;
    const PLAYER1 = 1;
    const PLAYER2 = 2;
    let currentPlayer = PLAYER1;
    let gameBoard = [];
    let gameOver = false;

    const gameBoardElem = document.getElementById("game-board");
    const statusElem = document.getElementById("status");
    const resetBtn = document.getElementById("reset-btn");

    // Create the game board
    function createBoard() {
        for (let row = 0; row < ROWS; row++) {
            gameBoard[row] = [];
            for (let col = 0; col < COLS; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = row;
                cell.dataset.col = col;
                gameBoardElem.appendChild(cell);
                gameBoard[row][col] = EMPTY;
            }
        }
    }

    // Check for a win
    function checkWin(row, col) {
        const directions = [[1, 0], [0, 1], [1, 1], [1, -1]]; // Vertical, Horizontal, Diagonal (Right), Diagonal (Left)
        for (let [dx, dy] of directions) {
            let count = 1;
            let r = row + dx;
            let c = col + dy;
            while (r >= 0 && r < ROWS && c >= 0 && c < COLS && gameBoard[r][c] === currentPlayer) {
                count++;
                r += dx;
                c += dy;
            }
            r = row - dx;
            c = col - dy;
            while (r >= 0 && r < ROWS && c >= 0 && c < COLS && gameBoard[r][c] === currentPlayer) {
                count++;
                r -= dx;
                c -= dy;
            }
            if (count >= 4) return true;
        }
        return false;
    }

    // Check for a draw
    function checkDraw() {
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                if (gameBoard[row][col] === EMPTY) return false;
            }
        }
        return true;
    }

    // Handle player move
    function playerMove(col) {
        for (let row = ROWS - 1; row >= 0; row--) {
            if (gameBoard[row][col] === EMPTY) {
                gameBoard[row][col] = currentPlayer;
                const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
                cell.style.backgroundColor = currentPlayer === PLAYER1 ? "red" : "yellow";
                if (checkWin(row, col)) {
                    gameOver = true;
                    statusElem.textContent = `Player ${currentPlayer} wins!`;
                } else if (checkDraw()) {
                    gameOver = true;
                    statusElem.textContent = "It's a draw!";
                } else {
                    currentPlayer = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
                    statusElem.textContent = `Player ${currentPlayer}'s turn`;
                }
                break;
            }
        }
    }

    // Handle column click
    function handleColumnClick(event) {
        if (!gameOver) {
            const col = parseInt(event.target.dataset.col);
            playerMove(col);
        }
    }

    // Reset the game
    function resetGame() {
        gameBoardElem.innerHTML = "";
        createBoard();
        currentPlayer = PLAYER1;
        gameOver = false;
        statusElem.textContent = `Player ${currentPlayer}'s turn`;
    }

    // Event listeners
    gameBoardElem.addEventListener("click", handleColumnClick);
    resetBtn.addEventListener("click", resetGame);

    // Initialize the game
    createBoard();
    statusElem.textContent = `Player ${currentPlayer}'s turn`;
});
