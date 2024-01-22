const expulsionPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// tracks points towards expulsion for all expellable students
const maxPointsSceneComplete = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
// tracks whether each student has had their max points scene

var minetaGone = false; // determines if Mineta is still around
var shinsouIntroduced = false; // determines if Shinsou has been introduced

const NUM_STUDENTS = 20;

const MAX_POINTS = 1; // TODO: change once you figure out what you want the value to be
const PRIORITY_LIST = [0, 3, 11, 19, 4, 16, 12, 14, 6, 7, 1, 8, 2, 5, 9, 13, 15, 10, 18, 17];
// priority for expulsions, from least likely to be expelled to most

/**
 * checks if max points have been achieved and appends max points scenes to element with id placeId
 * 
 * @param	placeId	id of element to append scenes to
 */
function appendMaxPointsText(placeId) {
	for (let i = 0; i < NUM_STUDENTS; i++) {
		
		// checks if each student has max points and has yet to complete max points scene
		if (expulsionPoints[i] >= MAX_POINTS && !maxPointsSceneComplete[i]) {
			// appends scene (scene text contained in element with id '"maxPointsScene" + i')
			document.getElementById(placeId).innerHTML += document.getElementById("maxPointsScene" + i).innerHTML;
			// removes scene text from container (div id '"maxPointsScene" + i')
			document.getElementById("maxPointsScene" + i).innerHTML = "";
			// marks scene completed so it won't be appended again
			maxPointsSceneComplete[i] = true;
		}
	}
}

/**
 * TODO: make a method similar to appendMaxPointsText for the Shinsou introduction scene
 * except it probably can just replace the text rather than append, because there is only one Shinsou introduction
 */


/**
 * toggles theme from default to reversi and back
*/
function toggleTheme() {
      document.getElementById("work").classList.toggle("light");
      document.getElementById("work").classList.toggle("reversi");
    }

/** 
* adds points to a given student's total.
*
* @param 	student 	initials of the student gaining points, nonexistent initials make it do nothing
* @param 	points 		number of points to add
*/
function addPoints(studentIndex, points) {
    expulsionPoints[studentIndex] += points;
}

/**
 * hides buttons not clicked and makes button clicked inert, then reveals the next portion of the story.
 * 
 * @param 	choiceId 		identifies which set of buttons the user is at
 * @param 	numberChosen 	identifies which button the user clicked
 * 
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
      		appendMaxPointsText("part1MaxPointsScenes");
      		break;
    	default:
      		break;
    }
}

/**
* reveals all hidden elements and makes all choice buttons inert
*/
function revealAll() {
	var allHidden = document.querySelectorAll(".hidden"); // array of all elements with "hidden" class
	
	// iterates through array, revealing all
	for (i = 0; i < allHidden.length; i++) {
		allHidden[i].classList.toggle("hidden")
	}
	
	var allButtons = document.querySelectorAll("button"); // array of all buttons
	
	// iterates through array, making them inert only if they are not the play again or toggle theme buttons (which will still be clickable)
	for (i = 0; i < allButtons.length; i++) {
		if (allButtons[i].id == "playAgain" || allButtons[i].id == "toggleTheme") {
			continue;
		}
		if (!(allButtons[i].classList.contains("inert"))) {
			allButtons[i].classList.toggle("inert");
		}
	}
	
	for (let i = 0; i < MAX_POINTS_TEXT.length; i++) {
		if (!maxPointsSceneComplete[i]) {
			document.getElementById("endMaxPointsScenes").innerHTML += MAX_POINTS_TEXT[i];
		}
	}
}

/**
 * determines which end scenes should show, returns as an array of indices
 * 
 * @return array of indices for end scenes
 */
function chooseExpellees() {
	// maximum points achieved in this playthrough
	const maxNumPoints = Math.max.apply(null, expulsionPoints);
	
	// end where nobody gets any points
	if (maxNumPoints == 0) {
		return [21];
	}
	
	// array of student indices for expulsion/also indices for other ending scenes
	const expelledArray = [];
	
	// adds students who are at the max points achived to array
	for (let i = 0; i < expulsionPoints.length; i++) {
		if (expulsionPoints[i] == maxNumPoints) {
			expelledArray.push(i);
		}
	}
	
	// reduces expelledArray length to five if it is over, or returns 22 if 6+ people have max points
	if (expelledArray.length > 5) {
		// (diverts to the one ending where 6+ people get max points) (this is the good end btw)
		if (maxNumPoints == MAX_POINTS) {
			return [22];
		}
		// uses the PRIORITY_LIST to determine who to remove to get the lst down to 5
		let i = 0;
		while (expelledArray.length > 5) {
			if (expelledArray.includes(PRIORITY_LIST[i])) {
				expelledArray.splice(expelledArray.indexOf(PRIORITY[i]), 1);
			}
			i++;
		}
	}
	
	// changes Ashido and Kirishima's separate scenes to a joint one if both are expelled
	if (expelledArray.includes(2) && expelledArray.includes(8)) {
		expelledArray.splice(expelledArray.indexOf(2), 1);
		expelledArray.splice(expelledArray.indexOf(8), 1);
		expelledArray.push(20);
	}
	
	// adds [BAD END] to all where Shinsou gets expelled, [WORST END] if Shinsou, Bakugou, Aoyama, Todoroki, and either Ashido or Kirishima expelled
	if (expelledArray.includes(0)) {
		if (expelledArray.includes(1) && expelledArray.includes(15) && expelledArray.includes(17) &&
		(expelledArray.includes(2) || expelledArray.includes(8)) && ((!expelledArray.includes(2)) || (!expelledArray.includes(8)))) {
			expelledArray.push(24);
		}
		else {
			expelledArray.push(23);
		}
	}
	else { // adds [END] if not good end, bad end, or worst end
		expelledArray.push(25);
	}
	
	// returns an array of all the end scenes to be appended
	return expelledArray;
}



