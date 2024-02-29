function startGame() {
    //todo: lock stake, hide 'deal' button, create game, pass to the other two buttons
}


class Game {
    constructor(description, el) {
      this.dealt = [];
      this.house = [];
      this.hand = [];
    }

    startGame() {
        this.house.push(this.deal());
        this.house.push(this.deal());
        this.showHouseCards();
        document.querySelector('#gameInfo').innerHTML = '<p>Good luck!</p>';
        this.hit();
        this.hit();
        if (this.checkScore(this.house) == 21) {
          this.findWinner();
        }
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
        //todo: html and css for player getting a card
    }
 
    showHouseCards() {
        const houseCards = document.querySelector('#houseCards');
        houseCards.innerHTML = '<img id="houseCard1" alt="houseCard1" src="card_back.png"/>' +
                                '<img id="houseCard2" alt="houseCard2" src="card_back.png"/>'
    }

    declareWinner(playerWon, message, tieGame = false) {
        //todo: html and css to show the game result
        //todo: record game result in memory
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
        var dealt = this.deal();//give the player a card
        this.hand.push(dealt);
        this.showHit(dealt);
        if (this.checkScore(this.hand) > 21) {
            this.declareWinner(false, ' Busted');
            return;
        }
        if (this.checkScore(this.hand) === 21) {
            this.declareWinner(true, ' Blackjack!')
        }
    }

    showStand() {
        //todo: html and css for the player standing - reveal dealer cards
    }

    showDealerHit(dealt) {
        //todo: html and css for player getting a card
    }

    findWinner() {
        //player bust or blackjack is already handled
        var houseScore = this.checkScore(this.house);
        if (houseScore === 21) {
            declareWinner(false, ' Blackjack!')
            return;
        }
        if (houseScore > 21) {
            this.declareWinner(True, ' survived! (house busted)')
            return;
        }
        var playerScore = this.checkScore(this.hand);
        if (playerScore > houseScore) {
            this.declareWinner(True, ' won!')
            return;
        }
        if (playerScore < houseScore) {
            this.declareWinner(false, ' lost!')
            return;
        }
        if (playerScore === houseScore) {
            this.declareWinner(false, null, True);
            return;
        }
    }

    stand() {
        this.showStand();
        while (this.checkScore(this.house) < 17) {
            const card = this.deal();
            this.house.push(card);
            this.showDealerHit(card);
        }        
        this.findWinner();
    }

}

const game = new Game;