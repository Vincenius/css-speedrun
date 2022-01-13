import level0 from './level0.js'
import level1 from './level1.js'
import level2 from './level2.js'
import level3 from './level3.js'

export default [
  level0,
  level1,
  level2,
  // level3,
].map(level => ({
  ...level,
  verificationCode: level.code.split('\n').map((row, i) => row.replace('>', ` data-row="${i}">`)).join(' ')
}))