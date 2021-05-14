//Game constants and all the variables used
let inputDirection = {x: 0, y: 0};
const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const music = new Audio('../music/bgMusic.mp3');
const board = document.getElementById('board');
const scoreboard = document.getElementById('scoreBoard');
const highscoreboard = document.getElementById('highscoreboard');
let highscoreval = 0;
scoreboard.innerHTML = `Score<br>00`;
highscoreboard.innerHTML = `High Score<br>${highscoreval}`;
let lastTime = 0;
let snakeArray = [
    {x:13,y:15}
];
let food = {x:6,y:7};
let score = 0;
let speed = 5;
let a = 1;
let b = 17;
AssignSpeed();
//Assigning speed
function AssignSpeed(){
    let level = prompt(`Enter the difficulty level => High or Medium or Low`);
    switch (level.toLowerCase()) {
        case "high":
            speed = 20;
            break;
        
        case "medium":
            speed = 10;
            break;

        case "low":
            speed = 5;
            break;
    
        default:
            speed = 10;
            break;
    }
}


//Game functions
function main(ctime){ //ctime returns the current time
   window.requestAnimationFrame(main);
//    console.log(ctime);
   if((ctime-lastTime)/1000 < 1/speed){
       return;
   }
   lastTime = ctime; //Updating the lastTime 
   gameEngine();
}

function isCollide(snakeArr){
    for (let i = 1; i < snakeArr.length; i++){
        if(snakeArr[0].x == snakeArr[i].x && snakeArr[0].y == snakeArr[i].y){
            return true;
        }
    }

    if(snakeArr[0].x >=18 || snakeArr[0].x <= 0 || snakeArr[0].y >=18 || snakeArr[0].y <= 0){
        return true;
    }
}

function gameEngine(){
    //Update the SnakeArray and food
    if(isCollide(snakeArray)){
        music.pause();
        gameOverSound.play();
        inputDirection.x = 0;
        inputDirection.y = 0;
        if(score>highscoreval){
            highscoreval = score;
            alert("Congrats!!! for the new high score");
        }
        highscoreboard.innerHTML = `High Score<br>${highscoreval}`;
        alert("Game Over and Press any key to continue");
        snakeArray = [
            {x : Math.round(a + (b-a)*Math.random()),y : Math.round(a + (b-a)*Math.random())}
        ];
        AssignSpeed();
        music.play();
        score = 0;
        scoreboard.innerHTML = `Score<br>00`;

    }

    //Food Processing
    if(snakeArray[0].x === food.x && snakeArray[0].y === food.y){
        foodSound.play();
        score += 1;
        scoreboard.innerHTML = `Score<br>${score}`;
        snakeArray.unshift({x: snakeArray[0].x + inputDirection.x,y: snakeArray[0].y + inputDirection.y});
        // unshift methods add another element at the start of the array
        
        //Updating the food positions
        food = {x : Math.round(a + (b-a)*Math.random()),y : Math.round(a + (b-a)*Math.random())};
    }

    //Moving my snake
    for (let i = snakeArray.length-2; i >= 0; i--) {
        snakeArray[i+1] = {...snakeArray[i]};
    }

    //Changing the direction of my snake after each increment and decrement in the values of inputdirection
    snakeArray[0].x += inputDirection.x;
    snakeArray[0].y += inputDirection.y;

    //Displaying the snake
    board.innerHTML = "";
    snakeArray.forEach((element,index) => {
        SnakeElement = document.createElement('div');
        //Style using js...Initialising gridRow and gridColumn;
        SnakeElement.style.gridRowStart = element.y;
        SnakeElement.style.gridColumnStart = element.x;

        //Adding classes in snake
        if(index==0){
            SnakeElement.classList.add('head');
        }else{
            SnakeElement.classList.add('snakeBody');
        }
        board.appendChild(SnakeElement);
    });

    //Displaying the food
    FoodElement = document.createElement('div');
    FoodElement.style.gridRowStart = food.y;
    FoodElement.style.gridColumnStart = food.x;
    FoodElement.classList.add('food');
    board.appendChild(FoodElement);
}



//Game animations and main logic of the game starts here

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDirection = {x:0,y:1};
    music.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
    
        default:
            break;
    }
})