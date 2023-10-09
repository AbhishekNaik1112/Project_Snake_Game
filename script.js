const gridWidth = 30;
const gridHeight = 30;
const cellSize = 20;

console.log(cellSize);
console.log(gridWidth);
console.log(gridHeight);

const bounds = document.querySelector(".bounds");
const snakeElement = document.querySelector(".snake");
const scoreCard = document.querySelector(".scorecard");
const playButton = document.getElementById("play");
const resetButton = document.getElementById("reset");

// Starting position of the snake
let snakeX = 20;
let snakeY = 20;
let snakeDirection = "right";

// Score
let score = 0;

// Game interval ID
let gameInterval;

// Directional update
function updateGame() {
  // Move the snake
  if (snakeDirection === "right") {
    snakeX++;
  } else if (snakeDirection === "left") {
    snakeX--;
  } else if (snakeDirection === "up") {
    snakeY--;
  } else if (snakeDirection === "down") {
    snakeY++;
  }
//   console.log(updateGame);
  console.log(snakeDirection);

  // Wall crashes
  if (snakeX < 0 || snakeX >= gridWidth || snakeY < 0 || snakeY >= gridHeight) {
    clearInterval(gameInterval);
    // alert();
    swal("Game over! Your score: " + score);
    return;
  }

  console.log(snakeX);
  console.log(snakeY);

  // Update snake position
  snakeElement.style.left = snakeX * cellSize + "px";
  snakeElement.style.top = snakeY * cellSize + "px";
}

// Arrow key press
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

// console.log(snakeDirection);

// Play button
playButton.addEventListener("click", () => {
  if (!gameInterval) {
    gameInterval = setInterval(updateGame, 200);
  }
});

// Reset button
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
  console.log(gameInterval);

  // Reset snake position
  snakeElement.style.left = snakeX * cellSize + "px";
  snakeElement.style.top = snakeY * cellSize + "px";
});

// Initialize the game
resetButton.click();
