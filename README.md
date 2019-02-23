# Pig-Dice-Game
Pig is a simple turn based dice game played between two players. The objective is to be the first player with a cumulative score of 100 or greater. The rules are as follows:
* The active player can roll the dice as many times as they likes, which increases their round score by the number shown on the dice;
* The player can push hold which will increase their total score by their round score and change to the next player's turn;
* However, if the player rolls a 1, they lose their current round score and it becomes the other player's turn.

<p align="center">
https://pig-dice.herokuapp.com/
</p>

<p align="center">
<img src="https://github.com/IanGlass/Pig-Dice-Game/blob/master/Game_Start.png" width="700">
</p>


#### HTML

The board is divided into 6 blocks:
* A block to contain the name, round score and total score for each of the players (```<div class="player-0-panel">```). The ```.active``` class is used to display the current player with a red dot and a grey background;
* A button to initiate a new game (```<button class="btn-new"><i class="ion-ios-plus-outline"></i>New game</button>```);
* A button to roll the dice of the current player (```<button class="btn-roll"><i class="ion-ios-loop"></i>Roll dice</button>```);
* A button to hold the current player's round score and add it to their total score (```<button class="btn-hold"><i class="ion-ios-download-outline"></i>Hold</button>```);
* A block to display each of the two dice and their current roll (```<img src="dice-5.png" alt="Dice" class="dice">```).

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css?family=Lato:100,300,600" rel="stylesheet" type="text/css">
        <link href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
        <link type="text/css" rel="stylesheet" href="style.css">
        
        <title>Pig Game</title>
    </head>

    <body>
        <div class="wrapper clearfix">
            <div class="player-0-panel active">
                <div class="player-name" id="name-0">Player 1</div>
                <div class="player-score" id="score-0">0</div>
                <div class="player-current-box">
                    <div class="player-current-label">Current</div>
                    <div class="player-current-score" id="current-0">0</div>
                </div>
            </div>
            
            <div class="player-1-panel">
                <div class="player-name" id="name-1">Player 2</div>
                <div class="player-score" id="score-1">0</div>
                <div class="player-current-box">
                    <div class="player-current-label">Current</div>
                    <div class="player-current-score" id="current-1">0</div>
                </div>
            </div>
            
            <button class="btn-new"><i class="ion-ios-plus-outline"></i>New game</button>
            <button class="btn-roll"><i class="ion-ios-loop"></i>Roll dice</button>
            <button class="btn-hold"><i class="ion-ios-download-outline"></i>Hold</button>
            
            <img src="dice-5.png" alt="Dice" class="dice dice1">
            <img src="dice-5.png" alt="Dice" class="dice dice2">

            <input type="text" class="winning-score" placeholder="Winning Score"></input>
        </div>
        
        <script src="app.js"></script>
    </body>
</html>
```

#### New Game

The ```newGame()``` function resets the global scores (```scores```) for both players and the round score. It also sets the current player to player 1, removes the dice from displaying. This function is called when the script starts up and when the 'New game' button is pushed.

```javascript
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
```

#### Rolling the dice

The state variable ```gamePlaying``` is used to deactivate button functionality when a win even occurs. When the 'Roll dice' button is pushed, the current ```dice``` value is generated from a random number generator and scaled to be between 1 and 6. If the number is 1, the game switches to the next player. If the number is not 1, the current round score is increased and the dice image is updated appropriately.

<p align="center">
<img src="https://github.com/IanGlass/Pig-Dice-Game/blob/master/Roll.png" width="700">
</p>

```javascript
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
```

The ```nextPlayer()``` function first resets the current player round score to zero and then switches the ```activePlayer``` variable. The current player display is also updated by adding the ```.active``` class.

```javascript
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
```

#### Hold

Like the 'Roll' button, the 'Hold' button uses the state variable ```gamePlaying``` to determine if it should execute. If the ```winningScore``` has been set, the 'Hold' button first updates the current player's total score and then checks if the current player has met the win condition. If the win condition has been met, the current player html block is updated, otherwise the ```nextPlayer()``` function is executed. If the ```winningScore``` has not been set, an alert is triggered instructing the players to enter a ```winningScore```.

<p align="center">
<img src="https://github.com/IanGlass/Pig-Dice-Game/blob/master/Win.png" width="700">
</p>

```javascript
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
```














