import Prism from 'prismjs'
import Timer from 'easytimer.js' // https://albert-gonzalez.github.io/easytimer.js/
import puzzles from './puzzles'

const timer = new Timer()
const levelTimer = new Timer()

let levelIndex = 0
const htmlGoal = document.querySelector('#html-goal')
const htmlInput = document.querySelector('#html-preview')
const verification = document.querySelector('#verification')
const submitButton = document.querySelector('#submit')
const cssInput = document.querySelector('#css-input')
const timebox = document.querySelector('#timer')
const levelContainer = document.querySelector('#levels')

const levelItems = puzzles
  .map((p, i) => `<li data-level="${i}">
    ${i === 0 ? 'Intro' : `Level ${i}`}
    <i class="timeResult"></i>
  </li>`)
  .join(' ')
levelContainer.innerHTML = levelItems

const initLevel = () => {
  htmlInput.innerHTML = Prism.highlight(puzzles[levelIndex].code, Prism.languages.markup, 'markup');
  htmlGoal.innerHTML = puzzles[levelIndex].goal.reduce((acc, curr) => acc + (curr ? '🔵\n' : '\n'), '');
  verification.innerHTML = puzzles[levelIndex].verificationCode;
  cssInput.value = '';

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
      levelTimer.stop()
      levelTimer.start({ precision: 'secondTenths' })
      level.querySelector('.timeResult').innerHTML = `[${resultTime}]`
    }
  }

  if (levelIndex === 1) {
    timer.start({ precision: 'secondTenths' })
  }
  // todo if last level stop timer
}

const checkLevel = () => {
  const cssValue = cssInput.value
  const selectedHtml = verification.querySelectorAll(cssValue)
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
    // TODO some nice animation on timer
    levelIndex++;
    initLevel();
  }
}

initLevel()

submitButton.addEventListener('click', checkLevel)
cssInput.addEventListener('keypress', e => {
  if (e.keyCode === 13) { // check on enter
    checkLevel()
  }
})

timer.addEventListener('secondTenthsUpdated', function (e) {
  timebox.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths']);
})