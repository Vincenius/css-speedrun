const code = `<form>
  <input></input>
  <input disabled></input>
  <input></input>
  <input></input>
  <button disabled></button>
  <button></button>
</form>`

export default {
  code,
  goal: [false, true, false, true, true, false, true, false],
  hint: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:enabled',
}
