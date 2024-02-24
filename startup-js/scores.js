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
        nameTdEl.textContent = score.name;
        scoreTdEl.textContent = score.score;
        dateTdEl.textContent = score.date;
  
        const rowEl = document.createElement('tr');
        rowEl.appendChild(positionTdEl);
        rowEl.appendChild(nameTdEl);
        rowEl.appendChild(scoreTdEl);
        rowEl.appendChild(dateTdEl);
  
        tableBodyEl.appendChild(rowEl);
      }
    } else {
      tableBodyEl.innerHTML = '<tr><td colSpan=4>Be the first to score</td></tr>';
    }
  }
  exampleScoresJson = '{ \
    "id" : 901, \
    "name" : { "first":"John", "middle":"K", "last":"Doe" }, \
    "phones" : [ {"type" : "home", "number" : "555‑3762" }, \
                 {"type" : "work", "number" : "555‑7242" }], \
    "lazy" : false, \
    "married" : null \
    } '
  localStorage.setItem("scores", 'exampleScoresJson');
  loadScores();