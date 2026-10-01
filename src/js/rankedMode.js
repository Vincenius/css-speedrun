// Ranked Mode UI and Logic

import {
  setPlayerName,
  getPlayerName,
  clearPlayerName,
  addScore,
  getRankingByDifficulty,
  getPersonalBest,
  getPlayerPosition,
  formatTime
} from './ranking.js'

let isRankedMode = false
let currentPlayerName = ''

// Create ranked mode modal
const createRankedModeModal = () => {
  const modal = document.createElement('div')
  modal.id = 'ranked-mode-modal'
  modal.className = 'ranked-modal-overlay'
  modal.innerHTML = `
    <div class="ranked-modal-content">
      <h2>🏆 Modo Ranqueado</h2>
      <p>Digite seu nome para participar do ranking:</p>
      
      <div class="ranked-input-group">
        <input 
          type="text" 
          id="player-name-input" 
          placeholder="Digite seu nome..." 
          maxlength="30"
          autocomplete="off"
        />
      </div>
      
      <div class="ranked-modal-buttons">
        <button id="ranked-mode-btn" class="ranked-button-primary">🎮 Jogar Ranqueado</button>
        <button id="ranked-cancel-btn" class="ranked-button-secondary">Cancelar</button>
        <button id="ranked-view-btn" class="ranked-button-secondary">👁️ Ver Ranking</button>
      </div>
    </div>
  `
  
  return modal
}

// Create ranking view modal
const createRankingViewModal = () => {
  const modal = document.createElement('div')
  modal.id = 'ranking-view-modal'
  modal.className = 'ranked-modal-overlay'
  modal.innerHTML = `
    <div class="ranked-modal-content ranking-modal">
      <h2>🏆 Ranking Global</h2>
      
      <div class="ranking-difficulty-tabs" id="ranking-tabs">
        <button class="ranking-tab-btn active" data-difficulty="facil">🟢 Fácil</button>
        <button class="ranking-tab-btn" data-difficulty="medio">🟡 Médio</button>
        <button class="ranking-tab-btn" data-difficulty="dificil">🔴 Difícil</button>
        <button class="ranking-tab-btn" data-difficulty="insano">☠️ Nightmare</button>
        <button class="ranking-tab-btn" data-difficulty="desconhecido">❓ ???</button>
      </div>
      
      <div class="ranking-list" id="ranking-list"></div>
      
      <div class="ranked-modal-buttons">
        <button id="ranking-close-btn" class="ranked-button-primary">Fechar</button>
      </div>
    </div>
  `
  
  return modal
}

// Render ranking table for a difficulty
const renderRankingTable = (difficulty) => {
  const ranking = getRankingByDifficulty(difficulty)
  const listContainer = document.getElementById('ranking-list')
  
  if (!listContainer) return
  
  if (ranking.length === 0) {
    listContainer.innerHTML = '<p class="ranking-empty">Nenhum resultado ainda. Seja o primeiro!</p>'
    return
  }
  
  let html = '<table class="ranking-table"><thead><tr><th>#</th><th>Jogador</th><th>Tempo</th><th>Data</th></tr></thead><tbody>'
  
  ranking.forEach((score, index) => {
    const date = new Date(score.date).toLocaleDateString('pt-BR')
    html += `
      <tr class="${currentPlayerName && score.playerName === currentPlayerName ? 'ranking-row-highlight' : ''}">
        <td class="ranking-position">${index + 1}</td>
        <td class="ranking-name">${score.playerName}</td>
        <td class="ranking-time">${score.timePretty}</td>
        <td class="ranking-date">${date}</td>
      </tr>
    `
  })
  
  html += '</tbody></table>'
  listContainer.innerHTML = html
}

// Show ranked mode modal
const showRankedModeModal = () => {
  const existing = document.getElementById('ranked-mode-modal')
  if (existing) existing.remove()
  
  const modal = createRankedModeModal()
  document.body.appendChild(modal)
  
  const input = document.getElementById('player-name-input')
  const playBtn = document.getElementById('ranked-mode-btn')
  const cancelBtn = document.getElementById('ranked-cancel-btn')
  const viewBtn = document.getElementById('ranked-view-btn')
  
  // Set previous name if exists
  const savedName = getPlayerName()
  if (savedName) {
    input.value = savedName
  }
  
  // Focus input
  setTimeout(() => input.focus(), 100)
  
  // Handle enter key
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      playBtn.click()
    }
  })
  
  playBtn.addEventListener('click', () => {
    const name = input.value.trim()
    if (!name) {
      alert('Por favor, digite seu nome!')
      return
    }
    
    currentPlayerName = name
    setPlayerName(name)
    isRankedMode = true
    
    modal.remove()
    startRankedMode(name)
  })
  
  cancelBtn.addEventListener('click', () => {
    modal.remove()
  })
  
  viewBtn.addEventListener('click', () => {
    modal.remove()
    showRankingViewModal()
  })
}

// Show ranking view modal
const showRankingViewModal = () => {
  const existing = document.getElementById('ranking-view-modal')
  if (existing) existing.remove()
  
  const modal = createRankingViewModal()
  document.body.appendChild(modal)
  
  // Render initial difficulty
  renderRankingTable('facil')
  
  // Handle tab clicks
  const tabs = document.querySelectorAll('.ranking-tab-btn')
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'))
      tab.classList.add('active')
      renderRankingTable(tab.dataset.difficulty)
    })
  })
  
  // Close button
  document.getElementById('ranking-close-btn').addEventListener('click', () => {
    modal.remove()
  })
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  })
}

// Start ranked mode
const startRankedMode = (playerName) => {
  console.log(`🏆 Modo Ranqueado iniciado para: ${playerName}`)
  isRankedMode = true
  currentPlayerName = playerName
}

// Record ranked result
const recordRankedResult = (difficulty, finalTime, levelsCompleted) => {
  if (!isRankedMode || !currentPlayerName) {
    return null
  }
  
  const score = addScore(currentPlayerName, difficulty, finalTime, levelsCompleted)
  
  // Show ranking result
  const position = getPlayerPosition(currentPlayerName, difficulty)
  const personalBest = getPersonalBest(currentPlayerName, difficulty)
  
  return {
    score,
    position,
    personalBest,
    isNewPersonalBest: personalBest.time === finalTime
  }
}

// Exit ranked mode
const exitRankedMode = () => {
  isRankedMode = false
  currentPlayerName = ''
}

// Add ranked mode button to difficulty selector
const addRankedModeButton = () => {
  const difficultyPanel = document.getElementById('difficulty-selector')
  if (!difficultyPanel) return
  
  const existingBtn = document.getElementById('ranked-mode-trigger')
  if (existingBtn) return
  
  const rankedBtn = document.createElement('button')
  rankedBtn.id = 'ranked-mode-trigger'
  rankedBtn.className = 'ranked-mode-button'
  rankedBtn.innerHTML = '🏆 Modo Ranqueado'
  rankedBtn.addEventListener('click', showRankedModeModal)
  
  difficultyPanel.appendChild(rankedBtn)
}

export {
  showRankedModeModal,
  showRankingViewModal,
  startRankedMode,
  recordRankedResult,
  exitRankedMode,
  isRankedMode,
  currentPlayerName,
  addRankedModeButton,
  getPlayerName,
  setPlayerName,
  clearPlayerName
}
