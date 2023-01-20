<script>
	import Header from "../components/Header.svelte";
	import Grid from "../components/Grid.svelte";
	import Button from "../components/Button.svelte";
	import Keyboard from "../components/Keyboard.svelte";
	import Popup from "../components/Popup.svelte";
	import { texts } from "../language.js";
	import { getEvaluation, getCode } from "../api.js";
	import { sleep } from "../utils.js";
	import {
		WORD_LENGTH,
		language,
		ATTEMPTS,
		FLIP_DELAY,
		FLIP_SPEED,
		letters,
		keys,
	} from "../stores.js";

	// initialize values

	let playing,
		grid,
		evaluation,
		row,
		column,
		letterEvaluation,
		popup,
		popupText,
		won,
		confirm,
		code,
		submitting;

	async function initializeValues() {
		playing = true;
		grid = new Array($ATTEMPTS)
			.fill("")
			.map(() => new Array($WORD_LENGTH).fill(""));
		evaluation = new Array($ATTEMPTS)
			.fill(0)
			.map(() => new Array($WORD_LENGTH).fill(null));
		row = 0;
		column = 0;
		letterEvaluation = Object.fromEntries(
			$letters.map((letter) => [letter, null])
		);
		popup = false;
		popupText = "";
		won = null;
		confirm = false;
		submitting = false;
		code = await getCode($language);
	}

	$: if ($language) initializeValues();

	// keyboard input

	document.addEventListener("keydown", (e) => {
		const key = e.key;
		if (key == "Enter") {
			handleSubmit();
		} else {
			pressKey(key);
		}
	});

	function handleKeyInput(e) {
		pressKey(e.detail);
	}

	function pressKey(key) {
		if (!playing || !$keys.includes(key)) return;
		if (key != "Backspace") {
			if (column < $WORD_LENGTH) {
				grid[row][column] = key;
				column++;
			}
		} else {
			if (column > 0) {
				column--;
				grid[row][column] = "";
			}
		}
	}

	// handle submit

	async function handleSubmit() {
		if (column != $WORD_LENGTH || !playing || submitting) return;
		submitting = true;
		const word = grid[row].join("");
		const evalu = await getEvaluation($language, word, code);
		if (!evalu.valid) {
			showPopup(texts.notValid[$language]);
		} else {
			evaluation[row] = evalu.letters;
			updateLetterEvaluation();
			await sleep(
				$FLIP_SPEED + ($WORD_LENGTH - 1) * $FLIP_DELAY
			);
			if (evaluation[row].every((x) => x == "correct")) {
				won = true;
				showPopup(texts.won[$language]);
				endGame();
			} else {
				if (row < $ATTEMPTS - 1) {
					column = 0;
					row++;
				} else {
					won = false;
					showPopup("Gameover");
					endGame();
				}
			}
		}
		submitting = false;
	}

	function updateLetterEvaluation() {
		for (let index = 0; index < $WORD_LENGTH; index++) {
			const letter = grid[row][index];
			if (letterEvaluation[letter] == "correct") continue;
			letterEvaluation[letter] = evaluation[row][index];
		}
	}

	function endGame() {
		playing = false;
	}

	// restart

	function handleRestart() {
		this.blur();
		if (!playing || confirm) {
			initializeValues();
		} else {
			confirm = true;
			setTimeout(() => {
				confirm = false;
			}, 5000);
		}
	}

	// share function

	async function shareResult() {
		if (playing) return;
		const languageSymbol = $language == "de" ? "🇩🇪" : "🇬🇧";
		let result = `Svordle ${languageSymbol} `;
		result += won ? (row + 1).toString() : "X";
		result += `/${$ATTEMPTS}\n\n`;
		for (let i = 0; i <= row; i++) {
			for (let j = 0; j < $WORD_LENGTH; j++) {
				switch (evaluation[i][j]) {
					case "correct":
						result += "🟩";
						break;
					case "present":
						result += "🟨";
						break;
					case "absent":
						result += "⬛";
						break;
				}
			}
			result += "\n";
		}
		result += "\n" + `https://svordle.netlify.app`;
		await navigator.clipboard.writeText(result);
		showPopup(texts.clipboard[$language]);
	}

	// popup function

	function showPopup(text, duration = 3000) {
		popupText = text;
		popup = true;
		setTimeout(() => {
			popup = false;
		}, duration);
	}
</script>

<Header />

<Grid {playing} {grid} {evaluation} currentRow={row} />

<menu>
	{#if column == $WORD_LENGTH && playing}
		<Button
			text={texts.submit[$language]}
			action={handleSubmit}
		/>
	{/if}
	<Button
		text={confirm
			? texts.confirm[$language]
			: texts.restart[$language]}
		action={handleRestart}
	/>
	{#if !playing}
		<Button text={texts.share[$language]} action={shareResult} />
	{/if}
</menu>

<Keyboard {letterEvaluation} on:key={handleKeyInput} />

{#if popup}
	<Popup bind:popup {popupText} />
{/if}

<style>
	menu {
		text-align: center;
		padding: 15px 0px;
		display: flex;
		gap: 20px;
		justify-content: center;
	}
</style>
