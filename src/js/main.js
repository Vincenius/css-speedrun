import Prism from 'prismjs'
import Timer from 'easytimer.js' // https://albert-gonzalez.github.io/easytimer.js/
import JSConfetti from 'js-confetti'
import { createPopper } from '@popperjs/core';
import puzzles from './puzzles'

const jsConfetti = new JSConfetti()
const timer = new Timer({ precision: 'secondTenths' })

let levelIndex = 0
let finalResult = ''
let isLevelSuccess = false
let hintTimeout1
let hintTimeout2
const results = []
const htmlGoal = document.querySelector('#html-goal')
const htmlInput = document.querySelector('#html-preview')
const verification = document.querySelector('#verification')
const submitButton = document.querySelector('#submit')
const cssInput = document.querySelector('#css-input')
const timebox = document.querySelector('#timer')
const levelContainer = document.querySelector('#levels')
const hintLink1 = document.querySelector('#hint1')
const hintLink2 = document.querySelector('#hint2')
const solution = document.querySelector('#solution')
const solutionCode = document.querySelector('#solution-code')
const nextLevel = document.querySelector('#next-level')
const tooltip = document.querySelector('#tooltip')

const levelItems = puzzles
  .map((p, i) => `<li data-level="${i}">
    ${i === 0 ? 'Intro' : `Level ${i}`}
    <i class="timeResult"></i>
  </li>`)
  .join(' ')
levelContainer.innerHTML = levelItems

const getFormattedNumber = i => i.toString().padStart(2, 0)

const levelSuccess = () => {
  solutionCode.innerHTML = Prism.highlight(puzzles[levelIndex].solution, Prism.languages.markup, 'css');

  levelIndex++;
  isLevelSuccess = true;
  timer.pause();
  results.push(Object.assign({}, timer.getTimeValues()))
  solution.classList.remove('hidden')
  cssInput.classList.add('success')
  clearTimeout(hintTimeout1)
  clearTimeout(hintTimeout2)

  if (levelIndex === 1) {
    nextLevel.classList.remove('hidden')
  }

  if (levelIndex === puzzles.length) {
    // last level done
    finalResult = timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths'])
    timer.stop()

    jsConfetti.addConfetti()
    jsConfetti.addConfetti({
      emojis: ['🌈', '✨', '🦄'],
      emojiSize: 50,
      confettiNumber: 50,
    })
    timebox.classList.add('done')
    submitButton.setAttribute('disabled', true)
    cssInput.setAttribute('disabled', true)

    generateWinScreen()
  }

  // update level sidebar
  for (let level of document.querySelectorAll('#levels > li')) {
    const levelNumber = parseInt(level.getAttribute('data-level'))

    if (levelNumber === levelIndex) {
      level.classList.add('active')
    }
    if (levelNumber === (levelIndex - 1)) {
      level.classList.remove('active')
      level.classList.add('done')
      const prevResult = results[levelNumber - 1] || { minutes: 0, seconds: 0, secondTenths: 0 }
      const newResult = results[levelNumber]
      const difference = (newResult.secondTenths - prevResult.secondTenths)
        + ((newResult.seconds - prevResult.seconds) * 10)
        + ((newResult.minutes - prevResult.minutes) * 600)
      const minutes = parseInt(difference / 600)
      const seconds = parseInt((difference - (minutes * 600)) / 10)
      const secondTenths = parseInt(difference - (minutes * 600) - (seconds * 10))

      const resultTime = `${getFormattedNumber(minutes)}:${getFormattedNumber(seconds)}:${secondTenths}`

      timebox.setAttribute('data-before', resultTime);
      timebox.classList.add('success');
      setTimeout(() => { timebox.classList.remove('success')}, 1500)

      level.querySelector('.timeResult').innerHTML = `[${resultTime}]`
    }
  }
}

