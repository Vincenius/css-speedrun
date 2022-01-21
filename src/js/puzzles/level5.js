const code = `<div>
  <span></span>
  <code></code>
  <span></span>
  <p></p>
  <span></span>
  <span></span>
  <p></p>
  <code></code>
  <span></span>
  <p></p>
</div>`

export default {
  code,
  goal: [false, false, false, false, false, true, true, false, false, true, false, false],
  hint1: 'There is a combinator that<br/>matches following elements',
  hint2: 'https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator',
  solution: 'p ~ span',
}
