//global variables
const qwertyDiv = document.getElementById('qwerty');
const phraseDiv = document.getElementById('phrase');
const scoreboardDiv = document.getElementById('scoreboard');
const mainContainer = document.querySelector('.start');
const startButton = document.querySelector('.btn__reset');
const overlayTitle = document.querySelector('.title');
const startScreen = document.getElementById('overlay');

let missed = 0;

//array of phrases
const randomPhraseArr = [
    'People say nothing is impossible but I do nothing every day',
    'If people are talking behind your back just fart',
    'I want buns of steel but I also want buns of cinnamon',
    'Did you know if you cut out coffee you will also cut out all positivity from your day',
    'Please cancel my subscription to your issues',
    'I am sorry for what I said when I was hungry',
    'In order to be number one you have to be odd',
    'Remember when you walked into a spider web and suddenly became a karate master',
    'When life gives you melons you might be dyslexic'
];

//listen for 'start game' or 'play again' button
startButton.addEventListener('click', () => {
    mainContainer.style.display = 'none';
    const ul = phraseDiv.firstElementChild;
    const li = document.querySelectorAll('li');
    //reset game to play again
    if (ul.hasChildNodes()) {
        //remove all list items 
        ul.innerHTML = "";
        //reset keyboard
        qwertyDiv.querySelectorAll('.keyrow button').forEach(btn => {
            btn.removeAttribute('class');
            btn.removeAttribute('disabled');
        });
        //reset heart icons
        scoreboardDiv.querySelectorAll('.tries img').forEach(heartImg => {
            heartImg.setAttribute('src', 'images/liveHeart.png') 
        });
    };
    //populates random puzzle phrase
    let puzzlePhrase = getRandomPhraseAsArray(randomPhraseArr);
    addPhraseToDisplay(puzzlePhrase);
    missed = 0;
});

//selects & returns a random phrase from an array
function getRandomPhraseAsArray(arrayName) {
    let randomNum = Math.floor(Math.random() * arrayName.length);
    return arrayName[randomNum];
};

//adds the random phrase to DOM
function addPhraseToDisplay(array) {
    for ( i = 0; i < array.length ; i++ ) {
        const li = document.createElement('li');
        li.textContent = array[i];
        const ul = phraseDiv.firstElementChild;
        ul.appendChild(li);
        if (array[i] === ' ') {
            li.setAttribute('class', 'space');
        } else if (array[i] = String) {
            li.setAttribute('class', 'letter');
        };
    };
};

//checks if letter is in phrase
function checkLetter(letter) {
    const li = document.getElementsByTagName('li');
    let correct = null;
    for ( i = 0; i < li.length ; i++ ) {
        if (letter === li[i].textContent.toLowerCase()) {
            li[i].classList.add("show");
            correct = letter.textContent;
        }
    };
    return correct;
};

//listen for on-screen keyboard clicks
qwertyDiv.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
        const correctLetter = checkLetter(e.target.textContent.toLowerCase());
        if (e.target.className !== "chosen") {
            e.target.className = "chosen";
            e.target.disabled = true;
            console.log(correctLetter);
        }; 
        if (correctLetter === null) {
            let image = document.getElementsByTagName("IMG");
            image[missed].src = "images/lostHeart.png";
            missed++;
        };
    }
    checkWin();
});

//check if game is won/lost
function checkWin() {
    const letterLi = document.querySelectorAll('.letter');
    const showLi = document.querySelectorAll('.show');
    if (letterLi.length === showLi.length) {
        mainContainer.classList.add("win");
        overlayTitle.textContent = "You've Won!";
        mainContainer.style.display = 'flex';
        startButton.textContent = "Play Again?"
    };
    if (missed > 4) {
        mainContainer.classList.add("lose");
        overlayTitle.textContent = "Game Over";
        mainContainer.style.display = 'flex';
        startButton.textContent = "Play Again?"
    };
};

