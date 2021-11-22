const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 20;

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
    new Block(0, 280),
    new Block(300, 0)
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

