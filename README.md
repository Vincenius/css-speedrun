# CSS Speedrun

A small fun app to test your CSS knowledge. Find the correct CSS selectors for the 10 puzzles as fast as possible.

[https://css-speedrun.netlify.app](https://css-speedrun.netlify.app)

## Setup

- Install the app with `npm i`
- run `npm run build` to create the dist directory
- run `npm run watch` to run the dev server and watch for changes


## Create your own puzzles

To create your own puzzles check the files in `/src/js/puzzles`.

They contain the code for the puzzle and an array to mark which lines should be selected.
Also you can provide an optional hint to help others solve your puzzle.

## Solutions

<details>
	<summary>Answer list: </summary>
		Intro: <code>li:first-child</code>
  <ul>
    <li>Level 1: <code>p:not(.foo)</code></li>
    <li>Level 2: <code>li:nth-child(2n + 3)</code></li>
    <li>Level 3: <code>div > *</code></li>
    <li>Level 4: <code>span[data-item]</code></li>
    <li>Level 5: <code>p ~ span</code></li>
    <li>Level 6: <code>:enabled</code></li>
    <li>Level 7: <code>#one, #two, #five, #six, #nine</code></li>
    <li>Level 8: <code>a + span</code></li>
    <li>Level 9: <code>#foo > .foo</code></li>
    <li>Level 10: <code>div div span + code:not(.foo)</code></li>
  </ul>
</details>

## License

[MIT](https://choosealicense.com/licenses/mit/)

---

*created by [Vincent Will](https://wweb.dev/)*
