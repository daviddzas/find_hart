const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const arr = [
[pathCharacter, fieldCharacter, hole],
[fieldCharacter, hole, fieldCharacter],
[fieldCharacter, hat, fieldCharacter]
]

class Field {
    constructor(field) {
     this.field = field.map(line => line.join('')).join('\n');     
    }     
    print() {
      process.stdout.write(this.field);
    }    
    
    position (x) {
     return this.field.charAt(x);
    }

    checkWin (x) {
        let here = this.position(x);
        if (here == hat) {
          process.stdout.write(`\n Congrats! You found your hat ! \n`);
          process.exit();
        }
        else if (here == hole) {
          process.stdout.write(`\n You fell into a whole\n`);
          process.exit();
        }
        else if (here !== fieldCharacter) {
          process.stdout.write(`\n You are out of bounds \n`);
          process.exit();
        }
        else {
          this.field.replace(this.position(x), pathCharacter )
          this.play();
        }
      
    }

    handleInput (userInput) {
        const char = userInput.toString().trim();
            let initial = 0;
            if (char === 'U' || char === 'u') {
              this.checkWin(initial - 4);
            }
            else if (char === 'D' || char === 'd') {
             this.checkWin(initial + 4);
            }
            else if (char === 'R' || char === 'r') {
              this.checkWin(initial + 1);
            }
            else if (char === 'L' || char === 'l') {
              this.checkWin(initial -1 );
            }
            else {
              process.stdout.write('U is up, D is down, R is right, L is left \n');
            }
    }

    play() {
      this.print();
      process.stdout.write('\n Which way?  ')
      process.stdin.on('data', this.handleInput)
    }
  }
 
 const gameFiled = new Field(arr);
 
 gameFiled.play();
