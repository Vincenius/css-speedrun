import level0 from './level0.js'
import level1 from './level1.js'
import level2 from './level2.js'

export default [
  level0,
  level1,
  level2,
].map(level => ({
  ...level,
  verificationCode: level.code.split('\n').map((row, i) => row.replace('>', ` data-row="${i}">`)).join(' ')
}))