const code = `<div>
  <div>
    <span></span>
    <code></code>
  </div>
  <div>
    <code></code>
    <span></span>
    <code></code>
  </div>
  <div>
    <span></span>
    <code class="foo"></code>
  </div>
  <span></span>
  <code></code>
</div>`

export default {
  code,
  goal: [false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false],
  hint1: 'Use a combination of the things you used before',
  hint2: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors',
  solution: 'div div span + code:not(.foo)',
}
