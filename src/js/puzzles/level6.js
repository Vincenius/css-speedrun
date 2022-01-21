const code = `<form>
  <input />
  <input disabled />
  <input />
  <input />
  <button disabled></button>
  <button></button>
</form>`

export default {
  code,
  goal: [false, true, false, true, true, false, true, false],
  hint1: 'You can use a pseudo-class to target<br/>elements with a specific state',
  hint2: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:enabled',
  solution: ':enabled',
}
