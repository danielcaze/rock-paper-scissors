const rules = document.querySelector('#rules');
const showRulesButton = document.querySelector('#show-rules');
const closeRulesButton = document.querySelector('#close-rules');

const rockButton = document.querySelector('#rock-button');
const paperButton = document.querySelector('#paper-button');
const scissorsButton = document.querySelector('#scissors-button');

const firstStep = document.querySelector('#first-step');
const secondStep = document.querySelector('#second-step');

const yourPickDisplay = document.querySelector('#your-pick');
const housePickDisplay = document.querySelector('#house-pick');

const results = document.querySelector('#results')
const score = document.querySelector('#score')
const playAgainButton = document.querySelector('#play-again')

const localStorageUrl = 'danielcaze:rock-paper-scissors@1.0.0'
let result = 0;
let yourPick = '';
let housePick = '';
let isRulesOpen = false;
const Images = Object.freeze({
  rock: './images/icon-rock.svg',
  paper: './images/icon-paper.svg',
  scissors: './images/icon-scissors.svg',
})
const Values = Object.freeze({
  Rock: 'rock',
  Paper: 'paper',
  Scissors: 'scissors',
});

window.addEventListener('load', () => {
  const previousValue = localStorage.getItem(localStorageUrl)
  if (previousValue) {
    result = Number(previousValue)
    score.innerText = result;
  }
})

function toggleRules() {
  if (!isRulesOpen) {
    isRulesOpen = true;
    return rules.classList.add('!flex');
  }
  isRulesOpen = false;
  return rules.classList.remove('!flex');
}
showRulesButton.addEventListener('click', toggleRules);
closeRulesButton.addEventListener('click', toggleRules);

function handlePick(pick) {
  yourPick = Values[pick];
  firstStep.classList.add('!hidden');
  secondStep.classList.add('!flex');
  yourPickDisplay.classList.add('game-button', yourPick);
  yourPickDisplay.children[0].children[0].src = Images[yourPick];

  setTimeout(handlehousePick, 3000)
}

function handlehousePick() {
  const randomValue = Math.floor(Math.random() * 3);
  housePick = Object.keys(Values)[randomValue].toLowerCase();
  housePickDisplay.classList.add('game-button', housePick);
  housePickDisplay.children[0].children[0].src = Images[housePick];
  handleWinner();
}

rockButton.addEventListener('click', () => handlePick('Rock'));
paperButton.addEventListener('click', () => handlePick('Paper'));
scissorsButton.addEventListener('click', () => handlePick('Scissors'));

function handleWinner() {
  const userWin = (yourPick === 'rock' && housePick === 'scissors') || (yourPick === 'paper' && housePick === 'rock') || (yourPick === 'scissors' && housePick === 'paper')
  const houseWin = (yourPick === 'scissors' && housePick === 'rock') || (yourPick === 'paper' && housePick === 'scissors') || (yourPick === 'rock' && housePick === 'paper')
  const tie = yourPick === housePick

  if (userWin) {
    result += 1;
    yourPickDisplay.classList.add('winner-pick');
    results.children[0].innerText = 'You win';
  } else if (houseWin) {
    result -= 1;
    housePickDisplay.classList.add('winner-pick');
    results.children[0].innerText = 'You lose';
  } else if (tie) {
    results.classList.add('!flex');
    results.children[0].innerText = 'You tie';
    return
  }
  score.innerText = result;
  window.localStorage.setItem(localStorageUrl, String(result))

  results.classList.add('!flex');
}

function resetGame() {
  yourPick = '';
  housePick = '';
  yourPickDisplay.classList.remove('winner-pick', 'rock', 'paper', 'scissors', 'game-button');
  housePickDisplay.classList.remove('winner-pick', 'rock', 'paper', 'scissors', 'game-button');
  results.classList.remove('!flex');
  firstStep.classList.remove('!hidden');
  secondStep.classList.remove('!flex');
  yourPickDisplay.children[0].children[0].src = '';
  housePickDisplay.children[0].children[0].src = '';
}

playAgainButton.addEventListener('click', resetGame);