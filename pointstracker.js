const expulsionPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// tracks points towards expulsion for all expellable students

var minetaGone = false; // determines if Mineta is still around

var shinsouIntroduced = true; // determines if Shinsou has been introduced
var part = "intro";

/*
adds points to a given student's total.

@param 	student 	initials of the student gaining points, nonexistent initials make it do nothing
@param 	points 		number of points to add
*/
function addPoints(student, points) { 
    switch(student) {
      case "AY":
        expulsionPoints[0] += points;
        break;
      case "AM":
        expulsionPoints[1] += points;
        break;
      case "AT":
        expulsionPoints[2] += points;
        break;
      case "IT":
        expulsionPoints[3] += points;
        break;
      case "UO":
        expulsionPoints[4] += points;
        break;
      case "OM":
        expulsionPoints[5] += points;
        break;
      case "KD":
        expulsionPoints[6] += points;
        break;
      case "KE":
        expulsionPoints[7] += points;
        break;
      case "KK":
        expulsionPoints[8] += points;
        break;
      case "SR":
        expulsionPoints[9] += points;
        break;
      case "SHi":
        expulsionPoints[10] += points;
        break;
      case "SM":
        expulsionPoints[11] += points;
        break;
      case "JK":
        expulsionPoints[12] += points;
        break;
      case "SHa":
        expulsionPoints[13] += points;
        break;
      case "TF":
        expulsionPoints[14] += points;
        break;
      case "TS":
        expulsionPoints[15] += points;
        break;
      case "HT":
        expulsionPoints[16] += points;
        break;
      case "BK":
        expulsionPoints[17] += points;
        break;
      case "MI":
        expulsionPoints[18] += points;
        break;
      case "YM":
        expulsionPoints[19] += points;
        break;
      default:
        break;
    }
}

/*
reveals the next portion of the story.
*/
function progress() {
  switch(part) {
    case "intro":
      if (expulsionPoints[18] > 0) {
        document.getElementById('choice1-2chosen').classList.toggle("hidden");
      }
      else {
        document.getElementById('choice1-1chosen').classList.toggle("hidden");
      }
      document.getElementById('end').classList.toggle("hidden");
      part = "part1";
      break;
    default:
      break;
  }
}

/*
hides buttons not clicked and makes button clicked inert.

@param 	choiceId 		identifies which set of buttons the user is at
@param 	numberChosen 	identifies which button the user clicked
@param 	numChoices		number of buttons in set
*/
function buttonSet(choiceId, numberChosen, numChoices) {
	for (var i = 1; i <= numChoices; i++) {
	  if (i != numberChosen) {
		  document.getElementById(choiceId + "-" + i).classList.toggle("hidden");
	  }
	}
	var chosen = document.getElementById(choiceId + "-" + numberChosen);
	chosen.classList.toggle("inert");
}

/*
reveals all hidden elements and makes all choice buttons inert.
*/
function revealAll() {
	var allHidden = document.querySelectorAll(".hidden"); //array of all elements with "hidden" class
	for (i = 0; i < allHidden.length; i++) {
		allHidden[i].classList.toggle("hidden");
	}
	var allButtons = document.querySelectorAll("button"); //array of all buttons
	for (i = 1; i < allButtons.length; i++) {
		if (allButtons[i].id == "playAgain") {
			continue;
		}
		if (!(allButtons[i].classList.contains("inert"))) {
			allButtons[i].classList.toggle("inert");
		}
	}
}
