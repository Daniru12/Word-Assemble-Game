// Words for the game
const words = ["HELLO", "WORLD", "JAVASCRIPT", "PUZZLE", "GAME"];
let currentWord = "";
let shuffledLetters = [];
let score = 0; // Initialize score

// DOM Elements
const dropZone = document.getElementById("drop-zone");
const letterTiles = document.getElementById("letter-tiles");
const feedback = document.getElementById("feedback");
const restartBtn = document.getElementById("restart-btn");
const scoreDisplay = document.getElementById("score-display"); // Score display

// Initialize the game
function initGame() {
  // Reset feedback
  feedback.textContent = "";
  feedback.className = "feedback";

  // Clear previous tiles
  dropZone.innerHTML = "";
  letterTiles.innerHTML = "";

  // Select a random word
  currentWord = words[Math.floor(Math.random() * words.length)];
  shuffledLetters = shuffleArray(currentWord.split(""));

  // Create letter tiles
  shuffledLetters.forEach((letter) => {
    const tile = document.createElement("div");
    tile.textContent = letter;
    tile.setAttribute("draggable", true);
    tile.classList.add("letter-tile");

    // Drag-and-drop event listeners
    tile.addEventListener("dragstart", handleDragStart);
    tile.addEventListener("dragend", handleDragEnd);

    letterTiles.appendChild(tile);
  });
}

// Shuffle array function
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Drag-and-drop handlers
function handleDragStart(e) {
  e.target.classList.add("dragging");
  e.dataTransfer.setData("text/plain", e.target.textContent);
}

function handleDragEnd(e) {
  e.target.classList.remove("dragging");
}

// Drop zone event listeners
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  const letter = e.dataTransfer.getData("text/plain");

  // Add letter to drop zone
  const tile = document.createElement("div");
  tile.textContent = letter;
  tile.setAttribute("draggable", true);
  tile.classList.add("letter-tile");

  // Attach drag-and-drop listeners
  tile.addEventListener("dragstart", handleDragStart);
  tile.addEventListener("dragend", handleDragEnd);

  dropZone.appendChild(tile);

  // Check if the word is complete
  checkWord();
});

// Check if the word is correct
function checkWord() {
  const assembledWord = Array.from(dropZone.children)
    .map((tile) => tile.textContent)
    .join("");

  if (assembledWord === currentWord) {
    feedback.textContent = "Correct! Great job!";
    feedback.className = "feedback success";

    // Increment score
    score += 10; // Add 10 points for each correct word
    scoreDisplay.textContent = `Score: ${score}`;

    // Automatically start a new round after 2 seconds
    setTimeout(initGame, 2000);
  } else if (assembledWord.length === currentWord.length) {
    feedback.textContent = "Incorrect. Try again!";
    feedback.className = "feedback error";
  }
}

// Restart the game
restartBtn.addEventListener("click", () => {
  score = 0; // Reset score
  scoreDisplay.textContent = `Score: ${score}`;
  initGame();
});

// Start the game on page load
initGame();