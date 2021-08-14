URL_QUIZZES =
  "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

// gets quizzes from api
function getQuizzes() {
  const promise = axios.get(URL_QUIZZES);

  promise.then(processQuizzes);
  promise.catch(handleError);
}

// filters which quizz belongs to user and which doesn't
function processQuizzes(response) {
  const communityQuizzes = document.querySelector(
    ".community-quizzes .quizzes-list"
  );
  const quizzes = response.data;
  const listId = getIdList();
  const userQuizzList = quizzes.filter((quizz) => listId.includes(quizz));
  const communityQuizzList = quizzes.filter((quizz) => !listId.includes(quizz));

  if (listId.length > 0) {
    renderUserQuizzes(userQuizzList);
  }

  communityQuizzes.innerHTML = "";
  communityQuizzList.forEach((quizz) => {
    render(quizz, communityQuizzes);
  });
}

//renders user quizzes
function renderUserQuizzes(userQuizzList) {
  showFilledUserList();

  userQuizzes.innerHTML = "";
  userQuizzList.forEach((quizz) => {
    render(quizz, userQuizzes);
  });
}

//changes hides empty list and displays 'filled' user list design
function showFilledUserList() {
  const userQuizzes = document.querySelector(".user-quizzes .quizzes-list");
  const userQuizzesEmpty = document.querySelector(".user-quizzes .empty");

  userQuizzes.parentNode.classList.remove("hidden");
  userQuizzesEmpty.classList.add("hidden");
}

//dynamically renders quizz list
function render(quizz, quizzList) {
  quizzList.innerHTML += `
        <li onclick="selectQuizz(${quizz.id});">
				  <img src="${quizz.image}" />                                                                                                     
				  <div class="gradient">
					<p>
					  ${quizz.title}
					</p>
				  </div>
				</li>`;
}

function handleError(error) {
  alert(error.response.data);
}

//changes homescreen to quizz screen when you click on a quizz - UNCOMMENT the lines below to work
function selectQuizz(quizzID) {
  const promise = axios.get(`${URL_QUIZZES}/${quizzID}`);

  // showLoadingScreen();
  // promise.then(load);
  // promise.catch(handleError);
}

//shows loading screen
function showLoadingScreen() {
  const homeScreen = document.querySelector(".screen-1");
  const loading = document.querySelector(".loading");

  homeScreen.classList.add("hidden");
  loading.classList.remove("hidden");
}
getQuizzes();

// gets id from local storage
function getIdList() {
  let idList = localStorage.getItem("idList");

  if (idList !== null) {
    idList = JSON.parse(idList);
    return idList;
  } else {
    return [];
  }
}

//the following function stores ids in the localstorage
// function storeId(promise) {
//   let id = promise.data.id;
//   let idList = getIdList();

//   idList.push(id);

//   localStorage.setItem("idList", JSON.stringify(idList));
//   getQuizzes();
// }
