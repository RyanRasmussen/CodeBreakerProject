let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here

    if(attempt.value == '' || answer.value == '') {
    	answerString = setHiddenFields();
    }

    if(!validateInput(input.value)) {
    	return false;
    } else {
    	attempt++;
    }

    var guess = getResults(input.value);

    if(guess) {
    	showAnswer(true);
    	showReplay();
    	return setMessage("You Win! :)");
    } else if(!guess && attempt >= 10) {
    	showAnswer(false);
    	showReplay();
    	return setMessage("You Lose! :(");
    } else {
    	return setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields() {

	answer = Math.floor((Math.random() * 999) + 1);
	let aString = answer.toString();
	attempt = 0;
	
	while( aString.length < 4 ) {
		aString = "0" + aString;
	}

	return aString;
}

function setMessage(label) {
	document.getElementById('message').innerHTML = label;
}

function validateInput(input) {
	if(input.length == 4) {
		return true;
	} else {
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
}

function getResults(result){
	var guessResults = "";
	var correctGuess = 0

	for(letter in result) {
		if(result[letter] == answerString[letter]) {
			guessResults += '<span class="glyphicon glyphicon-ok"></span>';
			correctGuess++;
		} else if (answerString.indexOf(result[letter]) > -1) {
			guessResults += '<span class="glyphicon glyphicon-transfer"></span>';
		} else {
			guessResults += '<span class="glyphicon glyphicon-remove"></span>';
		}
	}

	document.getElementById('results').innerHTML = '<div class="row"><span class="col-md-6">' 
	+ result + '</span><div class="col-md-6">' + guessResults + '</div></div>';

	if(correctGuess == 4){
		return true;
	} else {
		return false;
	}
}

function showAnswer(value) {
	document.getElementById("code").innerHTML = answerString;

	if(value){
		document.getElementById("code").className = " success";
	} else {
		document.getElementById("code").className = " failure";
	}
}

function showReplay() {
	document.getElementById("guessing-div").style.display = "none";
	document.getElementById("replay-div").style.display = "block";
}