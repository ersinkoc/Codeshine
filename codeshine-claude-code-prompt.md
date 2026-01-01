# Claude Code Prompt: @oxog/codeshine

## Package Metadata

| Field | Value |
|-------|-------|
| **Package Name** | `@oxog/codeshine` |
| **GitHub Repo** | `ersinkoc/codeshine` |
| **Domain** | `codeshine.oxog.dev` |
| **Description** | The ultimate syntax highlighter — beautiful code, zero compromises |
| **Author** | Ersin Koc |
| **License** | MIT |
| **Node.js** | >=18.0.0 |
| **Module Format** | ESM + CJS (dual package) |

---

## Non-Negotiable Rules

These rules are ABSOLUTE. No exceptions. No compromises.

### Dependencies
- **ZERO runtime dependencies** — everything is built from scratch
- **Dev dependencies allowed**: TypeScript, Vitest, ESLint, Prettier, Vite, React (for website only)
- The `dependencies` field in package.json must be empty `{}`

### Quality Gates
- **100% test coverage** — every single line must be tested
- **100% test success** — all tests must pass before any commit
- **TypeScript strict mode** — enabled in tsconfig.json
- **No `any` types** — use `unknown` and type guards instead
- **No `@ts-ignore`** — fix the types properly

### Build Requirements
- Dual package (ESM + CJS) output
- Full TypeScript declarations (.d.ts)
- Source maps for debugging
- Tree-shakeable exports (especially languages)

### Documentation & Links
- **No social media links** — no Twitter, Discord, email
- **Only GitHub repo URL** — `https://github.com/ersinkoc/codeshine`
- **Website domain** — `codeshine.oxog.dev` (CNAME in website public folder)

---

## Project Structure

