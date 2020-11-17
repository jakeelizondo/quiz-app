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

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
