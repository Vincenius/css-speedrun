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
  hint1: 'You can target by attributes if<br/>you add them in square brackets',
  hint2: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors',
  solution: 'span[data-item]',
}
