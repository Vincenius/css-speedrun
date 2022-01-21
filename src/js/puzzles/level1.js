const code = `<div>
  <p></p>
  <p class="foo"></p>
  <p></p>
  <p></p>
</div>`

export default {
  code,
  goal: [false, true, false, true, true, false],
  hint1: 'Use a CSS pseudo class that will not<br/>match the class',
  hint2: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:not',
  solution: 'p:not(.foo)',
}
