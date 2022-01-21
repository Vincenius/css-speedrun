const code = `<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>`

export default {
  code,
  goal: [false, true, false, false, false],
  hint1: 'Try a pseudo class that only selects<br/>the first child',
  hint2: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:first-child',
  solution: 'li:first-child',
}
