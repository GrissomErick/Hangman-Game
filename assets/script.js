
// Erick Grissom UNC Coding Bootcamp Week 3 Homework Hangman Game

var bkgrndMusic = []
bkgrndMusic.push("./audio/nbamusic1.mp3");
bkgrndMusic.push("./audio/nbamusic2.mp3");
bkgrndMusic.push("./audio/nbamusic3.mp3");
bkgrndMusic.push("./audio/nbamusic4.mp3");
bkgrndMusic.push("./audio/nbamusic5.mp3");
bkgrndMusic.push("./audio/nbamusic6.mp3");
bkgrndMusic.push("./audio/nbamusic7.mp3");

var myAudio1 = document.createElement("audio");
myAudio1.src = "./audio/rightletter.mp3";

var myAudio2 = document.createElement("audio");
myAudio2.src = "./audio/wrongletter.mp3";

var myAudio3 = document.createElement("audio");
myAudio3.src = "./audio/youwin.mp3";

var myAudio4 = document.createElement("audio");
myAudio4.src = "./audio/youlose.mp3";

var myAudio5 = document.createElement("audio");
myAudio5.src = bkgrndMusic[Math.floor(Math.random() * bkgrndMusic.length)];


// Setting up the Top Ten Array array
// Source https://clutchpoints.com/espn-releases-top-10-nba-players-lebron-james/

var words = ["GREEN", "ANTETOKOUNMPO", "HARDEN", "PAUL", "DAVIS", "WESTBROOK", 
  "CURRY", "LEONARD", "DURANT", "JAMES"];


// Initialize game
      
var game = {
  guessed: [],
  left: 11,
  start: function() {
    myAudio2.play();
    myAudio5.play();
    this.complete = false;
    this.word = words[Math.floor(Math.random() * words.length)];
    this.$right = document.getElementById('right');
    this.$wrong = document.getElementById('wrong');
    this.$remain = document.getElementById('remain');
    this.$right.innerHTML = '_'.repeat(this.word.length);
  },
  
  // Guess a letter
  
  guess: function(letter) {
    if (this.left > 0 && this.complete != true) {
      if (this.word.indexOf(letter) > -1 || this.guessed.indexOf(letter) > -1) {
        this.right(letter);
      } else {
        this.wrong(letter);
      }
    }
  },

  // If letter guessed is correct
  
  right: function(letter) {
    for(var i = 0; i < this.word.length; i++) {
      if (this.word[i] == letter) {
        myAudio1.play();
        var word = this.$right.innerHTML.split('');
        word[i] = letter;
        this.$right.innerHTML = word.join('');
      }
    }
    if (this.$right.innerHTML.indexOf('_') < 0) {
      myAudio3.play();
      this.complete = true;
      alert('YOU WIN! The NBA Player was: ' + this.word);
    }
  },

  // If letter guesses is incorrect
  
  wrong: function(letter) {
    myAudio2.play();
    this.guessed.push(letter);
    this.$wrong.innerHTML += ' ' + letter;
    this.left--;
    this.$remain.innerHTML = this.left;
    if (this.left < 1) {
      myAudio5.pause();
      myAudio4.play();
      this.complete = true;
      alert('YOU LOSE! The NBA Player was: ' + this.word);
    }
  }
};

// Start the game

game.start();

// Convert all guessed letters to caps

document.onkeyup = function(event) {
  var letter = String.fromCharCode(event.keyCode).toUpperCase();
  game.guess(letter);
};

// Pause audio button

document.getElementById("musicButton").onclick = function() {
  myAudio5.pause();
  myAudio3.pause();
};

// Reset game button

document.getElementById("resetButton").onclick = function() {
  window.location.reload();
};