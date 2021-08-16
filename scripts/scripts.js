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
  const userQuizzList = quizzes.filter((quizz) =>
    isUserQuizz(quizz.id, listId)
  );
  const communityQuizzList = quizzes.filter(
    (quizz) => !isUserQuizz(quizz.id, listId)
  );
  const userQuizzes = document.querySelector(".user-quizzes .quizzes-list");

  if (listId.length > 0) {
    console.log(userQuizzList, userQuizzes);
    renderUserQuizzes(userQuizzList, userQuizzes);
  }

  communityQuizzes.innerHTML = "";
  communityQuizzList.forEach((quizz) => {
    render(quizz, communityQuizzes, false);
  });
}
//returns true if an id belongs to an user quizz
function isUserQuizz(id, listId) {
  if (listId.length === 0) {
    return false;
  }

  console.log(listId.some((obj) => obj.id === id));
  if (listId.some((obj) => obj.id === id)) {
    return true;
  } else {
    return false;
  }
}

//renders user quizzes
function renderUserQuizzes(userQuizzList, userQuizzes) {
  showFilledUserList(userQuizzes);

  userQuizzes.innerHTML = "";
  userQuizzList.forEach((quizz) => {
    render(quizz, userQuizzes, true);
  });
}

//changes hides empty list and displays 'filled' user list design
function showFilledUserList(userQuizzes) {
  const userQuizzesEmpty = document.querySelector(".user-quizzes .empty");

  userQuizzes.parentNode.classList.remove("hidden");
  userQuizzesEmpty.classList.add("hidden");
}

//dynamically renders quizz list
function render(quizz, quizzList, isModifiable) {
  let buttons;
  if (isModifiable) {
    buttons = addButtons(quizz);
  } else {
    buttons = ``;
  }
  quizzList.innerHTML += `
        <li onclick="selectQuizz(${quizz.id});">
				  <img src="${quizz.image}" />                                                                                                     
				  <div class="gradient">
            ${buttons}
            <p>
              ${quizz.title}
            </p>
				  </div>
				</li>`;
}

function addButtons(quizz) {
  let buttons = `<div class="modify-buttons">
              <button onclick="editQuizz(${quizz});"> <ion-icon name="create"></ion-icon></button>
              <button onclick="deleteQuizz(${quizz});"> <ion-icon name="trash"></ion-icon></ion-icon></button>
            </div>`;

  return buttons;
}

function handleError(error) {
  alert(error.response.data);
}

//changes homescreen to quizz screen when you click on a quizz - UNCOMMENT the lines below to work
function selectQuizz(quizzID) {
  const promise = axios.get(`${URL_QUIZZES}/${quizzID}`);

  changeScreen("screen-2");
  promise.then(load);
  promise.catch(handleError);
}

//changes screen
function changeScreen(toScreenName) {
  const fromScreen = document.querySelector(`main > div:not(.hidden)`);
  const toScreen = document.querySelector(`.${toScreenName}`);
  const loading = document.querySelector(".loading");

  console.log(fromScreen, toScreen);
  fromScreen.classList.add("hidden");
  loading.classList.remove("hidden");

  setTimeout(changeToScreen, 300, toScreen);
}

function changeToScreen(screen) {
  const loading = document.querySelector(".loading");
  console.log(screen);
  screen.classList.remove("hidden");
  loading.classList.add("hidden");
}

getQuizzes();

// gets id from local storage
function getIdList() {
  let idList = localStorage.getItem("ids");
  if (idList !== null) {
    idList = JSON.parse(idList);
    return idList;
  } else {
    return [];
  }
}
