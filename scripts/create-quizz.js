let quizObject;
let idQuiz;
let urlImageQuiz = "";
let titleQuiz = "";
let questionsQuiz = [];
let levelsQuiz = [];
let amountQuestions = 2;
let amountLevels = 2;

function createQuiz() {
    document.querySelector(".screen-1").classList.add("hidden");
    const screenInfos = document.querySelector(".create-questions-first-page");
    screenInfos.classList.remove("hidden");
    screenInfos.innerHTML += `<h1>Comece pelo começo</h1>
                                <div class="basic-quiz-info">
                                    <div class="box-information">
                                        <input type="text" class="input-title-quiz" placeholder="Título do seu quizz">
                                        <input type="url" class="input-image-quiz" placeholder="URL da imagem do seu quizz">
                                        <input type="text" class="input-amount-questions" placeholder="Quantidade de perguntas do quizz">
                                        <input type="text" class="input-amount-levels" placeholder="Quantidade de níveis do quizz">
                                    </div>
                                </div>
                                <button onclick="validateInformation();">Prosseguir pra criar perguntas</button>`;
}

function validateInformation() {

    const title = document.querySelector(".input-title-quiz").value;
    const urlImage = document.querySelector(".input-image-quiz").value;
    const numberQuestions = Number(document.querySelector(".input-amount-questions").value);
    const numberLevels = Number(document.querySelector(".input-amount-levels").value);
    let validInformations = true;

    if(title == "" || title.length < 20 || title.length > 65) validInformations = false, alert("O título deve ter entre 20-65 caracteres");
    if(!checkUrl( urlImage)) validInformations = false, alert("Informe uma Url válida");
    if(numberQuestions < 3) validInformations = false, alert("A quantidade de perguntas deve ser maior que 2");
    if(numberLevels < 2) validInformations = false, alert("A quantidade de níveis deve ser maior que 1");

    if(validInformations){
        titleQuiz = title;
        urlImageQuiz = urlImage;
        amountQuestions = numberQuestions;
        amountLevels = numberLevels;
        alert("informações válidas");
        renderBoxQuestion();
    }else{
        alert("informações inválidas, tente novamente");
    }
}

function checkUrl(urlString) {
  let pattern = new RegExp( "^(https?:\\/\\/)?" +
                            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
                            "((\\d{1,3}\\.){3}\\d{1,3}))" +
                            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
                            "(\\?[;&a-z\\d%_.~+=-]*)?" +
                            "(\\#[-a-z\\d_]*)?$",
                            "i"
                        );
  return !!pattern.test(urlString);
}

function renderBoxQuestion() {

    document.querySelector(".create-questions-first-page").classList.add("hidden");
    const screenQuestion = document.querySelector(".create-questions-second-page");
    screenQuestion.classList.remove("hidden");
    
    screenQuestion.innerHTML = `<h1>Crie suas perguntas</h1>`;
    for(let i = 1; i <= amountQuestions; ++i) {
        let questionBox = `	<div class="box-question">
                                <span>Pergunta ${i}</span>
                                <span class="create-icon" onclick="selectedQuestion(this, ${i})"><ion-icon name="create-outline"></ion-icon></span>
                            </div>`;
    screenQuestion.innerHTML += questionBox;
  }

  let button = `<button onclick="validateQuestions();">Prosseguir pra criar níveis</button>`;
  screenQuestion.innerHTML += button;
}