```
codeshine/
├── src/
│   ├── core/
│   │   ├── highlighter.ts            # Main highlight function
│   │   ├── engine.ts                 # Codeshine class (reusable instance)
│   │   ├── tokenizer.ts              # Hybrid tokenization engine
│   │   ├── parser.ts                 # Token stream parser
│   │   ├── renderer.ts               # Token → HTML renderer
│   │   ├── detector.ts               # Auto language detection
│   │   ├── streaming.ts              # Streaming highlighter for large files
│   │   └── types.ts                  # Core type definitions
│   │
│   ├── languages/
│   │   ├── types.ts                  # Language definition types
│   │   ├── registry.ts               # Language registry
│   │   ├── define-lang.ts            # defineLang helper
│   │   │
│   │   ├── tier1/                    # Core languages (bundled with core)
│   │   │   ├── javascript.ts
│   │   │   ├── typescript.ts
│   │   │   ├── jsx.ts
│   │   │   ├── tsx.ts
│   │   │   ├── html.ts
│   │   │   ├── css.ts
│   │   │   ├── json.ts
│   │   │   ├── markdown.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── tier2/                    # Popular languages
│   │   │   ├── python.ts
│   │   │   ├── java.ts
│   │   │   ├── c.ts
│   │   │   ├── cpp.ts
│   │   │   ├── csharp.ts
│   │   │   ├── go.ts
│   │   │   ├── rust.ts
│   │   │   ├── ruby.ts
│   │   │   ├── php.ts
│   │   │   ├── swift.ts
│   │   │   ├── kotlin.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── tier3/                    # Web/Config languages
│   │   │   ├── yaml.ts
│   │   │   ├── toml.ts
│   │   │   ├── xml.ts
│   │   │   ├── graphql.ts
│   │   │   ├── sql.ts
│   │   │   ├── bash.ts
│   │   │   ├── powershell.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── tier4/                    # Data/Query languages
│   │   │   ├── json5.ts
│   │   │   ├── csv.ts
│   │   │   ├── regex.ts
│   │   │   ├── diff.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── tier5/                    # Extended languages
│   │   │   ├── lua.ts
│   │   │   ├── perl.ts
│   │   │   ├── r.ts
│   │   │   ├── scala.ts
│   │   │   ├── haskell.ts
│   │   │   ├── elixir.ts
│   │   │   ├── clojure.ts
│   │   │   ├── fsharp.ts
│   │   │   ├── dart.ts
│   │   │   ├── objectivec.ts
│   │   │   ├── assembly.ts
│   │   │   ├── wasm.ts
│   │   │   ├── dockerfile.ts
│   │   │   ├── nginx.ts
│   │   │   ├── apache.ts
│   │   │   ├── dotenv.ts
│   │   │   ├── ini.ts
│   │   │   ├── prisma.ts
│   │   │   ├── solidity.ts
│   │   │   ├── move.ts
│   │   │   ├── latex.ts
│   │   │   ├── glsl.ts
│   │   │   ├── hlsl.ts
│   │   │   ├── zig.ts
│   │   │   ├── nim.ts
│   │   │   ├── vlang.ts
│   │   │   ├── odin.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts                  # All languages export
│   │
│   ├── themes/
│   │   ├── types.ts                  # Theme type definitions
│   │   ├── define-theme.ts           # defineTheme helper
│   │   ├── css-vars.ts               # CSS variables generator
│   │   ├── registry.ts               # Theme registry
│   │   │
│   │   ├── dark/
│   │   │   ├── github-dark.ts
│   │   │   ├── vscode-dark.ts
│   │   │   ├── monokai.ts
│   │   │   ├── dracula.ts
│   │   │   ├── one-dark.ts
│   │   │   ├── nord.ts
│   │   │   ├── tokyo-night.ts
│   │   │   ├── catppuccin-mocha.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── light/
│   │   │   ├── github-light.ts
│   │   │   ├── vscode-light.ts
│   │   │   ├── one-light.ts
│   │   │   ├── catppuccin-latte.ts
│   │   │   ├── solarized-light.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── special/
│   │   │   ├── high-contrast-dark.ts
│   │   │   ├── high-contrast-light.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── features/
│   │   ├── line-numbers.ts           # Line number generation
│   │   ├── line-highlight.ts         # Line highlighting
│   │   ├── line-focus.ts             # Focus mode (dim others)
│   │   ├── line-diff.ts              # Diff markers (+, -, ~)
│   │   ├── word-highlight.ts         # Word-level highlighting
│   │   ├── range-highlight.ts        # Range highlighting
│   │   ├── copy-button.ts            # Copy button HTML/logic
│   │   ├── language-badge.ts         # Language badge
│   │   ├── filename-header.ts        # Filename display
│   │   ├── collapsible.ts            # Collapsible regions
│   │   ├── max-height.ts             # Max height with scroll
│   │   └── index.ts
│   │
│   ├── plugins/
│   │   ├── types.ts                  # Plugin interface
│   │   ├── registry.ts               # Plugin registry
│   │   ├── transformer.ts            # Transformer pipeline
│   │   └── index.ts
│   │
│   ├── renderers/
│   │   ├── types.ts                  # Renderer interface
│   │   ├── html/
│   │   │   ├── index.ts              # Vanilla HTML renderer
│   │   │   ├── builder.ts            # HTML string builder
│   │   │   └── styles.ts             # Inline styles generator
│   │   │
│   │   └── react/
│   │       ├── index.ts              # React exports
│   │       ├── CodeBlock.tsx         # Main component
│   │       ├── CodeLine.tsx          # Single line component
│   │       ├── LineNumber.tsx        # Line number component
│   │       ├── CopyButton.tsx        # Copy button component
│   │       ├── LanguageBadge.tsx     # Language badge component
│   │       ├── ThemeProvider.tsx     # Theme context
│   │       ├── hooks/
│   │       │   ├── useHighlight.ts   # Highlighting hook
│   │       │   ├── useTheme.ts       # Theme hook
│   │       │   ├── useCopy.ts        # Copy functionality hook
│   │       │   └── index.ts
│   │       └── types.ts
│   │
│   ├── utils/
│   │   ├── escape.ts                 # HTML escaping
│   │   ├── merge.ts                  # Deep merge
│   │   ├── hash.ts                   # String hashing
│   │   ├── range-parser.ts           # Parse "1,3-5,8" → [1,3,4,5,8]
│   │   ├── classnames.ts             # className utility
│   │   └── index.ts
│   │
│   └── index.ts                      # Main entry point
│
├── tests/
│   ├── core/
│   │   ├── highlighter.test.ts
│   │   ├── engine.test.ts
│   │   ├── tokenizer.test.ts
│   │   ├── parser.test.ts
│   │   ├── renderer.test.ts
│   │   ├── detector.test.ts
│   │   └── streaming.test.ts
│   │
│   ├── languages/
│   │   ├── tier1.test.ts
│   │   ├── tier2.test.ts
│   │   ├── tier3.test.ts
│   │   ├── tier4.test.ts
│   │   ├── tier5.test.ts
│   │   └── custom-lang.test.ts
│   │
│   ├── themes/
│   │   ├── themes.test.ts
│   │   ├── css-vars.test.ts
│   │   └── custom-theme.test.ts
│   │
│   ├── features/
│   │   ├── line-numbers.test.ts
│   │   ├── line-highlight.test.ts
│   │   ├── line-focus.test.ts
│   │   ├── line-diff.test.ts
│   │   ├── word-highlight.test.ts
│   │   └── range-highlight.test.ts
│   │
│   ├── renderers/
│   │   ├── html.test.ts
│   │   └── react.test.ts
│   │
│   ├── integration/
│   │   ├── full-flow.test.ts
│   │   ├── large-files.test.ts
│   │   ├── streaming.test.ts
│   │   ├── edge-cases.test.ts
│   │   └── performance.test.ts
│   │
│   └── fixtures/
│       ├── code-samples/
│       │   ├── javascript.txt
│       │   ├── typescript.txt
│       │   ├── python.txt
│       │   └── ... (all languages)
│       └── expected-output/
│           └── ... (expected HTML outputs)
│
├── website/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── CodeDemo.tsx          # Interactive demo
│   │   │   ├── ThemeShowcase.tsx     # All themes preview
│   │   │   ├── LanguageList.tsx      # Supported languages
│   │   │   ├── FeatureDemo.tsx       # Feature demonstrations
│   │   │   ├── PlaygroundEditor.tsx  # Live code playground
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── ApiReference.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── index.tsx             # Landing page
│   │   │   ├── playground.tsx        # Interactive playground
│   │   │   ├── themes.tsx            # Theme gallery
│   │   │   ├── docs/
│   │   │   │   ├── getting-started.tsx
│   │   │   │   ├── basic-usage.tsx
│   │   │   │   ├── languages.tsx
│   │   │   │   ├── themes.tsx
│   │   │   │   ├── line-features.tsx
│   │   │   │   ├── word-features.tsx
│   │   │   │   ├── ui-features.tsx
│   │   │   │   ├── react-components.tsx
│   │   │   │   ├── custom-languages.tsx
│   │   │   │   ├── custom-themes.tsx
│   │   │   │   ├── plugins.tsx
│   │   │   │   ├── streaming.tsx
│   │   │   │   └── api-reference.tsx
│   │   │   └── examples/
│   │   │       ├── documentation-site.tsx
│   │   │       ├── code-editor.tsx
│   │   │       ├── ai-chat.tsx
│   │   │       └── diff-view.tsx
│   │   │
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── public/
│   │   ├── CNAME                     # Contains: codeshine.oxog.dev
│   │   └── favicon.svg
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── docs/                             # GitHub Pages output (generated)
├── dist/                             # Package build output
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── vitest.config.ts
├── eslint.config.js
├── .prettierrc
├── .gitignore
├── LICENSE
├── README.md
└── CHANGELOG.md
```

