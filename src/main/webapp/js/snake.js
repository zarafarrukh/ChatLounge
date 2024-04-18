document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('score');
    const foodColorInput = document.getElementById('foodColor'); // Declare foodColorInput
    const snakeColorInput = document.getElementById('snakeColor'); // Declare snakeColorInput
    const speedInput = document.getElementById('speedInput');
    const applySpeedBtn = document.getElementById('applySpeedBtn');

    applySpeedBtn.addEventListener('click', () => {
        playerSpeed = parseInt(speedInput.value);
        clearInterval(gameInterval); // Stop the current game loop
        gameInterval = setInterval(gameLoop, 1000 / playerSpeed); // Start a new game loop with the updated speed
    });

    const GRID_SIZE = 20;
    const CANVAS_SIZE = canvas.width;

    let snake = [{ x: 10, y: 10 }];
    let food = getRandomFoodPosition();
    let dx = 0;
    let dy = 0;
    let score = 0;
    let foodColor = '#e74c3c'; // Default food color
    let snakeColor ='#2ecc71' //Default snake color
    let playerSpeed = 10; // Default player speed

    let gameInterval = setInterval(gameLoop, 125);

    document.addEventListener('keydown', changeDirection);

    function gameLoop() {
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        drawSnake();
        drawFood();
        moveSnake();
        checkCollision();
        checkFoodCollision();
        scoreDisplay.textContent = `Score: ${score}`;

        if (score === 100) {
            clearInterval(gameInterval); // Stop the game loop
            congratulatePlayer();
        }
    }
    function congratulatePlayer() {
        document.getElementById('congratulations').style.display = 'block';
    }

    function drawSnake() {
        snake.forEach(segment => {
            ctx.fillStyle = snakeColor; // Use snakeColor variable
            ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        });
    }

    snakeColorInput.addEventListener('change', () => {
        snakeColor = snakeColorInput.value;
    });

    function drawFood() {
        ctx.fillStyle = foodColor;
        ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }

    foodColorInput.addEventListener('change', () => {
        foodColor = foodColorInput.value;
    });

    // moveSnake function to use the player speed
    function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            food = getRandomFoodPosition();
        } else {
            snake.pop();
        }
    }

    function checkCollision() {
        const head = snake[0];
        if (head.x < 0 || head.x >= CANVAS_SIZE / GRID_SIZE || head.y < 0 || head.y >= CANVAS_SIZE / GRID_SIZE) {
            resetGame();
        }
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                resetGame();
            }
        }
    }

    function checkFoodCollision() {
        const head = snake[0];
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            food = getRandomFoodPosition();
        }
    }

    function getRandomFoodPosition() {
        return {
            x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
            y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE))
        };
    }

    function changeDirection(event) {
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;

        const keyPressed = event.keyCode;
        const goingUp = dy === -1;
        const goingDown = dy === 1;
        const goingRight = dx === 1;
        const goingLeft = dx === -1;

        if (keyPressed === LEFT_KEY && !goingRight) {
            dx = -1;
            dy = 0;
        }

        if (keyPressed === UP_KEY && !goingDown) {
            dx = 0;
            dy = -1;
        }

        if (keyPressed === RIGHT_KEY && !goingLeft) {
            dx = 1;
            dy = 0;
        }

        if (keyPressed === DOWN_KEY && !goingUp) {
            dx = 0;
            dy = 1;
        }
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        food = getRandomFoodPosition();
        dx = 0;
        dy = 0;
        score = 0;
    }
});
