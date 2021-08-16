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
	const quizzes = response.data;
	const communityQuizzes = document.querySelector(
		".community-quizzes .quizzes-list"
	);
	const userQuizzes = document.querySelector(".user-quizzes .quizzes-list");
	const listId = getIdList();
	const userQuizzList = quizzes.filter((quizz) =>
		isUserQuizz(quizz.id, listId)
	);
	const communityQuizzList = quizzes.filter(
		(quizz) => !isUserQuizz(quizz.id, listId)
	);

	if (listId.length > 0) {
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

  if (isModifiable) {
    stopParentFromFiring();
  }
}

function addButtons(quizz) {
	let buttons = 
	`<div class="modify-buttons">
		<button class="edit-button" onclick="qEdit(${quizz.id});"> <ion-icon name="create"></ion-icon></button>
		<button class="delete-button" onclick="qDelete(${quizz.id});"> <ion-icon name="trash"></ion-icon></ion-icon></button>
	</div>`;
	return buttons;
}

function qEdit(id) {
	let userQuizz = getIdList().find((e) => id === e.id);

	editQuizz(userQuizz);
}

function qDelete(id) {
	let userQuizz = getIdList().find((e) => id === e.id);

	deleteQuizz(userQuizz);
}

//alerts generic errors
function handleError(error) {
	alert(error.response.data);
}

//changes homescreen to quizz screen when you click on a quizz
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

	fromScreen.classList.add("hidden");
	loading.classList.remove("hidden");

	setTimeout(changeToScreen, 300, toScreen);
}

function changeToScreen(screen) {
	const loading = document.querySelector(".loading");
	screen.classList.remove("hidden");
	loading.classList.add("hidden");
}

// gets id from local storage
function getIdList() {
	let idList = localStorage.getItem("quizzInfos");
	if (idList !== null) {
		idList = JSON.parse(idList);
		return idList;
	} else {
		return [];
	}
}

function stopParentFromFiring() {
	const editButton = document.querySelector(".edit-button");
	const deleteButton = document.querySelector(".delete-button");

  if (editButton !== null) {
    editButton.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    deleteButton.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }
}

getQuizzes();

const editButton = document.querySelector(".edit-button");
editButton.addEventListener("DOMContentLoaded", stopParentFromFiring());