---

## Feature Specifications

### 1. Core Highlighting Engine

#### 1.1 Main Highlight Function

```typescript
function highlight(code: string, options?: HighlightOptions): string;

interface HighlightOptions {
  // Language
  language?: string;              // 'typescript', 'python', etc.
  autoDetect?: boolean;           // Auto-detect language (default: false)
  
  // Theme
  theme?: string | Theme;         // Theme name or custom theme
  
  // Line features
  lineNumbers?: boolean;          // Show line numbers
  startLine?: number;             // Starting line number (default: 1)
  highlightLines?: LineRange[];   // Lines to highlight
  focusLines?: LineRange[];       // Lines to focus (dim others)
  diffLines?: DiffLines;          // Diff markers
  
  // Word features
  highlightWords?: string[];      // Words to highlight
  highlightRanges?: HighlightRange[];  // Specific ranges
  
  // UI features
  showLanguageBadge?: boolean;    // Show language badge
  copyButton?: boolean;           // Show copy button
  filename?: string;              // Show filename header
  wrapLines?: boolean;            // Wrap long lines
  maxHeight?: string;             // Max height with scroll
  collapsible?: boolean;          // Collapsible code block
  defaultCollapsed?: boolean;     // Start collapsed
  
  // Advanced
  tabSize?: number;               // Tab width (default: 2)
  transformers?: Transformer[];   // Custom transformers
}

// Type definitions
type LineRange = number | string | [number, number];
// Examples: 1, "3-5", [3, 5], "1,3-5,8"

interface DiffLines {
  added?: LineRange[];
  removed?: LineRange[];
  modified?: LineRange[];
}

interface HighlightRange {
  line: number;
  start: number;       // Column start
  end: number;         // Column end
  className?: string;  // Custom class
  style?: string;      // Inline style
}
```

#### 1.2 Codeshine Class (Engine)

```typescript
class Codeshine {
  constructor(options?: CodeshineOptions);
  
  // Highlighting
  highlight(code: string, options?: HighlightOptions): string;
  highlightAsync(code: string, options?: HighlightOptions): Promise<string>;
  
  // Streaming (for large files)
  highlightStream(code: string, options?: StreamOptions): AsyncGenerator<string>;
  
  // Configuration
  setTheme(theme: string | Theme): this;
  setLanguage(language: string): this;
  
  // Registration
  registerLanguage(language: LanguageDefinition): this;
  registerTheme(theme: Theme): this;
  
  // Plugins
  use(plugin: CodeshinePlugin): this;
  
  // Getters
  getLanguages(): string[];
  getThemes(): string[];
  getTheme(): Theme;
}

interface CodeshineOptions {
  theme?: string | Theme;
  defaultLanguage?: string;
  lineNumbers?: boolean;
  plugins?: CodeshinePlugin[];
  languages?: LanguageDefinition[];  // Pre-register languages
  themes?: Theme[];                   // Pre-register themes
}
```

#### 1.3 Tokenizer

```typescript
interface Token {
  type: TokenType;
  value: string;
  start: number;      // Start position in line
  end: number;        // End position in line
  line: number;       // Line number
  scopes?: string[];  // Nested scopes for complex highlighting
}

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

interface Tokenizer {
  tokenize(code: string, language: string): Token[];
  tokenizeLine(line: string, language: string, state?: TokenizerState): TokenizeResult;
}

interface TokenizeResult {
  tokens: Token[];
  state: TokenizerState;  // For multi-line tokens (strings, comments)
}
```

### 2. Language Definitions

#### 2.1 Language Interface

```typescript
interface LanguageDefinition {
  name: string;
  aliases?: string[];
  extensions?: string[];      // File extensions for detection
  mimeTypes?: string[];       // MIME types for detection
  
  // Token rules
  keywords?: string[];
  typeKeywords?: string[];
  constants?: string[];
  operators?: string[] | RegExp;
  
  // Patterns (order matters - first match wins)
  patterns: TokenPattern[];
  
  // Brackets for matching
  brackets?: BracketPair[];
  
  // String handling
  strings?: StringDefinition[];
  
  // Comment handling
  comments?: CommentDefinition;
  
  // Embedded languages
  embeddedLanguages?: EmbeddedLanguage[];
}

interface TokenPattern {
  pattern: RegExp;
  type: TokenType;
  scopes?: string[];
}

interface StringDefinition {
  start: string | RegExp;
  end: string | RegExp;
  escape?: string;
  multiline?: boolean;
  interpolation?: {
    start: string;
    end: string;
  };
}

interface CommentDefinition {
  line?: string;              // '//' for JS
  block?: {
    start: string;            // '/*'
    end: string;              // '*/'
  };
}

interface EmbeddedLanguage {
  language: string;
  start: RegExp;
  end: RegExp;
}
```

#### 2.2 defineLang Helper

