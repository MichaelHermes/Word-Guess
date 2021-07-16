// Document selectors
var startButton = document.querySelector('.start-button');
var resetButton = document.querySelector('.reset-button');
var timerEl = document.querySelector('.timer-count');
var winsEl = document.querySelector('.win');
var lossesEl = document.querySelector('.lose');
var wordBlanksEl = document.querySelector('.word-blanks');

// Game variables
var wins, losses = 0;
var timeRemaining = 10;
var words = ["variable", "array", "modulus", "object", "function", "string", "boolean"];
var currentWordWithBlanks = [];
var currentWord = '';
var gameTimer;

init();

// Initialize the word guess game when the page loads.
function init() {
    retrieveWinCount();
    retrieveLossCount();
}

// Register a 'keydown' event that will check to see if the pressed key matches one of the letters in the word being guessed.
document.addEventListener('keydown', function (event) {
    var keyPressed = event.key.toLowerCase();
    var supportedKeys = 'abcdefghijklmnopqrstuvwxyz'.split('');

    if (supportedKeys.includes(keyPressed)) {
        checkLetter(keyPressed);
    }
});

// Check a guessed letter to see if it is in the word being guessed and if so, update the display.
function checkLetter(letter) {
    for (var i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter) {
            currentWordWithBlanks[i] = letter;
        }
    }

    wordBlanksEl.textContent = currentWordWithBlanks.join(' ');
    checkWin();
}

// Checks to see if the user has successfully guessed all the letters of the word.
function checkWin() {
    if (currentWordWithBlanks.join('') === currentWord) {
        clearInterval(gameTimer);
        win();
    }
}

// Register the click event handler for the Start button.
startButton.addEventListener('click', startGame);

// Starts a new word guess game.
function startGame() {
    startButton.disabled = true;
    initializeWord();
    startTimer();
}

// Picks the next word and initializes the display of "_" for the user to guess.
function initializeWord() {
    currentWordWithBlanks = [];
    currentWord = words[Math.floor(Math.random() * words.length)];
    for (var i = 0; i < currentWord.split('').length; i++) {
        currentWordWithBlanks.push('_');
    }
    wordBlanksEl.textContent = currentWordWithBlanks.join(' ');
}

// Starts the game timer.
function startTimer() {
    // Reset the timer
    timeRemaining = 10;
    timerEl.textContent = timeRemaining;

    // Start the timer
    gameTimer = setInterval(function () {
        timeRemaining--;
        timerEl.textContent = timeRemaining;

        // If the timer reaches 0, the user has lost.
        if (timeRemaining === 0) {
            clearInterval(gameTimer);
            lose();
        }
    }, 1000);
}

// Retrieves the locally stored win count and updates the display.
function retrieveWinCount() {
    wins = localStorage.getItem('wordGuessWinCount');
    if (wins === null) {
        wins = 0;
    }
    winsEl.textContent = wins;
}

// Update the win count on screen and persist the value into local storage.
function win() {
    wordBlanksEl.textContent = 'YOU WIN!! 🥇';
    wins++;
    winsEl.textContent = wins;
    localStorage.setItem('wordGuessWinCount', wins);
    startButton.disabled = false;
}

// Retrieves the locally stored loss count and updates the display.
function retrieveLossCount() {
    losses = localStorage.getItem('wordGuessLossCount');
    if (losses === null) {
        losses = 0;
    }
    lossesEl.textContent = losses;
}

// Update the loss count on screen and persist the value into local storage.
function lose() {
    wordBlanksEl.textContent = 'Game Over';
    losses++;
    lossesEl.textContent = losses;
    localStorage.setItem('wordGuessLossCount', losses);
    startButton.disabled = false;
}

// Add the click event handler for the Reset Score button.
resetButton.addEventListener('click', resetScore);

// Reset wins/losses
function resetScore() {
    wins = losses = 0;
    winsEl.textContent = wins;
    lossesEl.textContent = losses;
    localStorage.removeItem('wordGuessWinCount');
    localStorage.removeItem('wordGuessLossCount');
}
