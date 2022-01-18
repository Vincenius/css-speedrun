const code = `<div>
  <span data-item="foo"></span>
  <span></span>
  <div>
    <span></span>
    <span data-item="bar"></span>
    <span></span>
  </div>
</div>`

export default {
  code,
  goal: [false, true, false, false, false, true, false, false, false],
  hint: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors',
  solution: 'span[data-item]',
}
