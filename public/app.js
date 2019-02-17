/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls the dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
*/


var scores, roundScore, activePlayer, dice1, dice2, gamePlaying;
newGame();

function newGame() {
    // Reset scores
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    // Remove dice
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    // Reset player scores
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;

    // Reset player names and styles if calling newGame after win
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}
// Start new game
document.querySelector('.btn-new').addEventListener('click', newGame);

// Rolling the dice
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // Randomly generate number between 1 - 6
        dice1 = Math.floor(Math.random() * 6 , 1) + 1;
        dice2 = Math.floor(Math.random() * 6 , 1) + 1;

        // Show dice if first call since newGame()
        document.querySelector('.dice1').style.display = 'block';
        document.querySelector('.dice2').style.display = 'block';
        if ((dice1 === 1) || (dice2 === 1)) {
            nextPlayer();
        } else {
            // Update the player round score
            roundScore += dice1 + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
            document.querySelector('.dice1').src = 'dice-' + dice1 + '.png';
            document.querySelector('.dice2').src = 'dice-' + dice2 + '.png';
        }
    }
});

// Switch to the next player by resetting the round score for the current player and toggling the player display status
function nextPlayer() {
    roundScore = 0;
    // Set current player score to 0
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    // Remove current player 'active' class
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    // Switch players
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // Add 'active' class to other player
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    // Hide dice
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        var winningScore = document.querySelector('.winning-score').value;

        // Make sure winning score is set
        if (winningScore) {
            // Update scores
            scores[activePlayer] += roundScore;
            document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

            // Winner!
            if (scores[activePlayer] >= winningScore) {
                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                document.querySelector('.dice1').style.display = 'none';
                document.querySelector('.dice2').style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                // de-activate roll dice and hold buttons
                gamePlaying = false;
            } else {
                nextPlayer();
            }
        } else {
            alert("Please enter the winning score");
        }
    }
});




