let questionData    //speichert daten zu der Frage
let questionIndex   //speichert den index für die Frage


let selectedAnswer  //speichert den index für das ausgewählte Element
let totalNumberOfQuestions

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

function submitAnswer() {
    if (!(selectedAnswer == undefined)) {
        if (questionData.answers[selectedAnswer].right == true) {
            questionIndex++
            if (questionIndex >= totalNumberOfQuestions) {
                window.location.href = "../finished/finished.html"
            } else {
                window.location.href = `./question.html?questionIndex=${questionIndex}`
            }

        } else {
            alert('Falsche Antwort, versuche es erneut ;)')
        }
    } else {
        alert('Bitte wähle eine Option aus!')
    }
}

window.onload = async function () {
    const parameters = new URLSearchParams(window.location.search)
    questionIndex = parameters.get('questionIndex')
    await loadQuestion()
    setQuestions()
}

function setQuestions() {
    let firstElement = document.getElementById('firstAnswer')
    let secondElement = document.getElementById('secondAnswer')
    let thirdElement = document.getElementById('thirdAnswer')
    let fourthElement = document.getElementById('fourthAnswer')

    firstElement.textContent = questionData.answers[0].text
    secondElement.textContent = questionData.answers[1].text
    thirdElement.textContent = questionData.answers[2].text
    fourthElement.textContent = questionData.answers[3].text


    let question = document.getElementById('question')
    question.textContent = questionData.question
}

async function loadQuestion() {
    let jsonFilePath = "./questions.json";

    try {
        //oeffnet data.json datei
        let response = await fetch(jsonFilePath);

        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        //wandelt Variable so um, damit man mithilfe dieser Variable 
        let data = await response.json()

        totalNumberOfQuestions = data.length

        questionData = data[questionIndex]
    } catch (error) {
        // Handle errors
        console.error('Error loading JSON:', error);
    }
}