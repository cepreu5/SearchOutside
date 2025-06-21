# SearchOutside - Smart Find Outside Comments

🔍 A lightweight VS Code extension that searches for the next occurrence of a term **excluding all comments** (both `/* ... */` block comments and `//` line comments).  
This also prevents **auto-expanding folded comment blocks** — perfect for keeping your editor clean and focused.

## Features

- Skips block and inline comments: `/* ... */`, `//`
- Finds next match with every command call
- Keeps folded comments collapsed
- Works in any open text file
- Fast and distraction-free

## Usage

1. Press `Ctrl+Shift+P` → `Smart Find: Next Match Outside Comments`
2. Enter the search term
3. The cursor jumps to the next match outside comments
4. Run again to cycle through more results

## Why use this?

Sometimes, you just want to find where a variable or function is **used**, not just where it's mentioned in old or disabled code.  
This tool avoids searching inside block or line comments and **doesn't unfold** large blocks you've intentionally collapsed.

---

Made with ❤️ by CX + AI

