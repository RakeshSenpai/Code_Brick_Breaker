//board

let board;
let boardWidth = 500;
let boardHeight = 500;
let context;


// Player

let playerHeight = 10;
let playerWidth = 80;
let playerVelocityX = 10;

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
let ballVelocityX = 3;
let ballVelocityY = 2;

let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width : ballWidth,
    height : ballHeight,
    velocityX : ballVelocityX,
    velocityY : ballVelocityY
    
}


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
}

// update

function update(){
    requestAnimationFrame(update)
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
    }

}

// outOfBounce
function outOfBounce(xPosition){
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}


// movePlayer
function movePlayer(e){
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
    return a.x < b.x + b.width &&
           a.x + b.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function topCollision(ball, block){
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

console.log('wall collision')