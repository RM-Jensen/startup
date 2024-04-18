import React from 'react';
import './play.css';

export function Play() {
    class Game {
        
    }
  return (
    <main className='container-fluid bg-secondary text-center'>
        <div id="firstRowItems">
            <div id='updates'>
                <span id="playerMessages"></span>
                <span id="gameInfo">
                    <p>Set a stake and click deal to play!</p>
                </span>
            </div>
            <div id="deckAndInteraction">
                <p>click deck to hit</p>
                <img id="deck" alt="deck" src="card_back.png" onclick="game.hit()"/>
                <button onclick="game.stand()"> stand </button>
            </div>
                
            <form id="stakeForm" method="post" onsubmit="return false;">
                <label for="stake">Stake ($): </label>
                <input type="number" name="stake" id="stake" min="1" max="10" step="1" />
                <button onclick="game.startGame()">Deal</button>
            </form>

        </div>
            <ol id="houseCards">
            </ol>

            <ol id="playerCards">
            </ol>
    </main>
  );
}