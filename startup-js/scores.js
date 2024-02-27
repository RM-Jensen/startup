var exampleScoresJson =     '[{"Rank" : 1, "Player" : "John", "Balance" : 241},\
                        {"Rank" : 2, "Player" : "Dylan", "Balance" : 119},\
                        {"Rank" : 3, "Player" : "Steve", "Balance" : 6}]'

function loadScores() {
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }
  
    const tableBodyEl = document.querySelector('#balanceTable');
  
    if (scores.length) {
      for (const [i, score] of scores.entries()) {
        const positionTdEl = document.createElement('td');
        const nameTdEl = document.createElement('td');
        const scoreTdEl = document.createElement('td');
        const dateTdEl = document.createElement('td');
  
        positionTdEl.textContent = i + 1;
        nameTdEl.textContent = score.Player;
        scoreTdEl.textContent = score.Balance;
    //    dateTdEl.textContent = score.date;
  
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
  }

  localStorage.setItem("scores", exampleScoresJson);
  loadScores();