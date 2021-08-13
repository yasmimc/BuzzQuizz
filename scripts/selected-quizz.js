const quizzScreen = document.querySelector(".screen-2");

function showQuizzScreen(){
	const quizzesScreen = document.querySelector(".screen-1");
	quizzesScreen.classList.add("hidden");
	// const quizzScreen = document.querySelector(".screen-2");
	quizzScreen.classList.remove("hidden");
}

showQuizzScreen();

// QUIZZ FOR TEST:
const friends = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes/1");
friends.then(load);

function load(selectedQuizz){	
	const quizzContent = quizzScreen.querySelector(".container");

	//Load background image
	const bgImg = selectedQuizz.data.image;	
	const quizzHeader = quizzContent.querySelector(".selected-quizz");
	quizzHeader.style.backgroundImage = `url('${bgImg}')`;

	//Load quizz title
	const quizzTitle = selectedQuizz.data.title;
	const title = quizzContent.querySelector("h1");
	title.innerHTML = `${quizzTitle}`;

	//Load questions
	const quizzQuestions = selectedQuizz.data.questions;
	// console.log(quizzQuestions);
	const quizz = quizzContent.querySelector(".quizz");
	// console.log(quizz)

	const questions = quizz.querySelectorAll(".question")

	for (let i = 0; i < quizzQuestions.length; i++) {
		// Load each question 
		let question = questions[i].querySelector("h1");
		question.innerHTML = quizzQuestions[i].title;
		// question.style.backgroundColor = `${quizzQuestions[i].color}`;
	}


}