```typescript
function defineLang(definition: LanguageDefinition): LanguageDefinition;

// Example usage
const typescript = defineLang({
  name: 'typescript',
  aliases: ['ts'],
  extensions: ['.ts', '.tsx', '.mts', '.cts'],
  
  keywords: [
    'break', 'case', 'catch', 'continue', 'debugger', 'default',
    'delete', 'do', 'else', 'finally', 'for', 'function', 'if',
    'in', 'instanceof', 'new', 'return', 'switch', 'this', 'throw',
    'try', 'typeof', 'var', 'void', 'while', 'with', 'as', 'class',
    'const', 'enum', 'export', 'extends', 'import', 'super', 'implements',
    'interface', 'let', 'package', 'private', 'protected', 'public',
    'static', 'yield', 'async', 'await', 'of', 'from', 'type', 'declare',
    'namespace', 'module', 'abstract', 'readonly', 'keyof', 'infer',
    'never', 'unknown', 'asserts', 'is', 'satisfies'
  ],
  
  typeKeywords: [
    'any', 'boolean', 'number', 'string', 'symbol', 'bigint',
    'object', 'void', 'null', 'undefined', 'never', 'unknown'
  ],
  
  constants: ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'],
  
  operators: /[+\-*/%&|^!<>=?:~]+/,
  
  patterns: [
    // Decorators
    { pattern: /@[\w]+/, type: 'meta' },
    
    // Type annotations
    { pattern: /:\s*[\w<>[\],\s|&]+(?=[;,)=])/, type: 'type' },
    
    // Generics
    { pattern: /<[\w,\s]+>/, type: 'type' },
    
    // Function calls
    { pattern: /\b[\w]+(?=\()/, type: 'function' },
    
    // Class names (PascalCase)
    { pattern: /\b[A-Z][\w]*\b/, type: 'class' },
    
    // Numbers
    { pattern: /\b\d+(\.\d+)?([eE][+-]?\d+)?\b/, type: 'number' },
    { pattern: /\b0x[\da-fA-F]+\b/, type: 'number' },
    { pattern: /\b0b[01]+\b/, type: 'number' },
    { pattern: /\b0o[0-7]+\b/, type: 'number' },
    
    // Regexp
    { pattern: /\/(?![/*])(?:\\.|[^/\\])+\/[gimsuy]*/, type: 'regexp' },
  ],
  
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
    { 
      start: '`', 
      end: '`', 
      escape: '\\',
      multiline: true,
      interpolation: { start: '${', end: '}' }
    },
  ],
  
  comments: {
    line: '//',
    block: { start: '/*', end: '*/' }
  },
  
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ]
});
```

#### 2.3 All Supported Languages (50+)

**Tier 1 - Core (Always Bundled)**
```typescript
// These are bundled with core package
import { highlight } from '@oxog/codeshine';
// Includes: javascript, typescript, jsx, tsx, html, css, json, markdown
```

**Tier 2-5 - Tree-shakeable**
```typescript
// Import only what you need
import { highlight } from '@oxog/codeshine';
import { python } from '@oxog/codeshine/languages/python';
import { rust } from '@oxog/codeshine/languages/rust';

const codeshine = new Codeshine();
codeshine.registerLanguage(python);
codeshine.registerLanguage(rust);

// Or import all
import { allLanguages } from '@oxog/codeshine/languages';
```

**Complete Language List:**

| Tier | Languages |
|------|-----------|
| **Tier 1** | javascript, typescript, jsx, tsx, html, css, json, markdown |
| **Tier 2** | python, java, c, cpp, csharp, go, rust, ruby, php, swift, kotlin |
| **Tier 3** | yaml, toml, xml, graphql, sql, bash, powershell |
| **Tier 4** | json5, csv, regex, diff |
| **Tier 5** | lua, perl, r, scala, haskell, elixir, clojure, fsharp, dart, objectivec, assembly, wasm, dockerfile, nginx, apache, dotenv, ini, prisma, solidity, move, latex, glsl, hlsl, zig, nim, vlang, odin |

### 3. Theme System

#### 3.1 Theme Interface

```typescript
interface Theme {
  name: string;
  type: 'light' | 'dark';
  
  colors: {
    // Editor
    background: string;
    foreground: string;
    lineNumber: string;
    lineNumberActive: string;
    lineHighlight: string;
    selection: string;
    cursor: string;
    
    // Gutter
    gutterBackground: string;
    gutterBorder: string;
    
    // Diff
    diffAddedBackground: string;
    diffAddedText: string;
    diffRemovedBackground: string;
    diffRemovedText: string;
    diffModifiedBackground: string;
    diffModifiedText: string;
    
    // Focus mode
    focusDimmed: string;
    
    // Word highlight
    wordHighlight: string;
    
    // UI elements
    border: string;
    badgeBackground: string;
    badgeText: string;
    buttonBackground: string;
    buttonText: string;
    buttonHover: string;
    scrollbar: string;
    scrollbarHover: string;
    
    // Tokens
    tokens: {
      keyword: string;
      string: string;
      number: string;
      comment: string;
      operator: string;
      punctuation: string;
      function: string;
      variable: string;
      class: string;
      type: string;
      constant: string;
      property: string;
      attribute: string;
      tag: string;
      regexp: string;
      escape: string;
      interpolation: string;
      meta: string;
      invalid: string;
    };
  };
  
  fonts?: {
    family?: string;
    size?: string;
    lineHeight?: string | number;
    weight?: string | number;
  };
  
