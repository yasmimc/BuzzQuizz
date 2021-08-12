// global variables
// using version 2 of URL because it has more quizzes
URL_QUIZZES =
  "https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes";
const communityQuizzes = document.querySelector(
  ".community-quizzes .quizzes-list"
);

// gets quizzes from api
function getQuizzes() {
  const promise = axios.get(URL_QUIZZES);

  promise.then(renderQuizzes);
  promise.catch(handleError);
}

function renderQuizzes(response) {
  const quizzes = response.data;

  communityQuizzes.innerHTML = "";

  for (let i = 0; quizzes.length > i; i++) {
    communityQuizzes.innerHTML += `
        <li onclick="renderQuizz(this);">
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

getQuizzes();
