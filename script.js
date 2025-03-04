const words = ["apple", "grape", "peach", "mango", "berry", "lemon", "melon", "plumb", "cherry", "guava", "aback", "games", "cloud", "daisy", "baron", "years", "glass", "ghost", "fairy", "knife", "crown","daily", "goals", "ultra", "pasta", "sigma", "black", "white", "vodka", "rival", "actor", "blink", "exist", "cheat", "fancy", "grace", "faith", "race", "scram", "curse", "close"];
let selectedWord = '';
let guessedLetters = [];
let wrongAttempts = 0;
const maxAttempts = 5;

const wordDisplay = document.querySelector('.user-input-section');
const hangmanImage = document.querySelector('.hangman-box img');
const keyboard = document.querySelector('.keyboard');
const gameResult = document.querySelector('.game-result');
const gameMessage = gameResult.querySelector('p');
const playAgainButton = gameResult.querySelector('.play-again');
const guessesText = document.querySelector('.guesses-text b');

// Start a new game
function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongAttempts = 0;
    
    // Reset hangman image
    hangmanImage.src = `sprites/0.png`;
    
    // Reset word display
    wordDisplay.innerHTML = selectedWord.split('').map(() => '<span class="letter">_</span>').join('');
    
    // Reset guesses text
    guessesText.textContent = `0 / ${maxAttempts}`;
    
    // Hide game result box
    gameResult.style.display = 'none';
}

// Update word display
function updateWordDisplay() {
    const letters = wordDisplay.querySelectorAll('.letter');
    selectedWord.split('').forEach((letter, index) => {
        if (guessedLetters.includes(letter)) {
            letters[index].textContent = letter;
        }
    });
}

// Check game status
function checkGameStatus() {
    if (wrongAttempts >= maxAttempts) {
        gameMessage.innerHTML = `Game Over! The correct word was: <b>${selectedWord}</b>`;
        gameResult.style.display = 'flex';
    } else if (!wordDisplay.textContent.includes('_')) {
        gameMessage.innerHTML = 'Congratulations! You guessed the word!';
        gameResult.style.display = 'flex';
    }
}

// Handle letter guess
function handleGuess(letter) {
    if (guessedLetters.includes(letter) || wrongAttempts >= maxAttempts) return;

   if (selectedWord.includes(letter)) {
    guessedLetters.push(letter);

} else {
    if (wrongAttempts < maxAttempts - 1) { 
        wrongAttempts++; 
        hangmanImage.src = `sprites/${wrongAttempts}.png`;
    } else {
        wrongAttempts++;
        hangmanImage.src = `sprites/${wrongAttempts}.png`;
        gameMessage.innerHTML = `Game Over! The correct word was: <b>${selectedWord}</b>`;
        gameResult.style.display = 'flex';
    }
    guessesText.textContent = `${wrongAttempts} / ${maxAttempts}`;
}




    updateWordDisplay();
    checkGameStatus();
}

// Attach event listeners to keyboard buttons
keyboard.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        handleGuess(event.target.textContent);
    }
});

// Restart game when play again is clicked
playAgainButton.addEventListener('click', startGame);

// Initialize game
startGame();
