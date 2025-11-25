const winner = localStorage.getItem('winner');

const resultsInfo = {
  Got7: {
    description: "You're full of energy and love a good beat!",
  },
  IDLE: {
    description: "You're fierce, fabulous, and stylish!",
  },
  SEVENTEEN: {
    description: "You love creativity and funky music!",
  },
  TWICE: {
    description: "You bring sunshine and smiles wherever you go!",
  }
};

if (winner && resultsInfo[winner]) {
  document.getElementById('group-name').textContent = winner;
  document.getElementById('group-description').textContent = resultsInfo[winner].description;
} else {
  document.getElementById('group-name').textContent = "Womp Womp";
  document.getElementById('group-description').textContent = "We couldn't find your result.";
} // little error thing just in case, I was running into issues for a bit so I made it for testing purposes.

function restartQuiz() {
  window.location.href = 'start.html';
}