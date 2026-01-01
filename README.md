# @oxog/codeshine

Zero-dependency syntax highlighter for the modern web.

[![npm version](https://img.shields.io/npm/v/@oxog/codeshine.svg)](https://www.npmjs.com/package/@oxog/codeshine)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Zero Dependencies** - No external dependencies, pure TypeScript
- **45+ Languages** - JavaScript, TypeScript, Python, Rust, Go, and many more
- **15+ Themes** - VS Code Dark/Light, Dracula, Nord, One Dark, GitHub, and more
- **Rich Features** - Line numbers, line highlighting, diff view, word highlighting
- **Streaming Support** - Progressive rendering for large files
- **React Integration** - Ready-to-use React components
- **Plugin System** - Extensible with custom plugins
- **Auto Detection** - Automatic language detection
- **TypeScript First** - Full type safety

## Documentation

**[Full Documentation](https://codeshine.oxog.dev)**

## Installation

```bash
npm install @oxog/codeshine
```

## Quick Start

```javascript
import { Codeshine } from '@oxog/codeshine';

const codeshine = new Codeshine();

const html = codeshine.highlight(`
function greet(name) {
  return \`Hello, \${name}!\`;
}
`, { language: 'javascript' });

document.getElementById('code').innerHTML = html;
```

## With Options

```javascript
const html = codeshine.highlight(code, {
  language: 'typescript',
  lineNumbers: true,
  highlightLines: [2, 3],
  copyButton: true,
  showLanguage: true,
  filename: 'example.ts'
});
```

## Themes

```javascript
import { Codeshine, themes } from '@oxog/codeshine';

const codeshine = new Codeshine({
  theme: themes.dracula
});
```

### Available Themes

**Dark:** `vsDark`, `dracula`, `oneDark`, `github`, `tokyoNight`, `nord`, `nightOwl`, `synthwave`, `monokai`

**Light:** `vsLight`, `githubLight`, `oneLight`, `solarizedLight`, `catppuccinLatte`

## React

```tsx
import { CodeBlock } from '@oxog/codeshine/react';

function App() {
  return (
    <CodeBlock
      code={`console.log('Hello!');`}
      language="javascript"
      lineNumbers
      theme="dracula"
      copyButton
    />
  );
}
```

## Supported Languages

JavaScript, TypeScript, JSX, TSX, Python, Java, C, C++, C#, Go, Rust, Ruby, PHP, Swift, Kotlin, Zig, Elixir, Scala, Haskell, Clojure, F#, OCaml, Erlang, Julia, R, Dart, Lua, Perl, HTML, CSS, JSON, YAML, TOML, XML, Markdown, SQL, GraphQL, Shell, PowerShell, Dockerfile, Makefile, and more.

## Diff View

```javascript
const code = `
function add(a, b) {
-  return a - b;
+  return a + b;
}
`;

const html = codeshine.highlight(code, {
  language: 'javascript',
  diff: true
});
```

## Line Highlighting

```javascript
const html = codeshine.highlight(code, {
  language: 'python',
  highlightLines: [1, 3, '5-7'], // Lines 1, 3, and 5-7
  focusLines: [3, 4, 5], // Dim everything except these lines
});
```

## Streaming

```javascript
import { createStream } from '@oxog/codeshine';

const stream = createStream({
  language: 'javascript',
  chunkSize: 100,
  onChunk: (html, progress) => {
    container.innerHTML += html;
  },
  onComplete: () => console.log('Done!')
});

stream.write(largeFileContent);
stream.end();
```

## Auto Detection

```javascript
import { detectLanguage } from '@oxog/codeshine';

const language = detectLanguage(code);
// Returns: 'python', 'javascript', etc.
```

## License

MIT
