document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('score');

    const GRID_SIZE = 20;
    const CANVAS_SIZE = canvas.width;

    let snake = [{ x: 10, y: 10 }];
    let food = getRandomFoodPosition();
    let dx = 0;
    let dy = 0;
    let score = 0;

    setInterval(gameLoop, 100);

    document.addEventListener('keydown', changeDirection);

    function gameLoop() {
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        drawSnake();
        drawFood();
        moveSnake();
        checkCollision();
        checkFoodCollision();
        scoreDisplay.textContent = `Score: ${score}`;
    }

    function drawSnake() {
        snake.forEach(segment => {
            ctx.fillStyle = '#2ecc71';
            ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        });
    }

    function drawFood() {
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }

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
