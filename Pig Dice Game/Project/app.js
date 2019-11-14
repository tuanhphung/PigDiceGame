/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// CHALLENGE

var scores, roundScore, activePlayer, diceRoll;

  initialise();

/* ----------------- Add button event for 'ROLL DICE' ---------------------- */

document.querySelector('.btn-roll').addEventListener('click',function() {

  //1. generate a random number
  diceRoll = Math.floor(Math.random() * 6) + 1;
  console.log('Dice rolls a ' + diceRoll);
  document.querySelector('.dice').style.display = 'block';
  document.querySelector('.dice').src = 'dice-' + diceRoll + '.png';

  //2. add scores. IF number is 1 : score beomes 0 and switch player
  if (diceRoll !== 1){
    roundScore = roundScore + diceRoll;
  }
  else { roundScore = 0 ;
        changePlayer();
  }

  //3. display result on id : 'current-0' box
  document.querySelector('#current-' + activePlayer).textContent = roundScore;
});


/* -------------------- Add button event for 'HOLD' ------------------------ */

document.querySelector('.btn-hold').addEventListener('click', function() {

  //1. take roundsScore and add to final score
  scores[activePlayer] = scores[activePlayer] + roundScore;

  //2. display total score on box (id : score-0)
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  //3. check if player wins the game (score goes 100 or above)
  if (scores[activePlayer] >= 100)
  {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
    document.querySelector('.btn-hold').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';

  }

  //4. switch to next player
  changePlayer();

  //5. reset round scores
  roundScore = 0;

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

  document.querySelector('.player-1-panel').classList.remove('active')
  document.querySelector('.player-0-panel').classList.add('active')

}
