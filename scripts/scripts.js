// global variables
URL_QUIZZES =
  "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";
const communityQuizzes = document.querySelector(
  ".community-quizzes .quizzes-list"
);

// gets quizzes from api
function getQuizzes() {
  const promise = axios.get(URL_QUIZZES);

  promise.then(renderQuizzes);
  promise.catch(handleError);
}

// insert quizzes into the list of community quizzes
function renderQuizzes(response) {
  const quizzes = response.data;

  communityQuizzes.innerHTML = "";

  for (let i = 0; quizzes.length > i; i++) {
    // function "selectQuizzes" inside li is not implemented yet (screen 2)
    communityQuizzes.innerHTML += `
        <li onclick="selectQuizz(${quizzes[i].id});">
				  <img src="${quizzes[i].image}" />                                                                                                     
				  <div class="gradient">
					<p>
					  ${quizzes[i].title}
					</p>
				  </div>
				</li>`;
  }
}

function handleError(error) {
  alert(error.response.data);
}

function selectQuizz(quizzID) {
  const promise = axios.get(`${URL_QUIZZES}/${quizzID}`);

  // showLoadingScreen();
  // promise.then(load);
  // promise.catch(handleError);
}

function showLoadingScreen() {
  const homeScreen = document.querySelector(".screen-1");
  const loading = document.querySelector(".loading");

  homeScreen.classList.add("hidden");
  loading.classList.remove("hidden");
}
getQuizzes();
