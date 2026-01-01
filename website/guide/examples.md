# Examples

Learn how to use Codeshine through practical examples.

## Basic Usage

### Simple Highlighting

```typescript
import { Codeshine } from '@oxog/codeshine';

const codeshine = new Codeshine();

const html = codeshine.highlight(`
function greet(name: string) {
  return \`Hello, \${name}!\`;
}
`, { language: 'typescript' });

document.getElementById('code').innerHTML = html;
```

### With Line Numbers

```typescript
const html = codeshine.highlight(code, {
  language: 'javascript',
  lineNumbers: true,
  startLine: 1
});
```

### Highlighting Specific Lines

```typescript
const html = codeshine.highlight(code, {
  language: 'python',
  lineNumbers: true,
  highlightLines: [1, 3, '5-7'], // Lines 1, 3, and 5-7
});
```

## Theme Customization

### Using Built-in Themes

```typescript
import { Codeshine, themes } from '@oxog/codeshine';

const codeshine = new Codeshine({
  theme: themes.dracula
});
```

### Available Themes

```typescript
import { themes } from '@oxog/codeshine';

// Dark themes
themes.vsDark        // VS Code Dark+
themes.dracula       // Dracula
themes.oneDark       // One Dark Pro
themes.github        // GitHub Dark
themes.tokyoNight    // Tokyo Night
themes.nord          // Nord

// Light themes
themes.vsLight       // VS Code Light+
themes.githubLight   // GitHub Light
themes.oneLight      // One Light
```

## Diff Highlighting

### Show Code Changes

```typescript
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

## Focus Mode

### Emphasize Important Code

```typescript
const html = codeshine.highlight(code, {
  language: 'typescript',
  focusLines: [3, 4, 5], // Only these lines are fully visible
});
```

## Word Highlighting

### Highlight Specific Words

```typescript
const html = codeshine.highlight(code, {
  language: 'javascript',
  highlightWords: ['function', 'return'],
});
```

### Highlight Ranges

```typescript
const html = codeshine.highlight(code, {
  language: 'javascript',
  highlightRanges: [
    { line: 1, start: 0, end: 8 }, // "function"
    { line: 2, start: 2, end: 8 }, // "return"
  ],
});
```

## UI Features

### Copy Button

```typescript
const html = codeshine.highlight(code, {
  language: 'typescript',
  copyButton: true,
});
```

### Language Badge

```typescript
const html = codeshine.highlight(code, {
  language: 'rust',
  showLanguage: true,
});
```

### Filename Header

```typescript
const html = codeshine.highlight(code, {
  language: 'typescript',
  filename: 'src/utils/helper.ts',
});
```

## Streaming for Large Files

### Progressive Rendering

```typescript
import { createStream } from '@oxog/codeshine';

const stream = createStream({
  language: 'javascript',
  chunkSize: 100, // lines per chunk
  onChunk: (html, progress) => {
    container.innerHTML += html;
    console.log(`Progress: ${progress}%`);
  },
  onComplete: (fullHtml) => {
    console.log('Done!');
  }
});

// Feed large file content
stream.write(largeFileContent);
stream.end();
```

## React Integration

### Basic React Usage

```tsx
import { CodeBlock } from '@oxog/codeshine/react';

function App() {
  return (
    <CodeBlock
      code={`console.log('Hello, World!');`}
      language="javascript"
      lineNumbers
      theme="dracula"
    />
  );
}
```

### With All Features

```tsx
import { CodeBlock } from '@oxog/codeshine/react';

function App() {
  return (
    <CodeBlock
      code={code}
      language="typescript"
      lineNumbers
      startLine={10}
      highlightLines={[1, 3, '5-7']}
      focusLines={[3, 4]}
      diff
      copyButton
      showLanguage
      filename="example.ts"
      theme="github"
      className="my-code-block"
    />
  );
}
```

### Using the Hook

```tsx
import { useCodeshine } from '@oxog/codeshine/react';

function CustomCodeBlock({ code, language }) {
  const { html, tokens } = useCodeshine(code, {
    language,
    lineNumbers: true
  });

  return (
    <div
      className="custom-wrapper"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

## Plugin System

### Creating a Custom Plugin

```typescript
import { Codeshine } from '@oxog/codeshine';
import type { Plugin, Token } from '@oxog/codeshine';

const lineNumberPlugin: Plugin = {
  name: 'custom-line-numbers',
  transform(tokens: Token[]): Token[] {
    // Transform tokens before rendering
    return tokens.map(token => ({
      ...token,
      content: token.content.toUpperCase()
    }));
  }
};

const codeshine = new Codeshine({
  plugins: [lineNumberPlugin]
});
```

## Auto Language Detection

### Automatic Detection

```typescript
import { detectLanguage } from '@oxog/codeshine';

const code = `
def hello():
    print("Hello, World!")
`;

const language = detectLanguage(code);
console.log(language); // 'python'
```

### With Highlighting

```typescript
const html = codeshine.highlight(code, {
  language: 'auto', // Auto-detect
  lineNumbers: true
});
```
