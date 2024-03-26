

document.getElementById("nameDisplay").innerHTML = `${localStorage.getItem('userName')}`;

class Game {
    constructor(description, el) {
      this.dealt = [];
      this.house = [];
      this.hand = [];
      this.playerTurn = false;
    }

    startGame() {
        console.log("startgame called");
        if (this.playerTurn) {
            return;
        }
        if (!document.getElementById("stake").value) {
            document.querySelector('#gameInfo').innerHTML = '<p>Set a stake to start!</p>';
            return;
        }
        //todo: don't let them stake more than their balance, load balances as soon as page is opened
        if (this.getPlayerName() == null) {
            document.querySelector('#gameInfo').innerHTML = '<p>Log in to play!</p>';
            return;
        }
        if (localStorage.getItem(this.getPlayerName()) < document.getElementById("stake").value
                && document.getElementById("stake").value > 1) {
            document.querySelector('#gameInfo').innerHTML = '<p>You must set the stake to less than your balance (or 1)!</p>';
            return;
        }
        //clean up images from last game, if present
        const houseCards = document.querySelector('#houseCards');
        houseCards.innerHTML = ''; //remove house card images
        const playerCards = document.querySelector('#playerCards');
        playerCards.innerHTML = '';  //remove player card images

        document.getElementById('stake').readOnly = true;
        this.house.push(this.deal());
        this.house.push(this.deal());
        this.showHouseCards();
        document.querySelector('#gameInfo').innerHTML = '<p>Good luck!</p>';
        this.playerTurn = true;
        this.hit();
        this.hit();
        this.playerTurn = false;
        if (this.checkScore(this.house) == 21) {
          this.findWinner();
        }
        this.playerTurn = true;
    }

    //return a card and add it to 'dealt' - won't be returned again
    deal() {
        const card = Math.floor(Math.random() * 52);
        if (this.dealt.length >= 52) {
            throw new Error('Deck is empty!');
        }
        if (this.dealt.includes(card)) {
            return this.deal();
        }
        this.dealt.push(card);
        return card;
    }
    //cards are numbered 0-51, with suits being blocks of 13: spades, hearts, diamonds, clubs

    getCardImg(card) {
        var suit = Math.floor(card/13);
        switch (suit) {
            case 0:
                suit = 'S';
                break;
            case 1: 
                suit = 'H';
                break;
            case 2: 
                suit = 'D';
                break;
            case 3: 
                suit = 'C';
                break;
        }

        var value = card % 13;
        value += 1; //move index to 1-13
        var valueAbreviation;
        switch (value) {
            case 1:
                valueAbreviation = 'A';
                break;
            case 11:
                valueAbreviation = 'J';
                break;
            case 12:
                valueAbreviation = 'Q';
                break;
            case 13:
                valueAbreviation = 'K';
                break;
            default:
                valueAbreviation = value.toString();
        }

        var fileName = "./PNG/" + valueAbreviation + suit + ".png";
        return fileName;
    }

    showHit(dealt) {
        const playerCards = document.querySelector('#playerCards');
        var cardImage = this.getCardImg(dealt);
        playerCards.innerHTML = playerCards.innerHTML + `<img src="${cardImage}"/>`;
    }
 
    showHouseCards() {
        const houseCards = document.querySelector('#houseCards');
        houseCards.innerHTML = '<img id="houseCard1" alt="houseCard1" src="card_back.png"/>' +
                                '<img id="houseCard2" alt="houseCard2" src="card_back.png"/>'
    }

    declareWinner(playerWon, playerActiveParty, message, tieGame = false) {
        this.hand = [];
        this.house = [];
        this.dealt = [];

        //announce result
        if (playerActiveParty) {
            var activeParty = localStorage.getItem('userName');
        }
        else {
            var activeParty = 'House';
        }

        document.querySelector('#gameInfo').innerHTML =  `<p>${activeParty}${message}</p><p>Use the deal button to play again!</p>`;

        document.getElementById('stake').readOnly = false;
        const stake = document.getElementById("stake").value;
        var payout;
        if (tieGame) {
            payout = 0;
        }
        else if (playerWon) {
            payout = stake;
        }
        else {
            payout = -1 * stake;
        }

        this.updateBalance(payout);

        this.dealt = [];
        this.house = [];
        this.hand = [];
        console.log(playerWon);
    }

