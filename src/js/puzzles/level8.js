const code = `<div>
  <span></span>
  <p>
    <a></a>
    <span></span>
  </p>
  <p>
    <span></span>
    <a></a>
    <span></span>
    <span></span>
  </p>
  <a></a>
  <span></span>
</div>`

export default {
  code,
  goal: [false, false, false, false, true, false, false, false, false, true, false, false, false, true],
  hint1: 'Use a combinator that targets the immediate next child',
  hint2: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator',
  solution: 'a + span',
}
