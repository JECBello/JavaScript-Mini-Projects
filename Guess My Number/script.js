'use strict';

const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
const highscore = document.querySelector('.highscore');
const message = document.querySelector('.message');
const number = document.querySelector('.number');
const score = document.querySelector('.score');
const guess = document.querySelector('.guess');
const body = document.querySelector('body');

// let background;  // additional code for flashing effect;
let secretNumber;
let currentScore;
let highScore = 0;

reset();

function reset() {
  secretNumber = Math.round(Math.random() * 20);
  currentScore = 20;

  displayMessage("Good luck, buddy. You'll need it.");
  body.style.backgroundColor = '#222';
  checkButton.disabled = false;
  number.style.width = '15rem';
  number.textContent = '?';
  score.textContent = 20;
  guess.value = '';
  //   clearInterval(background);  // additional code for flashing effect
}

function displayMessage(text) {
  message.textContent = text;
}

checkButton.addEventListener('click', function () {
  const currentGuess = Number(guess.value);

  // No input or guess is incorrect
  if (!currentGuess || currentGuess !== secretNumber) {
    let messageContent = !currentGuess
      ? 'Why would you check without even making a guess?'
      : currentGuess > secretNumber
      ? 'Try again, be less ambitious this time.'
      : 'Try again, looks like you need higher standards.';

    displayMessage(messageContent);
    currentScore--;

    // correct guess
  } else if (currentGuess === secretNumber) {
    displayMessage('Nice job, I guess.');
    number.textContent = secretNumber;
    body.style.backgroundColor = '#eba834';
    number.style.width = '30rem';

    // New highscore
    if (currentScore > highScore) {
      highScore = currentScore;
      highscore.textContent = highScore;
    }
  }

  // too many incorrect guesses
  if (currentScore === 0) {
    displayMessage('HAHAHAHAHA, TOO BAD. YOU LOSE.');
    checkButton.disabled = true;

    body.style.backgroundColor = '#d94436';

    // additional code for flashing effect
    // background = setInterval(function () {
    //   console.log(body.style.backgroundColor);
    //   body.style.backgroundColor =
    //     body.style.backgroundColor == 'rgb(34, 34, 34)'
    //       ? 'rgb(250, 22, 22)'
    //       : 'rgb(34, 34, 34)';
    // }, 1500);
  }

  score.textContent = currentScore;
});

againButton.addEventListener('click', reset);
