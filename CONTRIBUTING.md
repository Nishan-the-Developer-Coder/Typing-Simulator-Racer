# Contributing to Typing Racer

Thanks for considering a contribution! This is a small, dependency-free project, so getting started is quick.

## Getting started

1. **Fork** the repo and clone your fork
2. There's no build step — just open `index.html` in a browser to see your changes live
3. Make your change in `src/scripts.js`, `src/styles.css`, or `index.html`
4. Test both **Auto Simulator** and **Interactive Racer** modes to make sure nothing broke
5. Open a Pull Request with a short description of what you changed and why

## Project structure

```
typing-racer/
├── index.html       # Markup + controls
├── src/
│   ├── scripts.js   # Pacing engine, input tracking, live WPM calculation
│   └── styles.css   # All styling
```

## Ideas for contributions

Don't feel limited to this list — but if you're looking for a starting point:

- 🔊 Sound effects on keystroke / race completion
- 📈 Post-race accuracy breakdown (accuracy %, error heatmap by character)
- 🌙 Dark mode toggle
- 🏆 Local high-score tracking (localStorage)
- 👥 Multiplayer / ghost-race mode (race against a saved past run)
- 📱 Mobile/touch keyboard support improvements
- ♿ Accessibility pass (screen reader support, keyboard-only navigation)

## Code style

- Keep it dependency-free — no frameworks or build tools unless there's a strong reason
- Match the existing style: plain JS, small focused functions, CSS kept simple
- Comment non-obvious logic (e.g. WPM timing math), but don't over-comment simple code

## Reporting bugs / suggesting features

Open an issue with:
- What you expected to happen
- What actually happened
- Steps to reproduce (for bugs)

## Code of Conduct

Be respectful and constructive. This is a small hobby-scale project — keep feedback kind and specific.
