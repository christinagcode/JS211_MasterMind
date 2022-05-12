'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = () =>  {
  // your code here
  // Creates array from guess to compare
  let guessArray = guess.split('');

  // Creates array from solution
  let solutionArray = solution.split('');

   // Counter for  correct Letter
  let correctLetter = 0;

  // Counter for wrong letter
  let correctPlace = 0; 

  // Creates for loop to compare letter for solution
  for(let i =0; i<4; i++){ 
    //if both are same in the same index increase counter
    // If both are the same in the index counter, change the guess array to 1 so it won't be input again, or  change the solutio so it isn't saved aain
    if(guessArray[i]===solutionArray[i]){
      correctPlace++;
      guessArray[i] = 1; 
      solutionArray[i] = 0; 

       // Print counter with correct value
      console.log(`correctPlace is ${correctPlace}`);
    };
  };

  // Loop for solutaions, run look to guess each letter, print how many times it loops, print whats being compared
  for(let i =0; i<4; i++){ 
    for(let ii=0; ii<4; ii++){
      console.log(`run ${ii} times`);

      console.log(`guessArray is ${guessArray[ii]}, and solutionArray is ${solutionArray[i]}`);

      // If right letter is wrong increase counter, change guess away to be counted, change solurion array so it can be counted.
      if(guessArray[ii]===solutionArray[i]){
        correctLetter++; 
        guessArray[ii] = 1; 
        solutionArray[i] = 0; 
        console.log(`correctLetter is ${correctLetter}`);
      };
    };
  };

  return `${correctPlace}-${correctLetter}`;

}
}

const mastermind = (guess) => {

  solution = 'abcd'; // Comment this out to generate a random solution
  // your code here

  // Hint should be (0-0) then place in guess
  let hint = generateHint(guess);
  
  // Place hint and guess together
  let guessPlus = guess+' '+hint;

  // Place guess to the board 
  board.push(guessPlus);

  // Win conditions to compare solution and guess, if the guess equals solution then return win! Or return false
  if(guess === solution){ 
    console.log("You guessed it!");
    return 'You guessed it!';
  }else{ 
    return false;
  }
}


}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}