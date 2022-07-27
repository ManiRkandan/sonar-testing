let temp = document.querySelector('.time');
let button = document.querySelector("button");
let words = document.querySelector(".words");
let timerDiv = document.querySelector(".time");
let scoreDiv = document.querySelector(".score");
let points = 0;
let spans;
let typed;
let seconds = 60;
let spark = new Audio("http://k003.kiwi6.com/hotlink/qdpr7bioht/spark.mp3");

function countdown() {
	points = 0;
	let timer = setInterval(function () {
		button.disabled = true;
		seconds--;
		temp.innerHTML = seconds;
		if (seconds === 0) {
			alert("Game over! Your score is " + points);
			scoreDiv.innerHTML = "0";
			words.innerHTML = "";
			button.disabled = false;
			clearInterval(timer);
			seconds = 60;
			timerDiv.innerHTML = "60";
			button.disabled = false;
		}
	}, 1000);
}

let random1 = 0;
function random() {
	words.innerHTML = "";
	let wordArray = list[random1].split("");
	for (let value of wordArray) { 
		let span = document.createElement("span");
		span.classList.add("span");
		span.innerHTML = value;
		words.appendChild(span);
	}
	spans = document.querySelectorAll(".span");
	if (random1 === 1) {
		random1 = 0;
	} else {
		random1++;
	}
}

const list = ['ASDF', 'LKJH']

button.addEventListener("click", function () {
	countdown();
	random();
	button.disabled = true;
});


function typing(e) {
	typed = String.fromCharCode(e.which);
	for (let value of spans) {
		if (value.innerHTML === typed) {
			if (value.classList.contains("bg")) {
				continue;
			} else if (value.classList.contains("bg") === false && spans[i - 1] === undefined || spans[i - 1].classList.contains("bg") !== false) { // if it dont have class, if it is not first letter or if the letter before it dont have class (this is done to avoid marking the letters who are not in order for being checked, for example if you have two "A"s so to avoid marking both of them if the first one is at the index 0 and second at index 5 for example)
				value.classList.add("bg");
				break;
			}
		}
	}
	let checker = 0;
	for (let value of spans) {
		if (value.className === "span bg") {
			checker++;
		}
		if (checker === spans.length) {
			spark.pause();
			spark.currentTime = 0;
			spark.play();
			words.classList.add("animated");
			words.classList.add("fadeOut");
			points++;
			scoreDiv.innerHTML = points;
			document.removeEventListener("keydown", typing, false);
			setTimeout(function () {
				words.className = "words";
				random();
				document.addEventListener("keydown", typing, false);
			}, 400);
		}

	}
}

document.addEventListener("keydown", typing, false);