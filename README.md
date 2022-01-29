# Wordle made with Svelte

https://wordle-svelte.netlify.app

This is a version of [Wordle](https://www.powerlanguage.co.uk/wordle/) made with Svelte. You can choose between English and German.

<div style="display:flex;gap:20px">
<img src="./public/img/screenshot.png" width="200px">
<img src="./public/img/screenshot-de.png" width="200px">
</div>
<br>
 
The backend uses Netlify's serverless functions. The correct word is never visible to the client*. Notice that in the [Original Wordle](https://www.powerlanguage.co.uk/wordle/) the correct word is visible in the browser's localStorage, which makes it possible to cheat.

\*With some effort you can reconstruct it from the code here, though.
