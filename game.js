//Declaration variables, arrays
var buttonColors = ["red",
  "blue",
  "green",
  "yellow"
];

var gamePattern = [];
var userChosenPattern = [];
var started = false;
var level = 0;

//Keyboard check to display game level
$(document).keypress(function() {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }

});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userChosenPattern.push(userChosenColor);
  //Call to play sound
  playSound(userChosenColor);
  //button animation
  animatePress(userChosenColor);
  //next sequence called with timer
  //nextSequence();
  //check Answer with the last selected color and call next sequence
  checkAnswer(userChosenPattern.length - 1);

});

//function to check user input
function checkAnswer(currentLevel) {
  //  console.log("game original",gamePattern);
  //console.log("user pattern",userChosenPattern);
  if (gamePattern[currentLevel] === userChosenPattern[currentLevel]) {
    if (gamePattern.length === userChosenPattern.length) {
      //console.log("success");
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    //console.log("fail");
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }

}

//Generating the next sequence after clearing old user selected pattern
function nextSequence() {
  userChosenPattern = [];
  level++;
  $("h1").text("Level " + level);

  //Generating random Color and creating game game Pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //Animation as flash added to the color button
  //$("#" + randomChosenColor).addClass("flash");
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //Call to play sound
  playSound(randomChosenColor);


}


//Function to play sound based on color button selected
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


//Animation on clicking the button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}



// Restart once game is wrong
function startOver() {
  level = 0;
  userChosenPattern = [];
  started = false;
}
