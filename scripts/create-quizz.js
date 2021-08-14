let quizObject = {title : "", image : "", questions : [], levels : []}
let urlImageQuiz = "";
let titleQuiz = ""
let questionsQuiz = [];
let levelsQuiz = [];
let amountQuestions = 2;
let amountLevels = 0;

function createQuiz() {
    alert("funcionando");
}

function validateInformation(element) {
    titleQuiz = document.querySelector(".input-title-quiz").value;
    urlImageQuiz = document.querySelector(".input-image-quiz").value;
    amountQuestions = Number(document.querySelector(".input-amount-questions").value);
    amountLevels = Number(document.querySelector(".input-amount-levels").value);
    let validInformations = true;

    console.log(titleQuiz, urlImageQuiz, amountQuestions, amountLevels);
    if(titleQuiz == "" || titleQuiz.length < 20 || titleQuiz.length > 65) validInformations = false, alert("O título deve ter entre 20-65 caracteres");
    if(!checkUrlImage( urlImageQuiz)) validInformations = false, alert("Informa uma Url válida");
    if(amountQuestions < 3) validInformations = false, alert("A quantidade de perguntas deve ser maior que 2");
    if(amountLevels < 2) validInformations = false, alert("A quantidade de níveis deve ser maior que 1");

    if(validInformations){
        alert("informações válidas");
        document.querySelector(".create-questions-first-page").classList.add("hidden");
        renderBoxQuestion();
    }else{
        alert("informações inválidas, tente novamente");
    }
}

function checkUrlImage(urlString){
    let pattern = new RegExp('^(https?:\\/\\/)?'+
                            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
                            '((\\d{1,3}\\.){3}\\d{1,3}))'+
                            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
                            '(\\?[;&a-z\\d%_.~+=-]*)?'+
                            '(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(urlString);
}

function renderBoxQuestion() {
    const screenQuestion = document.querySelector(".create-questions-second-page");
    screenQuestion.classList.remove("hidden");
    
    for(let i = 1; i <= amountQuestions; ++i) {
        let questionBox = `	<div class="box-question">
                                <span>Pergunta ${i}</span>
                                <span class="create-icon" onclick="selectedQuestion(this, ${i})"><ion-icon name="create-outline"></ion-icon></span>
                            </div>`
        screenQuestion.innerHTML += questionBox;
    }

    let button = `<button onclick="validateQuestions();">Prosseguir pra criar níveis</button>`
    screenQuestion.innerHTML += button;
}

function selectedQuestion(element, questionNumber){ 
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
                            </div>`
}

function validateQuestions() {
    let validQuestions = true; 
    let haveAnswer2 = true;
    let haveAnswer3 = true;
    let answers = [];
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

        if(titleQuestion.length < 20 || !checkColor(colorQuestion) || rigthAnswerText === "" || !checkUrlImage(rigthAnswerUrl) || wrongAnswerText1 === "" || !checkUrlImage(wrongAnswerUrl1)) validQuestions = false, console.log("dados basicos n");

        if(wrongAnswerText2 === "") haveAnswer2 = false;
        if(wrongAnswerText3 === "") haveAnswer3 = false;

        if(haveAnswer2 && !checkUrlImage(wrongAnswerUrl2)) validQuestions = false;
        if(haveAnswer3 && !checkUrlImage(wrongAnswerUrl3)) validQuestions = false;

        console.log(validQuestions);
        console.log(haveAnswer2);
        console.log(haveAnswer3);

        if(validQuestions) {

            answers.push({
                text: rigthAnswerText,
                image: rigthAnswerUrl,
                isCorrectAnswer: true
            },
            {
                text: wrongAnswerText1,
                image: wrongAnswerUrl1,
                isCorrectAnswer: false
            });
            
            if(haveAnswer2) {
                answers.push({
                    text: wrongAnswerText2,
                    image: wrongAnswerUrl2,
                    isCorrectAnswer: false
                });
            }

            if(haveAnswer3) {
                answers.push({
                    text: wrongAnswerText3,
                    image: wrongAnswerUrl3,
                    isCorrectAnswer: false
                });
            }


            questionsQuiz.push({
                title: titleQuestion,
                color: colorQuestion,
                answers: answers
            })
            answers = [];
        }

    }

    if(validQuestions) {
        quizObject.title = titleQuiz;
        quizObject.image = urlImageQuiz;
        quizObject.questions = questionsQuiz;
    }else {
        haveAnswer2 = false;
        haveAnswer3 = false;
    }

}

function checkColor(color){
    if(color.length === 7){
        let pattern = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/igm);
        return !!pattern.test(color);
    }
    return false;
}
    
renderBoxQuestion();
