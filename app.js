const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const pointsDisplay = document.querySelector("#points");

const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
let points = 0;

let xDirection = 2;
let yDirection = 2;

let timerId

const playerInitialPosition = [230, 10];
let currentPlayerPos = playerInitialPosition;

const ballInitialPosition = [270, 40];
let ballCurrentPos = ballInitialPosition;

// blocks coordinates
class Block {
    constructor (xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

//all my blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

console.log(blocks)

// draw all my block function
const addBlock = () => {
    for (let i=0; i < blocks.length; i++) {

        const block = document.createElement("div");
        block.classList.add("block");
    
        block.style.left = blocks[i].bottomLeft[0] + "px";
        block.style.bottom = blocks[i].bottomLeft[1] + "px";
    
        grid.appendChild(block);
    }
}

addBlock();


// add Player
const player = document.createElement("div");
player.classList.add("player");

// draw User
const drawUser = () => {
    player.style.left = currentPlayerPos[0] + "px";
    player.style.bottom = currentPlayerPos[1] + "px";
}

drawUser();
grid.appendChild(player)


// move player
const movePlayer = (e) => {
    switch (e.key) {
        case "ArrowLeft":
            if (currentPlayerPos[0] > 0 ){
                currentPlayerPos[0] -= 10;
                drawUser();
            } break;
        case "ArrowRight":
            if (currentPlayerPos[0] < boardWidth - blockWidth ) {
                currentPlayerPos[0] += 10;
                drawUser();
            } break; 
    } 
}

document.addEventListener("keydown", movePlayer);


// add ball
const ball = document.createElement("div");
ball.classList.add("ball");

// draw ball
const drawBall = () => {
    ball.style.left = ballCurrentPos[0] + "px";
    ball.style.bottom = ballCurrentPos[1] + "px";
}

drawBall();
grid.appendChild(ball);

// function to moveBall
const moveBall = () => {
    ballCurrentPos[0] += xDirection;
    ballCurrentPos[1] += yDirection;
    checkForCollision();
    checkForGameOver();
    drawBall();
}

let ballSpeed = 30;
timerId = setInterval(moveBall, ballSpeed)

// Check for Collision
const checkForCollision = () => {
    // check for block collision
    for (let i=0; i < blocks.length; i++) {
        if ( 
           (
                ballCurrentPos[0] > blocks[i].bottomLeft[0] && 
                ballCurrentPos[0] < blocks[i].bottomRight[0] &&
                ballCurrentPos[1] + ballDiameter > blocks[i].bottomLeft[1] &&
                ballCurrentPos[1] + ballDiameter < blocks[i].topLeft[1]
            ) 
                ||
            (
                ballCurrentPos[0] > blocks[i].topLeft[0] &&   
                ballCurrentPos[0] < blocks[i].topRight[0] &&
                ballCurrentPos[1] > blocks[i].bottomRight[1] &&
                ballCurrentPos[1] < blocks[i].topRight[1]
            )
        ) {
            const allBlocks = Array.from(document.querySelectorAll(".block"));
            console.log(allBlocks);
            allBlocks[i].classList.remove("block");
            blocks.splice(i, 1);
            changeDirection();
            points++;
            // ballSpeed += 1;
            // timerId = setInterval(moveBall, ballSpeed);
            pointsDisplay.innerHTML = points;

            // check for wins
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = "YOU WIN!!!";
                clearInterval(timerId);
                document.removeEventListener("keydown", movePlayer);
            }
        }

    }

    // check for wall collision
    if ( 
            ballCurrentPos[0] >= boardWidth - ballDiameter || 
            ballCurrentPos[1] >= boardHeight - ballDiameter ||
            ballCurrentPos[0] <= 0 
            ) {
                changeDirection();
    }

    // check for player collision
    if (
        ballCurrentPos[0] >= currentPlayerPos[0] &&
        ballCurrentPos[0] <= currentPlayerPos[0] + blockWidth &&
        ballCurrentPos[1] >= currentPlayerPos[1] &&
        ballCurrentPos[1] < currentPlayerPos[1] + blockHeight
    ) {
        changeDirection();
    }
}

// Check For Game Over
const checkForGameOver = () => {
    if ( ballCurrentPos[1] <= 0) {
        clearInterval(timerId);
        scoreDisplay.innerHTML = "You Lose!";
        scoreDisplay.style.display = "block";
        setInterval(loserBoard, 3000);
        document.removeEventListener("keydown", movePlayer);
    }
}

const loserBoard = () => {
    scoreDisplay.innerHTML = "";
    scoreDisplay.style.display = "none";
}

const changeDirection = () => {
    if ( xDirection === 2 && yDirection === 2) {
        xDirection = -2;
        return;
    }
    if ( xDirection === -2 && yDirection === 2) {
        yDirection = -2;
        return;
    }
    if ( xDirection === -2 && yDirection === -2) {
        xDirection = 2;
        return;
    }
    if ( xDirection === 2 && yDirection === -2) {
        yDirection = 2;
        return;
    }
}