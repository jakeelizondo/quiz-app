/**
 * Example store structure
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
        'Which of the following is NOT a die commonly used to play Dungeons & Dragons 5th edition',
      answers: ['d8', 'd6', 'd4', 'd16'],
      correctAnswer: 'd16',
    },
    {
      question:
        'Which of the following is the title of the latest book in The Stormlight Archive series from Brandon Sanderson',
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
        'Which is the name of the protagonist of the original God of War video game',
      answers: ['Ares', 'Kratos', 'Dionysus', 'Zagreus'],
      correctAnswer: 'Kratos',
    },
    {
      question:
        'Which of the following is the director of the upcoming film adaptation of the novel Dune',
      answers: [
        'George Lucas',
        'Steven Spielberg',
        'Christopher Nolan',
        'Denis Villeneuve',
      ],
      correctAnswer: 'Denis Villeneuve',
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

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

// GENERATE CONTENT FOR STARTING PAGE

function generateStartingPage() {
  // return the HTML for the quiz starting page
  return `<div class="mainPage">
  <h2>Take the Nerdiness Quiz!</h2>
  <p>
    Quiz description: God help us, we're in the hands of engineers. This thing
    comes fully loaded. AM/FM radio, reclining bucket seats, and... power
    windows. So you two dig up, dig up dinosaurs? Life finds a way. I gave it
    a cold? I gave it a virus. A computer virus. God help us, we're in the
    hands of engineers. I gave it a cold? I gave it a virus. A computer virus.
    Must go faster... go, go, go, go, go! Life finds a way. I gave it a cold?
    I gave it a virus. A computer virus. So you two dig up, dig up dinosaurs?
    We gotta burn the rain forest, dump toxic waste, pollute the air, and rip
    up the OZONE! 'Cause maybe if we screw up this planet enough, they won't
    want it anymore!
  </p>
  <button id="startQuiz">START QUIZ</button>
</div>`;
}

// GENERATE CONTENT FOR QUESTION PAGE

function generateQuestionPage() {
  let currentQuestion = store.questions[store.questionNumber];
  return `
<div class="questionSection">
    <h2>${currentQuestion.question}</h2>
    <div class="quizStatusSection">
      <div class="currentQuestion">
        <p>You are currently on question ${store.questionNumber + 1} out of ${
    store.questions.length
  }</p>
      </div>
      <div class="currentScore">
        <p>Your Current Score is ${store.score} correct, ${
    store.questionNumber - store.score
  } incorrect</p>
      </div>
    </div>
    <form class="answerOptions">
      <input type="radio" id="${
        currentQuestion.answers[0]
      }" name="answer" value=${currentQuestion.answers[0]} />
      <label for="one">${currentQuestion.answers[0]}</label><br />

      <input type="radio" id="${
        currentQuestion.answers[1]
      }" name="answer" value=${currentQuestion.answers[1]} />
      <label for="two">${currentQuestion.answers[1]}</label><br />

      <input type="radio" id=${
        currentQuestion.answers[2]
      } name="answer" value=${currentQuestion.answers[2]} />
      <label for="three">${currentQuestion.answers[2]}</label><br />

      <input type="radio" id="${
        currentQuestion.answers[3]
      }" name="answer" value=${currentQuestion.answers[3]} />
      <label for="four">${currentQuestion.answers[3]}</label><br />
      <button id="submitAnswer" class="hideButton">SUBMIT ANSWER</button>
    </form>
  </div>
`;
}

// GENERATE CONTENT FOR FEEDBACK SECTION

function generateGoodFeedback() {
  console.log('good job');
  let currentCorrect = store.questions[store.questionNumber].correctAnswer;
  return `<div class="feedbackSectionCorrect">
  <h2>Correct!</h2>
  <p>You were correct, great job ya nerd! The answer was indeed ${currentCorrect}</p>
  <button id="nextQuestion">NEXT QUESTION</button>
</div>`;
}

function generateBadFeedBack() {
  console.log('bad job');
  let currentCorrect = store.questions[store.questionNumber].correctAnswer;
  return `<div class="feedbackSectionIncorrect">
  <h2>Incorrect</h2>
  <p>You were incorrect, sorry! The answer was ${currentCorrect}</p>
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
    console.log('right answer');
    //set html to equal good feedback section
    feedbackHtml = generateGoodFeedback();
    //append good feedback section
    $('main').append(feedbackHtml);
    // increment question number and score
    store.questionNumber += 1;
    store.score += 1;
  } else {
    console.log('wrong answer');

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
  return `<div class="resultsSection">
<h2>Well done, I hope you had fun!</h2>
<p>Here are your results:</p>
<p class="final-results">You got ${store.score} out of ${store.questions.length} questions correct.</p>
<p>Want to take it again? Click the button below to start a new quiz!</p>
<button id="newQuiz">NEW QUIZ</button>
</div>`;
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
    console.log(`the quiz has been started, inserting question`);
    html = generateQuestionPage();
    $('main').html(html);
  }
}

// RENDER THE RESULTS PAGE

function renderResultsPage() {
  console.log(`fire results please`);
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
  console.log('handleQuizStart is running');

  // listen for a click on the start quiz button
  $('main').on('click', '#startQuiz', function (event) {
    console.log('you clicked start');

    // set the quiz started in the store to true
    store.quizStarted = true;

    // render a new quiz
    renderQuiz();
  });
}

// HANDLE A CLICK TO SUBMIT A QUESTION

function handleQuestionSubmit() {
  console.log(`handleQuestionSubmit is running`);

  // listen for a click on the submit answer button
  $('main').on('click', '#submitAnswer', function (event) {
    event.preventDefault();

    // set the right answer for the current question as a variable
    let currentQuestionAnswer =
      store.questions[store.questionNumber].correctAnswer;

    // set the user choice as a variable
    let userChoice = $('input[name="answer"]:checked').attr('id');
    console.log(`the user choice was ${userChoice}`);
    console.log(
      `you clicked submit answer on question ${
        store.questionNumber + 1
      }, you said ${userChoice} the right answer to this question is ${currentQuestionAnswer}`
    );

    // generate a feedback section, passing function the user choice and right answer for this question
    generateFeedbackSection(userChoice, currentQuestionAnswer);
  });
}

// HANDLE A CLICK TO MOVE TO NEXT QUESTION

function handleNextQuestionSubmit() {
  console.log('handleNextQuestionSubmit is running');

  let storeLength = store.questions.length;

  // listen for a click on the next question button
  $('main').on('click', '#nextQuestion', function (event) {
    event.preventDefault();
    console.log(`you clicked to move to the next question.`);

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
    console.log(`you clicked to start a new quiz`);
    resetQuiz();
  });
}
