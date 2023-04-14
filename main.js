'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

let start = ""
let end = ""

let stackA = []
let stackB = []
let stackC = []
let winner = false

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = () => {
  // Your code here
  //move last index value of start stack to end of new stack
  if(start === "a" && end === "b"){
    const holder = stacks.a.pop()
    stacks.b.push(holder)
   }
  else if(start === "a" && end === "c"){
    const holder = stacks.a.pop()
    stacks.c.push(holder)
    }
  else if(start === "b" && end === "a"){
    const holder = stacks.b.pop()
    stacks.a.push(holder)
    } 
  else if(start === "b" && end === "c"){
    const holder = stacks.b.pop()
    stacks.c.push(holder)
    }
  else if(start === "c" && end === "a"){
    const holder = stacks.c.pop()
    stacks.a.push(holder)
    }  
  else if(start === "c" && end === "b"){
    const holder = stacks.c.pop()
    stacks.b.push(holder)
    } 
  else{
    console.log("That is not a legal move")
  }

}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = () => {
  // Your code here
  //check if new stack has something already
  //if last index of new stack is smaller than moving piece, print illegal

  if(start == "a" && end == "b"){
    
    if((stackA[stackA.length-1])>(stackB[stackB.length-1])){
      
      return false
    }
    else{
      return true
    }
  }

  else if(start == "a" && end == "c"){
    
    if((stackA[stackA.length-1])>(stackC[stackC.length-1])){
      
      return false
    }
    else{
      return true
    }
  }

  else if(start == "b" && end == "a"){
    
    if((stackB[stackB.length-1])>(stackA[stackA.length-1])){
      
      return false
    }
    else{
      return true
    }
  }

  else if(start == "b" && end == "c"){
    
    if((stackB[stackB.length-1])>(stackC[stackC.length-1])){
      
      return false
    }
    else{
      return true
    }
  }

  else if(start == "c" && end == "b"){
    
    if((stackC[stackC.length-1])>(stackB[stackB.length-1])){
      
      return false
    }
    else{
      return true
    }
  }

  else if(start == "c" && end == "a"){
    
    if((stackC[stackC.length-1])>(stackA[stackA.length-1])){
      
      return false
    }
    else{
      return true
    }
  }
  
  else{
    return false
  }
  
  //if not, movePiece

}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  console.log(stacks.c.length)
  if((stacks.c.length == 4)){
    winner = true
    return true
  }
  else{
    return false
  }

}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  // Check if the move is legal
  // print illegal if false
  // if true, move piece
  // check for a win
  // print win
  // or keep playing

  start = startStack
  end = endStack

  stackA = stacks.a
  stackB = stacks.b
  stackC = stacks.c
  isLegal()
  if(isLegal){
    movePiece()
    checkForWin()
    if(winner){
      console.log("You win!")
    }
  }
  else{
    console.log("This is not a legal move")
  }


}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
