const wordList = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape', 'kiwi', 'orange', 'watermelon', 'pear', 'pawpaw', 'pineapple'];
const maxAttempts = 6;

let selectedWord;
let wordInProgress;
let incorrectGuesses;
let attempts;

const wordElement = document.getElementById('word');
const guessesElement = document.getElementById('guesses');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart');
const keyboardElement = document.getElementById('keyboard');

function startGame() {
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    wordInProgress = '_'.repeat(selectedWord.length);
    incorrectGuesses = [];
    attempts = 0;

    wordElement.textContent = wordInProgress;
    guessesElement.textContent = 'Incorrect guesses: ';
    messageElement.textContent = '';

    updateHangman(attempts);
    createVirtualKeyboard();
}

function updateHangman(attempts) {
    const hangmanParts = ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];
    hangmanParts.forEach((part, index) => {
        document.getElementById(part).style.visibility = index < attempts ? 'visible' : 'hidden';
    });
}

function guessLetter(letter) {
    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                wordInProgress = wordInProgress.substr(0, i) + letter + wordInProgress.substr(i + 1);
            }
        }
        wordElement.textContent = wordInProgress;
    } else if (!incorrectGuesses.includes(letter)) {
        incorrectGuesses.push(letter);
        attempts++;
        guessesElement.textContent = 'Incorrect guesses: ' + incorrectGuesses.join(', ');
        updateHangman(attempts);
    }

    if (wordInProgress === selectedWord) {
        messageElement.textContent = 'Congratulations! You won!';
    } else if (attempts >= maxAttempts) {
        messageElement.textContent = 'Game over. The word was: ' + selectedWord;
    }
}

function createVirtualKeyboard() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    keyboardElement.innerHTML = '';

    for (const letter of letters) {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => guessLetter(letter.toLowerCase()));
        keyboardElement.appendChild(button);
    }
}

document.addEventListener('keydown', (event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        const letter = event.key.toLowerCase();
        guessLetter(letter);
    }
});

restartButton.addEventListener('click', startGame);

startGame();