  spacing?: {
    padding?: string;
    lineNumberWidth?: string;
    gutterPadding?: string;
  };
  
  borders?: {
    radius?: string;
    width?: string;
  };
}
```

#### 3.2 defineTheme Helper

```typescript
function defineTheme(definition: Partial<Theme> & { name: string; type: 'light' | 'dark' }): Theme;
function extendTheme(base: string | Theme, overrides: Partial<Theme>): Theme;

// Create new theme
const myTheme = defineTheme({
  name: 'my-theme',
  type: 'dark',
  colors: {
    background: '#1e1e2e',
    foreground: '#cdd6f4',
    // ... all colors
    tokens: {
      keyword: '#cba6f7',
      string: '#a6e3a1',
      // ... all token colors
    }
  }
});

// Extend existing theme
const customGithub = extendTheme('github-dark', {
  name: 'custom-github',
  colors: {
    tokens: {
      keyword: '#ff79c6'
    }
  }
});
```

#### 3.3 CSS Variables

```typescript
import { generateCSSVars, injectThemeStyles } from '@oxog/codeshine';

// Generate CSS variables object
const cssVars = generateCSSVars(theme);
// Returns: { '--cs-bg': '#1e1e2e', '--cs-fg': '#cdd6f4', ... }

// Inject into document
injectThemeStyles(theme, { scope: '.my-code-block' });

// CSS variable naming
--cs-bg                    // background
--cs-fg                    // foreground
--cs-line-number           // line number color
--cs-line-highlight        // highlighted line bg
--cs-token-keyword         // keyword color
--cs-token-string          // string color
// ... etc
```

#### 3.4 Built-in Themes (15+)

**Dark Themes:**
- `github-dark` - GitHub's dark theme
- `vscode-dark` - VS Code default dark
- `monokai` - Classic Monokai
- `dracula` - Popular Dracula theme
- `one-dark` - Atom One Dark
- `nord` - Arctic, north-bluish
- `tokyo-night` - Tokyo Night
- `catppuccin-mocha` - Catppuccin Mocha

**Light Themes:**
- `github-light` - GitHub's light theme
- `vscode-light` - VS Code default light
- `one-light` - Atom One Light
- `catppuccin-latte` - Catppuccin Latte
- `solarized-light` - Solarized Light

**Special:**
- `high-contrast-dark` - High contrast dark
- `high-contrast-light` - High contrast light

### 4. Line-Level Features

#### 4.1 Line Numbers

```typescript
highlight(code, {
  lineNumbers: true,
  startLine: 10          // Start from line 10
});

// Output structure
<pre class="cs-codeblock">
  <code class="cs-code">
    <span class="cs-line">
      <span class="cs-line-number">10</span>
      <span class="cs-line-content">const x = 1;</span>
    </span>
    ...
  </code>
</pre>
```

#### 4.2 Line Highlighting

```typescript
highlight(code, {
  highlightLines: [1, '3-5', 8]  // Highlight lines 1, 3, 4, 5, 8
});

// Multiple formats supported
highlightLines: [1]              // Single line
highlightLines: ['3-5']          // Range
highlightLines: [1, '3-5', 8]    // Mixed
highlightLines: '1,3-5,8'        // String format

// CSS class applied
<span class="cs-line cs-line-highlighted">
```

#### 4.3 Focus Mode

```typescript
highlight(code, {
  focusLines: [2, 4]    // Focus on lines 2 and 4, dim others
});

// CSS classes
<span class="cs-line cs-line-focused">    // Focused lines
<span class="cs-line cs-line-dimmed">     // Other lines (50% opacity)
```

#### 4.4 Diff Markers

```typescript
highlight(code, {
  diffLines: {
    added: [3, 4],       // + prefix, green background
    removed: [7],        // - prefix, red background
    modified: [10]       // ~ prefix, yellow background
  }
});

// Output
<span class="cs-line cs-line-diff-added">
  <span class="cs-diff-marker">+</span>
  ...
</span>
```

### 5. Word-Level Features

#### 5.1 Word Highlighting

```typescript
highlight(code, {
  highlightWords: ['useState', 'useEffect']
});

// All occurrences wrapped
<span class="cs-word-highlighted">useState</span>
```

#### 5.2 Range Highlighting

```typescript
highlight(code, {
  highlightRanges: [
    { line: 1, start: 6, end: 12 },                    // Default highlight
    { line: 3, start: 0, end: 10, className: 'error' }, // Custom class
    { line: 5, start: 5, end: 20, style: 'background: yellow' }
  ]
});
```

### 6. UI Features

#### 6.1 Copy Button

```typescript
highlight(code, {
  copyButton: true
});

// HTML output includes
<button class="cs-copy-button" data-code="...">
  <span class="cs-copy-icon">📋</span>
  <span class="cs-copy-text">Copy</span>
</button>

// After copy
<button class="cs-copy-button cs-copied">
  <span class="cs-copy-icon">✓</span>
  <span class="cs-copy-text">Copied!</span>
</button>
```

#### 6.2 Language Badge

```typescript
highlight(code, {
  language: 'typescript',
  showLanguageBadge: true
});

// Output
<span class="cs-language-badge">TypeScript</span>
```

#### 6.3 Filename Header

```typescript
highlight(code, {
  filename: 'src/utils/helper.ts'
});

// Output
<div class="cs-header">
  <span class="cs-filename">src/utils/helper.ts</span>
  <button class="cs-copy-button">...</button>
</div>
```

#### 6.4 Max Height with Scroll

```typescript
highlight(code, {
  maxHeight: '400px'   // Scroll after 400px
});

