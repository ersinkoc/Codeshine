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
new Codeshine(options?: CodeshineOptions)
```

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `theme` | `string \| Theme` | `vscodeDark` | Theme to use |
| `defaultLanguage` | `string` | `undefined` | Default language |
| `lineNumbers` | `boolean` | `false` | Show line numbers by default |
| `plugins` | `CodeshinePlugin[]` | `[]` | Plugins to apply |

#### Methods

##### highlight()

```typescript
highlight(code: string, options?: HighlightOptions): string
```

Highlights code and returns HTML string.

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `language` | `string` | `undefined` | Language to highlight |
| `autoDetect` | `boolean` | `false` | Auto-detect language |
| `theme` | `string \| Theme` | instance theme | Theme override |
| `lineNumbers` | `boolean` | `false` | Show line numbers |
| `startLine` | `number` | `1` | Starting line number |
| `highlightLines` | `LineRange[]` | `undefined` | Lines to highlight |
| `focusLines` | `LineRange[]` | `undefined` | Lines to focus (dim others) |
| `diffLines` | `DiffLines` | `undefined` | Diff highlighting |
| `highlightWords` | `string[]` | `undefined` | Words to highlight |
| `highlightRanges` | `HighlightRange[]` | `undefined` | Character ranges to highlight |
| `copyButton` | `boolean` | `false` | Show copy button |
| `showLanguageBadge` | `boolean` | `false` | Show language badge |
| `filename` | `string` | `undefined` | Show filename header |
| `wrapLines` | `boolean` | `false` | Wrap long lines |
| `maxHeight` | `string` | `undefined` | Max height with scroll |
| `tabSize` | `number` | `2` | Tab size for indentation |

##### highlightAsync()

```typescript
highlightAsync(code: string, options?: HighlightOptions): Promise<string>
```

Async version of highlight for non-blocking rendering.

##### setTheme()

```typescript
setTheme(theme: string | Theme): Codeshine
```

Sets the theme dynamically. Returns instance for chaining.

##### registerLanguage()

```typescript
registerLanguage(language: LanguageDefinition): Codeshine
```

Registers a custom language definition.

##### registerTheme()

```typescript
registerTheme(theme: Theme): Codeshine
```

Registers a custom theme.

## Functions

### highlight()

Standalone highlight function.

```typescript
import { highlight } from '@oxog/codeshine';

const html = highlight(code, {
  language: 'typescript',
  theme: 'github-dark',
  lineNumbers: true
});
```

### highlightAsync()

Async standalone highlight function.

```typescript
import { highlightAsync } from '@oxog/codeshine';

const html = await highlightAsync(code, { language: 'javascript' });
```

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
import { extendTheme, dracula } from '@oxog/codeshine';

const theme = extendTheme(dracula, {
  name: 'my-dracula',
  colors: { /* overrides */ }
});
```

### detectLanguage()

Auto-detects the language of code.

```typescript
import { detectLanguage } from '@oxog/codeshine';

const result = detectLanguage(code);
// { language: 'python', confidence: 0.95 }
```

### getLanguage()

Gets a language definition by name or alias.

```typescript
import { getLanguage } from '@oxog/codeshine';

const lang = getLanguage('typescript');
const lang = getLanguage('ts'); // alias
```

### getLanguageNames()

Returns all registered language names.

```typescript
import { getLanguageNames } from '@oxog/codeshine';

const languages = getLanguageNames();
// ['javascript', 'typescript', 'python', ...]
```

### registerLanguage()

Registers a custom language.

```typescript
import { registerLanguage, defineLang } from '@oxog/codeshine';

const myLang = defineLang({
  name: 'my-lang',
  aliases: ['ml'],
  patterns: [
    { pattern: /\b(keyword)\b/g, type: 'keyword' }
  ]
});

registerLanguage(myLang);
```

### highlightStream()

Streaming highlighter for large files using async generator.

```typescript
import { highlightStream } from '@oxog/codeshine';

for await (const chunk of highlightStream(largeCode, {
  language: 'javascript',
  chunkSize: 100
})) {
  container.innerHTML += chunk;
}
```

### highlightWithProgress()

Streaming with progress callback.

