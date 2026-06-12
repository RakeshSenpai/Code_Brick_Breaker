//board

let board;
let boardWidth = 500;
let boardHeight = 500;
let context;


// Player

let playerHeight = 10;
let playerWidth = 80;

let player = {
    x : boardWidth/2 - playerWidth / 2,
    y : boardHeight - playerHeight - 5,
    width : playerWidth,
    height : playerHeight
}

window.onload = function(){
    board = document.getElementById('board')
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext('2d');//Used fot drawing in the board
}