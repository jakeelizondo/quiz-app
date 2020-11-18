/**
 * store structure
 */
'use strict';

const store = {
  // 5 or more questions are required
  questions: [
    {
      question:
        'Select the Pokemon below that was a Generation 1 starter option',
      answers: ['Turtwig', 'Mudkip', 'Charmander', 'Rowlet'],
      correctAnswer: 'Charmander',
    },
    {
      question:
        'Which of the following is NOT a die commonly used to play Dungeons & Dragons 5th edition?',
      answers: ['d8', 'd6', 'd4', 'd16'],
      correctAnswer: 'd16',
    },
    {
      question:
        'Which of the following is the title of the latest book in The Stormlight Archive series from Brandon Sanderson?',
      answers: [
        'Rhythm of War',
        'Oathbringer',
        'Words of Radiance',
        'The Way of Kings',
      ],
      correctAnswer: 'Rhythm of War',
    },
    {
      question:
        'Which is the name of the protagonist of the original God of War video game?',
      answers: ['Ares', 'Kratos', 'Dionysus', 'Zagreus'],
      correctAnswer: 'Kratos',
    },
    {
      question:
        'Which of the following is the director of the upcoming film adaptation of the novel Dune?',
      answers: [
        'George Lucas',
        'Steven Spielberg',
        'Christopher Nolan',
        'Denis Villeneuve',
      ],
      correctAnswer: 'Denis Villeneuve',
    },
    {
      question:
        'What is the name of the creator of Minecraft? (His actual name, not "Notch")',
      answers: ['Michael Parkson', 'Markus Persson', 'Mark Peterson'],
      correctAnswer: 'Markus Persson',
    },
    {
      question:
        'Complete the name of this famous video game duo: Ratchet & _____',
      answers: ['Sprocket', 'Clank', 'Gear', 'Crank'],
      correctAnswer: 'Clank',
    },
    {
      question: 'Complete the title: The Elder Scrolls III: ______',
      answers: ['Skyrim', 'Oblivon', 'Morrowind', 'Daggerfall', 'Texas'],
      correctAnswer: 'Morrowind',
    },
    {
      question:
        'What is the name of the protagonist of The Kingkiller Chronicle?',
      answers: ['Roland', 'Karsa', 'Kvothe', 'Temeraire'],
      correctAnswer: 'Kvothe',
    },
    {
      question: "What is Naruto's last name?",
      answers: ['Uchiha', 'Namikaze', 'Uzumaki', 'Hatake', 'Haruno'],
      correctAnswer: 'Uzumaki',
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
};

function main() {
  console.log(`you got this jake`);

  renderQuiz();
  handleQuizStart();
  handleQuestionSubmit();
  handleNextQuestionSubmit();
  handleNewQuizReset();
}

$(main);

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

// GENERATE CONTENT FOR STARTING PAGE

function generateStartingPage() {
  // return the HTML for the quiz starting page
  return `<div class="mainPage">
  <h2>Take the Nerdiness Quiz!</h2>
  <p>
    Ready for some trivia? Test your nerd mettle against the following questions. Topics range from movies and video games to books and board games. See how you fare and most importantly, have fun!
  </p>
  <button id="startQuiz">START QUIZ</button>
</div>`;
}

// GENERATE CONTENT FOR QUESTION PAGE

function generateQuestionPage() {
  // set current question
  let currentQuestion = store.questions[store.questionNumber];

  // loop over answers array for current question
  // map each answer to a new array
  let answers = currentQuestion.answers.map((answer, index) => {
    // for each answer, return a string with the desired html for a radio button
    return `<input type="radio" id="${answer}" name="answer" value=${answer} />
    <label for="${answer}">${answer}</label><br />`;
  });

  // return the question section
  // for the form, join array of strings and use those for input buttons
  return `
  <div class="questionSection">
    <div class="quizStatusSection">
      <div class="currentQuestion">
        <p>Question ${store.questionNumber + 1} out of ${
    store.questions.length
  }</p>
      </div>
      <div class="currentScore">
        <p>Current Score:</br> ${store.score} correct, ${
    store.questionNumber - store.score
  } incorrect</p>
      </div>
    </div>
    <h2>${currentQuestion.question}</h2>
    <form class="answerOptions">
      ${answers.join('')}
      <button id="submitAnswer" class="hideButton">SUBMIT ANSWER</button>
    </form>
  </div>`;
}

// GENERATE CONTENT FOR FEEDBACK SECTION

function generateGoodFeedback() {
  let currentCorrect = store.questions[store.questionNumber].correctAnswer;
  return `<div class="feedbackSectionCorrect">
  <h2 class="right">Correct!</h2>
  <p>You were correct, great job ya nerd! The answer was indeed ${currentCorrect}.</p>
  <button id="nextQuestion">NEXT QUESTION</button>
</div>`;
}

function generateBadFeedBack() {
  let currentCorrect = store.questions[store.questionNumber].correctAnswer;

  return `<div class="feedbackSectionIncorrect">
  <h2 class="wrong">Incorrect</h2>
  <p>You were incorrect, sorry! The answer was ${currentCorrect}.</p>
  <button id="nextQuestion">NEXT QUESTION</button>
</div>`;
}

function generateFeedbackSection(choice, answer) {
  // check user choice against answer to decide what to set html to
  let feedbackHtml = ``;

  // hide the submit button
  $('.hideButton').hide();

  // if the choice matches the answer,
  if (choice === answer) {
    //set html to equal good feedback section
    feedbackHtml = generateGoodFeedback();

    //append good feedback section
    $('main').append(feedbackHtml);

    // increment question number and score
    store.questionNumber += 1;
    store.score += 1;
  } else {
    //set html to insert to be bad feedback section
    feedbackHtml = generateBadFeedBack();

    //append bad feedback section
    $('main').append(feedbackHtml);

    //increment question number
    store.questionNumber += 1;
  }
}

// GENERATE CONTENT FOR RESULTS PAGE

function generateResultsPage() {
  // return the HTML for the quiz starting page

  if (store.score === store.questions.length) {
    return `<div class="resultsSection">
    <h2>Holy Cannoli Batman! A perfect score! Congrats ya huge nerd you!</h2>
    <p>Here are your results:</p>
    <div class="finalPercentCorrect">
    <h3>${store.score}0%</h3>
    </div>
    <p class="final-results">You got ${store.score} out of ${store.questions.length} questions correct. Dang, impressive.</p>
    <p>Not content with perfection? Want to take it again? Click the button below to start a new quiz!</p>
    <button id="newQuiz">NEW QUIZ</button>
    </div>`;
  } else if (store.score === 0) {
    return `<div class="resultsSection">
<h2>0 out of 10 huh? Well I have some movie/book/game recommendations for you then friend.</h2>
<p>Let's not worry about displaying results, this is for fun anyway!</p>
<p>I'm sure you can get a higher score on your next try. Want to try again? Click the button below to start a new quiz!</p>
<button id="newQuiz">NEW QUIZ</button>
</div>`;
  } else {
    return `<div class="resultsSection">
<h2>Well done, I hope you had fun!</h2>
<p>Here are your results:</p>
<div class="finalPercentCorrect">
<h3>${store.score}0%</h3>
</div>
<p class="final-results">You got ${store.score} out of ${store.questions.length} questions correct.</p>
<p>Want to take it again? Click the button below to start a new quiz!</p>
<button id="newQuiz">NEW QUIZ</button>
</div>`;
  }
}

// RESET QUIZ CONTENT

function resetQuiz() {
  $('main').empty();
  store.quizStarted = false;
  store.questionNumber = 0;
  store.score = 0;
  renderQuiz();
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

//RENDER A QUIZ PAGE, EITHER THE START OR THE NEXT QUESTION

function renderQuiz() {
  // set html to nothing to start
  let html = ``;

  // if the quiz is not started, generate main page
  if (!store.quizStarted) {
    html = generateStartingPage();
    $('main').html(html);

    // if quiz is started, generate question 1 html
  } else if (store.quizStarted) {
    html = generateQuestionPage();
    $('main').html(html);
  }
}

// RENDER THE RESULTS PAGE

function renderResultsPage() {
  let html = ``;

  // generate html for the results page
  html = generateResultsPage();

  // replace main html with results page html
  $('main').html(html);
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

// HANDLE A CLICK ON QUIZ START

function handleQuizStart() {
  // listen for a click on the start quiz button
  $('main').on('click', '#startQuiz', function (event) {
    // set the quiz started in the store to true
    store.quizStarted = true;

    // render a new quiz
    renderQuiz();
  });
}

// HANDLE A CLICK TO SUBMIT A QUESTION

function handleQuestionSubmit() {
  // listen for a click on the submit answer button
  $('main').on('click', '#submitAnswer', function (event) {
    event.preventDefault();

    // set the right answer for the current question as a variable
    let currentQuestionAnswer =
      store.questions[store.questionNumber].correctAnswer;

    // set the user choice as a variable
    let userChoice = $('input[name="answer"]:checked').attr('id');

    // generate a feedback section, passing function the user choice and right answer for this question
    generateFeedbackSection(userChoice, currentQuestionAnswer);
  });
}

// HANDLE A CLICK TO MOVE TO NEXT QUESTION

function handleNextQuestionSubmit() {
  let storeLength = store.questions.length;

  // listen for a click on the next question button
  $('main').on('click', '#nextQuestion', function (event) {
    event.preventDefault();

    // if we are on the last question when this is clicked then render the results page, else renderquiz
    if (store.questionNumber === storeLength) {
      renderResultsPage();
    } else {
      renderQuiz();
    }
  });
}

// HANDLE A CLICK FOR A BRAND NEW QUIZ

function handleNewQuizReset() {
  $('main').on('click', '#newQuiz', function (event) {
    event.preventDefault();

    resetQuiz();
  });
}
