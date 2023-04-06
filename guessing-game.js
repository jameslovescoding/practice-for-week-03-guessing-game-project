const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log(`Thank you for your valuable feedback: ${answer}`);

//   rl.close();
// });

let secretNumber = 100;

function checkGuess(num) {
  if (num > secretNumber) {
    console.log('Too high.');
    return false;
  } else if (num < secretNumber) {
    console.log('Too low.');
    return false;
  } else {
    console.log('Correct!');
    return true;
  }
}

function askGuess() {
  rl.question('Enter a guess: ', (answer) => {
    let num = Number(answer);
    if (typeof num === 'number') {
      if(checkGuess(num)) {
        rl.close();
      } else {
        askGuess();
      }
    } else {
      console.log('Please enter a valid number.');
      askGuess();
    }
  })
}

function randomInRange(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

function askRange() {
  let range = [];
  function askNumber(question, cb) {
    rl.question(question, (answer) => {
      let num = Number(answer);
      if (typeof num === 'number') {
        range.push(num);
        if (range.length === 2) {
          console.log(`I am thinking of a number between ${range[1]} and ${range[0]}.`)
          secretNumber = randomInRange(range[0], range[1]);
          askGuess();
        } else {
          askNumber('Enter a min number: ', askNumber);
        }
      } else {
        console.log('Please enter a valid number.');
        askNumber(question, cb);
      }
    })
  }
  askNumber('Enter a max number: ', askNumber);
}

askRange();
