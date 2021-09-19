"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting conditions

let scores, currentScore, activePlayer, playing, scoreLimit;

const init = () => {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;
	setTimeout(() => {
		if (typeof scoreLimit !== "number") {
			scoreLimit = prompt(
				"Enter a number to set the winning score (Default: 100)"
			);
			if (!scoreLimit) {
				scoreLimit = 100;
			}
		}
	}, 0.1);

	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;
	diceEl.classList.add("hidden");
	player0El.classList.remove("player--winner");
	player1El.classList.remove("player--winner");
	player0El.classList.add("player--active");
	player1El.classList.remove("player--active");
};

init();

const switchPlayer = () => {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0El.classList.toggle("player--active");
	player1El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", () => {
	if (playing) {
		const dice = Math.trunc(Math.random() * 6) + 1;

		diceEl.classList.remove("hidden");
		diceEl.src = `dice-${dice}.png`;
		if (dice !== 1) {
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;
		} else {
			switchPlayer();
		}
	}
});

btnHold.addEventListener("click", () => {
	if (playing) {
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer];

		if (scores[activePlayer] >= scoreLimit) {
			playing = false;
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove("player--active");
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add("player--winner");
			diceEl.classList.add("hidden");
		} else {
			switchPlayer();
		}
	}
});

btnNew.addEventListener("click", init);
