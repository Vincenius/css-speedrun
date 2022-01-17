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
  hint: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors',
}
