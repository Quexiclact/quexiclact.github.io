// tracks points towards expulsion for all expellable students
const expulsionPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// determines if Mineta is still around
var minetaGone = false;

//number of students
const NUM_STUDENTS = 20;

// maximum number of points able to be achieved
const MAX_POINTS = 2; // TODO: change to five before done

// priority for expulsions, from least likely to be expelled to most
const PRIORITY_LIST = [0, 3, 11, 19, 4, 16, 12, 14, 6, 7, 1, 8, 2, 5, 9, 13, 15, 10, 18, 17];

/**
 * checks if max points have been achieved and appends max points scenes to element with id placeId
 * 
 * @param	placeId	class of part to append scenes to
 */
function appendMaxPointsText(placeClass) {
	for (let i = 0; i < NUM_STUDENTS; i++) {
		
		// checks if each student has max points and appends scene if so, deleting the scene from storage afterwards
		if (expulsionPoints[i] >= MAX_POINTS) {
			// appends scene (scene text contained in div with id '"maxPointsScene" + i')
			let place = document.getElementsByClassName(placeClass)[0];
			place.getElementsByClassName("maxPointsScenes")[0].innerHTML += document.getElementById("maxPointsScene" + i).innerHTML;
			// removes scene text from container (div id '"maxPointsScene" + i')
			document.getElementById("maxPointsScene" + i).innerHTML = "";
		}
	}
}

/**
 * 
 * 
 */
function destroyMineta(nextMinetaSceneIndex, nextPartClass, nextShinSceneIndex){
	let minetaScenes = document.getElementsByClassName("minetaScene");
	for (i = nextMinetaSceneIndex; i < minetaScenes.length; i++) {
		minetaScenes[i].classList.toggle("unchosen");
	}
	let shinsouScenes = document.getElementsByClassName("shinsouScene");
	for (i = nextShinSceneIndex; i < shinsouScenes.length; i++) {
		shinsouScenes[i].classList.toggle("unchosen")
	}
	
	// appends shinsou's introduction text to the given shinsouIntroduction div
	document.getElementsByClassName(nextPartClass)[0].getElementsByClassName("shinsouIntroduction")[0].classList.toggle('unchosen');
	document.getElementsByClassName(nextPartClass)[0].getElementsByClassName("shinsouIntroduction")[0].innerHTML += document.getElementById("introduction0").innerHTML;
	// removes scene text from container
	document.getElementById("introduction0").innerHTML = "";
	minetaGone = true;
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
	
	/*
	* iterates through array of buttons, either hiding them or making them inert depending on
	* whether they are the one that was clicked
	*/
	for (i = 0; i < currChoiceButtons.length; i++) {
	  	if (currChoiceButtons[i].classList.contains("button" + numChosen)) {
		  	currChoiceButtons[i].classList.toggle("inert");
	  	}
	  	else {
		  	currChoiceButtons[i].classList.toggle("hidden");
	  	}
	}
	
	let choiceText = document.getElementsByClassName(choiceId + "-" + numChosen);
	
	// reveals text related to the choice made
	for (i = 0; i < choiceText.length; i++) {
		choiceText[i].classList.toggle("unchosen");
	}
	
	// reveal text regardless of choice, different text depending on where in the story the reader is
	
	// chooses part and appends any max points text (if necessary)
  	switch(choiceId) {
    	case "choice1":
			nextPartClass = "part2";
      		break;
      	case "choice2":
			nextPartClass = "part3";
      		break;
      	case "choice3":
			nextPartClass = "end";
			expelledArray = chooseExpellees();
			for (const expulsionScene in expelledArray) {
				document.getElementById("expulsion" + expelledArray[expulsionScene]).classList.toggle("unchosen");
			}
      		break;
    	default:
      		break;
    }
    
    appendMaxPointsText(nextPartClass);
    // toggles hidden in given part
    let partElements = document.getElementsByClassName(nextPartClass);
    for (i = 0; i < partElements.length; i++) {
		partElements[i].classList.toggle("hidden");
	}
}

/**
* reveals all hidden elements and makes all choice buttons inert
*/
function revealAll() {
	var allHidden = document.querySelectorAll(".hidden"); // array of all elements with "hidden" class
	
	// iterates through array, revealing all hidden
	for (i = 0; i < allHidden.length; i++) {
		allHidden[i].classList.toggle("hidden");
	}
	
	var allUnchosen = document.querySelectorAll(".unchosen"); // array of all elements with "unchosen" class
	
	// iterates through array, revealing all unchosen options
	for (i = 0; i < allUnchosen.length; i++) {
		if (allUnchosen[i].classList.contains("shinsouIntroduction")) {
			continue;
		}
		allUnchosen[i].classList.toggle("unchosen");
	}
	
	var allButtons = document.querySelectorAll("button"); // array of all buttons
	
	/* 
	* iterates through array, making them inert only if they are not the play again or toggle 
	* theme buttons (which will still be clickable)
	*/
	for (i = 0; i < allButtons.length; i++) {
		if (allButtons[i].classList.contains("dontDisable")) {
			continue;
		}
		if (!(allButtons[i].classList.contains("inert"))) {
			allButtons[i].classList.toggle("inert");
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
	
	/*
	* adds [BAD END] to all where Shinsou gets expelled, [WORST END] if Shinsou, Bakugou, Aoyama,
	* Todoroki, and either Ashido or Kirishima expelled
	*/
	if (expelledArray.includes(0)) {
		if (expelledArray.includes(1) && expelledArray.includes(15) && expelledArray.includes(17) &&
		(expelledArray.includes(2) || expelledArray.includes(8)) && ((!expelledArray.includes(2))
				|| (!expelledArray.includes(8)))) {
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



