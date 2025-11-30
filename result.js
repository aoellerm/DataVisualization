// result.js
document.addEventListener('DOMContentLoaded', () => {
  const resultsRaw = localStorage.getItem('results'); // new format expected
  const winnerFallback = localStorage.getItem('winner'); // old format fallback

  const resultsInfo = {
    men: {
      title: "Men",
    },
    women: {
      title: "Women",
    },
    other: {
      title: "Other",
    }
  };

  const nameEl = document.getElementById('group-name');
  const descEl = document.getElementById('group-description');
  const detailsContainer = document.getElementById('results-details');

  // Helper to render a single group's block
  function renderGroupBlock(key, data) {
    const title = resultsInfo[key] ? resultsInfo[key].title : key;
    const desc = resultsInfo[key] ? resultsInfo[key].description : '';

    const total = data.total || 0;
    const posPct = (typeof data.posPct === 'number') ? data.posPct : 0;
    const negPct = (typeof data.negPct === 'number') ? data.negPct : 0;

    // A small HTML block containing title, description, percentages and a simple bar
    return `
      <div class="result-group">
        <h2 class="group-title">${title} <span class="small">(${total} words)</span></h2>
        <p class="pct-line">Positive: <strong>${posPct}%</strong> &nbsp; | &nbsp; Negative: <strong>${negPct}%</strong></p>

        <div class="bar">
          <div class="pos-bar" style="width:${posPct}%; height:100%;"></div>
        </div>
      </div>
    `;
  }

  // If we have the new 'results' object, render the detailed report
  if (resultsRaw) {
    let parsed;
    try {
      parsed = JSON.parse(resultsRaw);
    } catch (e) {
      parsed = null;
    }

    if (parsed && parsed.groups) {
      // show top (if provided)
        nameEl.textContent = "Quiz results";
      
      descEl.textContent = ''; // we'll show per-group descriptions below
        
      // build HTML for each group present in the parsed.groups
      let html = '<h3>Associations by group</h3>';
      Object.keys(parsed.groups).forEach(g => {
        html += renderGroupBlock(g, parsed.groups[g]);
      });

      // Insert the built HTML
      if (detailsContainer) detailsContainer.innerHTML = html;
    } else {
      // corrupted results fallback to winner behavior below (or show error)
      fallbackToWinner();
    }
  } else if (winnerFallback) {
    // Old behaviour: only a "winner" string stored
    fallbackToWinner();
  } else {
    // No data found at all
    nameEl.textContent = "No results found";
    descEl.textContent = "Take the quiz first.";
    if (detailsContainer) detailsContainer.innerHTML = '';
  }

  function fallbackToWinner() {
    const winner = winnerFallback;
    if (winner && resultsInfo[winner]) {
      nameEl.textContent = winner;
      descEl.textContent = resultsInfo[winner].description;
    } else if (winner) {
      // unknown winner string
      nameEl.textContent = winner;
      descEl.textContent = '';
    } else {
      nameEl.textContent = "Womp Womp";
      descEl.textContent = "We couldn't find your result.";
    }
    if (detailsContainer) detailsContainer.innerHTML = ''; // no detailed per-group view available
  }
});

//restart function
function restartQuiz() {
  window.location.href = 'quiz.html';
}
