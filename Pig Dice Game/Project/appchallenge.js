/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// CHALLENGE

var scores, roundScore, activePlayer,diceRoll,previousRoll,gameState;

  initialise();

/* ----------------- Add button event for 'ROLL DICE' ---------------------- */

document.querySelector('.btn-roll').addEventListener('click',function() {
  if (gameState){
  //1. generate a random number
  diceRoll = Math.floor(Math.random() * 6) + 1;
  console.log('Dice rolls a ' + diceRoll);
  document.querySelector('.dice').style.display = 'block';
  document.querySelector('.dice').src = 'dice-' + diceRoll + '.png';

  //2. add scores. IF number is 1 : score beomes 0 and switch player
  if (diceRoll !== 1){
    if (previousRoll == 6 && diceRoll == 6){
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      previousRoll = 0;
      changePlayer();
    }
    else {
    roundScore += diceRoll;
    previousRoll = diceRoll;
    }
  }
  else { roundScore = 0 ;
        changePlayer();
  }

  //3. display result on id : 'current-0' box
  document.querySelector('#current-' + activePlayer).textContent = roundScore;
}
});


/* -------------------- Add button event for 'HOLD' ------------------------ */

document.querySelector('.btn-hold').addEventListener('click', function() {
if (gameState){
  //1. take roundsScore and add to final score
  scores[activePlayer] = scores[activePlayer] + roundScore;

  //2. display total score on box (id : score-0)
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  //read score to win box input
  var input = document.querySelector('.score-goal').value;
  var winningScore

  if (input){                     //if the input is empty/null/undefined , winning score default to 100.
    winningScore = input;
  }
  else {
    winningScore = 100;
  }

  //3. check if player wins the game (score goes 100 or above)
  if (scores[activePlayer] >= winningScore)
  {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
    gameState = false;

  }

  //4. switch to next player
  changePlayer();

  //5. reset round scores
  roundScore = 0;
}
});

/* ---------------- Add button event for 'NEW GAME' ------------------------ */

//Start new game with every score + text set to 0
document.querySelector('.btn-new').addEventListener('click', initialise);        // this makes it more tidy than to add function() to then call the initialise function.

/*-------------------------------*/
function changePlayer() {
  if (activePlayer === 0) {
      document.querySelector('#current-0').textContent = 0;
      activePlayer = 1;
      document.querySelector('.player-0-panel').classList.remove('active')
      document.querySelector('.player-1-panel').classList.add('active')
      document.querySelector('.dice').style.display = 'none';

    } else {
      document.querySelector('#current-1').textContent = 0;
      activePlayer = 0;
      document.querySelector('.player-1-panel').classList.remove('active')
      document.querySelector('.player-0-panel').classList.add('active')
      document.querySelector('.dice').style.display = 'none';

}
}

function initialise() {
  gameState = true;
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  diceRoll = 0;
  document.querySelector('.btn-hold').style.display = 'block';
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.querySelector('.player-1-panel').classList.remove('active')
  document.querySelector('.player-0-panel').classList.add('active')

}

/* YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