// CSS applied
.cs-codeblock { max-height: 400px; overflow-y: auto; }
```

#### 6.5 Collapsible Regions

```typescript
highlight(code, {
  collapsible: true,
  defaultCollapsed: false
});

// Output
<div class="cs-codeblock cs-collapsible">
  <button class="cs-collapse-toggle">▼</button>
  <code class="cs-code">...</code>
</div>
```

### 7. Streaming Support

For large files (>10,000 lines), use streaming:

```typescript
import { Codeshine } from '@oxog/codeshine';

const codeshine = new Codeshine();

// Async generator
async function highlightLargeFile(code: string) {
  const chunks: string[] = [];
  
  for await (const chunk of codeshine.highlightStream(code, {
    language: 'typescript',
    chunkSize: 100  // 100 lines per chunk
  })) {
    chunks.push(chunk);
    // Could progressively render here
  }
  
  return chunks.join('');
}

// Or with callback
codeshine.highlightStream(code, {
  language: 'typescript',
  onChunk: (html, progress) => {
    console.log(`${progress}% complete`);
    document.body.innerHTML += html;
  }
});
```

### 8. React Components

#### 8.1 CodeBlock Component

```tsx
import { CodeBlock } from '@oxog/codeshine/react';

<CodeBlock
  // Required
  code={code}
  
  // Language
  language="typescript"
  autoDetect={false}
  
  // Theme
  theme="github-dark"
  
  // Line features
  lineNumbers={true}
  startLine={1}
  highlightLines={[1, '3-5']}
  focusLines={[2]}
  diffLines={{ added: [3], removed: [5] }}
  
  // Word features
  highlightWords={['useState']}
  highlightRanges={[{ line: 1, start: 0, end: 5 }]}
  
  // UI features
  showLanguageBadge={true}
  copyButton={true}
  filename="example.tsx"
  wrapLines={false}
  maxHeight="400px"
  collapsible={false}
  
  // Events
  onCopy={(code) => toast('Copied!')}
  onLineClick={(line) => console.log(line)}
  
  // Styling
  className="my-code"
  style={{ borderRadius: '8px' }}
/>
```

#### 8.2 Hooks

```tsx
import { useHighlight, useTheme, useCopy } from '@oxog/codeshine/react';

