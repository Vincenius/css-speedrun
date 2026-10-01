import './main.js'
import {
  addRankedModeButton,
  recordRankedResult,
  showRankingViewModal,
} from './rankedMode.js'

const resultScreen = document.querySelector('#result-screen')
const timer = document.querySelector('#timer')
const levels = document.querySelector('#levels')

let recorded = false

const parseDisplayedTime = (value) => {
  const match = value.match(/^(\d+):(\d+):(\d)$/)
  if (!match) return null

  const minutes = Number(match[1])
  const seconds = Number(match[2])
  const tenths = Number(match[3])

  return minutes * 60 + seconds + tenths / 10
}

const getCurrentDifficulty = () => {
  const active = document.querySelector(
    '#difficulty-selector .difficulty-button.active'
  )

  return active ? active.dataset.difficulty : 'facil'
}

const showResultSummary = (result) => {
  if (!result || !resultScreen) return

  const summary = document.createElement('p')
  summary.className = 'ranking-result-summary'
  summary.textContent = result.position
    ? `🏆 Ranking: ${result.position}º lugar · ${result.score.timePretty}`
    : `🏆 Resultado registrado: ${result.score.timePretty}`

  resultScreen.appendChild(summary)

  const rankingButton = document.createElement('button')
  rankingButton.type = 'button'
  rankingButton.className = 'ranked-button-primary'
  rankingButton.textContent = 'Ver ranking'
  rankingButton.addEventListener('click', showRankingViewModal)
  resultScreen.appendChild(rankingButton)
}

const recordCompletedRun = () => {
  if (recorded || !resultScreen || resultScreen.classList.contains('hidden')) {
    return
  }

  const finalTime = parseDisplayedTime(timer.textContent.trim())
  if (finalTime === null) return

  recorded = true
  const result = recordRankedResult(
    getCurrentDifficulty(),
    finalTime,
    levels ? levels.querySelectorAll('li.done').length : 0
  )

  showResultSummary(result)
}

addRankedModeButton()

if (resultScreen) {
  const observer = new MutationObserver(recordCompletedRun)
  observer.observe(resultScreen, { attributes: true, attributeFilter: ['class'] })
}

document.addEventListener('click', (event) => {
  if (event.target.closest('#ranked-mode-trigger')) {
    recorded = false
  }
})
