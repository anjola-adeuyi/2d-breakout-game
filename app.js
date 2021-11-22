const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 20;

const boardWidth = 560;

const playerInitialPosition = [230, 10];
let currentPos = playerInitialPosition;

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
    player.style.left = currentPos[0] + "px";
    player.style.bottom = currentPos[1] + "px";
}

drawUser();
grid.appendChild(player)


// move player
const movePlayer = (e) => {
    switch (e.key) {
        case "ArrowLeft":
            if (currentPos[0] > 0 ){
                currentPos[0] -= 10;
                drawUser();
            } break;
        case "ArrowRight":
            if (currentPos[0] < boardWidth - blockWidth ) {
                currentPos[0] += 10;
                drawUser();
            } break; 
    } 
}

document.addEventListener("keydown", movePlayer);


