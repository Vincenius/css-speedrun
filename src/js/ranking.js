// Ranking system with localStorage persistence

const RANKING_KEY = 'css_speedrun_ranking'
const PLAYER_NAME_KEY = 'css_speedrun_player_name'
const MAX_RANKINGS_PER_DIFFICULTY = 10

// Load all rankings from localStorage
const loadAllRankings = () => {
  const stored = localStorage.getItem(RANKING_KEY)
  return stored ? JSON.parse(stored) : {}
}

// Save all rankings to localStorage
const saveAllRankings = (rankings) => {
  localStorage.setItem(RANKING_KEY, JSON.stringify(rankings))
}

// Get rankings for a specific difficulty
const getRankingByDifficulty = (difficulty) => {
  const allRankings = loadAllRankings()
  return allRankings[difficulty] || []
}

// Add a new score to the ranking
const addScore = (playerName, difficulty, finalTime, levelsCompleted) => {
  const allRankings = loadAllRankings()
  
  if (!allRankings[difficulty]) {
    allRankings[difficulty] = []
  }
  
  const newScore = {
    playerName,
    time: finalTime,
    levelsCompleted,
    date: new Date().toISOString(),
    timePretty: formatTime(finalTime)
  }
  
  allRankings[difficulty].push(newScore)
  
  // Sort by time (ascending) and keep only top 10
  allRankings[difficulty].sort((a, b) => a.time - b.time)
  allRankings[difficulty] = allRankings[difficulty].slice(0, MAX_RANKINGS_PER_DIFFICULTY)
  
  saveAllRankings(allRankings)
  
  return newScore
}

// Get player's best time for a difficulty
const getPersonalBest = (playerName, difficulty) => {
  const ranking = getRankingByDifficulty(difficulty)
  const personalScores = ranking.filter(s => s.playerName === playerName)
  
  if (personalScores.length === 0) return null
  
  return personalScores.reduce((best, current) => 
    current.time < best.time ? current : best
  )
}

// Get player's position in ranking
const getPlayerPosition = (playerName, difficulty) => {
  const ranking = getRankingByDifficulty(difficulty)
  const position = ranking.findIndex(s => s.playerName === playerName)
  return position >= 0 ? position + 1 : null
}

// Save player name
const setPlayerName = (name) => {
  localStorage.setItem(PLAYER_NAME_KEY, name)
}

// Get player name
const getPlayerName = () => {
  return localStorage.getItem(PLAYER_NAME_KEY) || ''
}

// Clear player name
const clearPlayerName = () => {
  localStorage.removeItem(PLAYER_NAME_KEY)
}

// Format time in MM:SS:T format
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = Math.floor(timeInSeconds % 60)
  const tenths = Math.floor((timeInSeconds % 1) * 10)
  
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`
}

// Clear all rankings (for testing)
const clearAllRankings = () => {
  localStorage.removeItem(RANKING_KEY)
}

export {
  loadAllRankings,
  saveAllRankings,
  getRankingByDifficulty,
  addScore,
  getPersonalBest,
  getPlayerPosition,
  setPlayerName,
  getPlayerName,
  clearPlayerName,
  formatTime,
  clearAllRankings,
  RANKING_KEY,
  PLAYER_NAME_KEY,
  MAX_RANKINGS_PER_DIFFICULTY
}