// Highlighting hook
function MyComponent() {
  const { html, tokens, loading } = useHighlight(code, {
    language: 'typescript',
    theme: 'github-dark'
  });
  
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// Theme hook
function ThemeSelector() {
  const { theme, setTheme, themes, cssVars } = useTheme();
  
  return (
    <select value={theme.name} onChange={e => setTheme(e.target.value)}>
      {themes.map(t => <option key={t}>{t}</option>)}
    </select>
  );
}

// Copy hook
function CopyButton({ code }) {
  const { copy, copied } = useCopy();
  
  return (
    <button onClick={() => copy(code)}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
```

#### 8.3 ThemeProvider

```tsx
import { ThemeProvider } from '@oxog/codeshine/react';

<ThemeProvider theme="github-dark">
  <App />
</ThemeProvider>

// With custom theme
<ThemeProvider theme={myCustomTheme}>
  <App />
</ThemeProvider>
```

### 9. Plugin System

#### 9.1 Plugin Interface

```typescript
interface CodeshinePlugin {
  name: string;
  version?: string;
  
  // Lifecycle hooks
  onInit?(codeshine: Codeshine): void;
  onBeforeHighlight?(code: string, options: HighlightOptions): { code: string; options: HighlightOptions };
  onAfterTokenize?(tokens: Token[]): Token[];
  onBeforeRender?(tokens: Token[], options: HighlightOptions): Token[];
  onAfterRender?(html: string): string;
  
  // Extensions
  languages?: LanguageDefinition[];
  themes?: Theme[];
  transformers?: Transformer[];
}
```

#### 9.2 Transformer Pipeline

```typescript
interface Transformer {
  name: string;
  pre?(code: string): string;
  token?(token: Token): Token | Token[] | null;
  line?(line: LineData): LineData;
  post?(html: string): string;
}

// Example: Add line links
const lineLinksTransformer: Transformer = {
  name: 'line-links',
  line(line) {
    return {
      ...line,
      attributes: {
        ...line.attributes,
        id: `L${line.number}`,
        'data-line': line.number
      }
    };
  }
};

// Usage
highlight(code, {
  transformers: [lineLinksTransformer]
});
```

#### 9.3 Built-in Transformers

```typescript
import {
  lineNumbersTransformer,
  highlightLinesTransformer,
  focusTransformer,
  diffTransformer,
  wordHighlightTransformer,
  copyButtonTransformer
} from '@oxog/codeshine/transformers';

// These are auto-applied based on options
// But you can use them manually for custom pipelines
```

### 10. Auto Language Detection

```typescript
import { detectLanguage } from '@oxog/codeshine';

const detected = detectLanguage(code);
// Returns: { language: 'typescript', confidence: 0.85 }

// Or auto-detect during highlight
highlight(code, { autoDetect: true });

// Detection based on:
// 1. Shebang (#!)
// 2. File patterns (import, require, etc.)
// 3. Syntax patterns (keywords, operators)
// 4. Statistical analysis
```

---

## Implementation Workflow

Follow this exact sequence:

### Phase 1: Specification
Read and understand all specifications before writing any code.

### Phase 2: Implementation Plan
Create detailed implementation plan.

### Phase 3: Task Execution

Execute tasks in this order:

1. **Project Setup**
   - Initialize npm package
   - Configure TypeScript (strict mode)
   - Configure Vitest
   - Configure ESLint + Prettier
   - Set up build scripts (dual ESM/CJS, tree-shaking)

2. **Core Types**
   - All interfaces in `src/core/types.ts`
   - Language types in `src/languages/types.ts`
   - Theme types in `src/themes/types.ts`
   - Plugin types in `src/plugins/types.ts`

3. **Tokenizer & Parser**
   - Implement hybrid tokenizer
   - Implement token parser
   - Implement tokenizer state machine (multi-line)
   - Write tests

4. **Core Highlighter**
   - Implement `highlight()` function
   - Implement `Codeshine` class
   - Implement renderer (token → HTML)
   - Write tests

5. **Tier 1 Languages**
   - JavaScript, TypeScript, JSX, TSX
   - HTML, CSS
   - JSON, Markdown
   - Write tests for each

6. **Tier 2-5 Languages**
   - Implement all remaining languages
   - Write tests for each
   - Ensure tree-shaking works

7. **Theme System**
   - Implement theme types
   - Implement `defineTheme`, `extendTheme`
   - Implement CSS variables generator
   - Create all 15+ built-in themes
   - Write tests

8. **Line Features**
   - Line numbers
   - Line highlighting
   - Focus mode
   - Diff markers
   - Write tests

9. **Word Features**
   - Word highlighting
   - Range highlighting
   - Write tests

10. **UI Features**
    - Copy button
    - Language badge
    - Filename header
    - Max height / scroll
    - Collapsible
    - Write tests

11. **Streaming Support**
    - Implement async generator
    - Implement chunked rendering
    - Write tests

12. **Auto Detection**
    - Implement language detector
    - Write tests

13. **Plugin System**
    - Implement plugin registry
    - Implement transformer pipeline
    - Write tests

14. **React Components**
    - ThemeProvider
    - useHighlight, useTheme, useCopy hooks
    - CodeBlock component
    - Write tests

15. **Integration Testing**
    - Full flow tests
    - Large file tests
    - Performance benchmarks
    - Edge cases

16. **Build & Exports**
    - Configure all exports
    - Verify tree-shaking
    - Verify dual ESM/CJS
    - Test package size

17. **Documentation Website**
    - Set up Vite + React + Tailwind
    - Landing page with live demo
    - Interactive playground
    - Theme gallery
    - All documentation pages
    - Build to /docs folder
    - Add CNAME

18. **Final Polish**
    - README with examples
    - CHANGELOG
    - 100% test coverage check
    - Bundle size check (<15KB target)

---

## Website Requirements

### Stack
- React 18+
- Vite
- TypeScript
- Tailwind CSS

### Domain
- `codeshine.oxog.dev`
- CNAME in `website/public/CNAME`

### Key Pages

**Landing Page**
- Stunning hero with animated code highlighting
- "Zero dependencies, 50+ languages, 15+ themes"
- Quick start code examples
- Live interactive demo
- Comparison with Prism/Shiki/Highlight.js

**Playground**
- Full-featured code editor
- All options configurable
- Theme switcher
- Export generated HTML

**Theme Gallery**
- Visual preview of all themes
- Same code sample across themes
- One-click copy theme name

**Documentation**
- Getting Started
- Basic Usage
- Languages (with full list)
- Themes (customization guide)
- Line Features
- Word Features
- UI Features
- React Components
- Custom Languages
- Custom Themes
- Plugins
- Streaming
- API Reference

### Design
- Modern, clean aesthetic
- Dogfood: use codeshine for all code blocks!
- Responsive
- Fast (no heavy assets)

---

## Package.json Template

```json
{
  "name": "@oxog/codeshine",
  "version": "1.0.0",
  "description": "The ultimate syntax highlighter — beautiful code, zero compromises",
  "author": "Ersin Koc",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/ersinkoc/codeshine.git"
  },
  "homepage": "https://codeshine.oxog.dev",
  "keywords": [
    "syntax-highlighting",
    "code-highlighting",
    "highlighter",
    "prism",
    "highlight",
    "code",
    "syntax",
    "react",
    "typescript",
    "zero-dependency"
  ],
  "type": "module",
  "main": "./dist/cjs/index.js",
  "module": "./dist/esm/index.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "types": "./dist/types/index.d.ts"
    },
    "./react": {
      "import": "./dist/esm/renderers/react/index.js",
      "require": "./dist/cjs/renderers/react/index.js",
      "types": "./dist/types/renderers/react/index.d.ts"
    },
    "./languages": {
      "import": "./dist/esm/languages/index.js",
      "require": "./dist/cjs/languages/index.js",
      "types": "./dist/types/languages/index.d.ts"
    },
    "./languages/*": {
      "import": "./dist/esm/languages/*.js",
      "require": "./dist/cjs/languages/*.js",
      "types": "./dist/types/languages/*.d.ts"
    },
    "./themes": {
      "import": "./dist/esm/themes/index.js",
      "require": "./dist/cjs/themes/index.js",
      "types": "./dist/types/themes/index.d.ts"
    },
    "./transformers": {
      "import": "./dist/esm/plugins/transformers.js",
      "require": "./dist/cjs/plugins/transformers.js",
      "types": "./dist/types/plugins/transformers.d.ts"
    }
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE",
    "CHANGELOG.md"
  ],
  "scripts": {
    "dev": "vitest",
    "test": "vitest run",
    "test:coverage": "vitest run --coverage",
    "build": "npm run build:esm && npm run build:cjs && npm run build:types",
    "build:esm": "tsc -p tsconfig.build.json --outDir dist/esm",
    "build:cjs": "tsc -p tsconfig.build.json --outDir dist/cjs --module commonjs",
    "build:types": "tsc -p tsconfig.build.json --outDir dist/types --declaration --emitDeclarationOnly",
    "lint": "eslint src tests",
    "format": "prettier --write .",
    "size": "bundlesize",
    "prepublishOnly": "npm run lint && npm run test:coverage && npm run build",
    "website:dev": "cd website && npm run dev",
    "website:build": "cd website && npm run build"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.3.0",
    "vitest": "^1.0.0",
    "@vitest/coverage-v8": "^1.0.0",
    "eslint": "^8.56.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "prettier": "^3.1.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "bundlesize": "^0.18.0"
  },
  "peerDependencies": {
    "react": ">=17.0.0",
    "react-dom": ">=17.0.0"
  },
  "peerDependenciesMeta": {
    "react": { "optional": true },
    "react-dom": { "optional": true }
  },
  "bundlesize": [
    { "path": "./dist/esm/index.js", "maxSize": "15 kB" }
  ]
}
```

---

## README Template

````markdown
# @oxog/codeshine

The ultimate syntax highlighter — beautiful code, zero compromises.

[![npm version](https://img.shields.io/npm/v/@oxog/codeshine.svg)](https://www.npmjs.com/package/@oxog/codeshine)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@oxog/codeshine)](https://bundlephobia.com/package/@oxog/codeshine)
[![test coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)]()

## Why Codeshine?

| Feature | Codeshine | Prism | Shiki | Highlight.js |
|---------|-----------|-------|-------|--------------|
| Zero dependencies | ✅ | ❌ | ❌ | ❌ |
| Bundle size | ~15KB | ~17KB | ~1MB | ~40KB |
| Languages | 50+ | 200+ | 200+ | 180+ |
| Tree-shakeable | ✅ | ❌ | ❌ | ❌ |
| Line highlighting | ✅ | Plugin | ✅ | ❌ |
| Focus mode | ✅ | ❌ | ❌ | ❌ |
| Diff markers | ✅ | ❌ | ✅ | ❌ |
| Word highlighting | ✅ | ❌ | ❌ | ❌ |
| React components | ✅ | ❌ | ❌ | ❌ |
| CSS + JS theming | ✅ | CSS only | JS only | CSS only |
| Streaming | ✅ | ❌ | ❌ | ❌ |

## Installation

```bash
npm install @oxog/codeshine
```

## Quick Start

```typescript
import { highlight } from '@oxog/codeshine';

