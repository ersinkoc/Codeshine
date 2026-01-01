# What is Codeshine?

Codeshine is a zero-dependency syntax highlighter designed for the modern web. It provides beautiful, fast, and customizable code highlighting with support for 50+ programming languages and 15+ themes.

## Key Features

### Zero Dependencies

Codeshine has no runtime dependencies, making it lightweight and fast. The core library is under 50KB minified and gzipped.

### 50+ Languages

Support for all major programming languages including:

- **Web**: JavaScript, TypeScript, HTML, CSS, JSON
- **Systems**: Rust, Go, C, C++
- **Backend**: Python, Ruby, PHP, Java, Kotlin
- **Config**: YAML, TOML, XML, Markdown
- **And many more...**

### 15+ Themes

Beautiful built-in themes:

- **Dark**: GitHub Dark, Dracula, Monokai, Nord, One Dark, VS Code Dark, Tokyo Night
- **Light**: GitHub Light, One Light, Solarized Light, VS Code Light
- **Special**: High Contrast Dark, High Contrast Light

### Rich Features

- Line numbers with custom start line
- Line highlighting and focus
- Diff view (added/removed/modified)
- Word and range highlighting
- Copy button
- Language badge
- Filename header
- Collapsible code blocks
- Streaming for large files

### Plugin System

Extend Codeshine with custom:

- Transformers (pre/post processing)
- Languages
- Themes

### React Integration

First-class React components and hooks:

```tsx
import { CodeBlock, useHighlight } from '@oxog/codeshine/react';

function App() {
  return (
    <CodeBlock
      code="const x = 1;"
      language="javascript"
      theme="github-dark"
      lineNumbers
    />
  );
}
```

## Browser Support

Codeshine supports all modern browsers:

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Bundle Size

| Build | Size |
|-------|------|
| ESM (minified) | ~45KB |
| ESM (gzipped) | ~15KB |
| CJS (minified) | ~48KB |

## TypeScript

Codeshine is written in TypeScript with strict type checking. All APIs are fully typed.

```typescript
import { highlight, type HighlightOptions } from '@oxog/codeshine';

const options: HighlightOptions = {
  language: 'typescript',
  theme: 'github-dark',
  lineNumbers: true,
};

const html = highlight(code, options);
```

## Next Steps

- [Getting Started](/guide/getting-started) - Install and use Codeshine
- [Examples](/guide/examples) - See Codeshine in action
- [API Reference](/api/) - Full API documentation
