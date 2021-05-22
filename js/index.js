// Constant and variable
let direction = {x:0, y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 9;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [
    {x:13,y:15}
]
food = {x:6,y:8}

// game function
function main(currenttime){
    window.requestAnimationFrame(main);
    if(((currenttime-lastPaintTime)/1000<1/speed)){
    return;
}
lastPaintTime = currenttime;
gameEngine();
}

function isCollide(snake){
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y ) {
            return true;
        }
    }
    // crash with wall
    if (snake[0].x>= 18|| snake[0].x<0 || snake[0].y >= 18 || snake[0].y<0 ) {
        return true;
    }
        
    
}

// control the game
function gameEngine(){
    
    // update snake
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        direction = {x:0,y:0};
        alert("Game over press any key to start again!!");
        snakeArr = [{x:13,y:15}];
        score = 0;
        
    }

    // if grab the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x ) {
        foodSound.play();
        score += 1;
        if (score>highscoreval) 
        {
            highscoreval = score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "High Score :"+ highscoreval;

        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        
    }
    // moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    // display snake
    background.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        background.appendChild(snakeElement);

    });
    // display food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        background.appendChild(foodElement);


}



// main logic
let highscore = localStorage.getItem("highscore");
if (highscore == null) {
    highscoreval = 0;
    localStorage.setItem("highsocre",JSON.stringify(highscoreval));
    
}
else{
    highscoreval = JSON.parse(highscore)
    highscoreBox.innerHTML = "High Score :"+ highscore;
    
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    direction = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            direction.x = 0;
            direction.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            direction.x = 0;
            direction.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x = -1;
            direction.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            direction.x = 1;
            direction.y = 0;
            break;
        default:
            break;
    }

});