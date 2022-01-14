const code = `<div>
  <p></p>
  <p class="foo"></p>
  <p></p>
  <p></p>
</div>`

export default {
  code,
  goal: [false, true, false, true, true, false],
  hint: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:not'
}