const html = highlight('const x = 42;', { language: 'typescript' });
```

## Full Example

```typescript
import { highlight } from '@oxog/codeshine';

const html = highlight(code, {
  language: 'typescript',
  theme: 'github-dark',
  lineNumbers: true,
  highlightLines: [1, '3-5'],
  copyButton: true,
  filename: 'example.ts'
});
```

## React

```tsx
import { CodeBlock } from '@oxog/codeshine/react';

<CodeBlock
  code={code}
  language="typescript"
  theme="github-dark"
  lineNumbers
  highlightLines={[1, '3-5']}
  copyButton
/>
```

## Documentation

Visit [codeshine.oxog.dev](https://codeshine.oxog.dev) for full documentation.

## License

MIT © Ersin Koc

---

[GitHub](https://github.com/ersinkoc/codeshine)
````

---

## Final Checklist

Before considering this package complete:

- [ ] `dependencies` in package.json is empty `{}`
- [ ] All tests pass (`npm test`)
- [ ] Test coverage is 100%
- [ ] Builds successfully for ESM and CJS
- [ ] TypeScript declarations generated
- [ ] All 50+ languages work correctly
- [ ] All 15+ themes render correctly
- [ ] Line features work (numbers, highlight, focus, diff)
- [ ] Word features work (highlight, ranges)
- [ ] UI features work (copy, badge, filename)
- [ ] Streaming works for large files
- [ ] React components work
- [ ] Tree-shaking verified
- [ ] Bundle size < 15KB (core + tier1 langs)
- [ ] Website builds to /docs
- [ ] CNAME exists: `codeshine.oxog.dev`
- [ ] README complete
- [ ] CHANGELOG complete

---

## Implementation Notes

### Tokenizer Strategy

Use a hybrid approach:
1. **Regex patterns** for simple tokens (keywords, numbers, operators)
2. **State machine** for complex tokens (strings, comments, nested structures)
3. **Context awareness** for language embedding (JS in HTML, CSS in HTML)

### Performance Tips

1. **Lazy language loading**: Only load language definitions when needed
2. **Token caching**: Cache tokenization results for repeated highlighting
3. **Virtual rendering**: For very long files, only render visible lines
4. **Web Worker**: Offer async highlighting for non-blocking UI

### Theme Consistency

Ensure all themes have:
1. All required color keys
2. Good contrast ratios (WCAG AA minimum)
3. Consistent visual weight
4. Both light and dark variants where sensible

### Testing Strategy

1. **Unit tests**: Every function in isolation
2. **Language tests**: Snapshot tests for each language
3. **Theme tests**: Verify all color keys present
4. **Integration tests**: Full highlight pipeline
5. **Performance tests**: Benchmark against Prism/Shiki

---

**END OF PROMPT**

This prompt contains everything needed to build @oxog/codeshine from scratch with zero errors. The ultimate syntax highlighter — beautiful code, zero compromises.
