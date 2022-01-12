import Prism from 'prismjs'
import Timer from 'easytimer.js' // https://albert-gonzalez.github.io/easytimer.js/
import puzzles from './puzzles'

const timer = new Timer()

let leveIndex = 0
const htmlGoal = document.querySelector('#html-goal')
const htmlInput = document.querySelector('#html-preview')
const verification = document.querySelector('#verification')
const submitButton = document.querySelector('#submit')
const cssInput = document.querySelector('#css-input')
const timebox = document.querySelector('#timer')

const initLevel = () => {
  htmlInput.innerHTML = Prism.highlight(puzzles[leveIndex].code, Prism.languages.markup, 'markup');
  htmlGoal.innerHTML = puzzles[leveIndex].goal.reduce((acc, curr) => acc + (curr ? '🔵\n' : '\n'), '');
  verification.innerHTML = puzzles[leveIndex].verificationCode;
  cssInput.value = '';
}

const checkLevel = () => {
  const cssValue = cssInput.value
  const selectedHtml = verification.querySelectorAll(cssValue)
  const selectedRows = Array.from(selectedHtml).map(elem => parseInt(elem.getAttribute('data-row')))

  const result = puzzles[leveIndex].goal.map((expectedResult, i) =>
    selectedRows.includes(i) === expectedResult
  )
  const completedLevel = result.every(r => r)

  // use loop to keep it readable
  let resultString = ''
  let rowResult
  for (let i = 0; i < puzzles[leveIndex].goal.length; i++) {
    if (puzzles[leveIndex].goal[i]) { // should be selected
      rowResult = result[i] ? '🟢\n' : '🔵\n'
    } else { // should not be selected
      rowResult = result[i] ? '\n' : '🔴\n'
    }
    resultString += rowResult
  }

  htmlGoal.innerHTML = resultString

  if (completedLevel) {
    leveIndex++;
    initLevel();
    // todo store and reset timer

    timer.start({ precision: 'secondTenths' })
    // TODO check if last level?
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