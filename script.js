const rules = document.querySelector('#rules');
const rulesBG = document.querySelector('#rules-bg');
const toggleMode = document.querySelector('#toggle-mode');
const showRulesButton = document.querySelector('#show-rules');
const closeRulesButton = document.querySelectorAll('.close-rules');

const rockButton = document.querySelector('#rock-button');
const paperButton = document.querySelector('#paper-button');
const advancedScissorsButton = document.querySelector('#scissors-button');
const advancedRockButton = document.querySelector('#advanced-rock-button');
const advancedPaperButton = document.querySelector('#advanced-paper-button');
const scissorsButton = document.querySelector('#advanced-scissors-button');
const lizardButton = document.querySelector('#advanced-lizard-button');
const spockButton = document.querySelector('#advanced-spock-button');

const normalFirstStep = document.querySelector('#normal-first-step');
const advancedFirstStep = document.querySelector('#advanced-first-step');
const secondStep = document.querySelector('#second-step');

const yourPickDisplay = document.querySelector('#your-pick');
const housePickDisplay = document.querySelector('#house-pick');

const score = document.querySelector('#score');
const results = document.querySelectorAll('.results');
const playAgainButton = document.querySelectorAll('.play-again');

const normalModeLocalStorageUrl = 'danielcaze:normal-rock-paper-scissors@1.0.0';
const advancedModeLocalStorageUrl = 'danielcaze:advanced-rock-paper-scissors@1.0.0';
let isAdvancedModeSelected = false;
let result = 0;
let advancedResult = 0;
let yourPick = '';
let housePick = '';
let isRulesOpen = false;
const Images = Object.freeze({
  rock: './images/icon-rock.svg',
  paper: './images/icon-paper.svg',
  scissors: './images/icon-scissors.svg',
  lizard: './images/icon-lizard.svg',
  spock: './images/icon-spock.svg',
})
const Values = Object.freeze({
  Rock: 'rock',
  Paper: 'paper',
  Scissors: 'scissors',
  Lizard: 'lizard',
  Spock: 'spock',
});

window.addEventListener('load', () => {
  const previousNormalValue = localStorage.getItem(normalModeLocalStorageUrl);
  const previousAdvancedValue = localStorage.getItem(advancedModeLocalStorageUrl);

  if (previousNormalValue) {
    result = Number(previousNormalValue);
    score.innerText = result;
  }
  if (previousAdvancedValue) {
    advancedResult = Number(previousAdvancedValue);
  }
})

function toggleRules() {
  rules.children[1].src = isAdvancedModeSelected ? './images/image-rules-bonus.svg' : './images/image-rules.svg'
  if (!isRulesOpen) {
    isRulesOpen = true;
    rulesBG.classList.add('modal');
    return
  }
  isRulesOpen = false;
  rulesBG.classList.remove('modal');
  return
}
showRulesButton.addEventListener('click', toggleRules);
closeRulesButton.forEach(button => button.addEventListener('click', toggleRules));

function handlePick(pick) {
  yourPick = Values[pick];
  normalFirstStep.classList.add('!hidden');
  advancedFirstStep.classList.add('!hidden');
  secondStep.classList.add('!flex');
  yourPickDisplay.classList.add('game-button', yourPick);
  yourPickDisplay.children[0].children[0].src = Images[yourPick];

  setTimeout(handleHousePick, 1500);
}

function handleHousePick() {
  const randomValue = Math.floor(Math.random() * 3);
  housePick = Object.keys(Values)[randomValue].toLowerCase();
  housePickDisplay.classList.add('game-button', housePick);
  housePickDisplay.children[0].children[0].src = Images[housePick];
  handleWinner();
}

rockButton.addEventListener('click', () => handlePick('Rock'));
paperButton.addEventListener('click', () => handlePick('Paper'));
scissorsButton.addEventListener('click', () => handlePick('Scissors'));
advancedRockButton.addEventListener('click', () => handlePick('Rock'));
advancedPaperButton.addEventListener('click', () => handlePick('Paper'));
advancedScissorsButton.addEventListener('click', () => handlePick('Scissors'));
lizardButton.addEventListener('click', () => handlePick('Lizard'));
spockButton.addEventListener('click', () => handlePick('Spock'));

