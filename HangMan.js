const wordList = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape', 'kiwi'];
const maxAttempts = 6;

let selectedWord;
let wordInProgress;
let incorrectGuesses;
let attempts;

function startGame() {
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    wordInProgress = '_'.repeat(selectedWord.length);
    incorrectGuesses = [];
    attempts = 0;

    document.getElementById('word').innerText = wordInProgress;
    document.getElementById('guesses').innerText = 'Incorrect guesses: ';
    document.getElementById('message').innerText = '';

    updateHangman(attempts);
}

const letters = document.querySelectorAll('.letter');
letters.forEach((letter) => {
    letter.addEventListener('touchstart', (event) => {
        event.preventDefault();
        const touchedLetter = event.target.innerText;
        guessLetter(touchedLetter);
    });
});

function updateHangman(attempts) {
    const hangmanParts = ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];
    hangmanParts.forEach((part, index) => {
        document.getElementById(part).style.visibility = index < attempts ? 'visible' : 'hidden';
    });
}

document.addEventListener('keydown', (event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        const letter = event.key.toLowerCase();

        if (selectedWord.includes(letter)) {
            for (let i = 0; i < selectedWord.length; i++) {
                if (selectedWord[i] === letter) {
                    wordInProgress = wordInProgress.substr(0, i) + letter + wordInProgress.substr(i + 1);
                }
            }
            document.getElementById('word').innerText = wordInProgress;
        } else if (!incorrectGuesses.includes(letter)) {
            incorrectGuesses.push(letter);
            attempts++;
            document.getElementById('guesses').innerText = 'Incorrect guesses: ' + incorrectGuesses.join(', ');
            updateHangman(attempts);
        }

        if (wordInProgress === selectedWord) {
            document.getElementById('message').innerText = 'Congratulations! You won!';
        } else if (attempts >= maxAttempts) {
            document.getElementById('message').innerText = 'Game over. The word was: ' + selectedWord;
        }
    }
});

document.getElementById('restart').addEventListener('click', startGame);

startGame();
