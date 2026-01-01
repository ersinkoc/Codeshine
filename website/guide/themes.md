# Themes

Codeshine includes 15+ beautiful themes out of the box, with support for custom themes.

## Built-in Themes

### Dark Themes

| Theme | Description |
|-------|-------------|
| `vsDark` | VS Code Dark+ (default) |
| `dracula` | Popular Dracula theme |
| `oneDark` | Atom One Dark Pro |
| `github` | GitHub Dark |
| `tokyoNight` | Tokyo Night |
| `nord` | Arctic, north-bluish |
| `nightOwl` | Night Owl |
| `synthwave` | Synthwave '84 |
| `monokai` | Classic Monokai |

### Light Themes

| Theme | Description |
|-------|-------------|
| `vsLight` | VS Code Light+ |
| `githubLight` | GitHub Light |
| `oneLight` | Atom One Light |
| `solarizedLight` | Solarized Light |
| `catppuccinLatte` | Catppuccin Latte |

## Using Themes

### Import and Use

```typescript
import { Codeshine, themes } from '@oxog/codeshine';

// Use a specific theme
const codeshine = new Codeshine({
  theme: themes.dracula
});

// Highlight with theme
const html = codeshine.highlight(code, { language: 'javascript' });
```

### Change Theme Dynamically

```typescript
// Set theme after initialization
codeshine.setTheme(themes.nord);

// Re-highlight with new theme
const html = codeshine.highlight(code, { language: 'javascript' });
```

## Theme Structure

Each theme defines colors for:

```typescript
interface ThemeColors {
  // Editor colors
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

  // Diff colors
  diffAddedBackground: string;
  diffAddedText: string;
  diffRemovedBackground: string;
  diffRemovedText: string;
  diffModifiedBackground: string;
  diffModifiedText: string;

  // Features
  focusDimmed: string;
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

  // Token colors
  tokens: TokenColors;
}
```

## Token Colors

Syntax highlighting colors for different token types:

```typescript
interface TokenColors {
  keyword: string;     // if, for, while, function
  string: string;      // "hello", 'world'
  number: string;      // 42, 3.14
  comment: string;     // // comment
  operator: string;    // +, -, *, /
  punctuation: string; // {, }, (, )
  function: string;    // myFunction()
  variable: string;    // myVariable
  class: string;       // MyClass
  type: string;        // string, number
  constant: string;    // TRUE, NULL
  property: string;    // obj.property
  attribute: string;   // @attribute
  tag: string;         // <div>
  regexp: string;      // /pattern/
  escape: string;      // \n, \t
  interpolation: string; // ${value}
  meta: string;        // #include
  invalid: string;     // error highlighting
}
```

## Creating Custom Themes

### Using defineTheme

```typescript
import { defineTheme } from '@oxog/codeshine';

const myTheme = defineTheme({
  name: 'my-custom-theme',
  type: 'dark', // or 'light'
  colors: {
    background: '#1a1b26',
    foreground: '#a9b1d6',
    tokens: {
      keyword: '#bb9af7',
      string: '#9ece6a',
      number: '#ff9e64',
      comment: '#565f89',
      function: '#7aa2f7',
    }
  }
});

const codeshine = new Codeshine({ theme: myTheme });
```

### Extending Existing Themes

```typescript
import { extendTheme, themes } from '@oxog/codeshine';

const myTheme = extendTheme(themes.dracula, {
  name: 'dracula-modified',
  colors: {
    background: '#1e1e2e',
    tokens: {
      keyword: '#cba6f7',
    }
  }
});
```

## Theme CSS Variables

Themes automatically generate CSS variables for styling:

```css
.codeshine {
  --cs-background: #1e1e1e;
  --cs-foreground: #d4d4d4;
  --cs-line-number: #858585;
  --cs-line-highlight: rgba(255, 255, 255, 0.1);
  /* ... more variables */
}
```

### Using CSS Variables

```css
/* Override theme colors with CSS */
.my-code-block {
  --cs-background: #000000;
  --cs-foreground: #ffffff;
}
```

## Theme Examples

### Dracula Theme Preview

```typescript
const codeshine = new Codeshine({ theme: themes.dracula });

const html = codeshine.highlight(`
function vampire() {
  const fangs = true;
  return "I vant to suck your blood!";
}
`, { language: 'javascript' });
```

### Nord Theme Preview

```typescript
const codeshine = new Codeshine({ theme: themes.nord });

const html = codeshine.highlight(`
fn aurora() -> String {
    let polar = "Northern Lights";
    polar.to_string()
}
`, { language: 'rust' });
```

## Theme Fonts

Themes also define font settings:

```typescript
const myTheme = defineTheme({
  name: 'my-theme',
  type: 'dark',
  fonts: {
    family: "'JetBrains Mono', monospace",
    size: '14px',
    lineHeight: 1.6,
    weight: 400
  },
  // ... colors
});
```

## Theme Spacing

Control padding and layout:

```typescript
const myTheme = defineTheme({
  name: 'my-theme',
  type: 'dark',
  spacing: {
    padding: '20px',
    lineNumberWidth: '50px',
    gutterPadding: '10px'
  },
  // ... colors
});
```

## Theme Borders

Customize border styles:

```typescript
const myTheme = defineTheme({
  name: 'my-theme',
  type: 'dark',
  borders: {
    radius: '12px',
    width: '2px'
  },
  // ... colors
});
```
