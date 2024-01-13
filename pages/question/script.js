let questionData    //speichert Daten zu der Frage
let questionIndex   //speichert den Index fuer die Frage


let selectedAnswer  //speichert den Index für das ausgeaehlte Element
let totalNumberOfQuestions


//Funktion wird aufgerufen sobald eine Antwortmöglichketi gewaehlt wird
function elementClicked(elementId) {
    if (elementId == 0) {
        document.getElementById('firstClickable').style.backgroundColor = 'steelblue'
        document.getElementById('secondClickable').style.backgroundColor = 'lightgrey'
        document.getElementById('thirdClickable').style.backgroundColor = 'lightgrey'
        document.getElementById('fourthClickable').style.backgroundColor = 'lightgrey'

        selectedAnswer = 0
    } else if (elementId == 1) {
        document.getElementById('firstClickable').style.backgroundColor = 'lightgrey'
        document.getElementById('secondClickable').style.backgroundColor = 'steelblue'
        document.getElementById('thirdClickable').style.backgroundColor = 'lightgrey'
        document.getElementById('fourthClickable').style.backgroundColor = 'lightgrey'

        selectedAnswer = 1
    } else if (elementId == 2) {
        document.getElementById('firstClickable').style.backgroundColor = 'lightgrey'
        document.getElementById('secondClickable').style.backgroundColor = 'lightgrey'
        document.getElementById('thirdClickable').style.backgroundColor = 'steelblue'
        document.getElementById('fourthClickable').style.backgroundColor = 'lightgrey'

        selectedAnswer = 2
    } else if (elementId == 3) {
        document.getElementById('firstClickable').style.backgroundColor = 'lightgrey'
        document.getElementById('secondClickable').style.backgroundColor = 'lightgrey'
        document.getElementById('thirdClickable').style.backgroundColor = 'lightgrey'
        document.getElementById('fourthClickable').style.backgroundColor = 'steelblue'

        selectedAnswer = 3
    }
}

//Funktion wird aufgerufen sobald auf den Button 'Antwort abegben' geklickt wird
function submitAnswer() {
    //pruefen, ob ausgewaehlt wurde
    if (!(selectedAnswer == undefined)) {
        //pruefen, ob ausgewaehlte Antwort korrekt
        if (questionData.answers[selectedAnswer].right == true) {
            //hochzaehlen von Index fuer die Frage --> naechste Frage
            questionIndex++
            //pruefen, ob Quiz fertig
            if (questionIndex >= totalNumberOfQuestions) {
                window.location.href = "../finished/finished.html"
            } else {
                window.location.href = `./question.html?questionIndex=${questionIndex}`
            }
        } else {
            alert('Falsche Antwort, versuche es erneut ;)')
            let wrongAnswers = localStorage.getItem('wrongAnswers')
            wrongAnswers = parseInt(wrongAnswers, 10)
            wrongAnswers++
            localStorage.setItem('wrongAnswers', wrongAnswers)
        }
    } else {
        alert('Bitte wähle eine Option aus!')
    }
}

//wird aufgerufen sobald Fenster geladen wird
window.onload = async function () {
    const parameters = new URLSearchParams(window.location.search)
    questionIndex = parameters.get('questionIndex')
    //await -> 'wartet' solange bis die Funktion beendet ist
    await loadQuestion()
    setQuestions()
    setQuestionCounter()
}

function setQuestionCounter(){
    //in Variable wird aktueller Fragenindex reingespeichert, eins hochgezaehlt und anschließend ausgegeben
    let q = Number(questionIndex) + 1
    document.getElementById('counter').innerText = `Frage ${q} von ${totalNumberOfQuestions}`
}

function setQuestions() {
    //'Textfeld' in html Dokument wird in Variable gespeichert
    let firstElement = document.getElementById('firstAnswer')
    let secondElement = document.getElementById('secondAnswer')
    let thirdElement = document.getElementById('thirdAnswer')
    let fourthElement = document.getElementById('fourthAnswer')
    //in Variable wird Frage aus json File reingespeichert -> ausgegeben
    firstElement.textContent = questionData.answers[0].text
    secondElement.textContent = questionData.answers[1].text
    thirdElement.textContent = questionData.answers[2].text
    fourthElement.textContent = questionData.answers[3].text

    //... fuer Frage in Html 
    let question = document.getElementById('question')
    //... fuer Ausgabe Frage
    question.textContent = questionData.question
}

async function loadQuestion() {
    let jsonFilePath = "./questions.json";

    try {
        //oeffnet data.json datei
        let response = await fetch(jsonFilePath);

        // checkt ob Anfrage erfolgreich war (status code 200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        //wandelt Variable so um, damit man mithilfe dieser Variable arbeiten kann -> Umwandlung
        let data = await response.json()
        
        //console.log(data);

        totalNumberOfQuestions = data.length

        questionData = data[questionIndex]
    } catch (error) {
        // Handle errors
        console.error('Error loading JSON:', error);
    }
}

