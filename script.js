const gridWidth = 30;
const gridHeight = 30;
const cellSize = 20;

const bounds = document.querySelector(".bounds");
const snakeElement = document.querySelector(".snake");
const scoreCard = document.querySelector(".scorecard");
const playButton = document.getElementById("play");
const resetButton = document.getElementById("reset");
const foodElement = document.querySelector(".food");

// Starting position and speed of the snake
let snakeX = 10;
let snakeY = 10;
let snakeDirection = "down";
let speed = 350;
// Food position
let foodX = 0;
let foodY = 0;

// Score
let score = 0;

// Game interval ID
let gameInterval;

//random food gen
function generateRandomFoodPosition() {
    foodX = Math.floor(Math.random() * gridWidth);
    foodY = Math.floor(Math.random() * gridHeight);
}

//start food position
generateRandomFoodPosition();
foodElement.style.left = foodX * cellSize + "px";
foodElement.style.top = foodY * cellSize + "px";

console.log(foodX)
console.log(foodY)
// console.log(foodElement)

// Directional update
function updateGame() {
    if (snakeDirection === "right") {
        snakeX++;
    } else if (snakeDirection === "left") {
        snakeX--;
    } else if (snakeDirection === "up") {
        snakeY--;
    } else if (snakeDirection === "down") {
        snakeY++;
    }

    // eats food?
    if (snakeX == foodX && snakeY == foodY) {
        // Increase score
        score++;
        // speed+=300;
        speed -= 5;
        scoreCard.textContent = score;
        console.log(score)
        // console.log(scoreCard)
        console.log(speed)
        clearInterval(gameInterval);
        gameInterval = setInterval(updateGame, speed);

        // snake == eat food? => new food
        generateRandomFoodPosition();
        foodElement.style.left = foodX * cellSize + "px";
        foodElement.style.top = foodY * cellSize + "px";
    }
    console.log(foodX)
console.log(foodY)

    // Wall crashes
    if (snakeX < 0 || snakeX >= gridWidth || snakeY < 0 || snakeY >= gridHeight) {
        clearInterval(gameInterval);
        swal("Game over! Your score is: " + score);
        return;
    }

    // Update snake position
    snakeElement.style.left = snakeX * cellSize + "px";
    snakeElement.style.top = snakeY * cellSize + "px";
}


// Arrow key 
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" && snakeDirection !== "left") {
        snakeDirection = "right";
    } else if (event.key === "ArrowLeft" && snakeDirection !== "right") {
        snakeDirection = "left";
    } else if (event.key === "ArrowUp" && snakeDirection !== "down") {
        snakeDirection = "up";
    } else if (event.key === "ArrowDown" && snakeDirection !== "up") {
        snakeDirection = "down";
    }
});
// console.log(snakeX)
// console.log(snakeY)

console.log(snakeDirection);

// Play btn
playButton.addEventListener("click", () => {
    if (!gameInterval) {
        gameInterval = setInterval(updateGame, 200);
    }
});

//Reset btn
resetButton.addEventListener("click", () => {
    clearInterval(gameInterval);
    //   console.log(gameInterval);
    snakeX = 10;
    snakeY = 10;
    snakeDirection = "right";
    score = 0;
    scoreCard.textContent = score;
    //   console.log(gameInterval);

    gameInterval = null;
    // console.log(gameInterval);

    //Reset snake posi
    snakeElement.style.left = snakeX * cellSize + "px";
    snakeElement.style.top = snakeY * cellSize + "px";
});

//reset game
resetButton.click();