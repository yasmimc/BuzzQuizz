let quizObject;
let idQuiz;
let keyQuiz;
let urlImageQuiz = "";
let titleQuiz = "";
let questionsQuiz = [];
let levelsQuiz = [];
let amountQuestions = 0;
let amountLevels = 0;

function createQuiz() {

  document.querySelector(".screen-1").classList.add("hidden");
  document.querySelector(".screen-3").classList.remove("hidden");
  const screenInfos = document.querySelector(".create-questions-first-page");
  screenInfos.classList.remove("hidden");
  screenInfos.innerHTML += `<h1>Comece pelo começo</h1>
                                <div class="basic-quiz-info">
                                    <div class="box-information">
                                        <input type="text" class="input-title-quiz" placeholder="Título do seu quizz">   
                                        <p class="title-err hidden">O título deve ter entre 20-65 caracteres</p>                 
                                        <input type="url" class="input-image-quiz" placeholder="URL da imagem do seu quizz">
                                        <p class="url-err hidden">O valor informado não é uma URL válida</p>
                                        <input type="text" class="input-amount-questions" placeholder="Quantidade de perguntas do quizz">
                                        <p class="amount-question-err hidden">O quizz deve ter no mínimo 3 perguntas</p>
                                        <input type="text" class="input-amount-levels" placeholder="Quantidade de níveis do quizz">
                                        <p class="amount-level-err hidden">O quizz deve ter no mínimo 2 níveis</p>
                                    </div>
                                </div>
                                <button onclick="validateInformation();">Prosseguir pra criar perguntas</button>`;
}

function validateInformation() {

  const title = document.querySelector(".input-title-quiz").value;
  const urlImage = document.querySelector(".input-image-quiz").value;
  const numberQuestions = Number(document.querySelector(".input-amount-questions").value);
  const numberLevels = Number(document.querySelector(".input-amount-levels").value);
  const titleErr = document.querySelector(".title-err");
  const urlErr = document.querySelector(".url-err");
  const amountQuestionErr = document.querySelector(".amount-question-err");
  const amountLevelErr = document.querySelector(".amount-level-err");
  let validInformations = true;

  if (title == "" || title.length < 20 || title.length > 65){
    titleErr.classList.remove("hidden");
    document.querySelector(".input-title-quiz").classList.add("color-err");
    validInformations = false;
  }else if(!titleErr.classList.contains("hidden")){
    titleErr.classList.add("hidden");
    document.querySelector(".input-title-quiz").classList.remove("color-err");
  }

  if (!checkUrl(urlImage)){
    urlErr.classList.remove("hidden");
    document.querySelector(".input-image-quiz").classList.add("color-err");
    validInformations = false;
  }else if(!urlErr.classList.contains("hidden")){
    urlErr.classList.add("hidden");
    document.querySelector(".input-image-quiz").classList.remove("color-err");
  }

  if (numberQuestions < 3){
    amountQuestionErr.classList.remove("hidden");
    document.querySelector(".input-amount-questions").classList.add("color-err");
    validInformations = false;
  }else if(!amountQuestionErr.classList.contains("hidden")){
    amountQuestionErr.classList.add("hidden");
    document.querySelector(".input-amount-questions").classList.remove("color-err");
  }

  if (numberLevels < 2){
    amountLevelErr.classList.remove("hidden");
    document.querySelector(".input-amount-levels").classList.add("color-err");
    validInformations = false;
  }else if(!amountLevelErr.classList.contains("hidden")){
    amountLevelErr.classList.add("hidden");
    document.querySelector(".input-amount-levels").classList.add("color-err");
  }

  if (validInformations) {
    titleQuiz = title;
    urlImageQuiz = urlImage;
    amountQuestions = numberQuestions;
    amountLevels = numberLevels;
    renderBoxQuestion();
  }
}