function selectedQuestion(element, questionNumber) {
  const questionBox = element.parentNode;
  questionBox.classList.add("questions-info");
  questionBox.classList.remove("box-question");
  questionBox.innerHTML = "";
  questionBox.innerHTML = `<div class="box-information">
                                <div class="question-information">
                                    <h2>Pergunta ${questionNumber}</h2>
                                    <input type="text" class="question${questionNumber} title-question${questionNumber}" placeholder="Texto da pergunta">
                                    <input type="text" class="question${questionNumber} color-question${questionNumber}" placeholder="Cor de fundo da pergunta">
                                </div>
                                <div class="rigth-answer">
                                    <h2>Resposta correta</h2>
                                    <input type="text" class="question${questionNumber} text-rigth-answer${questionNumber}" placeholder="Texto da pergunta">
                                    <input type="url" class="question${questionNumber} url-rigth-answer${questionNumber}" placeholder="URL da imagem">
                                </div>
                                <div class="wrong-answers">
                                    <h2>Respostas incorretas</h2>
                                    <div class="wrong-option1">
                                        <input type="text" class="question${questionNumber} text-wrong-answer1" placeholder="Resposta incorreta 1">
                                        <input type="url" class="question${questionNumber} url-wrong-answer1" placeholder="URL da imagem 1">
                                    </div>
                                    <div class="wrong-option2">
                                        <input type="text" class="question${questionNumber} text-wrong-answer2" placeholder="Resposta incorreta 2">
                                        <input type="url" class="question${questionNumber} url-wrong-answer2" placeholder="URL da imagem 2">
                                    </div>
                                    <div class="wrong-option3">
                                        <input type="text" class="question${questionNumber} text-wrong-answer3" placeholder="Resposta incorreta 3">
                                        <input type="url" class="question${questionNumber} url-wrong-answer3" placeholder="URL da imagem 3">
                                    </div>
                                </div>
                            </div>`;
}

function validateQuestions() {

    let validQuestions = true; 
    let haveAnswer2 = true;
    let haveAnswer3 = true;
    for(let i = 1; i <= amountQuestions; ++i) {

        const titleQuestion = document.querySelector(`.question${i}.title-question${i}`).value;
        const colorQuestion = document.querySelector(`.question${i}.color-question${i}`).value;
        const rigthAnswerText = document.querySelector(`.question${i}.text-rigth-answer${i}`).value;
        const rigthAnswerUrl = document.querySelector(`.question${i}.url-rigth-answer${i}`).value;
        const wrongAnswerText1 = document.querySelector(`.question${i}.text-wrong-answer1`).value;
        const wrongAnswerUrl1 = document.querySelector(`.question${i}.url-wrong-answer1`).value;
        const wrongAnswerText2 = document.querySelector(`.question${i}.text-wrong-answer2`).value;
        const wrongAnswerUrl2 = document.querySelector(`.question${i}.url-wrong-answer2`).value;
        const wrongAnswerText3 = document.querySelector(`.question${i}.text-wrong-answer3`).value;
        const wrongAnswerUrl3 = document.querySelector(`.question${i}.url-wrong-answer3`).value;

        if(titleQuestion.length < 20 || !checkColor(colorQuestion) || rigthAnswerText === "" || !checkUrl(rigthAnswerUrl) || wrongAnswerText1 === "" || !checkUrl(wrongAnswerUrl1)) validQuestions = false;

        if(wrongAnswerText2 === "") haveAnswer2 = false;
        if(wrongAnswerText3 === "") haveAnswer3 = false;

        if(haveAnswer2 && !checkUrl(wrongAnswerUrl2)) validQuestions = false;
        if(haveAnswer3 && !checkUrl(wrongAnswerUrl3)) validQuestions = false;

        if(validQuestions) {

            let answers = [];
            answers.push({ text: rigthAnswerText, image: rigthAnswerUrl, isCorrectAnswer: true},
                         { text: wrongAnswerText1, image: wrongAnswerUrl1, isCorrectAnswer: false
                        });
            
            if(haveAnswer2) answers.push({ text: wrongAnswerText2, image: wrongAnswerUrl2, isCorrectAnswer: false});
            if(haveAnswer3) answers.push({ text: wrongAnswerText3, image: wrongAnswerUrl3, isCorrectAnswer: false});
            
            questionsQuiz.push({ title: titleQuestion, color: colorQuestion, answers: answers});
            answers = [];
        }
    }

    if(validQuestions) {
        renderBoxLevel();
    }else {
        haveAnswer2 = false;
        haveAnswer3 = false;
        validQuestions = true;
        questionsQuiz = [];
        alert("informações inválidas, tente novamente");
    }
}

function checkColor(color) {
  if (color.length === 7) {
    let pattern = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/gim);
    return !!pattern.test(color);
  }
  return false;
}

