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
  hint: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator'
}
