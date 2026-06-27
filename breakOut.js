//board

let board;
let boardWidth = 500;
let boardHeight = 500;
let context;


// Player

let playerHeight = 10;
let playerWidth = 80;
let playerVelocityX = 30;

let player = {
    x : boardWidth/2 - playerWidth / 2,
    y : boardHeight - playerHeight - 5,
    width : playerWidth,
    height : playerHeight,
    velocityX : playerVelocityX
};


// Ball
let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 4;
let ballVelocityY = 3;

let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width : ballWidth,
    height : ballHeight,
    velocityX : ballVelocityX,
    velocityY : ballVelocityY
    
}


// Blocks

let blockArray = [];
let blockHeight = 10;
let blockWidth = 50;
let blockColumns = 8;
let blockRows = 3;
let blockMaxRow = 10;
let blockCount = 0;

// starting block corner top left
let blockX = 15;
let blockY = 45;
 
let score = 0;
let gameOver = false;

window.onload = function(){
    board = document.getElementById('board')
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext('2d');//Used fot drawing in the board

    // Draw Initial Player

    context.fillStyle = 'red';
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);

    document.addEventListener('keydown', movePlayer)

    // create Blocks

    createBlock()
}

// update

function update(){
    requestAnimationFrame(update)
    if(gameOver){
        return;
    }
    context.clearRect(0, 0, board.width, board.height)

// Player
    context.fillStyle = 'red';
    context.fillRect(player.x, player.y, player.width, player.height);

    context.fillStyle = 'white'
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    // Bounce ball off walls
    if(ball.y <= 0){
        // if ball touches top of canvas
        ball.velocityY *= -1;//Reverse the direction
    }
    else if(ball.x <= 0 || (ball.x + ball.width) >= boardWidth){
        // if ball touches the left or right of the canvas
        ball.velocityX *= -1
    }
    else if(ball.y + ball.height >= boardHeight){
        // if ball touches bottom of canvas
        // console.log('Game is over');
        context.font = '20px sans-serif';
        context.fillText('Game over press "space" to restart the game', 50, 400);
        gameOver = true;
    }

    //bounce the ball off the player paddle

    if(topCollision(ball, player) || bottomCollision(ball, player)){
        ball.velocityY *= -1;
    }

    else if(leftCollision(ball, player) || rightCollision(ball, player)){
        ball.velocityX *= -1
    }

    //blocks

    context.fillStyle = 'skyblue'; 
    for(let i = 0; i < blockArray.length; i++){
        let block = blockArray[i];
        if(!block.break){
            if(topCollision(ball, block) || bottomCollision(ball, block)){
                block.break = true;
                ball.velocityY *= -1
                blockCount -= 1
                score += 100;
            }

            else if(leftCollision(ball, block) || rightCollision(ball, block)){
                block.break = true;
                ball.velocityX *= -1;
                blockCount -= 1;
                score += 100;
            }

            context.fillRect(block.x, block.y, block.width, block.height)
        }
    }

    //next Level

    if(blockCount == 0){
        score += 100*blockRows*blockColumns;
        blockRows = Math.min(blockRows + 1, blockMaxRow)
        createBlock();
    }

    context.font = '20px sans-serif';
    context.fillText(score, 10, 25)
}

// outOfBounce
function outOfBounce(xPosition){
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}


// movePlayer
function movePlayer(e){

    if(gameOver){
        if(e.code == 'Space'){
             resetGame()
        }
    }
    if(e.code == 'ArrowLeft'){
        // player.x -= player.VelocityX
        let nextPlayerX = player.x - player.velocityX
        if(!outOfBounce(nextPlayerX)){
            player.x = nextPlayerX;
        }
    } else if(e.code == 'ArrowRight'){
        // player.x += player.VelocityX;
        let nextPlayerX = player.x + player.velocityX
        if(!outOfBounce(nextPlayerX)){
            player.x = nextPlayerX
        }
    }
}

function detectCollision(a, b){
    return a.x < b.x + b.width && // a's top left corner doesnot reaches b's top right corner
           a.x + a.width > b.x && // a's top right corner passes b's top left corner
           a.y < b.y + b.height && // a's top left corner doesnot reaches b's bottom left corner
           a.y + a.height > b.y; // a's bottom left corner passes b's bottom left corner
}

function topCollision(ball, block){ // a is avobe b (ball is avobe block)
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

function bottomCollision(ball, block){
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y;
}

function leftCollision(ball, block){
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.x;
}

function rightCollision(ball, block){
    return detectCollision(ball, block) && (block.x + block.width) >= ball.x;
}


function createBlock(){
    blockArray = [];
    for(let c = 0; c < blockColumns; c++)   {
        for(let r = 0 ; r < blockRows; r++){
            let block = {
                x : blockX + c*blockWidth + c*10, // c*10 space 10px apart columns
                y : blockY + r*blockHeight + r*10,// c*10 space 10px apart rows 
                width: blockWidth,
                height: blockHeight,
                break : false
            }

            blockArray.push(block);
        }
    }

    blockCount = blockArray.length;
}


function resetGame(){
    gameOver = false;
 player = {
    x : boardWidth/2 - playerWidth / 2,
    y : boardHeight - playerHeight - 5,
    width : playerWidth,
    height : playerHeight,
    velocityX : playerVelocityX
};
 ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width : ballWidth,
    height : ballHeight,
    velocityX : ballVelocityX,
    velocityY : ballVelocityY
    
}
blockArray = []
score = 0 
blockRows = 3;
createBlock()

}