function renderBoxLevel() {

    document.querySelector(".create-questions-second-page").classList.add("hidden");
    const screenQuestion = document.querySelector(".create-questions-third-page");
    screenQuestion.classList.remove("hidden");

    screenQuestion.innerHTML += `<h1>Agora, decida os níveis</h1>`;
    for(let i = 1; i <= amountLevels; ++i) {
        let questionBox = `	<div class="box-question">
                                <span>Nível ${i}</span>
                                <span class="create-icon" onclick="selectedLevel(this, ${i})"><ion-icon name="create-outline"></ion-icon></span>
                            </div>`;
    screenQuestion.innerHTML += questionBox;
  }

  let button = `<button onclick="validateLevels();">Finalizar Quizz</button>`;
  screenQuestion.innerHTML += button;
}

function selectedLevel(element, levelNumber) {
  const questionBox = element.parentNode;
  questionBox.classList.add("questions-info");
  questionBox.classList.remove("box-question");
  questionBox.innerHTML = "";
  questionBox.innerHTML = `<div class="box-information">
                                <div class="level-information">
                                    <h2>Nível ${levelNumber}</h2>
                                    <input type="text" class="title-level${levelNumber}"placeholder="Título do nível">
                                    <input type="text" class="hit-level${levelNumber}"placeholder="% de acerto mínima">
                                    <input type="text" class="url-level${levelNumber}"placeholder="URL da imagem do nível">
                                    <input type="text" class="description description-level${levelNumber}"placeholder="Descrição do nível">
                                </div>
                            </div>`;
}

function validateLevels() {
  let validLevel;
  let minHit = false;
  for (let i = 1; i <= amountLevels; ++i) {
    validLevel = true;
    const titleLevel = document.querySelector(`.title-level${i}`).value;
    const minValue = Number(document.querySelector(`.hit-level${i}`).value);
    const urlLevelImage = document.querySelector(`.url-level${i}`).value;
    const descriptionLevel = document.querySelector(`.description-level${i}`).value;

    if (titleLevel.length < 10 || minValue < 0 || minValue > 100 || !checkUrl(urlLevelImage) || descriptionLevel.length < 30) validLevel = false;

    if (validLevel) {
      let level = { title: titleLevel, image: urlLevelImage, text: descriptionLevel, minValue: minValue};
      levelsQuiz.push(level);
    }

    if (minValue === 0) minHit = true;
  }

   if(minHit){
    saveQuiz();
   }else {
    alert("Pelo menos um Título deve ter o mínimo de acerto de 0%");
    levelsQuiz = [];
   }
}

function saveQuiz() {

    quizObject = {title : titleQuiz, image : urlImageQuiz, questions : questionsQuiz, levels : levelsQuiz};
    const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes", quizObject)

    request.then(renderFinalPage);
    request.catch((err)=>{
        alert("erro ao postar quiz");
    });
}

function renderFinalPage(response) {
  
    document.querySelector(".create-questions-third-page").classList.add("hidden");
    const finalPage = document.querySelector(".create-questions-fourth-page");
    finalPage.classList.remove("hidden");

    console.log(response)
    idQuiz = response.data.id;
    console.log("id: ",idQuiz)
    finalPage.innerHTML = `<h1>Seu quizz está pronto!</h1>
                                <div class="box-image">
                                <img src="assets/simpsons.jpg" alt="" />
                                <span class="gradient"><p>${quizObject.title}</p></span>
                            </div>
                            <button class="access-quiz" onclick="accessQuiz();">Acessar Quizz</button>
                            <button class="back-home" onclick="backHome();">Voltar pra home</button>`
    document.querySelector(".box-image img").src = `${quizObject.image}`;
    saveId();
    console.log(JSON.parse(localStorage.getItem("ids")))
}

function saveId() {
    let ids = [];
    if(JSON.parse(localStorage.getItem("ids"))) ids  = JSON.parse(localStorage.getItem("ids"));    

    ids.push({id: idQuiz});
    localStorage.setItem("ids", JSON.stringify(ids));
}

function backHome() {
    const finalPage = document.querySelector(".create-questions-fourth-page");
    finalPage.classList.add("hidden");
    document.querySelector(".screen-1").classList.remove("hidden");
    getQuizzes();
}

function accessQuiz() {
    const finalPage = document.querySelector(".create-questions-fourth-page");
    finalPage.classList.add("hidden");
    selectQuizz(idQuiz);
}
