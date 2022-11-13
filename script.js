let wordList = ['issue', 'rob', 'dependence', 'angle', 'hole', 'frank', 'application', 'delicate',
                 'committee', 'minister', 'acquit', 'student', 'ceremony', 'panel', 'trunk', 'symbol',
                 'receipt', 'nursery', 'husband', 'sniff', 'seize', 'growth', 'mature', 'ignorant',
                 'central', 'elaborate', 'short', 'essay', 'harmful', 'pigeon', 'standard', 'learn',
                 'orientation', 'sugar', 'speaker', 'stadium', 'dance', 'suspect', 'oppose', 'desk',
                 'weigh', 'mystery', 'launch', 'raw', 'undertake', 'triangle', 'tune', 'weak', 'psychology',
                 'miracle', 'keep', 'amber', 'tough', 'terrify', 'loan', 'circulate', 'coup', 'television',
                 'swarm', 'pocket', 'hardware', 'weapon', 'absent', 'favorable', 'shiver', 'bare', 'computer',
                 'prestige', 'last', 'ordinary', 'chew', 'affinity', 'dragon', 'shaft', 'pace', 'mile',
                 'loss', 'accent', 'mass', 'memorial', 'crutch', 'thirsty', 'advertising', 'middle', 'survival',
                 'obscure', 'haunt', 'cupboard', 'cable', 'bold', 'demonstration', 'absorption', 'sodium',
                 'mirror', 'combine', 'soil', 'coverage', 'thesis', 'temptation', 'great'];

//elements
let timerCounterElement = document.getElementById('timer');
let wordsToSolveElement = document.getElementById('wordsToSolve');
let userInputElement = document.getElementById('userInput');
let isUserCorrectElement = document.getElementById('isUserCorrect');

let gameLength = 60;
let startTime;
let currentWord;
let correctWordsCount;
let attemptCount;
let intervalID;
let isGameStarted = false;


let cleanInput = () => userInputElement.value = '';
let presentScore = () => wordsToSolveElement.innerHTML = `Game over! you scored ${correctWordsCount}/${attemptCount} words in ${gameLength} seconds`;


//shuffles array of words
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr
}


//start game loop interval
function startTimer() {
    timerCounterElement.innerHTML = 0;
    startTime = new Date();
    intervalID = setInterval(gameLoop, 1000);
}


//get current time to calculate seconds
function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}


//checks if the user still has time
function gameLoop() {
    if (getTimerTime() <= gameLength) {
        timerCounterElement.innerHTML = getTimerTime();
    }
    else {
        presentScore();
        timerCounterElement.innerHTML = 0;
        isUserCorrectElement.innerHTML = '';
        clearInterval(intervalID);
        isGameStarted = false;
    }
}


//generator function that displays one word at a time
function* generateWords(arrayOfWords) {
    shuffleArray(arrayOfWords);
    for (let i = 0; i < arrayOfWords.length; i++) {
        yield arrayOfWords[i];
    }
}


//initializing word generator object
let wordGeneratorObject = generateWords(wordList);
wordGeneratorObject.next();


function generateNewWord() {
    wordsToSolveElement.innerHTML = wordGeneratorObject.next().value;
    attemptCount += 1
}


//represents the business flow of starting the game AKA clicking Enter key
function initializeGame() {
    isGameStarted = true;
    startTimer();
    generateNewWord();
    cleanInput();
    correctWordsCount = 0;
    attemptCount = 0;
}

//event listener for key presses
document.addEventListener('keyup', (e) => {
    if (e.code == 'Enter')
        {   
            if (isGameStarted == false) {
                initializeGame();
            }
            
        }
    else if (e.code == "Space")
        {   
            if (isGameStarted == true){
                currentWord = userInputElement.value;
                cleanInput();
                if (currentWord.trim() == wordsToSolveElement.innerHTML) {
                    console.log('correct');
                    isUserCorrectElement.innerHTML = 'Correct!';
                    isUserCorrectElement.style = 'color: green;'
                    correctWordsCount++;
                }
                else {
                    console.log('incorrect');
                    isUserCorrectElement.innerHTML = 'Inorrect!';
                    isUserCorrectElement.style = 'color: red;';
                }
                generateNewWord();
            }
            else {
                cleanInput();
                isUserCorrectElement.innerHTML = '';
            }
            
        }    
});


    
