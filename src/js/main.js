import Prism from 'prismjs'
import Timer from 'easytimer.js' // https://albert-gonzalez.github.io/easytimer.js/
import JSConfetti from 'js-confetti'
import puzzles from './puzzles'

const jsConfetti = new JSConfetti()
const timer = new Timer()
const levelTimer = new Timer()

let levelIndex = 0
let finalResult = ''
const htmlGoal = document.querySelector('#html-goal')
const htmlInput = document.querySelector('#html-preview')
const verification = document.querySelector('#verification')
const submitButton = document.querySelector('#submit')
const cssInput = document.querySelector('#css-input')
const timebox = document.querySelector('#timer')
const levelContainer = document.querySelector('#levels')
const hintLink = document.querySelector('#hint')
let hintTimeout

const levelItems = puzzles
  .map((p, i) => `<li data-level="${i}">
    ${i === 0 ? 'Intro' : `Level ${i}`}
    <i class="timeResult"></i>
  </li>`)
  .join(' ')
levelContainer.innerHTML = levelItems

const initLevel = () => {
  // update level sidebar
  for (let level of document.querySelectorAll('#levels > li')) {
    const levelNumber = parseInt(level.getAttribute('data-level'))

    if (levelNumber === levelIndex) {
      level.classList.add('active')
    }
    if (levelNumber === (levelIndex - 1)) {
      level.classList.remove('active')
      level.classList.add('done')

      const resultTime = levelTimer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths'])
      timebox.setAttribute('data-before', resultTime);
      timebox.classList.add('success');
      setTimeout(() => { timebox.classList.remove('success')}, 1500)

      levelTimer.stop()
      levelTimer.start({ precision: 'secondTenths' })
      level.querySelector('.timeResult').innerHTML = `[${resultTime}]`
    }
  }

  if (levelIndex === 1) {
    timer.start({ precision: 'secondTenths' })
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
    cssInput.setAttribute('disabled', true)
    submitButton.setAttribute('disabled', true)

    generateWinScreen()
  } else {
    // load next level
    htmlInput.innerHTML = Prism.highlight(puzzles[levelIndex].code, Prism.languages.markup, 'markup');
    htmlGoal.innerHTML = puzzles[levelIndex].goal.reduce((acc, curr) => acc + (curr ? '🔵\n' : '\n'), '');
    verification.innerHTML = puzzles[levelIndex].verificationCode;

    hintLink.classList.remove('fade-in')
    clearTimeout(hintTimeout)

    if (puzzles[levelIndex].hint) {
      hintLink.setAttribute('href', puzzles[levelIndex].hint)
      hintTimeout = setTimeout(() => {
        hintLink.classList.add('fade-in')
      }, 10000) // show hint after 10 secs
    }
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
      rowResult = result[i] ? '🟢\n' : '🔵\n'
    } else { // should not be selected
      rowResult = result[i] ? '\n' : '🔴\n'
    }
    resultString += rowResult
  }

  htmlGoal.innerHTML = resultString

  if (completedLevel) {
    levelIndex++;
    initLevel();
  }
}

const generateWinScreen = () => {
  const tweetLink = document.querySelector('#share-tweet')
  const winTweetText = `I've solved all #CSS puzzles on CSS Speedrun™ within ${finalResult} and all I got was this stupid tweet.

https://css-speedrun.netlify.app/`

  tweetLink.setAttribute('href', `https://twitter.com/intent/tweet?text=${encodeURI(winTweetText).replace('#', '%23')}`)
  document.querySelector('#code-screen').classList.add('hidden')
  document.querySelector('#result-screen').classList.remove('hidden')
}

initLevel()

submitButton.addEventListener('click', checkLevel)
cssInput.addEventListener('keypress', e => {
  cssInput.classList.remove('error')
  if (e.keyCode === 13) { // check on enter
    checkLevel()
  }
})

timer.addEventListener('secondTenthsUpdated', function (e) {
  timebox.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths']);
})