function checkUrl(urlString) {
  let pattern = new RegExp("^(https?:\\/\\/)?" +
                           "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
                           "((\\d{1,3}\\.){3}\\d{1,3}))" +
                           "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
                           "(\\?[;&a-z\\d%_.~+=-]*)?" +
                           "(\\#[-a-z\\d_]*)?$","i");
  return !!pattern.test(urlString);
}

function renderBoxQuestion() {

  document.querySelector(".create-questions-first-page").classList.add("hidden");
  const screenQuestion = document.querySelector(".create-questions-second-page");
  screenQuestion.classList.remove("hidden");

  screenQuestion.innerHTML = `<h1>Crie suas perguntas</h1>`;
  for (let i = 1; i <= amountQuestions; ++i) {
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
  questionBox.innerHTML = `<div class="box-information  numberQuestion${questionNumber}">
                                <div class="question-information">
                                    <h2>Pergunta ${questionNumber}</h2>
                                    <input type="text" class="question${questionNumber} title-question${questionNumber}" placeholder="Texto da pergunta">
                                    <p class="text-question-err hidden">A pergunta precisa ter 20 ou mais caracteres!</p>
                                    <input type="text" class="question${questionNumber} color-question${questionNumber}" placeholder="Cor de fundo da pergunta">
                                    <p class="color-format-err hidden">Cor inválida (Formato da cor: #xxxxxx)</p>
                                </div>
                                <div class="rigth-answer">
                                    <h2>Resposta correta</h2>
                                    <input type="text" class="question${questionNumber} text-rigth-answer${questionNumber}" placeholder="Texto da pergunta">
                                    <p class="rigth-answer-err hidden">É necessario uma resposta correta!</p>
                                    <input type="url" class="question${questionNumber} url-rigth-answer${questionNumber}" placeholder="URL da imagem">
                                    <p class="rigth-answer-url-err hidden">O valor informado não é uma URL válida</p>
                                </div>
                                <div class="wrong-answers">
                                    <h2>Respostas incorretas</h2>
                                    <div class="wrong-option1">
                                        <input type="text" class="question${questionNumber} text-wrong-answer1" placeholder="Resposta incorreta 1">
                                        <p class="wrong-answer-err1 hidden">É necessario uma resposta incorreta!</p>
                                        <input type="url" class="question${questionNumber} url-wrong-answer1" placeholder="URL da imagem 1">
                                        <p class="wrong-answer-url-err1 hidden">O valor informado não é uma URL válida</p>
                                    </div>
                                    <div class="wrong-option2">
                                        <input type="text" class="question${questionNumber} text-wrong-answer2" placeholder="Resposta incorreta 2">
                                        <input type="url" class="question${questionNumber} url-wrong-answer2" placeholder="URL da imagem 2">
                                        <p class="wrong-answer-url-err2 hidden">O valor informado não é uma URL válida</p>
                                    </div>
                                    <div class="wrong-option3">
                                        <input type="text" class="question${questionNumber} text-wrong-answer3" placeholder="Resposta incorreta 3">
                                        <input type="url" class="question${questionNumber} url-wrong-answer3" placeholder="URL da imagem 3">
                                        <p class="wrong-answer-url-err3 hidden">O valor informado não é uma URL válida</p>
                                    </div>
                                </div>
                            </div>`;
}

function validateQuestions() {
  let validQuestions = true;
  let haveAnswer2 = true;
  let haveAnswer3 = true;
  let i = 1;

  while(i <= amountQuestions && validQuestions){

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

    const textQuestionErr = document.querySelector(`.numberQuestion${i} .text-question-err`);
    const colorFormatErr = document.querySelector(`.numberQuestion${i} .color-format-err`);
    const rigthAnswerErr = document.querySelector(`.numberQuestion${i} .rigth-answer-err`);
    const rigthAnswerUrlErr = document.querySelector(`.numberQuestion${i} .rigth-answer-url-err`);
    const wrongAnswerErr1 = document.querySelector(`.numberQuestion${i} .wrong-answer-err1`);
    const wrongAnswerUrlErr1 = document.querySelector(`.numberQuestion${i} .wrong-answer-url-err1`);
    const wrongAnswerUrlErr2 = document.querySelector(`.numberQuestion${i} .wrong-answer-url-err2`);
    const wrongAnswerUrlErr3 = document.querySelector(`.numberQuestion${i} .wrong-answer-url-err3`);

    if(titleQuestion.length < 20){
        textQuestionErr.classList.remove("hidden");
        document.querySelector(`.question${i}.title-question${i}`).classList.add("color-err");
        validQuestions = false;
    }else if(!textQuestionErr.classList.contains("hidden")){
        textQuestionErr.classList.add("hidden");
        document.querySelector(`.question${i}.title-question${i}`).classList.remove("color-err");
    }

    if(!checkColor(colorQuestion)){
        colorFormatErr.classList.remove("hidden");
        document.querySelector(`.question${i}.color-question${i}`).classList.add("color-err");
        validQuestions = false;
    }else if(!colorFormatErr.classList.contains("hidden")){
        colorFormatErr.classList.add("hidden");
        document.querySelector(`.question${i}.color-question${i}`).classList.remove("color-err");
    }

    if(rigthAnswerText === ""){
        rigthAnswerErr.classList.remove("hidden");
        document.querySelector(`.question${i}.text-rigth-answer${i}`).classList.add("color-err");
        validQuestions = false;
    }else if(!rigthAnswerErr.classList.contains("hidden")){
        rigthAnswerErr.classList.add("hidden");
        document.querySelector(`.question${i}.text-rigth-answer${i}`).classList.remove("color-err");
    }

    if(!checkUrl(rigthAnswerUrl)){
        rigthAnswerUrlErr.classList.remove("hidden");
        document.querySelector(`.question${i}.url-rigth-answer${i}`).classList.add("color-err")
        validQuestions = false;
    }else if(!rigthAnswerUrlErr.classList.contains("hidden")){
        rigthAnswerUrlErr.classList.add("hidden");
        document.querySelector(`.question${i}.url-rigth-answer${i}`).classList.remove("color-err")
    }

    if(wrongAnswerText1 === ""){
        wrongAnswerErr1.classList.remove("hidden");
        document.querySelector(`.question${i}.text-wrong-answer1`).classList.add("color-err")
        validQuestions = false;
    }else if(!wrongAnswerErr1.classList.contains("hidden")){
        wrongAnswerErr1.classList.add("hidden");
        document.querySelector(`.question${i}.text-wrong-answer1`).classList.remove("color-err")
    }

    if(!checkUrl(wrongAnswerUrl1)){
        wrongAnswerUrlErr1.classList.remove("hidden");
        document.querySelector(`.question${i}.url-wrong-answer1`).classList.add("color-err")
        validQuestions = false;
    }else if(!wrongAnswerUrlErr1.classList.contains("hidden")){
        wrongAnswerUrlErr1.classList.add("hidden");
        document.querySelector(`.question${i}.url-wrong-answer1`).classList.remove("color-err")
    }
  
    if (wrongAnswerText2 === "") haveAnswer2 = false;
    if (wrongAnswerText3 === "") haveAnswer3 = false;

    if (haveAnswer2 && !checkUrl(wrongAnswerUrl2)){
        wrongAnswerUrlErr2.classList.remove("hidden");
        document.querySelector(`.question${i}.url-wrong-answer2`).classList.add("color-err");
        validQuestions = false;
    }

    if (haveAnswer3 && !checkUrl(wrongAnswerUrl3)){
        wrongAnswerUrlErr3.classList.remove("hidden");
        document.querySelector(`.question${i}.url-wrong-answer3`).classList.add("color-err");
        validQuestions = false;
    }

    if (validQuestions) {
      let answers = [];
      answers.push({ text: rigthAnswerText, image: rigthAnswerUrl, isCorrectAnswer: true },
                   { text: wrongAnswerText1, image: wrongAnswerUrl1, isCorrectAnswer: false});

      if (haveAnswer2){
        answers.push({ text: wrongAnswerText2, image: wrongAnswerUrl2, isCorrectAnswer: false});
        if(!wrongAnswerUrlErr2.classList.contains("hidden")){
            wrongAnswerUrlErr2.classList.add("hidden");
            document.querySelector(`.question${i}.url-wrong-answer2`).classList.remove("color-err");
        }
      }

      if (haveAnswer3){
        answers.push({ text: wrongAnswerText3, image: wrongAnswerUrl3, isCorrectAnswer: false});
        if(!wrongAnswerUrlErr3.classList.contains("hidden")){
            wrongAnswerUrlErr3.classList.add("hidden");
            document.querySelector(`.question${i}.url-wrong-answer3`).classList.remove("color-err");
        }
      }

      questionsQuiz.push({ title: titleQuestion, color: colorQuestion, answers: answers,});
      answers = [];
    }
    ++i;
  }

    if(validQuestions) {
        renderBoxLevel();
    }else {
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
  for (let i = 1; i <= amountLevels; ++i) {
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
  questionBox.innerHTML = `<div class="box-information nivel${levelNumber}">
                                <div class="level-information">
                                    <h2>Nível ${levelNumber}</h2>
                                    <input type="text" class="title-level${levelNumber}"placeholder="Título do nível">
                                    <p class="title-level-err hidden">O Título de ter pelo menos 10 caracteres</p>
                                    <input type="text" class="hit-level${levelNumber}"placeholder="% de acerto mínima">
                                    <p class="hit-level-err hidden">% de acerto deve ser um número entre 0 e 100</p>
                                    <input type="text" class="url-level${levelNumber}"placeholder="URL da imagem do nível">
                                    <p class="url-level-err hidden">O valor informado não é uma URL válida</p>
                                    <input type="text" class="description description-level${levelNumber}"placeholder="Descrição do nível">
                                    <p class="description-level-err hidden">A descrição deve ter pelo menos 30 caracteres</p>
                                </div>
                            </div>`;
}

function validateLevels() {
  let validLevel = true;
  let minHit = false;
  let i = 1;

  while(i <= amountLevels && validLevel) {
    let minValue = document.querySelector(`.hit-level${i}`).value;
    const titleLevel = document.querySelector(`.title-level${i}`).value;
    const urlLevelImage = document.querySelector(`.url-level${i}`).value;
    const descriptionLevel = document.querySelector(`.description-level${i}`).value;

    const titleErr = document.querySelector(`.nivel${i} .title-level-err`);
    const hitErr = document.querySelector(`.nivel${i} .hit-level-err`);
    const urlErr = document.querySelector(`.nivel${i} .url-level-err`);
    const descriptionErr = document.querySelector(`.nivel${i} .description-level-err`);

    if(titleLevel.length < 10){
        titleErr.classList.remove("hidden");
        document.querySelector(`.title-level${i}`).classList.add("color-err");
        validLevel = false;
    }else if(!titleErr.classList.contains("hidden")){
        titleErr.classList.add("hidden");
        document.querySelector(`.title-level${i}`).classList.remove("color-err");
    }

    if(minValue === "" || Number(minValue) < 0 || Number(minValue) > 100){
        hitErr.classList.remove("hidden");
        document.querySelector(`.hit-level${i}`).classList.add("color-err");
        validLevel = false;
    }else if(!hitErr.classList.contains("hidden")){
        hitErr.classList.add("hidden");
        document.querySelector(`.hit-level${i}`).classList.remove("color-err");
    }
    
    if(!checkUrl(urlLevelImage)){
        urlErr.classList.remove("hidden");
        document.querySelector(`.url-level${i}`).classList.add("color-err");
        validLevel = false;
    }else if(!urlErr.classList.contains("hidden")){
        urlErr.classList.add("hidden");
        document.querySelector(`.url-level${i}`).classList.remove("color-err");
    }

    if(descriptionLevel.length < 30){
        descriptionErr.classList.remove("hidden");
        document.querySelector(`.description-level${i}`).classList.add("color-err");
        validLevel = false;
    }else if(!descriptionErr.classList.contains("hidden")){
        descriptionErr.classList.add("hidden");
        document.querySelector(`.description-level${i}`).classList.remove("color-err");
    }

    if (validLevel) {
      minValue = Number(minValue);
      let level = { title: titleLevel, image: urlLevelImage, text: descriptionLevel, minValue: minValue};
      levelsQuiz.push(level);
    }

    if (minValue === 0) minHit = true;
    ++i;
  }

   if(minHit){
    saveQuiz();
   }else {
    alert("Pelo menos um Título deve ter o mínimo de acerto de 0%");
    if(i-1==amountLevels){
        document.querySelector(".hit-level-err").classList.remove("hidden");
        document.querySelector(`.hit-level${i-1}`).classList.add("color-err");
    }
    levelsQuiz = [];
   }
}

function saveQuiz() {
  quizObject = {
    title: titleQuiz,
    image: urlImageQuiz,
    questions: questionsQuiz,
    levels: levelsQuiz,
  };
  const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes", quizObject);

  request.then(renderFinalPage);
  request.catch((err) => {
    alert("erro ao postar quiz");
  });
}

function renderFinalPage(response) {
  
    document.querySelector(".create-questions-third-page").classList.add("hidden");
    const finalPage = document.querySelector(".create-questions-fourth-page");
    finalPage.classList.remove("hidden");

    console.log(response)
    console.log("key: ", response.data.key);
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
}

function errorSaveQuizz() {
   alert("erro ao postar quiz");
}

function renderFinalPage(response) {

  document.querySelector(".create-questions-third-page").classList.add("hidden");
   const finalPage = document.querySelector(".create-questions-fourth-page");
   finalPage.classList.remove("hidden");

   idQuiz = response.data.id;
   keyQuiz = response.data.key;

   finalPage.innerHTML = `<h1>Seu quizz está pronto!</h1>	
                           <div class="box-image">
                               <img src="assets/simpsons.jpg" alt="" />
                               <span class="gradient"><p>${titleQuiz}</p></span>
                           </div>
                           <button class="access-quiz onclick="acessQuiz(${idQuiz});">Acessar Quizz</button>
                           <button class="back-home" onclick="backHome();">Voltar pra home</button>`
   document.querySelector(".box-image img").src = `https://http.cat/411.jpg`;
   saveId();
   saveKey();
}


function saveId() {
  let ids = [];
  if (JSON.parse(localStorage.getItem("ids"))) ids = JSON.parse(localStorage.getItem("ids"));

  ids.push({ id: idQuiz });
  localStorage.setItem("ids", JSON.stringify(ids));
}

function saveKey() {
  let keys = [];
  if (JSON.parse(localStorage.getItem("keys"))) keys = JSON.parse(localStorage.getItem("keys"));

  keys.push({ id: idQuiz, key: keyQuiz});
  localStorage.setItem("keys", JSON.stringify(keys));
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

function deleteQuizz(quizzId) {

    if (window.confirm("Você realmente deseja apagar esse quizz?")) {
      let keys = JSON.parse(localStorage.getItem("keys"));
      let keyActual = keys.filter(function(keys) { return keys.id === quizzId;});
      const response = axios.delete("https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes/"+quizzId,
                              {headers:{ "Secret-Key": keyActual[0].key}});

      response.then((reponse)=>{
        console.log("apagou com sucesso")
        let userQuizzes = JSON.parse(localStorage.getItem("ids"));
        let updatedIdList = userQuizzes.filter(function(ids) { return ids.id !== quizzId;});
        let updatedKeyList = keys.filter(function(keys) { return keys.id !== quizzId;});

        localStorage.setItem("ids", JSON.stringify(updatedIdList));
        localStorage.setItem("keys", JSON.stringify(updatedKeyList));
      })
    
      response.catch((err)=>{
        alert("Erro ao apagar o quizz tente novamente");
      })
    }

    getQuizzes();
}