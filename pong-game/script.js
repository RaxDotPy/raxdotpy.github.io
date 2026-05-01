// Get canvas and context
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game objects
const paddleWidth = 10;
const paddleHeight = 80;
const ballRadius = 6;

// Player paddle (left)
const player = {
    x: 15,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    speed: 6
};

// Computer paddle (right)
const computer = {
    x: canvas.width - 25,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    speed: 4.5
};

// Ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    dx: 5,
    dy: 5,
    speed: 5
};

// Scores
let playerScore = 0;
let computerScore = 0;

// Keyboard input
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Mouse input
let mouseY = canvas.height / 2;
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseY = e.clientY - rect.top;
});

// Update player paddle position
function updatePlayerPaddle() {
    // Arrow keys control
    if (keys['ArrowUp'] && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys['ArrowDown'] && player.y < canvas.height - player.height) {
        player.y += player.speed;
    }

    // Mouse control - smooth following
    const mouseDistance = mouseY - (player.y + player.height / 2);
    if (Math.abs(mouseDistance) > 5) {
        if (mouseDistance > 0) {
            player.y = Math.min(player.y + 4, canvas.height - player.height);
        } else {
            player.y = Math.max(player.y - 4, 0);
        }
    }

    // Keep paddle in bounds
    player.y = Math.max(0, Math.min(player.y, canvas.height - player.height));
}

// Update computer paddle (AI)
function updateComputerPaddle() {
    const computerCenter = computer.y + computer.height / 2;
    const distance = ball.y - computerCenter;

    // AI logic - track the ball with slight imperfection
    if (Math.abs(distance) > 10) {
        if (distance > 0) {
            computer.y = Math.min(computer.y + computer.speed, canvas.height - computer.height);
        } else {
            computer.y = Math.max(computer.y - computer.speed, 0);
        }
    }

    // Keep paddle in bounds
    computer.y = Math.max(0, Math.min(computer.y, canvas.height - computer.height));
}

// Update ball position
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (top and bottom)
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
        ball.y = Math.max(ball.radius, Math.min(ball.y, canvas.height - ball.radius));
    }

    // Paddle collision - player paddle
    if (
        ball.x - ball.radius < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height
    ) {
        ball.dx = -ball.dx;
        ball.x = player.x + player.width + ball.radius;
        // Add spin based on where ball hits paddle
        const hitPos = (ball.y - (player.y + player.height / 2)) / (player.height / 2);
        ball.dy += hitPos * 3;
    }

    // Paddle collision - computer paddle
    if (
        ball.x + ball.radius > computer.x &&
        ball.y > computer.y &&
        ball.y < computer.y + computer.height
    ) {
        ball.dx = -ball.dx;
        ball.x = computer.x - ball.radius;
        // Add spin based on where ball hits paddle
        const hitPos = (ball.y - (computer.y + computer.height / 2)) / (computer.height / 2);
        ball.dy += hitPos * 3;
    }

    // Score points
    if (ball.x - ball.radius < 0) {
        computerScore++;
        resetBall();
        document.getElementById('computerScore').textContent = computerScore;
    }

    if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        resetBall();
        document.getElementById('playerScore').textContent = playerScore;
    }
}

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * 5;
    ball.dy = (Math.random() - 0.5) * 5;
}

// Draw functions
function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawCenterLine() {
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function draw() {
    // Clear canvas
    drawRect(0, 0, canvas.width, canvas.height, '#000');

    // Draw center line
    drawCenterLine();

    // Draw paddles
    drawRect(player.x, player.y, player.width, player.height, '#00ff88');
    drawRect(computer.x, computer.y, computer.width, computer.height, '#ff1744');

    // Draw ball
    drawCircle(ball.x, ball.y, ball.radius, '#ffff00');
}

// Main game loop
function gameLoop() {
    updatePlayerPaddle();
    updateComputerPaddle();
    updateBall();
    draw();

    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();