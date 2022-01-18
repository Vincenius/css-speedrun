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
  hint: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator',
  solution: 'a + span',
}
