# CLAUDE.md

This file provides guidance for Claude Code when working with the Codeshine repository.

## Project Overview

Codeshine (`@oxog/codeshine`) is a zero-dependency syntax highlighting library written in TypeScript. It supports 45+ programming languages, 14+ themes, and provides React/Vue/Svelte integrations.

## Commands

### Development
```bash
npm run dev          # Start Vitest in watch mode
npm run test         # Run all tests once
npm run test:coverage # Run tests with coverage report
npm run lint         # Run ESLint on src/ and tests/
npm run format       # Format code with Prettier
npm run benchmark    # Run performance benchmarks
```

### Building
```bash
npm run build        # Build all targets (ESM, CJS, types, browser)
npm run build:esm    # Build ES modules only
npm run build:cjs    # Build CommonJS only
npm run build:types  # Build TypeScript declarations only
npm run build:browser # Build browser bundles (ESM + IIFE)
```

### Website
```bash
npm run website:dev   # Start documentation site locally
npm run website:build # Build documentation site
```

## Architecture

### Directory Structure

```
src/
├── core/           # Core highlighting engine
│   ├── types.ts    # Core type definitions
│   ├── tokenizer.ts # Token stream generator
│   ├── parser.ts   # Code parser
│   ├── renderer.ts # HTML output renderer
│   ├── highlighter.ts # Main highlight() function
│   ├── detector.ts # Language auto-detection
│   ├── streaming.ts # Streaming support for large files
│   └── engine.ts   # Codeshine class implementation
│
├── languages/      # Language definitions (tiered by priority)
│   ├── types.ts    # LanguageDefinition interface
│   ├── registry.ts # Language registration
│   ├── tier1/      # Core: JS, TS, JSX, TSX, HTML, CSS, JSON, Markdown
│   ├── tier2/      # Popular: Python, Java, C/C++, Go, Rust, etc.
│   ├── tier3/      # Web/Config: YAML, TOML, SQL, Bash, etc.
│   ├── tier4/      # Data: CSV, Diff, JSON5, Regex
│   └── tier5/      # Extended: Lua, Dockerfile, etc.
│
├── themes/         # Theme definitions
│   ├── types.ts    # Theme interface
│   ├── registry.ts # Theme registration
│   ├── css-vars.ts # CSS variable generation
│   ├── dark/       # Dark themes
│   ├── light/      # Light themes
│   └── special/    # High-contrast themes
│
├── renderers/      # Framework integrations
│   ├── types.ts    # Shared renderer types
│   ├── html/       # Plain HTML renderer
│   ├── react/      # React components and hooks
│   ├── vue/        # Vue 3 components
│   └── svelte/     # Svelte components
│
├── plugins/        # Plugin system
│   ├── types.ts    # Plugin interfaces
│   ├── registry.ts # Plugin registration
│   └── transformer.ts # Transformer utilities
│
├── features/       # Feature implementations
│   └── line-numbers.ts
│
├── utils/          # Utility functions
│   ├── escape.ts   # HTML/Regex escaping (escapeHtml, escapeRegExp)
│   ├── merge.ts    # Deep merge utilities
│   ├── hash.ts     # String hashing
│   ├── range-parser.ts # Line range parsing
│   └── classnames.ts # CSS class utilities
│
└── index.ts        # Main entry point
```

### Key Exports

```typescript
// Main functions
import { highlight, highlightAsync, createHighlightStream, detectLanguage } from '@oxog/codeshine';

// Class-based API
import { Codeshine } from '@oxog/codeshine';

// Themes
import { themes, githubDark, dracula, monokai } from '@oxog/codeshine';
import { generateCSSString, generateCSSVars } from '@oxog/codeshine/themes';

// React
import { CodeBlock, useCodeshine, useHighlight, useCopy, ThemeProvider } from '@oxog/codeshine/react';
```

## Code Conventions

### TypeScript
- Strict mode enabled with `exactOptionalPropertyTypes: true`
- Optional properties must use `prop?: Type | undefined` pattern
- All exports should have explicit types

### Security
- User-provided strings used in regex must be escaped with `escapeRegExp()`
- HTML output uses `escapeHtml()` to prevent XSS
- No external runtime dependencies (zero supply chain risk)

### Testing
- Tests are in `tests/` directory using Vitest
- Test files follow `*.test.ts` naming convention
- Aim for high coverage (currently 99%+)

### Imports
- Use `.js` extension in relative imports (for ESM compatibility)
- Group imports: external deps, then internal by depth

## Common Tasks

### Adding a New Language
1. Create definition in appropriate tier (`src/languages/tierN/`)
2. Export from tier's `index.ts`
3. Register in `src/languages/registry.ts`
4. Add tests in `tests/languages/`

### Adding a New Theme
1. Create theme in `src/themes/dark/` or `src/themes/light/`
2. Export from category's `index.ts`
3. Register in `src/themes/registry.ts`
4. Add to documentation

### Fixing Security Issues
- ReDoS: Always escape user input with `escapeRegExp()` before regex
- XSS: Use `escapeHtml()` for any user content in HTML output

## Entry Points

- `src/index.ts` - Main library entry
- `src/renderers/react/index.ts` - React components entry
- `src/themes/index.ts` - Themes entry
- `src/languages/index.ts` - Languages entry

## Build Output

```
dist/
├── esm/      # ES modules (import)
├── cjs/      # CommonJS (require)
├── types/    # TypeScript declarations
└── browser/  # Browser bundles
    ├── codeshine.esm.js
    ├── codeshine.esm.min.js
    ├── codeshine.iife.js
    └── codeshine.iife.min.js
```
