document.addEventListener("DOMContentLoaded", function() {
    const ROWS = 6;
    const COLS = 7;
    const EMPTY = 0;
    const PLAYER1 = 1;
    const PLAYER2 = 2;
    let currentPlayer = PLAYER1;
    let gameBoard = [];
    let gameOver = false;
    let player1Emoji = "😀"; // Default emojis
    let player2Emoji = "👽"; // Default emojis

    const gameBoardElem = document.getElementById("game-board");
    const statusElem = document.getElementById("status");
    const resetBtn = document.getElementById("reset-btn");
    const player1AvatarPanel = document.getElementById("player1-avatar-panel");
    const player2AvatarPanel = document.getElementById("player2-avatar-panel");

    const player1Avatar = document.getElementById('player1-avatar-panel');
    const player2Avatar = document.getElementById('player2-avatar-panel');

    // Function to handle avatar selection
    function selectAvatar(playerPanel, selectedEmoji) {
        // Remove selected class from all avatars in the panel
        playerPanel.querySelectorAll('.avatar').forEach(function(avatar) {
            avatar.classList.remove('selected');
        });
        // Add selected class to the clicked avatar
        selectedEmoji.classList.add('selected');
    }

    // Add event listener to avatar selection for Player 1
    player1Avatar.addEventListener("click", function(event) {
        if (event.target.classList.contains("avatar")) {
            player1Emoji = event.target.textContent;
            selectAvatar(player1Avatar, event.target);
        }
    });

    // Add event listener to avatar selection for Player 2
    player2Avatar.addEventListener("click", function(event) {
        if (event.target.classList.contains("avatar")) {
            player2Emoji = event.target.textContent;
            selectAvatar(player2Avatar, event.target);
        }
    });

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
                cell.textContent = currentPlayer === PLAYER1 ? player1Emoji : player2Emoji; // Use selected emojis
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