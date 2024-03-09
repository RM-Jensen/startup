document.getElementById("nameDisplay").innerHTML = `${localStorage.getItem('userName')}`;

var exampleScoresJson =     '[{"Rank" : 1, "Player" : "John", "Balance" : 241},\
                        {"Rank" : 2, "Player" : "Dylan", "Balance" : 119},\
                        {"Rank" : 3, "Player" : "Steve", "Balance" : 6}]'

                        let scores = [];



async function loadScores() {
  // Get the latest high scores from the service
  const response = await fetch('/api/scores');
  scores = await response.json();
  // Save the scores in case we go offline in the future
  localStorage.setItem('scores', JSON.stringify(scores));    

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


  // mocking things
  loadScores();

  setInterval(() => {
    const score = Math.floor(Math.random() * 3000 - 1500);
    const chatText = document.querySelector('#peerNotifications');

    if (score < 0) {
      chatText.innerHTML =
      `<div class="event"><span class="player-event">Eich</span> just lost \$${score * -1}!</div>` +
      chatText.innerHTML;
    }
    else {
      chatText.innerHTML =
      `<div class="event"><span class="player-event">Eich</span> just won \$${score}!</div>` +
      chatText.innerHTML;
    }
  }, 5000);
  