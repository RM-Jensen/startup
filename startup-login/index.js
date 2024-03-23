const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);
console.log("reached end of index.js\n");

// GetScores
apiRouter.get('/scores', (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', (req, res) => {
  scores = updateScores(req.body, scores);
  res.send(scores);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });


  // updateScores considers a new score for inclusion in the high scores.
// The high scores are saved in memory and disappear whenever the service is restarted.
let scores = [];
function updateScores(payout, scores) {
    var found = false;
  for (score of scores) {
    if (payout.userName === score.userName) {
      score.Balance += payout.payout;
      found = true;
    }
  }
  if (!found && payout.payout > 0) {
    scores.push({Balance: payout.payout, userName: payout.userName});
  }

  scores.sort((a, b) => a.Balance - b.Balance);

  //TODO: THIS FOR LOOP IS TO SMART, MAKE IT STUPID
  for (var i = 1; i <= scores.length; i++) {
    scores[i-1].Rank = i;
  }

  return scores;
}
