const quizzScreen = document.querySelector(".screen-2");

function scrollToNextQuestion(thisQuestion) {
	const lastQuestion = quizzScreen.querySelector(".quizz").lastChild;
	if (thisQuestion === lastQuestion) {
		return;
	}
	const questions = quizzScreen.querySelectorAll(".question");
	const nextId = Number(thisQuestion.id) + 1;
	const nextQuestion = questions[nextId];
	nextQuestion.scrollIntoView({
		behavior: "smooth",
		block: "center",
		inline: "start",
	});
}

let correctAnswers = [];

function markQuestionAsAnswerd(selectedOption) {
	const thisQuestion = selectedOption.parentNode.parentNode;
	const options = selectedOption.parentNode.querySelectorAll(".option");
	const correctAnswer = correctAnswers[thisQuestion.id].correctOption;

	options.forEach((option) => {
		//Add blur to the unselected options
		if (option !== selectedOption) {
			option.classList.add("blur");
		}
		//Remove on click on all options
		option.removeAttribute("onclick");

		//Change the colors of the answer texts
		let text = option.querySelector("p");
		if (Number(option.id) === correctAnswer) {
			text.style.color = "green";
		} else {
			text.style.color = "red";
		}
	});
	setTimeout(scrollToNextQuestion, 2000, thisQuestion);
}

function clearQuizzScreen() {
	//Reinicialize global variables
	correctAnswers = [];
	hits = 0;
	answerdQuestions = 0;
	levels = [];
	quizzScreen.innerHTML =
		`<main class="container ">
		<div class="selected-quizz">
			<div class="banner"></div>
			<h1></h1>
		</div>
		<div class="quizz-container">
			<div class="quizz">
			</div>
		</div>
	</main>`;
}

function restartBtn() {
	clearQuizzScreen();
	load(thisQuizz);
	document.querySelector("html").scrollIntoView(true);
}

function homeBtn() {
	changeScreen("screen-1");
	document.querySelector("html").scrollIntoView(true);
	clearQuizzScreen();
}

function renderizeResultBox(result, resultPercent) {
	const quizz = quizzScreen.querySelector(".quizz");
	quizz.innerHTML +=
		`<div class="result"> 
		<h1 style="background-color: red">${resultPercent}% de acerto: ${result.title}</h1>
		<div class="content">
			<img src="${result.image}">
			<p>${result.text}</p>
		</div>
		</div>
	</div>
	<button class="restart-btn" onclick="restartBtn();">
		Reiniciar Quizz
	</button>
	<button class="home-btn" onclick="homeBtn();">
		Voltar pra home
	</button>`;
}

let hits = 0;

function showResult(totalQuestions) {
	const resultPercent = Math.round((hits / totalQuestions) * 100);
	const result = levels.find((level) => resultPercent >= level.minValue);
	console.log(result)
	renderizeResultBox(result, resultPercent);
	const resultBox = quizzScreen.querySelector(".quizz .result");
	resultBox.scrollIntoView({
		behavior: "smooth",
		block: "center",
		inline: "start",
	});
}

let answerdQuestions = 0;

function selectAnswer(selectedOption) {
	markQuestionAsAnswerd(selectedOption);
	const isCorrect =
		selectedOption.querySelector("p").getAttribute("style") === "color: green;";
	if (isCorrect) {
		hits++;
	}
	answerdQuestions++;

	const totalQuestions = quizzScreen.querySelectorAll(".question").length;
	if (answerdQuestions === totalQuestions) {
		setTimeout(showResult, 2000, totalQuestions);
	}
}

function showQuizzScreen() {
	const loading = document.querySelector(".loading");
	const quizzesScreen = document.querySelector(".screen-1");
	quizzesScreen.classList.add("hidden");
	loading.classList.add("hidden");
	const quizzScreen = document.querySelector(".screen-2");
	quizzScreen.classList.remove("hidden");
}

function loadBackgroundImg(selectedQuizz) {
	const bgImg = selectedQuizz.data.image;
	const quizzHeader = quizzScreen.querySelector(".selected-quizz");
	quizzHeader.style.backgroundImage = `url('${bgImg}')`;
}

function loadQuizzTitle(selectedQuizz) {
	const quizzTitle = selectedQuizz.data.title;
	const title = quizzScreen.querySelector("h1");
	title.innerHTML = `${quizzTitle}`;
}

function saveIfIsCorrectAnswer(answer, questionId, answerId) {
	if (answer.isCorrectAnswer) {
		let correctAnswer = {
			question: questionId,
			correctOption: answerId,
		};
		correctAnswers.push(correctAnswer);
	}
}

function renderizeAnswers(question, questionId, quizz) {
	let options = quizz.lastChild.querySelector(".options");
	let answers = question.answers;
	answers.sort(() => Math.random() - 0.5);

	answers.forEach(function (answer, answerId) {
		options.innerHTML +=
			`<button class="option" id="${answerId}" onclick="selectAnswer(this)">
			<img src="${answer.image}">
			<p>${answer.text}</p>
		</button>`;

		saveIfIsCorrectAnswer(answer, questionId, answerId);
	});
}

function loadQuizzQuestions(selectedQuizz) {
	const quizzQuestions = selectedQuizz.data.questions;
	const quizz = quizzScreen.querySelector(".quizz");

	quizzQuestions.forEach(function (question, questionId) {
		quizz.innerHTML +=
			`<div class="question" id="${questionId}"> 
			<h1 style="background-color: ${question.color}">${question.title}</h1>
			<div class="options">
			</div>
		</div>`;
		renderizeAnswers(question, questionId, quizz);
	});
}

let levels = [];

function saveLevels(selectedQuizz) {
	selectedQuizz.data.levels.forEach((level) => {
		levels.push(level);
	});
	levels.sort((previous, next) => next.minValue - previous.minValue);
	console.log(levels)
}

let thisQuizz;

function saveQuizz(selectedQuizz) {
	thisQuizz = selectedQuizz;
}

function load(selectedQuizz) {
	showQuizzScreen();
	loadBackgroundImg(selectedQuizz);
	loadQuizzTitle(selectedQuizz);
	loadQuizzQuestions(selectedQuizz);
	saveLevels(selectedQuizz);
	saveQuizz(selectedQuizz);
}