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
    VelocityX : playerVelocityX
};




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

function update(){
    requestAnimationFrame(update)
    context.clearRect(0, 0, board.width, board.height)

// Player
    context.fillStyle = 'red';
    context.fillRect(player.x, player.y, player.width, player.height);

}

function outOfBounce(xPosition){
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}

function movePlayer(e){
    if(e.code == 'ArrowLeft'){
        // player.x -= player.VelocityX
        let nextPlayerX = player.x - player.VelocityX
        if(!outOfBounce(nextPlayerX)){
            player.x = nextPlayerX;
        }
    } else if(e.code == 'ArrowRight'){
        // player.x += player.VelocityX;
        let nextPlayerX = player.x + player.VelocityX
        if(!outOfBounce(nextPlayerX)){
            player.x = nextPlayerX
        }
    }
}