# React switch to Style

This extension adds a keybinding to switch between Styles using the CSS Modules pattern and their corresponding React components.

## How it works?

Style files should have one of the style suffixes below and be in same folder as the code file.

`.css`, `.styl`, `.scss`, `.scss`, or `.less`

React files should have one of these suffixes:

`.js`, `.jsx`, `.ts`, `.tsx`


### Example:

Code file: `src/components/Dialog/Alert.jsx`

Style file: `src/components/Dialog/Alert.scss`

## How to use?

Note: Keep the `cmd`/`ctrl` key held down, then press `k` followed by `.`

Mac OS: `cmd+k cmd+.`

Windows: `ctrl+k ctrl+.`

## Installation

This isn't available in the plugin marketplace at the time of writing this.

For Mac users, clone the repo into your `.vscode/extensions/` directory. For others Google where your vscode extensions directory is.

```bash
# Installation steps for Mac users
cd .vscode/extensions
git clone git@github.com:benwigley/vscode-react-switch-to-style.git
```

## Thanks

Thanks to [rodrigotomonari](https://github.com/rodrigotomonari) for the providing the inspiration and much of the code for this extension via his extension [vscode-switch-to-spec](https://github.com/rodrigotomonari/vscode-switch-to-spec).
