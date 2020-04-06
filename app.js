/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying;
var diceKeep1 = [],
    diceKeep2 = [];

var maxScore = 100;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        disableButton();
        //1.random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        // Manage the small dices

        for (i = 0; i <= 3; i++) {
            diceKeep1[3 - i] = diceKeep1[2 - i];
        }
        diceKeep1[0] = dice1;

        for (i = 0; i <= 3; i++) {
            diceKeep2[3 - i] = diceKeep2[2 - i];
        }
        diceKeep2[0] = dice2;


        //2. displyay resault 
        var diceDOM = document.querySelector('.dice1')
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice1 + '.png';
        var diceDOM = document.querySelector('.dice2')
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice2 + '.png';
        // display on a small dices
        if (diceKeep1[0] === 0 && diceKeep2 === [0]) {
            document.querySelector('.dice1-1').style.display = 'none';
            document.querySelector('.dice2-1').style.display = 'none';
        } else {
            var diceOneDOM = document.querySelector('.dice1-1');
            diceOneDOM.style.display = 'block';
            diceOneDOM.src = 'dice-' + diceKeep1[0] + '.png';
            var diceOneDOM = document.querySelector('.dice2-1');
            diceOneDOM.style.display = 'block';
            diceOneDOM.src = 'dice-' + diceKeep2[0] + '.png';

            if (diceKeep1[1] === 0 && diceKeep2[1] === 0) {
                document.querySelector('.dice1-2').style.display = 'none';
                document.querySelector('.dice2-2').style.display = 'none';
            } else {
                var diceOneDOM = document.querySelector('.dice1-2');
                diceOneDOM.style.display = 'block';
                diceOneDOM.src = 'dice-' + diceKeep1[1] + '.png';
                var diceOneDOM = document.querySelector('.dice2-2');
                diceOneDOM.style.display = 'block';
                diceOneDOM.src = 'dice-' + diceKeep2[1] + '.png';

                if (diceKeep1[2] === 0 && diceKeep2[2] === 0) {
                    document.querySelector('.dice1-3').style.display = 'none';
                    document.querySelector('.dice2-3').style.display = 'none';
                } else {
                    var diceOneDOM = document.querySelector('.dice1-3');
                    diceOneDOM.style.display = 'block';
                    diceOneDOM.src = 'dice-' + diceKeep1[2] + '.png';
                    var diceOneDOM = document.querySelector('.dice2-3');
                    diceOneDOM.style.display = 'block';
                    diceOneDOM.src = 'dice-' + diceKeep2[2] + '.png';

                    if (diceKeep1[3] === 0 && diceKeep2[3] === 0) {
                        document.querySelector('.dice1-4').style.display = 'none';
                        document.querySelector('.dice2-4').style.display = 'none';
                    } else {
                        var diceOneDOM = document.querySelector('.dice1-4');
                        diceOneDOM.style.display = 'block';
                        diceOneDOM.src = 'dice-' + diceKeep1[3] + '.png';
                        var diceOneDOM = document.querySelector('.dice2-4');
                        diceOneDOM.style.display = 'block';
                        diceOneDOM.src = 'dice-' + diceKeep2[3] + '.png';

                    }
                }
            }
        }
        //3. update the round score only if the rolled number is not a 1
        if (dice1 !== 1 || dice2 !== 1) {
            //add score
            roundScore += (dice1 + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            // if player gets double 6
            if (diceKeep1[0] === 6 && diceKeep2[0] === 6) {
                // reset current score to 0
                console.log(dice1, dice2);
                console.log("reset with double 6 ");
                roundScore = 0;
                scores[activePlayer] = 0;
                document.querySelector('#current-' + activePlayer).textContent = '0';
                // reset global score to 0
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
                nextPlayer();
            }
        } else {
            nextPlayer();
            console.log(dice1, dice2);
            console.log("reset with double 1");
        }
    }
});



document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //add current score to the global score
        scores[activePlayer] += roundScore;

        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]


        // check if player won the game

        if (scores[activePlayer] >= maxScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!!';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.dice1-1').style.display = 'none';
            document.querySelector('.dice1-2').style.display = 'none';
            document.querySelector('.dice1-3').style.display = 'none';
            document.querySelector('.dice1-4').style.display = 'none';
            document.querySelector('.dice2-1').style.display = 'none';
            document.querySelector('.dice2-2').style.display = 'none';
            document.querySelector('.dice2-3').style.display = 'none';
            document.querySelector('.dice2-4').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }

        //next player
        nextPlayer();
    }

})

function validate() {
    var x = document.forms["maxLimitForm"]["maxLimitValue"].value;
    if (isNaN(x) || x <= 0 || x > 1000) {
        alert("Must input numbers in range (1 to 1000)");
        return false;
    } else {
        maxScore = x;
        document.getElementById('maxScore').textContent = maxScore;
        document.getElementById('currentMaxScore').value = '100';
    }
}

function disableButton() {
    if (gamePlaying) {
        document.getElementById("scoreLimitBtn").disabled = true;
        document.getElementById("scoreLimitBtn").style.color = "#d1d1d1"
        document.getElementById('currentMaxScore').style.color = '#5555';
    } else {
        document.getElementById('scoreLimitBtn').disabled = false;
        document.getElementById("scoreLimitBtn").style.color = "#000000"
        
    }

}

function nextPlayer() {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

}
document.querySelector('.btn-new').addEventListener('click', init);

function init() {

    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    diceKeep1 = [0, 0, 0, 0];
    diceKeep2 = [0, 0, 0, 0];
    document.getElementById('scoreLimitBtn').disabled = false;
    document.getElementById("scoreLimitBtn").style.color = '';
    document.getElementById('currentMaxScore').style.color = '';
    // document.querySelector('.dice').style.display = 'none';
    // function btn() {
    // //do something
    // }
    // btn();
    document.getElementById('maxScore').textContent = maxScore;
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice1-1').style.display = 'none';
    document.querySelector('.dice1-2').style.display = 'none';
    document.querySelector('.dice1-3').style.display = 'none';
    document.querySelector('.dice1-4').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.querySelector('.dice2-1').style.display = 'none';
    document.querySelector('.dice2-2').style.display = 'none';
    document.querySelector('.dice2-3').style.display = 'none';
    document.querySelector('.dice2-4').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

}