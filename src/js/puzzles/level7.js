const code = `<ol>
  <li class="me" id="one"></li>
  <li class="you" id="two"></li>
  <li class="me" id="three"></li>
  <li class="you" id="four"></li>
  <li class="me" id="five"></li>
  <li class="you" id="six"></li>
  <li class="me" id="seven"></li>
  <li class="you" id="eight"></li>
  <li class="me" id="nine"></li>
  <li class="you" id="ten"></li>
</ol>`

export default {
  code,
  goal: [false, true, true, false, false, true, true, false, false, true, false, false],
  hint1: 'Looks stupid - but try to use<br/>the id selector for this one',
  hint2: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Selector_list',
  solution: '#one, #two, #five, #six, #nine',
}
