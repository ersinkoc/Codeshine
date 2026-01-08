import { CodeBlock } from '@/components/code/CodeBlock';

const DARK_THEMES = [
  'github-dark',
  'dracula',
  'monokai',
  'nord',
  'one-dark',
  'vscode-dark',
  'tokyo-night',
  'catppuccin-mocha',
];

const LIGHT_THEMES = [
  'github-light',
  'one-light',
  'solarized-light',
  'vscode-light',
  'catppuccin-latte',
];

const SPECIAL_THEMES = ['high-contrast-dark', 'high-contrast-light'];

export function Themes() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Themes</h1>
        <p className="text-lg text-muted-foreground">
          Codeshine comes with 14 beautiful built-in themes.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Using Themes</h2>
        <p className="text-muted-foreground">
          You can use themes by name string or by importing the theme object:
        </p>
        <CodeBlock
          code={`import { highlight, githubDark, monokai } from '@oxog/codeshine';

// Use theme by name
const html1 = highlight(code, { theme: 'github-dark' });

// Use theme object
const html2 = highlight(code, { theme: monokai });`}
          language="javascript"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Dark Themes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {DARK_THEMES.map((theme) => (
            <div
              key={theme}
              className="px-3 py-2 rounded-lg bg-zinc-900 text-zinc-100 text-sm font-mono"
            >
              {theme}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Light Themes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {LIGHT_THEMES.map((theme) => (
            <div
              key={theme}
              className="px-3 py-2 rounded-lg bg-zinc-100 text-zinc-900 text-sm font-mono border border-border"
            >
              {theme}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Special Themes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {SPECIAL_THEMES.map((theme) => (
            <div
              key={theme}
              className="px-3 py-2 rounded-lg bg-black text-white text-sm font-mono border border-white"
            >
              {theme}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme Object Exports</h2>
        <p className="text-muted-foreground">
          All themes are available as named exports:
        </p>
        <CodeBlock
          code={`import {
  // Dark themes
  githubDark,
  vscodeDark,
  dracula,
  monokai,
  oneDark,
  nord,
  tokyoNight,
  catppuccinMocha,

  // Light themes
  githubLight,
  vscodeLight,
  oneLight,
  solarizedLight,
  catppuccinLatte,

  // Special
  highContrastDark,
  highContrastLight,

  // Themes object with all themes
  themes,
} from '@oxog/codeshine';

// Access via themes object
const theme = themes.dracula;`}
          language="typescript"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom Themes</h2>
        <p className="text-muted-foreground">
          Create your own themes using <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">defineTheme</code>:
        </p>
        <CodeBlock
          code={`import { defineTheme, extendTheme, dracula } from '@oxog/codeshine';

// Create from scratch
const myTheme = defineTheme({
  name: 'my-theme',
  type: 'dark',
  colors: {
    background: '#1a1b26',
    foreground: '#c0caf5',
    lineNumber: '#565f89',
    // ... other colors
    tokens: {
      keyword: '#bb9af7',
      string: '#9ece6a',
      number: '#ff9e64',
      // ... other token colors
    },
  },
});

// Extend existing theme
const myDracula = extendTheme(dracula, {
  name: 'my-dracula',
  colors: {
    background: '#1e1e2e',
  },
});`}
          language="typescript"
          title="custom-theme.ts"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">CSS Variables</h2>
        <p className="text-muted-foreground">
          Generate CSS variables from a theme for dynamic styling:
        </p>
        <CodeBlock
          code={`import { generateCSSString, githubDark } from '@oxog/codeshine';

// Generate CSS string
const css = generateCSSString(githubDark);

// Inject into document
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);`}
          language="javascript"
        />
      </section>
    </div>
  );
}
