const winner = localStorage.getItem('winner');

const resultsInfo = {
  Got7: {
    description: "You're full of energy and love a good beat!",
    image: "Got7.jpg"
  },
  IDLE: {
    description: "You're fierce, fabulous, and stylish!",
    image: "Idle.jpg"
  },
  SEVENTEEN: {
    description: "You love creativity and funky music!",
    image: "SEVENTEEN.jpg"
  },
  TWICE: {
    description: "You bring sunshine and smiles wherever you go!",
    image: "TWICE.jpg"
  }
};

if (winner && resultsInfo[winner]) {
  document.getElementById('group-name').textContent = winner;
  document.getElementById('group-description').textContent = resultsInfo[winner].description;
  document.getElementById('group-image').src = resultsInfo[winner].image;
} else {
  document.getElementById('group-name').textContent = "Womp Womp";
  document.getElementById('group-description').textContent = "We couldn't find your result.";
  document.getElementById('group-image').src = 'sad.jpg'
} // little error thing just in case, I was running into issues for a bit so I made it for testing purposes.

function restartQuiz() {
  window.location.href = 'start.html';
}