var Start = document.querySelector("#start");
var Next = document.querySelector("#next");
var count = 0;
var counter = document.querySelector("#counter");
var scoreHolder = document.querySelector("#scoreContainer");
var score = -5;
var initials = document.querySelector("#initials");
var questionContainer = document.querySelector("#question-container");
var questionEl = document.querySelector("#question");
var answerOps = document.querySelector("#Choices");
var gameOver = document.querySelector("#GAMEOVER");
var shuffledQs, currentQueIndex
var scoreContainer = document.querySelector("#scoreContainer");
var userScore = document.querySelector("#user-score");
var form = document.querySelector("#form");
form.style.display = "none";
//above are the variables needed to be recorded
//start and next event listeners to start the game and go through question
Start.addEventListener('click', startGame);
Next.addEventListener('click', function(){
    currentQueIndex++
    setNextQuestion()
    })
//function to start game
function startGame(){
Start.classList.add('hide');
form.style.display = "none";
//shuffleQs is used so questions go in a random order
shuffledQs = questions.sort(function(){ Math.random() - .5})
currentQueIndex = 0
questionContainer.classList.remove('hide');
setNextQuestion()
//Timer so when the timer hits 20 the game ends
var Timer = setInterval(function(){  
    count++;
    counter.textContent = count;
   if(count >= 30){ stopTimer(Timer);
    }}, 1000)
}
//function to proceed to the next question
function setNextQuestion(){
    resetState()
showQuestion(shuffledQs[currentQueIndex])
}
//function to show every question and adds proper background from css
function showQuestion(question){
    questionEl.innerText = question.question
    question.answers.forEach( function(answer) {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerOps.appendChild(button)
    })
}
//function to reset the page to default so the previous information wont load
function resetState(){
    clearStatusClass(document.body);
   Next.classList.add('hide');
    while(answerOps.firstChild){
        answerOps.removeChild
        (answerOps.firstChild)
    }
}
//function to select an answer & randomize order of questions & restart button when questions run out
function selectAnswer(e){
 var selectBtn = e.target
 var correct = selectBtn.dataset.correct
 setStatusClass(document.body, correct)
 for(var i =0; i < answerOps.children.length; i++){
     setStatusClass(answerOps.children[i], answerOps.children[i].dataset.correct)
 }
 //Array.from(answerOps.children).forEach(button => {
 //    setStatusClass(button, button.dataset.correct)
 //})
 Next.classList.remove('hide');
 if(shuffledQs.length > currentQueIndex + 1){
    Next.classList.remove('hide');
    }else {
        Next.classList.add('hide');
        stopGame();
    }
}
//function that states when an object is correct or incorrect
function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
        score++; -1
    }else{
        element.classList.add('wrong')
        
    }
}
//removes the previous correct and wrong elements 
function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
//function ends that pops up at the end of the game when either timer runs out
//or game is finished then lets you type you initial and puts your score next to it
function stopGame(){
    questionContainer.classList.add('hide')
    gameOver.classList.remove('hide')
    form.style.display = "block";
    var submit = document.querySelector("#submit")
       submit.addEventListener('click',function(event){
           event.preventDefault();
        localStorage.setItem("initials",initials.value);
        form.style.display = "none";
        scoreContainer.classList.remove('hide');
        userScore.textContent = initials.value + " : " + score;
       })
    }
    //function that stops timer then runs game over function
function stopTimer(Timer){
           clearInterval(Timer);
        stopGame();
        }


// questions array with all of the question objects
var questions = [
    {
        question: 'What is javascript?',
        answers: [
            {text: 'A programming language',correct: true},
            {text: 'An energy drink', correct: false},
            {text: 'A language used only animals can speak', correct: false},
            {text: 'The framework for how a website looks', correct: false}
        ]
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            {text: '<javascript>',correct: false},
            {text: '<link>', correct: false},
            {text: '<js>', correct: false},
            {text: '<script>', correct: true}
        ]
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        answers: [
            {text: 'The <body> section?',correct: false},
            {text: 'Both the <head> and <body> sections?', correct: true},
            {text: 'The <head> section?', correct: false},
        ]
    },
    {
        question: 'How do you write "Hello world" in an alert box?',
        answers: [
            {text: 'msgBox("Hello world");',correct: false},
            {text: 'alertBox("Hello world");', correct: false},
            {text: 'msg("Hello world");', correct: false},
            {text: 'alert("Hello world");', correct: true}
        ]
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: [
            {text: 'function=myFunction()',correct: false},
            {text: 'function myFunction()', correct: true},
            {text: 'function:myFunction()', correct: false}
        ]
    }
]