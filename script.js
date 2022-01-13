'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //getElementId is also a another name of querySelector.. this doesn't need (#)id or (.)class at the beginning..
const current0El = document.getElementById('current--0'); // Current score of 1st player..
const current1El = document.getElementById('current--1'); // Current score of 2nd player..

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//Starting Conditions
  // when we are playing the boolean is set to be true..

const init = function () {
     scores = [0, 0];
     currentScore = 0;
     activePlayer = 0;
     playing = true;
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player1El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;  //reassigning the activePlayer here..
    currentScore = 0;
    player0El.classList.toggle('player--active');  // toggle() add the class if it is not there and if it is there it will remove it.
    player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        //1: Generating a random dice roll.
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        //2: Display Dice.
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`; //by this src and the inserted png folder and its names we can randomly roll the dice .. dice-1.png, dice-2.png etc. 
    
        //3: Check for Rolled 1: if true, switch to next.
        if (dice !== 1) {
            //Add the dice to the current score
            currentScore += dice;  //After a each roll of a dice the score will be added..
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;   //the active player will change accordingly
        } else {
            //Switch to next player
            switchPlayer();
       
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        //1.> Add current score to active player's score.
        scores[activePlayer] += currentScore;
        //scores[1]=scores[1]+currentscore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //2.> Check if player's score is >=100
        if (scores[activePlayer] >= 50) {
            //Finish the game
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');  //display message who will be the winner.
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            //Switch to the next player
            switchPlayer();
        }
    }    
});

btnNew.addEventListener('click', function () {
    init();
})
