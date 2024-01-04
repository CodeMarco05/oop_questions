//Funktion wird aufgerufen sobald Knopf betaetigt wird
function startQuiz(){
    let questionIndex = 0
    window.location.href = `./pages/question/question.html?questionIndex=${questionIndex}`
}