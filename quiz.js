// updated DOM
document.addEventListener('DOMContentLoaded', () => {
    // Start the quiz when page loads
    showAllQuestions(); //shows all questions (wow !)
});


const quiz = [ //questions in question, in this case each question choice is linked to a group
    {
      question: "Pick a vacation spot:",
      answers: [
        { text: "Tokyo", group: "Got7" },
        { text: "Chicago", group: "IDLE" },
        { text: "Bangkok", group: "SEVENTEEN" },
        { text: "Seoul", group: "TWICE" }
      ]
    },
    {
      question: "Pick a color:",
      answers: [
        { text: "Green", group: "Got7" },
        { text: "Red", group: "IDLE" },
        { text: "Blue", group: "SEVENTEEN" },
        { text: "Magenta", group: "TWICE" }
      ]
    },
    {
      question: "Pick a snack:",
      answers: [
        { text: "Beef Jerkey", group: "Got7" },
        { text: "Tangerines", group: "IDLE" },
        { text: "Ice Cream", group: "SEVENTEEN" },
        { text: "Raspberries", group: "TWICE" }
      ]
    },
    {
        question: "Pick a flower:",
        answers: [
          { text: "Daisy", group: "Got7" },
          { text: "Orchid", group: "IDLE" },
          { text: "Hibiscus", group: "SEVENTEEN" },
          { text: "Carnation", group: "TWICE" }
        ]
      },
      {
        question: "Pick a hobby:",
        answers: [
          { text: "Dancing", group: "Got7" },
          { text: "Art", group: "IDLE" },
          { text: "Watching Movies", group: "SEVENTEEN" },
          { text: "Baking", group: "TWICE" }
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
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Quiz';
    submitButton.className = 'submit-button';
    submitButton.onclick = showResults;
    questionEl.appendChild(submitButton);
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
    if (userAnswers.length < quiz.length || userAnswers.includes(undefined)) {
      alert("Please answer all questions!");
      return;
    }
    const tally = {}; //keeps track of each groups tally/selection amount
    userAnswers.forEach(group => {
      tally[group] = (tally[group] || 0) + 1;
    });

    // Find highest scoring group
  const max = Math.max(...Object.values(tally));
  const winners = Object.keys(tally).filter(group => tally[group] === max);

  // Choose a random winner if there's a tie
  const winner = winners[Math.floor(Math.random() * winners.length)];

  localStorage.setItem('winner', winner);
  window.location.href = 'result.html';

}