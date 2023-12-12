//fetching txt file asynchronously from local storage
const fetchWords = async () => {
    try {
        const response = await fetch('WordFall.txt');
        const words = await response.text();//retrieves the data in the response
        return words.trim().split('\n').filter(word => word !== '');//arranges and puts the collected data in a standard array format
    } catch (error) {
        alert('Error fetching words');
        return [];
    }
};

//start game (calls the array, starts word fall, and starts the timer)
let wordsArray = [];

const startGame = async () => {
    wordsArray = await fetchWords();
    startWordFall();
    startTimer();
};

const startWordFall = () => {
    const fallingWords = document.getElementById('fallingWords');
    const speed = 5;
    const initDelay = 1000;

    //Todo: Set a break condition for this startWordFall

    /*declare end game function*/

    //word delay function
    setTimeout(() => {
        //new word div element
        const newWords = document.createElement('div');
        newWords.classList.add('fallingWord');// adding class to div

        //randomizing words in the array
        const randomWords = Math.floor(Math.random() * wordsArray.length);
        const words = wordsArray[randomWords];

        newWords.innerText = words;

        //append the newWords element to the fallingWords div
        fallingWords.appendChild(newWords);

        //animate words to fall from the screen
        animateWords(newWords, speed);    
    }, initDelay);
};

const animateWords = (newWords,speed) => {
    const animationDuration = 300000 / speed; 
    const screenHeight = window.innerHeight;

        // Apply CSS animation properties
        let wordElement = document.getElementById('wordElement');

        wordElement.style.animation = `fall ${animationDuration}s linear`;
        wordElement.style.top = screenHeight + 'px';
    
        // Remove the word element after animation completes
        wordElement.addEventListener('animationend', () => {
            wordElement.remove();
        });
};

//timer function
const startTimer = () => {
    let seconds = 30;
    const timerInterval = setInterval(() => {
        seconds--;

        if (seconds <= 0) {
            clearInterval(timerInterval);
            //endGame();
        }
    }, 1000);
};

//user input

const handleUserInput = () => {
    const userInput = document.getElementById('userInput');
    const currentWord = wordsArray[0];

    if (userInput.value.trim().toLowerCase() === currentWord.toLowerCase()) {
        increaseScore();
        playCorrectSound();
        wordsArray.shift(); // possiblity of udefined returned
        userInput.value = '';

        if (wordsArray.length === 0) {
            fetchWords().then(newWords => {
                wordsArray = newWords;
                startWordFall();
            });
        }
    }
};

    var myButton = document.getElementById('startBtn');

    // Define a function that will be called when the button is clicked
    function handleClick() {
        startGame()
        }

    
    myButton.addEventListener('click', handleClick);



/*fetch('WordFall.txt')
    .then(response => response.text())
    .then(text => console.log(text));*/


    /*var wordsArray = [];
//var txtFile = ; 

var xhr = new XMLHttpRequest();
xhr.open('GET', './WordFall.txt', true);
console.log(xhr.open('GET', './WordFall.txt', true));




//call back function for onreadystatechange event
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
        console.log(xhr.responseXML);
        var xmlDoc = xhr.responseXML;

        var wordsArray = [];
        var txtFile = xmlDoc.getElementsByTagName('txtFile');

        //pushing the txtFile instance into the array
        for(var i = 0; i < txtFile.length; i++){
            wordsArray.push(txtFile[i].textContent);
        }

        //converting txt file to JSON string & saving it in local storage
        localStorage.setTxtFile('xmlWordsArray', JSON.stringify(wordsArray));
    }
};
xhr.send();*/