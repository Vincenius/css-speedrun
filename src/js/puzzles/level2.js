const code = `<ul>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>`

export default {
  code,
  goal: [false, false, false, true, false, true, false, true ,false],
  hint1: 'Use a CSS pseudo class that matches elements<br/>based on their position',
  hint2: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child',
  solution: 'li:nth-child(2n + 3)',
}