```typescript
import { highlightWithProgress } from '@oxog/codeshine';

const html = await highlightWithProgress(code, {
  language: 'javascript',
  chunkSize: 50,
  onChunk: (chunk, progress) => {
    console.log(`Progress: ${Math.round(progress * 100)}%`);
  }
});
```

## Types

### Token

```typescript
interface Token {
  type: TokenType;
  value: string;
  start: number;
  end: number;
  line: number;
  scopes?: string[];
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
  | 'plain';
```

### LineRange

```typescript
type LineRange = number | string | [number, number];
// Examples: 5, '3-7', [1, 10]
```

### DiffLines

```typescript
interface DiffLines {
  added?: LineRange[];
  removed?: LineRange[];
  modified?: LineRange[];
}
```

### Theme

```typescript
interface Theme {
  name: string;
  type: 'light' | 'dark';
  colors: ThemeColors;
  fonts?: ThemeFonts;
  spacing?: ThemeSpacing;
  borders?: ThemeBorders;
}
```

### CodeshinePlugin

```typescript
interface CodeshinePlugin {
  name: string;
  version?: string;
  onInit?(codeshine: CodeshineInstance): void;
  onBeforeHighlight?(code: string, options: HighlightOptions): { code: string; options: HighlightOptions };
  onAfterTokenize?(tokens: Token[]): Token[];
  onBeforeRender?(tokens: Token[], options: HighlightOptions): Token[];
  onAfterRender?(html: string): string;
  languages?: LanguageDefinition[];
  themes?: Theme[];
  transformers?: Transformer[];
}
```

### HighlightRange

```typescript
interface HighlightRange {
  line: number;
  start: number;
  end: number;
  className?: string;
  style?: string;
}
```

### StreamOptions

```typescript
interface StreamOptions extends HighlightOptions {
  chunkSize?: number;
  onChunk?: (html: string, progress: number) => void;
}
```

## React Components

### CodeBlock

```tsx
import { CodeBlock } from '@oxog/codeshine/react';

<CodeBlock
  code={string}
  language={string}
  autoDetect={boolean}
  theme={string | Theme}
  lineNumbers={boolean}
  startLine={number}
  highlightLines={LineRange[] | string}
  focusLines={LineRange[] | string}
  diffLines={DiffLines}
  highlightWords={string[]}
  highlightRanges={HighlightRange[]}
  copyButton={boolean}
  showLanguageBadge={boolean}
  filename={string}
  wrapLines={boolean}
  maxHeight={string}
  tabSize={number}
  onCopy={(code: string) => void}
  onLineClick={(line: number) => void}
  className={string}
  style={CSSProperties}
/>
```

### useHighlight

```tsx
import { useHighlight } from '@oxog/codeshine/react';

const { html, tokens, loading } = useHighlight(code, {
  language: 'typescript',
  lineNumbers: true
});
```

### useCopy

```tsx
import { useCopy } from '@oxog/codeshine/react';

const { copy, copied, error } = useCopy();

// copied: boolean - true for 2 seconds after copy
await copy(text);
```

### ThemeProvider

```tsx
import { ThemeProvider } from '@oxog/codeshine/react';

<ThemeProvider theme="dracula">
  <CodeBlock code={code} language="js" />
</ThemeProvider>
```

## Constants

### themes

Object containing all built-in themes.

```typescript
import { themes } from '@oxog/codeshine';

// Dark themes
themes.vsDark        // VS Code Dark+ (alias)
themes.githubDark    // GitHub Dark
themes.dracula       // Dracula
themes.oneDark       // One Dark
themes.nord          // Nord
themes.tokyoNight    // Tokyo Night
themes.monokai       // Monokai
themes.catppuccinMocha // Catppuccin Mocha

// Light themes
themes.vsLight       // VS Code Light+ (alias)
themes.githubLight   // GitHub Light
themes.oneLight      // One Light
themes.solarizedLight // Solarized Light
themes.catppuccinLatte // Catppuccin Latte

// Special
themes.highContrastDark
themes.highContrastLight
```

### Individual Theme Exports

```typescript
import {
  githubDark,
  githubLight,
  vscodeDark,
  vscodeLight,
  dracula,
  monokai,
  oneDark,
  oneLight,
  nord,
  tokyoNight,
  catppuccinMocha,
  catppuccinLatte,
  solarizedLight,
  highContrastDark,
  highContrastLight
} from '@oxog/codeshine';
```
