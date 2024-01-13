//Funktion wird aufgerufen sobald Knopf betaetigt wird
function startQuiz(){
    let falseAnswers = 0
    localStorage.setItem('wrongAnswers', falseAnswers)
    let questionIndex = 0
    window.location.href = `./pages/question/question.html?questionIndex=${questionIndex}`
}