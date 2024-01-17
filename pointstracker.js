const expulsionPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// tracks points towards expulsion for all expellable students
const maxPointsSceneComplete = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
// tracks whether each student has had their max points scene

var minetaGone = false; // determines if Mineta is still around
var shinsouIntroduced = true; // determines if Shinsou has been introduced

const maxPointsText = []; // TODO: add variables with html text for all max points scenes, to be appended where appropriate.

/*
TODO: create function which uses el.innerHTML = el.innerHTML + maxPointsText to append scenes
Use a loop, so it can be if (expulsionPoints[i] == (max) && maxPointsSceneComplete[i] == false) {append}
*/

/*
adds points to a given student's total.

@param 	student 	initials of the student gaining points, nonexistent initials make it do nothing
@param 	points 		number of points to add
*/
function addPoints(studentIndex, points) {
    expulsionPoints[studentIndex] += points;
}

/*
hides buttons not clicked and makes button clicked inert, then reveals the next portion of the story.

@param 	choiceId 		identifies which set of buttons the user is at
@param 	numberChosen 	identifies which button the user clicked
*/
function progress(choiceId, numChosen) {
	var currChoiceButtons = document.getElementsByClassName(choiceId); // array of buttons for current choice
	
	// iterates through array of buttons, either hiding them or making them inert depending on whether they are the one that was clicked
	for (i = 0; i < currChoiceButtons.length; i++) {
	  	if (currChoiceButtons[i].classList.contains("button" + numChosen)) {
		  	currChoiceButtons[i].classList.toggle("inert");
	  	}
	  	else {
		  	currChoiceButtons[i].classList.toggle("hidden");
	  	}
	}
	
	// reveals text related to the choice made
	document.getElementById(choiceId + "-" + numChosen).classList.toggle("hidden");
	
	// reveals text regardless of choice, different text depending on where in the story the reader is
  	switch(choiceId) {
    	case "choice1":
      		document.getElementById('end').classList.toggle("hidden");
      		break;
    	default:
      		break;
    }
}

/*
reveals all hidden elements and makes all choice buttons inert
*/
function revealAll() {
	var allHidden = document.querySelectorAll(".hidden"); // array of all elements with "hidden" class
	
	// iterates through array, revealing all
	for (i = 0; i < allHidden.length; i++) {
		allHidden[i].classList.toggle("hidden")
	}
	var allButtons = document.querySelectorAll("button"); // array of all buttons
	
	// iterates through array, making them inert only if they are not the play again or toggle theme buttons
	for (i = 1; i < allButtons.length; i++) {
		if (allButtons[i].id == "playAgain" || allButtons[i].id == "toggleTheme") {
			continue;
		}
		if (!(allButtons[i].classList.contains("inert"))) {
			allButtons[i].classList.toggle("inert");
		}
	}
}
