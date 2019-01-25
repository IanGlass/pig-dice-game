# Pig-Dice-Game


#### HTML

Explain HTML

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
            
            <img src="dice-5.png" alt="Dice" class="dice">
        </div>
        
        <script src="app.js"></script>
    </body>
</html>
```

<p align="center">
<img src="https://github.com/IanGlass/Pig-Dice-Game/blob/master/Game_Start.png" width="700">
</p>


#### New Game

Explain code

```javascript
function newGame() {
    // Reset scores
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    // Remove dice
    document.querySelector('.dice').style.display = 'none';

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

Explain functionlity from user

<p align="center">
<img src="https://github.com/IanGlass/Pig-Dice-Game/blob/master/Roll_Dice.png" width="700">
</p>

Explain code

```javascript
// Rolling the dice
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // Randomly generate number between 1 - 6
        dice = Math.floor(Math.random() * 6 , 1) + 1;

        // Show dice if first call since newGame()
        document.querySelector('.dice').style.display = 'block';
        if (dice === 1) {
            nextPlayer();
        } else {
            // Update the player round score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
            document.querySelector('.dice').src = 'dice-' + dice + '.png';
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
    document.querySelector('.dice').style.display = 'none';
}
```



#### Hold

Explain how hold and win works from user

<p align="center">
<img src="https://github.com/IanGlass/Pig-Dice-Game/blob/master/Win.png" width="700">
</p>

Explain code

```javascript
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Update scores
        scores[activePlayer] += roundScore;
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        // Winner!
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            // de-activate roll dice and hold buttons
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});
```














