const quizzScreen = document.querySelector(".screen-2");

function showQuizzScreen() {
  const loading = document.querySelector(".loading");
  const quizzesScreen = document.querySelector(".screen-1");
  quizzesScreen.classList.add("hidden");
  //loading.classList.add("hidden");
  // const quizzScreen = document.querySelector(".screen-2");
  quizzScreen.classList.remove("hidden");
}

showQuizzScreen();

// QUIZZ FOR TEST:
const friends = axios.get(
  "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes/1"
);
friends.then(load);

function load(selectedQuizz) {
  //showQuizzScreen();
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

  const questions = quizz.querySelectorAll(".question");

  for (let i = 0; i < quizzQuestions.length; i++) {
    // Load each question
    let question = questions[i].querySelector("h1");
    question.innerHTML = quizzQuestions[i].title;
    question.style.backgroundColor = `${quizzQuestions[i].color}`;

    //Load each answer
    let options = questions[i].querySelectorAll("button");
    console.log(options);
    let answers = quizzQuestions[i].answers;

    for (let j = 0; j < answers.length; j++) {
      console.log(answers[j]);
      console.log(options[j].innerHTML);

      options[j].innerHTML = `<img src="${answers[j].image}">
			<p>${answers[j].text}</p>`;
    }
  }
}
