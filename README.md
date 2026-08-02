# ⌨️ Typing Simulator & Racer

![GitHub stars](https://img.shields.io/github/stars/nishansinghagomunda-sys/Typing-Simulator?style=flat-square)
![License](https://img.shields.io/github/license/nishansinghagomunda-sys/Typing-Simulator?style=flat-square)
![No dependencies](https://img.shields.io/badge/dependencies-none-brightgreen?style=flat-square)

Race your typing speed against a live pace marker — no build step, no dependencies, just open and type.

🔗 **<a href="https://typingsimulatorracer.netlify.app/" target="_blank" rel="noopener noreferrer">Try it live</a>**

<!-- 📸 Add a screenshot or short GIF of Racer mode here, e.g.: -->
<!-- ![Typing Racer demo](assets/demo.gif) -->

## What it does

- **Auto Simulator** — watches a paragraph "type itself" at a target WPM, useful as a visual pacing demo.
- **Interactive Racer** — you type against a live pace marker moving at your target WPM, with real-time correct/incorrect character highlighting and a **live WPM counter**.

Built with plain HTML, CSS, and JavaScript.

## Features

- 🔁 Switch between **Auto Simulator** and **Interactive Racer** modes on the fly
- 🎯 Adjustable target WPM (10–500), controls the pace marker speed
- ⌨️ Live character-by-character feedback (correct / incorrect highlighting)
- 📊 **Live WPM display** that updates continuously while racing:

  ```
  WPM = (correct characters / 5) / elapsed minutes
  ```

- ✍️ Custom practice text — paste your own paragraph in the collapsible options panel; clearing it restores the default text
- 🔄 Auto-restarts after finishing a pass or changing mode/speed/text

## Project structure

```
typing-racer/
├── index.html        # Markup + controls (mode select, WPM input, live WPM stat)
├── src/
│   ├── scripts.js     # App logic: pacing engine, input tracking, live WPM calc
│   └── styles.css     # Styling for the simulator box, controls, and character states
├── assets/
    └── demo.gif    # Screenshots / demo GIFs
├── README.md
├── LICENSE
└── CONTRIBUTING.md
```

## How the Live WPM counter works

- The race clock starts on your **first keystroke** in Racer mode (not on mode switch), so idle time before you start typing doesn't count against you.
- A 200ms interval recalculates WPM continuously, so the number keeps updating even if you pause mid-race — it's a true live rate, not just an end-of-race score.
- WPM only counts **correct** characters, so accuracy directly affects your displayed speed.
- The counter and clock reset automatically whenever you finish a pass, switch modes, change the target WPM, or edit the custom text.

## Usage

1. Select **Interactive Racer** from the Mode dropdown.
2. (Optional) Set a target WPM to control the pace marker, or paste custom text under **⚙️ Custom Practice Text Options**.
3. Click into the input field and start typing — the pace marker (blue underline) advances at your target speed, and your Live WPM updates as you go.
4. Finish the passage to trigger an automatic restart.

## Running locally

No build step required:

```bash
git clone https://github.com/nishansinghagomunda-sys/typing-racer.git
cd typing-racer
open index.html   # or just double-click it
```

## Customization

- **Default text**: edit `defaultParagraph` in `src/scripts.js`.
- **Colors/theme**: all styling is in `src/styles.css` using a small, consistent palette (`#007bff` accent, slate grays for text/borders).
- **WPM update frequency**: change the `200` (ms) interval in the `wpmTimer` setup inside `src/scripts.js` if you want smoother/coarser updates.

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for setup steps and ideas (sound effects, accuracy stats, dark mode, multiplayer race, and more).

## Browser support

Works in any modern evergreen browser (Chrome, Firefox, Edge, Safari). No polyfills or transpilation needed.

## License

[MIT](LICENSE)
