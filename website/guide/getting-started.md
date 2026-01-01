# Getting Started

## Installation

Install Codeshine using your preferred package manager:

::: code-group

```bash [npm]
npm install @oxog/codeshine
```

```bash [pnpm]
pnpm add @oxog/codeshine
```

```bash [yarn]
yarn add @oxog/codeshine
```

```bash [bun]
bun add @oxog/codeshine
```

:::

## Basic Usage

### Synchronous Highlighting

The simplest way to use Codeshine:

```javascript
import { highlight } from '@oxog/codeshine';

const code = `function hello(name) {
  console.log(\`Hello, \${name}!\`);
}`;

const html = highlight(code, {
  language: 'javascript',
});

// Insert into DOM
document.getElementById('code').innerHTML = html;
```

### With Options

Customize the output with options:

```javascript
import { highlight } from '@oxog/codeshine';

const html = highlight(code, {
  language: 'javascript',
  theme: 'github-dark',
  lineNumbers: true,
  highlightLines: [2, 3],
  copyButton: true,
  showLanguageBadge: true,
});
```

### Async Highlighting

For non-blocking highlighting:

```javascript
import { highlightAsync } from '@oxog/codeshine';

const html = await highlightAsync(code, {
  language: 'javascript',
  theme: 'dracula',
});
```

## Using the Codeshine Class

For multiple highlights with shared options:

```javascript
import { Codeshine } from '@oxog/codeshine';

const codeshine = new Codeshine({
  defaultLanguage: 'javascript',
  theme: 'github-dark',
});

// Highlight multiple code blocks
const html1 = codeshine.highlight('const x = 1;');
const html2 = codeshine.highlight('const y = 2;');

// Change theme
codeshine.setTheme('monokai');
const html3 = codeshine.highlight('const z = 3;');
```

## Themes

### Built-in Themes

```javascript
import { highlight, githubDark, monokai } from '@oxog/codeshine';

// Use theme by name
const html1 = highlight(code, { theme: 'github-dark' });

// Use theme object
const html2 = highlight(code, { theme: monokai });
```

### Available Themes

**Dark Themes:**
- `github-dark`
- `dracula`
- `monokai`
- `nord`
- `one-dark`
- `vscode-dark`
- `tokyo-night`
- `catppuccin-mocha`

**Light Themes:**
- `github-light`
- `one-light`
- `solarized-light`
- `vscode-light`
- `catppuccin-latte`

**Special:**
- `high-contrast-dark`
- `high-contrast-light`

## Languages

### Specifying Language

```javascript
highlight(code, { language: 'typescript' });
highlight(code, { language: 'python' });
highlight(code, { language: 'rust' });
```

### Auto Detection

```javascript
import { highlight, detectLanguage } from '@oxog/codeshine';

const result = detectLanguage(code);
if (result) {
  const html = highlight(code, { language: result.language });
}

// Or let highlight auto-detect
const html = highlight(code, { autoDetect: true });
```

## Styling

Codeshine outputs HTML with CSS classes. You can use the built-in inline styles or apply your own CSS:

### Inline Styles (Default)

Styles are included inline by default:

```javascript
const html = highlight(code, {
  theme: 'github-dark',
});
// Output includes inline styles
```

### CSS Variables

Use CSS variables for dynamic theming:

```javascript
import { generateCSSString } from '@oxog/codeshine';
import { githubDark } from '@oxog/codeshine/themes';

// Generate CSS
const css = generateCSSString(githubDark);
// Apply to your stylesheet
```

## Next Steps

- [Examples](/guide/examples) - More usage examples
- [Themes](/guide/themes) - Customize themes
- [Languages](/guide/languages) - Supported languages
