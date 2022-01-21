const code = `<div>
  <span></span>
  <p>
    <a></a>
    <span></span>
  </p>
</div>`

export default {
  code,
  goal: [false, true, true, false, false, false, false],
  hint1: 'There is a combinator to target all<br/>children of the div',
  hint2: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator',
  solution: 'div > *',
}
