const code = `<div id="foo">
  <div class="foo"></div>
  <div></div>
  <div>
    <div class="foo"></div>
    <div></div>
  </div>
  <div class="foo"></div>
</div>`

export default {
  code,
  goal: [false, true, false, false, false, false, false, true, false],
  hint1: 'Here, the direct child selector<br/>is helpful again',
  hint2: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator',
  solution: '#foo > .foo',
}
