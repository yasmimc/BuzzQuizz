// global variables
// using version 2 of URL because it has more quizzes
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

  //promise.then(load)
}

getQuizzes();
