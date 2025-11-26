// updated DOM
document.addEventListener('DOMContentLoaded', () => {
    // Start the quiz when page loads
    showAllQuestions(); //shows all questions (wow !)
});


const quiz = [ //questions in question, in this case each question choice is linked to a group
    {
      question: "To what gender do you associate the word logical:", polarity: "positive", //positive
      answers: [
        { text: "Men", group: "men" },
        { text: "Women", group: "women" },
        { text: "Other", group: "other" },
      ]
    },
    {
      question: "To what gender do you associate the word wise:", polarity: "positive", //positive
      answers: [
        { text: "Men", group: "men" },
        { text: "Women", group: "women" },
        { text: "Other", group: "other" },
      ]
    },
    {
      question: "To what gender do you associate the word competent:", polarity: "positive", //positive
      answers: [
        { text: "Men", group: "men" },
        { text: "Women", group: "women" },
        { text: "Other", group: "other" },
      ]
    },
    {
      question: "To what gender do you associate the word creative:", polarity: "positive", //positive
      answers: [
        { text: "Men", group: "men" },
        { text: "Women", group: "women" },
        { text: "Other", group: "other" },
      ]
      },
      {
      question: "To what gender do you associate the word irresponsible:", polarity: "negative",//negative
      answers: [
        { text: "Men", group: "men" },
        { text: "Women", group: "women" },
        { text: "Other", group: "other" },
        ]
      },
      {
      question: "To what gender do you associate the word frivolous:", polarity: "negative",//negative
      answers: [
        { text: "Men", group: "men" },
        { text: "Women", group: "women" },
        { text: "Other", group: "other" },
      ]
      },
      {
      question: "To what gender do you associate the word sensitive:", polarity: "negative",//negative
      answers: [
        { text: "Men", group: "men" },
        { text: "Women", group: "women" },
        { text: "Other", group: "other" },
      ]
      },
       {
      question: "To what gender do you associate the word emotional:", polarity: "negative", //negative
      answers: [
        { text: "Men", group: "men" },
        { text: "Women", group: "women" },
        { text: "Other", group: "other" },
      ]
    }
  ];
  
 
  let userAnswers = []; //saves answers 
  
  function showAllQuestions() {
    const questionEl = document.getElementById('question'); // yoinks the question div id from html
    questionEl.innerHTML = ''; // Clears old content

    quiz.forEach((q, questionIndex) => { // loops through each quiz question
        const questionDiv = document.createElement('div'); // makes new div tag for memory
        questionDiv.className = 'question'; // sets new div to the question styling using css 
        questionDiv.id = `question${questionIndex + 1}`; //gives unique id to each question container

// $q pulls question string from the quiz, builds the visual structure for the quiz questions
//answer-container gives placehold for answer selections
  questionDiv.innerHTML = ` 
 <div class="small-box">
  <h2>${q.question}</h2> 
 </div>
 <div id="answers-container-${questionIndex}" class="answers-container"></div>
 `; 

 const answersContainer = questionDiv.querySelector('.answers-container'); 
 
 q.answers.forEach(answer => {
  const btn = document.createElement('button');
 btn.className = 'answer-button';
 btn.textContent = answer.text; //places the answer text into each button

  btn.onclick = function() {
  // Removes the selected stuff from the answer
 answersContainer.querySelectorAll('.answer-button').forEach(b => {
  b.classList.remove('selected');
 }); 
 // Add selected to selected answer. Basically makes sure only one answer in the group can be highlighted and selected at a time
 btn.classList.add('selected');
userAnswers[questionIndex] = answer.group; // this saves the answer and updates userAnswers
 };
 answersContainer.appendChild(btn);
 });

 questionEl.appendChild(questionDiv);
  });

    // Add a submit button at the bottom also linked with css aand html
    const wrapper = document.createElement('div');
    wrapper.className = 'submit-wrapper';

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Quiz';
    submitButton.className = 'submit-button';
    submitButton.onclick = showResults;

    wrapper.appendChild(submitButton);
    questionEl.appendChild(wrapper);
}
function selectAnswer(group) {
    userAnswers.push(group);
    currentQuestion++;
  
    if (currentQuestion < quiz.length) {
      showAllQuestions();
    } else {
      showResults();
    }
  }
  
  function showResults() {
  // validation
  if (userAnswers.length < quiz.length || userAnswers.includes(undefined)) {
    alert("Please answer all questions!");
    return;
  }

  // initialize groups
  const groups = {
    men:   { pos: 0, neg: 0, total: 0 },
    women: { pos: 0, neg: 0, total: 0 },
    other: { pos: 0, neg: 0, total: 0 }
  };

  // tally answers using question polarity
  quiz.forEach((q, i) => {
    const chosenGroup = userAnswers[i]; // "men" / "women" / "other"
    if (!chosenGroup || !groups[chosenGroup]) return; // defensive
    if (q.polarity === 'positive') {
      groups[chosenGroup].pos += 1;
    } else if (q.polarity === 'negative') {
      groups[chosenGroup].neg += 1;
    }
    groups[chosenGroup].total += 1;
  });

  // compute percentages
  const results = {};
  Object.keys(groups).forEach(g => {
    const { pos, neg, total } = groups[g];
    if (total === 0) {
      results[g] = { posPct: 0, negPct: 0, total: 0 };
    } else {
      let posPct = Math.round((pos / total) * 100);
      let negPct = Math.round((neg / total) * 100);
      const adjust = 100 - (posPct + negPct);
      // apply rounding adjustment to the larger side to keep it intuitive
      if (adjust !== 0) {
        if (pos >= neg) posPct += adjust;
        else negPct += adjust;
      }
      results[g] = { posPct, negPct, total };
    }
  });

  // pick top group: highest posPct, tie-breaker by total counts
  let top = null;
  Object.keys(results).forEach(g => {
    if (!top) { top = g; return; }
    const a = results[g], b = results[top];
    if (a.posPct > b.posPct || (a.posPct === b.posPct && a.total > b.total)) top = g;
  });

  // save results (new format) and winner fallback (old format), then redirect
  localStorage.setItem('results', JSON.stringify({ groups: results, top }));
  if (top) localStorage.setItem('winner', top);
  window.location.href = 'result.html';
}