const initLevel = () => {
  isLevelSuccess = false
  cssInput.classList.remove('success')
  solution.classList.add('hidden')
  nextLevel.classList.add('hidden')

  if (levelIndex >= 1) {
    timer.start()
  }

  // load next level
  cssInput.removeAttribute('disabled')
  htmlInput.innerHTML = Prism.highlight(puzzles[levelIndex].code, Prism.languages.markup, 'markup');
  htmlGoal.innerHTML = puzzles[levelIndex].goal.reduce((acc, curr) => acc + (curr ? '➡️\n' : '\n'), '');
  verification.innerHTML = puzzles[levelIndex].verificationCode;

  hintLink1.classList.remove('fade-in')
  hintLink2.classList.remove('fade-in')
  clearTimeout(hintTimeout1)
  clearTimeout(hintTimeout2)

  if (puzzles[levelIndex].hint1) {
    tooltip.innerHTML = puzzles[levelIndex].hint1
    hintTimeout1 = setTimeout(() => {
      hintLink1.classList.add('fade-in')
    }, 10000) // show hint after 10 secs
  }
  if (puzzles[levelIndex].hint2) {
    hintLink2.setAttribute('href', puzzles[levelIndex].hint2)
    hintTimeout2 = setTimeout(() => {
      hintLink2.classList.add('fade-in')
    }, 20000) // show hint after 20 secs
  }

  cssInput.value = '';
}

const checkLevel = () => {
  const cssValue = cssInput.value
  let selectedHtml
  try {
    selectedHtml = verification.querySelectorAll(`div ${cssValue}`)
  } catch (e) {
    // ignore invalid css
    cssInput.classList.add('error')
    selectedHtml = []
  }
  const selectedRows = Array.from(selectedHtml).map(elem => parseInt(elem.getAttribute('data-row')))

  const result = puzzles[levelIndex].goal.map((expectedResult, i) =>
    selectedRows.includes(i) === expectedResult
  )
  const completedLevel = result.every(r => r)

  // use loop to keep it readable
  let resultString = ''
  let rowResult
  for (let i = 0; i < puzzles[levelIndex].goal.length; i++) {
    if (puzzles[levelIndex].goal[i]) { // should be selected
      rowResult = result[i] ? '<li class="correct"></li>' : '<li></li>'
    } else { // should not be selected
      rowResult = result[i] ? '<li></li>' : '<li class="wrong"></li>'
    }
    resultString += rowResult
  }

  if (!htmlInput.querySelector('.check')) {
    htmlInput.innerHTML = htmlInput.innerHTML + '<ul class="check"></ul>'
  }
  htmlInput.querySelector('.check').innerHTML = resultString

  if (completedLevel) {
    levelSuccess()
  }
}

const generateWinScreen = () => {
  const tweetLink = document.querySelector('#share-tweet')
  const winTweetText = `I've solved all #CSS puzzles on CSS Speedrun™ within ${finalResult} and all I got was this stupid tweet.

https://css-speedrun.netlify.app/`

  tweetLink.setAttribute('href', `https://twitter.com/intent/tweet?text=${encodeURI(winTweetText).replace('#', '%23')}`)
  // document.querySelector('#code-screen').classList.add('hidden')
  document.querySelector('#result-screen').classList.remove('hidden')
}

initLevel()

submitButton.addEventListener('click', () => {
  cssInput.classList.remove('error')
  if (isLevelSuccess) {
    initLevel()
  } else {
    checkLevel()
  }
})
cssInput.addEventListener('keypress', e => {
  cssInput.classList.remove('error')
  if (e.keyCode === 13) { // check on enter
    if (isLevelSuccess) {
      initLevel()
    } else {
      checkLevel()
    }
  }
})

timer.addEventListener('secondTenthsUpdated', function (e) {
  timebox.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths']);
})

// TOOLTIP HINT
const popperInstance = createPopper(hintLink1, tooltip, {
  placement: 'bottom-end',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 8],
      },
    },
  ],
});

function show() {
  tooltip.setAttribute('data-show', '');
  popperInstance.update();
}

function hide() {
  tooltip.removeAttribute('data-show');
}

const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

showEvents.forEach((event) => {
  hintLink1.addEventListener(event, show);
});

hideEvents.forEach((event) => {
  hintLink1.addEventListener(event, hide);
});