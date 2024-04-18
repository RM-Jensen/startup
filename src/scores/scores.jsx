import React from 'react';
import './scores.css';

export function Scores() {
    const [scores, setScores] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/scores')
          .then((response) => response.json())
          .then((scores) => {setScores(scores);});
      }, []);
    
  /*  async function loadScores() {
        const tableBodyEl = document.querySelector('#balanceTable');
        
        if (scores.length) {
            for (const [i, score] of scores.entries()) {
            const positionTdEl = document.createElement('td');
            const nameTdEl = document.createElement('td');
            const scoreTdEl = document.createElement('td');
            const dateTdEl = document.createElement('td');
        
            positionTdEl.textContent = i + 1;
            nameTdEl.textContent = score.userName;
            scoreTdEl.textContent = score.score;
        
            const rowEl = document.createElement('tr');
            rowEl.appendChild(positionTdEl);
            rowEl.appendChild(nameTdEl);
            rowEl.appendChild(scoreTdEl);
        //    rowEl.appendChild(dateTdEl);
        
            tableBodyEl.appendChild(rowEl);
            }
        } else {
            tableBodyEl.innerHTML = '<tr><td colSpan=4>Be the first to score</td></tr>';
        }
    }*/
        
  return (
    <main className='container-fluid bg-secondary text-center'>
        <div id="balanceTableItems">
        <h1> Balances</h1>
        <table id="balanceTable">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
                {scores.map((score, i) => {
                    return (
                        <tr>
                        <td>{i}</td>
                        <td>{score.userName}</td>
                        <td>{score.score}</td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    </main>
  );
}