    checkScore(cards) {
        //for use with reduce, assumes suit has already been removed
        function sumCardValues(a, b) {
            if (b > 9) { // face cards
                return a + 10;
            }
            return a + b + 1; //cards are 0-indexed, so number 2 is the suit's 3
        }

        var hand = cards.map(x => x % 13); //suit doesn't matter
        var score = hand.reduce(sumCardValues, 0);
        var aces = hand.reduce(function (a, b) { //not actually needed here, use for checkScore
            return b === 0 ? a+1 : a;
        }, 0)

        while (aces > 0 && score <= 11) {
            aces--;
            score += 10;
        }

        return score;
    }

    hit() {
        if (!this.playerTurn) {
            return;
        }
        var dealt = this.deal();//give the player a card
        this.hand.push(dealt);
        this.showHit(dealt);
        if (this.checkScore(this.hand) > 21) {
            this.declareWinner(false, true, ' Busted');
            return;
        }
        if (this.checkScore(this.hand) === 21) {
            this.declareWinner(true, true, ' Blackjack!')
        }
    } 

    showStand() {
        const houseCards = document.querySelector('#houseCards');
        var house1 = this.getCardImg(this.house[0]);
        var house2 = this.getCardImg(this.house[1]);
        houseCards.innerHTML = `<img id="houseCard1" alt="houseCard1" src="${house1}"/> 
                                <img id="houseCard2" alt="houseCard2" src="${house2}"/>`
        //todo: html and css for the player standing - reveal dealer cards
    }

    showDealerHit(dealt) {
        const houseCards = document.querySelector('#houseCards');
        var cardImage = this.getCardImg(dealt);
        houseCards.innerHTML = houseCards.innerHTML + `<img src="${cardImage}"/>`;    
    }

    findWinner() {
        //player bust or blackjack is already handled
        var houseScore = this.checkScore(this.house);
        if (houseScore === 21) {
            declareWinner(false, ' Blackjack!')
            return;
        }
        if (houseScore > 21) {
            this.declareWinner(true, false, ' Busted!')
            return;
        }
        var playerScore = this.checkScore(this.hand);
        if (playerScore > houseScore) {
            this.declareWinner(true, true, ' won!')
            return;
        }
        if (playerScore < houseScore) {
            this.declareWinner(false, true, ' lost!')
            return;
        }
        if (playerScore === houseScore) {
            this.declareWinner(false, false, null, true);
            return;
        }
    }

      
    stand() {
        if (!this.playerTurn) {
            return;
        }
        this.playerTurn = false;
        this.showStand();
        sleep(1000).then(() => {this.dealerDraws()});    
    }

    dealerDraws() {
        if (this.checkScore(this.house) < 17) {
            const card = this.deal();
            this.house.push(card);
            this.showDealerHit(card);
            sleep(1000).then(() => {this.dealerDraws()});
        }
        else {
            this.findWinner();
        }
    }

    getPlayerName() {
        return localStorage.getItem('userName');
    }

    async updateBalance(score) {
        const userName = this.getPlayerName();
        const payout = {name: userName, payout: score};
    
        try {
          const response = await fetch('/api/score', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(payout),
          });
    
          // Store what the service gave us as the high scores
          const scores = await response.json();
          localStorage.setItem('scores', JSON.stringify(scores));
          localStorage.setItem(userName, playerScore);
        } catch {
          // If there was an error then just track scores locally... if I get around to it
          this.updateScoresLocal(newScore);
        }
      }
}

const game = new Game;

let scores = [];

// Get the latest high scores from the service
getScores();
async function getScores() {
    const response = await fetch('/api/scores');
    scores = await response.json();
    var playerScore = null;
    for (var i = 0; i < scores.length; i++) {
        if (scores[i].userName === game.getPlayerName()) {
            playerScore = scores[i].Balance;
        }
    }

    if (playerScore === null) {
        const userName = game.getPlayerName();
        const payout = {userName: userName, payout: 1};
    
        
          const response = await fetch('/api/score', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(payout),
          });
    
          // Store what the service gave us as the high scores
          const scores = await response.json();
          localStorage.setItem('scores', JSON.stringify(scores));
          localStorage.setItem(userName, playerScore);
        
    }

    // Save the player score to check that bet is legal
    localStorage.setItem(game.getPlayerName(), playerScore);
    localStorage.setItem('scores', JSON.stringify(scores));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

