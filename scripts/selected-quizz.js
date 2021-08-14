const quizzScreen = document.querySelector(".screen-2");

function showQuizzScreen() {
	const loading = document.querySelector(".loading");
	const quizzesScreen = document.querySelector(".screen-1");
	quizzesScreen.classList.add("hidden");
	//loading.classList.add("hidden");
	// const quizzScreen = document.querySelector(".screen-2");
	quizzScreen.classList.remove("hidden");
}

// QUIZZ FOR TEST:
const friends = axios.get(
	"https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes/1"
);
friends.then(load);

function loadBackgroundImg(quizzContent, selectedQuizz) {
	const bgImg = selectedQuizz.data.image;
	const quizzHeader = quizzContent.querySelector(".selected-quizz");
	quizzHeader.style.backgroundImage = `url('${bgImg}')`;
}

function loadQuizzTitle(quizzContent, selectedQuizz) {
	const quizzTitle = selectedQuizz.data.title;
	const title = quizzContent.querySelector("h1");
	title.innerHTML = `${quizzTitle}`;
}

const correctAnswers = [];

function loadQuizzQuestions(quizzContent, selectedQuizz) {
	const quizzQuestions = selectedQuizz.data.questions;
	const quizz = quizzContent.querySelector(".quizz");

	for (let i = 0; i < quizzQuestions.length; i++) {
		// Load each question
		quizz.innerHTML +=
			`<div class="question" id="${i}"> 
			<h1 style="background-color: ${quizzQuestions[i].color}">${quizzQuestions[i].title}</h1>
			<div class="options">
			</div>
		</div>`

		let options = quizz.lastChild.querySelector(".options");
		let answers = quizzQuestions[i].answers;

		//Randomize answers
		answers.sort(function () {
			return Math.random() - 0.5;
		});

		for (let j = 0; j < answers.length; j++) {
			//Load each answer			
			options.innerHTML +=
			`<button class="option" id="${j}" onclick="selectAnswer(this)">
				<img src="${answers[j].image}">
				<p>${answers[j].text}</p>
			</button>`;

			//Save correct answer in a global variable
			if(answers[j].isCorrectAnswer){
				let correctAnswer = {
					question: i,
					correctOption: j
				};
				correctAnswers.push(correctAnswer);
			}
		}
	}
}

function scrollToNextQuestion(id){
	const questions = quizzScreen.querySelectorAll('.question');
	const nextId = Number(id)+1;
	const nextQuestion = questions[nextId];
	nextQuestion.scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
}

function selectAnswer(selectedOption){
	const options = selectedOption.parentNode.querySelectorAll(".option");
	for (let i = 0; i < options.length; i++) {
		//Add blur to the unselected options
		if( options[i] !== selectedOption){
			options[i].classList.add("blur")
		}
		//Removed on click on all options
		options[i].removeAttribute("onclick");

		//Change the colors of the answer texts
		const question = selectedOption.parentNode.parentNode;
		const correctAnswer = correctAnswers[question.id].correctOption;

		if(Number(options[i].id) === correctAnswer){
			let text = options[i].querySelector("p");
			text.style.color = 'green';
		}
		else {
			let text = options[i].querySelector("p");
			text.style.color = 'red';
		}

		//Scroll to next question after 2 seconds
		setTimeout(scrollToNextQuestion, 2000, question.id);
	}
}

function load(selectedQuizz) {
	showQuizzScreen();

	const quizzContent = quizzScreen.querySelector(".container");
	loadBackgroundImg(quizzContent, selectedQuizz);
	loadQuizzTitle(quizzContent, selectedQuizz);
	loadQuizzQuestions(quizzContent, selectedQuizz);
}
