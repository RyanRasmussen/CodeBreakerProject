
let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here

    if(answer.value == '' || attempt.value == ''){
    	setHiddenFields();
    }

    if(!validateInput(input.value)){
    	return false;
    } else {
    	attempt.value++;
    }

    if(getResults(input.value)) {
    	showAnswer(true);
    	showReplay();
    	setMessage('You Win! :)');
    } else if (!getResults(input.value) && attempt.value >= 10) {
    	showAnswer(false);
    	showReplay();
    	setMessage('You Lose! :(');
    } else {
    	setMessage('Incorrect, try again.');
    }

}

//implement new functions here

//assign the hidden fields 'answer' and 'attempt'
function setHiddenFields(){
	//random number
	answer.value = Math.floor((Math.random() * 999) + 1).toString();

	//check answer string length
	while(answer.value.length < 4){
		answer.value = "0" + answer.value;
	}

	attempt.value = 0;
}	

//display message in div
function setMessage(message){
	document.getElementById('message').innerHTML = message;
}

//checks user input length
function validateInput(input){

	if(input.length == 4){
		return true;
	} else {
		setMessage('Guesses must be exactly 4 characters long.');
		return false;
	}
}

//check if guess is correct
function getResults(input){

	let results = '';
	let correctGuess = 0;
	//compare each lettter in input to to each letter in answer
	for(letter in input) {
		if(input[letter] == answer.value[letter]){
			results += '<span class="glyphicon glyphicon-ok"></span>';
			correctGuess++;
		} else if(answer.value.indexOf(input[letter]) > -1) {
			results += '<span class="glyphicon glyphicon-transfer"></span>';
		} else {
			results += '<span class="glyphicon glyphicon-remove"></span>';
		}
	}
	//display results on page
	document.getElementById('results').innerHTML = '<div class="row"><span class="col-md-6">' 
	+ input + '</span><div class="col-md-6">' + results + '</div></div>';
	
	if(correctGuess == 4){
		return true;
	} else {
		return false;
	}
}

function showAnswer(value){
	document.getElementById('code').innerHTML = answer.value;

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

