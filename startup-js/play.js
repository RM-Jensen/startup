function startGame() {
    //todo: lock stake, hide 'deal' button, create game, pass to the other two buttons
}


class Game {
    constructor(description, el) {
      this.dealt = [];
      this.house = [];
      this.hand = [];
    }

    //return a card and add it to 'dealt' - won't be returned again
    deal() {
        const card = Math.floor(Math.random() * 52);
    }
    //cards are numbered 0-51, with suits being blocks of 13: spades, hearts, diamonds, clubs

    hit() {
        dealt = this.deal();//give the player a card
        this.hand.push(dealt);
        showHit(dealt);
        if (checkBust(this.hand)) {
            this.endGame(false, ' busted');
        }
    }

    showHit() {
        //todo: html and css for player getting a card
    }

    stand() {
        showStand();
        houseLogic();
        endGame();
    }

    showStand() {
        //todo: html and css for the player standing - reveal dealer cards
    }

    houseLogic() {
        //todo: conditional recursive call to keep giving dealer cards and showing
    }

    showDealerHit() {
        //todo: html and css for player getting a card
    }

    endGame() {
        //todo: determine winner
    }

    declareWinner(playerWon, message) {
        //todo: html an
    }
}