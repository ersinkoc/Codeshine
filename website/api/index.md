# API Reference

Complete API documentation for Codeshine.

## Core Classes

### Codeshine

The main class for syntax highlighting.

```typescript
import { Codeshine } from '@oxog/codeshine';
```

#### Constructor

```typescript
new Codeshine(options?: CodeshineoOptions)
```

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `theme` | `Theme` | `vsDark` | Theme to use |
| `plugins` | `Plugin[]` | `[]` | Plugins to apply |

#### Methods

##### highlight()

```typescript
highlight(code: string, options: HighlightOptions): string
```

Highlights code and returns HTML string.

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `language` | `string` | required | Language to highlight |
| `lineNumbers` | `boolean` | `false` | Show line numbers |
| `startLine` | `number` | `1` | Starting line number |
| `highlightLines` | `(number \| string)[]` | `[]` | Lines to highlight |
| `focusLines` | `number[]` | `[]` | Lines to focus |
| `diff` | `boolean` | `false` | Enable diff mode |
| `highlightWords` | `string[]` | `[]` | Words to highlight |
| `highlightRanges` | `Range[]` | `[]` | Ranges to highlight |
| `copyButton` | `boolean` | `false` | Show copy button |
| `showLanguage` | `boolean` | `false` | Show language badge |
| `filename` | `string` | `undefined` | Show filename header |

##### setTheme()

```typescript
setTheme(theme: Theme): void
```

Sets the theme dynamically.

##### tokenize()

```typescript
tokenize(code: string, language: string): Token[]
```

Tokenizes code without rendering HTML.

## Functions

### defineTheme()

Creates a new theme with default values.

```typescript
import { defineTheme } from '@oxog/codeshine';

const theme = defineTheme({
  name: 'my-theme',
  type: 'dark',
  colors: { /* ... */ }
});
```

### extendTheme()

Extends an existing theme.

```typescript
import { extendTheme, themes } from '@oxog/codeshine';

const theme = extendTheme(themes.dracula, {
  name: 'my-dracula',
  colors: { /* overrides */ }
});
```

### detectLanguage()

Auto-detects the language of code.

```typescript
import { detectLanguage } from '@oxog/codeshine';

const language = detectLanguage(code);
const language = detectLanguage(code, { filename: 'app.ts' });
```

### getLanguage()

Gets a language definition by name or alias.

```typescript
import { getLanguage } from '@oxog/codeshine';

const lang = getLanguage('typescript');
const lang = getLanguage('ts'); // alias
```

### listLanguages()

Returns all registered languages.

```typescript
import { listLanguages } from '@oxog/codeshine';

const languages = listLanguages();
```

### registerLanguage()

Registers a custom language.

```typescript
import { registerLanguage } from '@oxog/codeshine';

registerLanguage({
  name: 'my-lang',
  aliases: ['ml'],
  patterns: [
    { pattern: /\b(keyword)\b/, type: 'keyword' }
  ]
});
```

### createStream()

Creates a streaming highlighter for large files.

```typescript
import { createStream } from '@oxog/codeshine';

const stream = createStream({
  language: 'javascript',
  chunkSize: 100,
  onChunk: (html, progress) => { /* ... */ },
  onComplete: (fullHtml) => { /* ... */ }
});

stream.write(content);
stream.end();
```

## Types

### Token

```typescript
interface Token {
  type: TokenType;
  content: string;
  start: number;
  end: number;
}
```

### TokenType

```typescript
type TokenType =
  | 'keyword'
  | 'string'
  | 'number'
  | 'comment'
  | 'operator'
  | 'punctuation'
  | 'function'
  | 'variable'
  | 'class'
  | 'type'
  | 'constant'
  | 'property'
  | 'attribute'
  | 'tag'
  | 'regexp'
  | 'escape'
  | 'interpolation'
  | 'meta'
  | 'invalid'
  | 'text';
```

### Theme

```typescript
interface Theme {
  name: string;
  type: 'light' | 'dark';
  colors: ThemeColors;
  fonts: ThemeFonts;
  spacing: ThemeSpacing;
  borders: ThemeBorders;
}
```

### Plugin

```typescript
interface Plugin {
  name: string;
  transform?(tokens: Token[]): Token[];
  beforeRender?(html: string): string;
  afterRender?(html: string): string;
}
```

### HighlightRange

```typescript
interface HighlightRange {
  line: number;
  start: number;
  end: number;
}
```

### StreamOptions

```typescript
interface StreamOptions {
  language: string;
  chunkSize?: number;
  onChunk?: (html: string, progress: number) => void;
  onComplete?: (html: string) => void;
  theme?: Theme;
}
```

## React Components

### CodeBlock

```tsx
import { CodeBlock } from '@oxog/codeshine/react';

<CodeBlock
  code={string}
  language={string}
  lineNumbers={boolean}
  startLine={number}
  highlightLines={array}
  focusLines={array}
  diff={boolean}
  highlightWords={array}
  highlightRanges={array}
  copyButton={boolean}
  showLanguage={boolean}
  filename={string}
  theme={string | Theme}
  className={string}
  style={CSSProperties}
/>
```

### useCodeshine

```tsx
import { useCodeshine } from '@oxog/codeshine/react';

const { html, tokens } = useCodeshine(code, options);
```

## Constants

### themes

Object containing all built-in themes.

```typescript
import { themes } from '@oxog/codeshine';

themes.vsDark
themes.vsLight
themes.dracula
themes.github
themes.githubLight
themes.oneDark
themes.oneLight
themes.nord
themes.tokyoNight
themes.nightOwl
themes.synthwave
themes.monokai
themes.solarizedLight
themes.catppuccinLatte
```
