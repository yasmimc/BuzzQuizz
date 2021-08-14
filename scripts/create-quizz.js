function createQuiz() {
    alert("funcionando");
}

function validateInformation(element) {
    const title = document.querySelector(".input-title-quiz").value;
    const urlImage = document.querySelector(".input-image-quiz").value;
    const amountQuestions = Number(document.querySelector(".input-amount-questions").value);
    const amountLevels = Number(document.querySelector(".input-amount-levels").value);
    let validInformations = true;

    console.log(title, urlImage, amountQuestions, amountLevels);
    if(title == "" || title.length < 20 || title.length > 65) validInformations = false, alert("O título deve ter entre 20-65 caracteres");
    if(!checkUrlImage(urlImage)) validInformations = false, alert("Informa uma Url válida");
    if(amountQuestions < 3) validInformations = false, alert("A quantidade de perguntas deve ser maior que 2");
    if(amountLevels < 2) validInformations = false, alert("A quantidade de níveis deve ser maior que 1");

    if(validInformations){
        alert("informações válidas");
        document.querySelector(".create-questions-first-page").classList.add("hidden");
        renderBoxQuestion(amountQuestions);
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

function renderBoxQuestion(amountQuestions) {
    const screenQuestion = document.querySelector(".create-questions-second-page");
    screenQuestion.classList.remove("hidden");
    
    for(let i = 1; i <= amountQuestions; ++i) {
        let questionBox = `	<div class="box-question">
                                <span>Pergunta ${i}</span>
                                <span class="create-icon" onclick="SelectedQuestion(this, ${i})"><ion-icon name="create-outline"></ion-icon></span>
                            </div>`
        screenQuestion.innerHTML += questionBox;
    }

    let button = `<button >Prosseguir pra criar níveis</button>`
    screenQuestion.innerHTML += button;
}