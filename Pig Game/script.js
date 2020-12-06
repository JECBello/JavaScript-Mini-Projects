'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  // reset all values
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // player 1 starts, no dice roll so hide
  diceEl.classList.add('hidden');

  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

init();

// updates ui and switches active player
const switchPlayer = function (activePlayerEl) {
  currentScore = 0;
  activePlayerEl.textContent = currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // if game has finished, don't let function run
  if (!playing) {
    return;
  }
  // 1. Generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  let activePlayerEl = document.getElementById(`current--${activePlayer}`);

  // display dice roll
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // if dice roll is 1, switch players, else add to current value and update UI;
  if (dice !== 1) {
    currentScore += dice;
    activePlayerEl.textContent = currentScore;
  } else {
    switchPlayer(activePlayerEl);
  }
});

btnHold.addEventListener('click', function () {
  // if game has finished, don't let function run
  if (!playing) {
    return;
  }

  // get current player
  let activePlayerEl = document.getElementById(`current--${activePlayer}`);

  // update score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // if score >= threshold, current player wins, changes UI, and game state, hides dice
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.toggle('player--active');

    playing = false;
    diceEl.classList.add('hidden');
  } else {
    switchPlayer(activePlayerEl);
  }
});

// reset game
btnNew.addEventListener('click', init);
