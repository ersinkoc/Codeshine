<p align="center">
  <img src="https://codeshine.oxog.dev/logo.svg" alt="Codeshine Logo" width="120" height="120">
</p>

<h1 align="center">Codeshine</h1>

<p align="center">
  <strong>The ultimate syntax highlighter - beautiful code, zero compromises</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@oxog/codeshine"><img src="https://img.shields.io/npm/v/@oxog/codeshine.svg?style=flat-square&color=blue" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@oxog/codeshine"><img src="https://img.shields.io/npm/dm/@oxog/codeshine.svg?style=flat-square&color=green" alt="npm downloads"></a>
  <a href="https://github.com/ersinkoc/codeshine/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license"></a>
  <a href="https://bundlephobia.com/package/@oxog/codeshine"><img src="https://img.shields.io/bundlephobia/minzip/@oxog/codeshine?style=flat-square&color=orange" alt="bundle size"></a>
  <img src="https://img.shields.io/badge/dependencies-0-brightgreen?style=flat-square" alt="zero dependencies">
  <a href="https://github.com/ersinkoc/codeshine/actions"><img src="https://img.shields.io/github/actions/workflow/status/ersinkoc/codeshine/ci.yml?style=flat-square" alt="build status"></a>
</p>

<p align="center">
  <a href="https://codeshine.oxog.dev">Documentation</a> |
  <a href="https://codeshine.oxog.dev/playground">Playground</a> |
  <a href="https://github.com/ersinkoc/codeshine/blob/main/CHANGELOG.md">Changelog</a>
</p>

---

## Why Codeshine?

| Feature | Codeshine | Prism | Highlight.js | Shiki |
|---------|:---------:|:-----:|:------------:|:-----:|
| Zero Dependencies | ✅ | ❌ | ✅ | ❌ |
| TypeScript Native | ✅ | ❌ | ❌ | ✅ |
| 150+ Languages | ✅ | ✅ | ✅ | ✅ |
| React/Vue/Svelte | ✅ | ❌ | ❌ | ✅ |
| Line Highlighting | ✅ | Plugin | ❌ | ✅ |
| Streaming | ✅ | ❌ | ❌ | ❌ |
| Diff View | ✅ | ❌ | ❌ | ✅ |
| Auto Detection | ✅ | ✅ | ✅ | ❌ |

## Features

- **Zero Dependencies** - No external dependencies, pure TypeScript
- **150+ Languages** - JavaScript, TypeScript, Python, Rust, Go, Haskell, and many more
- **14 Themes** - VS Code, Dracula, Nord, One Dark, GitHub, Tokyo Night, and more
- **Framework Support** - React, Vue 3, Svelte components included
- **Rich Features** - Line numbers, line highlighting, diff view, word highlighting
- **Streaming** - Progressive rendering for large files
- **CDN Ready** - Use directly in browser via unpkg/jsdelivr
- **Plugin System** - Extensible with custom transformers
- **Auto Detection** - Automatic language detection
- **TypeScript First** - Full type safety with strict mode

## Installation

```bash
# npm
npm install @oxog/codeshine

# pnpm
pnpm add @oxog/codeshine

# yarn
yarn add @oxog/codeshine

# bun
bun add @oxog/codeshine
```

### CDN Usage

```html
<!-- ESM (recommended) -->
<script type="module">
  import { highlight } from 'https://unpkg.com/@oxog/codeshine/dist/browser/codeshine.esm.min.js';

  document.getElementById('code').innerHTML = highlight('const x = 1;', {
    language: 'javascript'
  });
</script>

<!-- IIFE (for older browsers) -->
<script src="https://unpkg.com/@oxog/codeshine/dist/browser/codeshine.iife.min.js"></script>
<script>
  const { highlight } = Codeshine;
  document.getElementById('code').innerHTML = highlight('const x = 1;', {
    language: 'javascript'
  });
</script>
```

## Quick Start

```javascript
import { highlight } from '@oxog/codeshine';

const html = highlight(`
function greet(name) {
  return \`Hello, \${name}!\`;
}
`, { language: 'javascript' });

document.getElementById('code').innerHTML = html;
```

## With Options

```javascript
import { highlight, themes } from '@oxog/codeshine';

const html = highlight(code, {
  language: 'typescript',
  theme: themes.dracula,
  lineNumbers: true,
  highlightLines: [2, 3],
  copyButton: true,
  showLanguageBadge: true,
  filename: 'example.ts'
});
```

## React Integration

```tsx
import { CodeBlock, useCodeshine } from '@oxog/codeshine/react';