function handleWinner() {
  const userWin = (yourPick === 'rock' && housePick === 'scissors')
    || (yourPick === 'rock' && housePick === 'lizard')
    || (yourPick === 'paper' && housePick === 'spock')
    || (yourPick === 'paper' && housePick === 'rock')
    || (yourPick === 'scissors' && housePick === 'paper')
    || (yourPick === 'scissors' && housePick === 'lizard')
    || (yourPick === 'lizard' && housePick === 'spock')
    || (yourPick === 'lizard' && housePick === 'paper')
    || (yourPick === 'spock' && housePick === 'scissors')
    || (yourPick === 'spock' && housePick === 'rock')
  const houseWin = (yourPick === 'scissors' && housePick === 'rock')
    || (yourPick === 'scissors' && housePick === 'spock')
    || (yourPick === 'paper' && housePick === 'scissors')
    || (yourPick === 'paper' && housePick === 'lizard')
    || (yourPick === 'rock' && housePick === 'paper')
    || (yourPick === 'rock' && housePick === 'spock')
    || (yourPick === 'lizard' && housePick === 'rock')
    || (yourPick === 'lizard' && housePick === 'scissors')
    || (yourPick === 'spock' && housePick === 'lizard')
    || (yourPick === 'spock' && housePick === 'paper')
  const tie = yourPick === housePick

  if (userWin) {
    if (isAdvancedModeSelected) {
      advancedResult += 1;
    } else {
      result += 1;
    }
    yourPickDisplay.classList.add('winner-pick');
    results.forEach(div => div.children[0].innerText = 'You win');
  } else if (houseWin) {
    if (isAdvancedModeSelected) {
      advancedResult -= 1;
    } else {
      result -= 1;
    }
    housePickDisplay.classList.add('winner-pick');
    results.forEach(div => div.children[0].innerText = 'You lose');
  } else if (tie) {
    results.forEach((div, index) => div.classList.add(index + 1 === result.length ? 'md:!flex' : '!flex'));
    results.forEach(div => div.children[0].innerText = 'You tie');
    return
  }

  if (isAdvancedModeSelected) {
    score.innerText = advancedResult;
    window.localStorage.setItem(advancedModeLocalStorageUrl, String(advancedResult))
  } else {
    score.innerText = result;
    window.localStorage.setItem(normalModeLocalStorageUrl, String(result))
  }


  results.forEach((div, index) => div.classList.add(index + 1 === result.length ? 'md:!flex' : '!flex'));
}

function resetGame() {
  yourPick = '';
  housePick = '';
  yourPickDisplay.classList.remove('winner-pick', 'rock', 'paper', 'scissors', 'game-button');
  housePickDisplay.classList.remove('winner-pick', 'rock', 'paper', 'scissors', 'game-button');
  results.forEach(div => div.classList.remove('!flex', 'md:!flex'));
  secondStep.classList.remove('!flex');
  yourPickDisplay.children[0].children[0].src = '';
  housePickDisplay.children[0].children[0].src = '';
  if (isAdvancedModeSelected) {
    advancedFirstStep.classList.remove('!hidden');
  } else {
    normalFirstStep.classList.remove('!hidden');
  }
}

playAgainButton.forEach(button => button.addEventListener('click', resetGame));

function toggleGameMode() {
  const header = document.getElementById('header');
  const titles = header.children[0].children;

  resetGame();
  if (!isAdvancedModeSelected) {
    isAdvancedModeSelected = true;
    score.innerText = advancedResult;
    normalFirstStep.classList.add('!hidden');
    advancedFirstStep.classList.remove('!hidden');
    for (const span of titles) {
      span.classList.add('text-rock-gradient-from');
      if (span.classList.contains('advanced')) {
        span.classList.remove('!hidden')
      }
    }
    return
  }
  isAdvancedModeSelected = false;
  score.innerText = result;
  normalFirstStep.classList.remove('!hidden');
  advancedFirstStep.classList.add('!hidden');
  for (const span of titles) {
    span.classList.remove('text-rock-gradient-from');
    if (span.classList.contains('advanced')) {
      span.classList.add('!hidden')
    }
  }
  return
}

toggleMode.addEventListener('click', toggleGameMode)

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && isRulesOpen) {
    isRulesOpen = false;
    rulesBG.classList.remove('modal');
  }
})

rulesBG.addEventListener('click', (event) => {
  if (event.target === rulesBG) {
    isRulesOpen = false;
    rulesBG.classList.remove('modal');
  }
})