const gridWidth = 30;
const gridHeight = 30;
const cellSize = 20;

const bounds = document.querySelector(".bounds");
const scoreCard = document.querySelector(".scorecard");
const playButton = document.getElementById("play");
const resetButton = document.getElementById("reset");
const foodElement = document.querySelector(".food");

// initialposi
let snakeX = 10;
let snakeY = 10;
let snakeDirection = "down";
// console.log(snakeX);
// console.log(snakeY);


// speed changes
let initialSpeed = 500;
let speed = initialSpeed;
// console.log(speed);


// food posi
let foodX = 0;
let foodY = 0;
// console.log(foodX);
// console.log(foodY);


// score
let score = 0;

// length and interval
let snakeBody = [];
let gameInterval = 2000;
let snakeLength = 1;
// console.log(gameInterval);


// random food gen
function generateRandomFoodPosition() {
  foodX = Math.floor(Math.random() * gridWidth);
  foodY = Math.floor(Math.random() * gridHeight);
}
// console.log(foodX);
// console.log(foodY);


// random food posi gen
generateRandomFoodPosition();
foodElement.style.left = foodX * cellSize + "px";
foodElement.style.top = foodY * cellSize + "px";
console.log(foodX);
console.log(foodY);


// crash check
function checkCollision(x, y) {
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeBody[i].x === x && snakeBody[i].y === y) {
      return true;
    }
  }
  return false;
}


// main logic update game every change
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
  console.log(snakeDirection)

  let ateFood = false; // Flag to check if the snake ate food

  if (snakeX === foodX && snakeY === foodY) {
    // Snake ate food so score +1 and speed increase
    score += 1;
    speed -= 5;
    ateFood = true; //flag is true

    scoreCard.textContent = " " + score;
    generateRandomFoodPosition();
    foodElement.style.left = foodX * cellSize + "px";
    foodElement.style.top = foodY * cellSize + "px";
    snakeLength++; // snakelength increment
    clearInterval(gameInterval); // Clear the old interval
    gameInterval = setInterval(updateGame, speed); // Start a new interval with the updated speed
  }
  // console.log(speed)
  console.log(snakeLength)

  if (
    snakeX < 0 ||
    snakeX >= gridWidth ||
    snakeY < 0 ||
    snakeY >= gridHeight ||
    checkCollision(snakeX, snakeY)
  ) {
    clearInterval(gameInterval);
    speed = 350;
    swal("Game over! Your score is: " + score);//sweetalert
    return;
  }

  snakeBody.unshift({ x: snakeX, y: snakeY });

  // while loop to remove the appending circles at start and pop them
  while (snakeBody.length > snakeLength) {
    const removedSegment = snakeBody.pop();
    bounds.removeChild(removedSegment.element);
  }

  // new element segment to append
  const segmentElement = document.createElement("div");
  segmentElement.className = "snake";
  segmentElement.style.left = snakeX * cellSize + "px";
  segmentElement.style.top = snakeY * cellSize + "px";
  bounds.appendChild(segmentElement);
  snakeBody[0].element = segmentElement;
}

// keypress
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
// console.log(snakeDirection)

// play btn
playButton.addEventListener("click", () => {
  if (!gameInterval) {
    gameInterval = setInterval(() => {
      updateGame();
    }, speed);
  }
});

// reset btn
resetButton.addEventListener("click", () => {
  clearInterval(gameInterval);
  snakeX = 10;
  snakeY = 10;
  snakeDirection = "down";
  score = 0;
  scoreCard.textContent = " " + score;
  snakeLength = 1; // Reset the snake length to 1
  snakeBody = [];
  const segments = document.querySelectorAll(".snake");
  for (const segment of segments) {
    bounds.removeChild(segment);
  }
  gameInterval = null;
  generateRandomFoodPosition();
  foodElement.style.left = foodX * cellSize + "px";
  foodElement.style.top = foodY * cellSize + "px";
});
// console.log(snakeX);
// console.log(snakeY);
// console.log(snakeDirection);
// console.log(score);
// console.log(snakeLength);

resetButton.click();
