var Start = document.querySelector("#start");
var Next = document.querySelector("#next")
var questionContainer = document.querySelector("#question-container");
var questionEl = document.querySelector("#question");
var answerOps = document.querySelector("#Choices")
var shuffledQs, currentQueIndex



Start.addEventListener('click', startGame);
Next.addEventListener('click', () =>{
    currentQueIndex++
    setNextQuestion()
    })

function startGame(){
Start.classList.add('hide');
shuffledQs = questions.sort(()=> Math.random() - .5)
currentQueIndex = 0
questionContainer.classList.remove('hide');
setNextQuestion()
}

function setNextQuestion(){
    resetState()
showQuestion(shuffledQs[currentQueIndex])
}
function showQuestion(question){
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerOps.appendChild(button)
    })
}
function resetState(){
    clearStatusClass(document.body)
   Next.classList.add('hide')
    while(answerOps.firstChild){
        answerOps.removeChild
        (answerOps.firstChild)
    }
}

function selectAnswer(e){
 var selectBtn = e.target
 var correct = selectBtn.dataset.correct
 setStatusClass(document.body, correct)
 Array.from(answerOps.children).forEach(button => {
     setStatusClass(button, button.dataset.correct)
 })
 Next.classList.remove('hide');
 if(shuffledQs.length > currentQueIndex + 1){
    Next.classList.remove('hide');
    }else {
        Start.innerText = 'Restart';
        Start.classList.remove('hide');
    }
}
function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}
function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

var questions = [
    {
        question: 'What is javascript',
        answers: [
            {text: 'A programming language',correct: true},
            {text: 'An energy drink', correct: false},
            {text: 'A language used only animals can speak', correct: false},
            {text: 'The framework for how a website looks', correct: false}
        ]
    }
]