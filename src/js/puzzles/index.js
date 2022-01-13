import level0 from './level0.js'
import level1 from './level1.js'
import level2 from './level2.js'
import level3 from './level3.js'
import level4 from './level4.js'
import level5 from './level5.js'
import level6 from './level6.js'
import level7 from './level7.js'
import level8 from './level8.js'
import level9 from './level9.js'
import level10 from './level10.js'


export default [
  level0,
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  level8,
  level9,
  level10,
].map(level => ({
  ...level,
  verificationCode: level.code.split('\n').map((row, i) => row.replace('>', ` data-row="${i}">`)).join(' ')
}))