// Simple usage
function App() {
  return (
    <CodeBlock
      code={`console.log('Hello!');`}
      language="javascript"
      theme="dracula"
      lineNumbers
      copyButton
    />
  );
}

// With hook
function Editor() {
  const { highlight, setTheme, theme } = useCodeshine('github-dark');

  return (
    <div dangerouslySetInnerHTML={{ __html: highlight(code, { language: 'js' }) }} />
  );
}
```

## Vue 3 Integration

```vue
<script setup>
import { CodeBlock, useCodeshine } from '@oxog/codeshine/vue';

const code = `const x = 1;`;
</script>

<template>
  <CodeBlock
    :code="code"
    language="javascript"
    theme="dracula"
    :line-numbers="true"
  />
</template>
```

## Svelte Integration

```svelte
<script>
  import { CodeBlock } from '@oxog/codeshine/svelte';

  const code = `const x = 1;`;
</script>

<CodeBlock
  {code}
  language="javascript"
  theme="dracula"
  lineNumbers
/>
```

## Themes

### Dark Themes
`github-dark` | `dracula` | `one-dark` | `nord` | `tokyo-night` | `monokai` | `vs-dark` | `catppuccin-mocha` | `high-contrast-dark`

### Light Themes
`github-light` | `one-light` | `solarized-light` | `vs-light` | `catppuccin-latte` | `high-contrast-light`

```javascript
import { themes, Codeshine } from '@oxog/codeshine';

// Use built-in theme
const codeshine = new Codeshine({
  theme: themes.tokyoNight
});

// Or by name
const html = highlight(code, {
  language: 'js',
  theme: 'tokyo-night'
});
```

## Supported Languages

<details>
<summary><strong>150+ Languages Supported</strong></summary>

**Tier 1 (Core):** JavaScript, TypeScript, JSX, TSX, HTML, CSS, JSON, Markdown

**Tier 2 (Popular):** Python, Java, C, C++, C#, Go, Rust, Ruby, PHP, Swift, Kotlin

**Tier 3 (Web/Config):** Bash, GraphQL, PowerShell, SQL, TOML, XML, YAML

**Tier 4 (Data):** CSV, Diff, JSON5, Regex

**Tier 5 (Extended):** Lua, Dockerfile, Perl, R, Scala, Haskell, Elixir, Clojure, F#, Dart, Zig, Nim, Solidity, GLSL, HLSL, and more

**Tier 6 & 7:** Assembly, VHDL, Verilog, COBOL, Fortran, Ada, Prolog, Erlang, OCaml, and many more specialized languages

</details>

## Advanced Features

### Diff View

```javascript
const code = `
function add(a, b) {
-  return a - b;
+  return a + b;
}
`;

const html = highlight(code, {
  language: 'javascript',
  diff: true
});
```

### Line Highlighting & Focus

```javascript
const html = highlight(code, {
  language: 'python',
  highlightLines: [1, 3, '5-7'],
  focusLines: [3, 4, 5], // Dim everything except these
});
```

### Streaming (Large Files)

```javascript
import { createHighlightStream } from '@oxog/codeshine';

for await (const chunk of createHighlightStream(largeCode, {
  language: 'javascript',
  chunkSize: 50
})) {
  container.innerHTML += chunk;
}
```

### Auto Detection

```javascript
import { detectLanguage } from '@oxog/codeshine';

const result = detectLanguage(unknownCode);
console.log(result); // { language: 'python', confidence: 0.95 }
```

### Custom Plugins

```javascript
import { Codeshine } from '@oxog/codeshine';

const codeshine = new Codeshine({
  plugins: [{
    name: 'my-plugin',
    version: '1.0.0',
    transformers: [{
      name: 'add-links',
      phase: 'post',
      transform: (html) => html.replace(/TODO/g, '<mark>TODO</mark>')
    }]
  }]
});
```

## Bundle Size

| Bundle | Size | Gzip |
|--------|------|------|
| ESM | 590 KB | 131 KB |
| ESM (min) | 374 KB | 107 KB |
| IIFE | 653 KB | 134 KB |
| IIFE (min) | 374 KB | 107 KB |

*Note: Bundle includes all 150+ language definitions. Tree-shaking available for selective imports.*

## Browser Support

- Chrome 80+
- Firefox 80+
- Safari 14+
- Edge 80+

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<p align="center">
  Made with love by <a href="https://github.com/ersinkoc">Ersin KOC</a>
</p>
