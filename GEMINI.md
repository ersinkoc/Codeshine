# Codeshine Project Context

## Project Overview
**Codeshine** is a lightweight, zero-dependency syntax highlighting library written in TypeScript. It aims to provide beautiful code rendering with no compromises, featuring support for 45+ languages, multiple themes, and framework integrations (React, Vue, Svelte).

**Key Features:**
- **Zero Dependencies:** Pure TypeScript implementation.
- **Performance:** Small bundle size (~25KB min+gzip) and streaming support for large files.
- **Framework Agnostic:** Core logic separated from renderers, with built-in support for React, Vue, and Svelte.
- **Extensible:** Plugin system, custom language definitions, and theme support.

## Architecture
The project is structured into several core modules:

- **Core (`src/core/`):**
  - `Engine`: Main entry point (`Codeshine` class).
  - `Tokenizer`: Tokenizes code based on language patterns.
  - `Parser`: Converts tokens to line-based structures.
  - `Renderer`: Renders lines to HTML.
  - `Detector`: Auto-detects programming languages.
- **Languages (`src/languages/`):**
  - Organized into Tiers (1-5) based on popularity/core status.
  - Defined using `defineLang` helper.
- **Themes (`src/themes/`):**
  - Supports Dark and Light themes.
  - Defined using `defineTheme` helper.
- **Renderers (`src/renderers/`):**
  - Framework-specific components (React, Vue, Svelte).

## Building and Running

### Core Scripts
- **Install Dependencies:** `npm install`
- **Development (Watch Tests):** `npm run dev` (`vitest`)
- **Test:** `npm test` (`vitest run`)
- **Test with Coverage:** `npm run test:coverage`
- **Build:** `npm run build` (Builds ESM, CJS, Types, and Browser bundles)
- **Lint:** `npm run lint`
- **Format:** `npm run format`

### Documentation Site
- **Run Dev Server:** `npm run website:dev`
- **Build Website:** `npm run website:build`

## Development Conventions

### TypeScript
- **Strict Mode:** Enabled (`strict: true`).
- **No Any:** Use `unknown` instead of `any` where possible.
- **Explicit Returns:** Function return types should be explicit.
- **Types:** Use `interface` for objects, `type` for unions/intersections.

### Code Style
- **Formatting:** Prettier (2 spaces, single quotes, semicolons).
- **Line Length:** 100 characters.
- **Structure:**
  - Prefer `const` over `let`.
  - Maintain functional purity where possible.

### Testing
- **Framework:** Vitest.
- **Coverage:** Aim for 99%+ line coverage.
- **Naming:** Descriptive test names, grouping with `describe`.
- **Location:** `tests/` directory mirrors `src/` structure.

### Commits
- Follow **Conventional Commits**:
  - `feat:` New features
  - `fix:` Bug fixes
  - `docs:` Documentation changes
  - `style:` Formatting changes
  - `refactor:` Code restructuring
  - `test:` Adding/updating tests
  - `chore:` Maintenance tasks

## Adding New Features

### Adding a Language
1. Create a new file in `src/languages/tierX/`.
2. Use `defineLang` to define patterns and keywords.
3. Export from the tier index and main registry.
4. Add tests in `tests/languages/`.

### Adding a Theme
1. Create a new file in `src/themes/dark/` or `src/themes/light/`.
2. Use `defineTheme` to define colors and styles.
3. Export from the theme index.
4. Add tests.

### Adding a Plugin
1. Implement the `CodeshinePlugin` interface.
2. Register via `codeshine.use(plugin)`.
