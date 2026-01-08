# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4] - 2026-01-08

### Added
- **Haskell language support** with comprehensive test coverage (96 tests, 100% coverage)
- New `website:sync` script for local development workflow
- TypeScript path mappings for website to use local codeshine build

### Fixed
- **Haskell tokenization** - removed `/g` flags from patterns that broke regex matching
- Added `operators` property to Haskell definition for proper operator highlighting
- GitHub Actions workflow now properly syncs dist to website before build

### Changed
- **Website architecture** - now uses local `dist/` build instead of npm package
- Improved CI/CD pipeline with proper build order (build → sync → website build)
- Website development workflow simplified with `npm run website:dev`

## [1.0.3] - 2026-01-08

### Changed
- **Refactored range highlighting** - replaced regex-based HTML manipulation with token-level range splitting for improved reliability
- Word highlighting now uses manual HTML parser instead of regex for safer text node matching
- Added event loop yields in streaming functions for better responsiveness

### Added
- `RenderableToken` interface to support rangeHighlight metadata on tokens
- CLAUDE.md for AI assistant guidance

## [1.0.2] - 2026-01-08

### Security
- **Fixed ReDoS vulnerability** in word highlighting - user-provided words are now properly escaped for regex to prevent catastrophic backtracking attacks

### Fixed
- Word highlighting now correctly matches literal strings (e.g., `console.log` no longer matches `consolexlog`)
- React CodeBlock copy button now properly triggers copy functionality
- Removed unused imports in React hooks (`useEffect`, `useCallback`, `React`, `ReactNode`)
- Fixed `useMemo` dependency array in `useHighlight` hook

### Changed
- Added explicit `| undefined` to optional TypeScript properties for `exactOptionalPropertyTypes` compatibility
- Improved copy button UX - now shows "Copied!" feedback after clicking

## [1.0.1] - 2026-01-01

### Added
- Browser/CDN builds (ESM + IIFE) via unpkg and jsdelivr
- Interactive playground page on documentation site
- Performance benchmark script (`npm run benchmark`)
- CI/CD workflows for testing and automated releases

### Changed
- Improved README with comparison table and badges
- Added CDN usage examples to documentation

### Fixed
- Line spacing issue in rendered code blocks

## [1.0.0] - 2026-01-01

### Added

#### Core Features
- Zero-dependency syntax highlighting engine
- Support for 45+ programming languages
- 14 built-in themes (9 dark, 5 light)
- Line numbers with customizable starting line
- Line highlighting and focus mode
- Diff view support (added/removed/modified lines)
- Word highlighting within code blocks
- Streaming support for large files
- Auto language detection

#### Language Support
- **Tier 1 (Core):** JavaScript, TypeScript, JSX, TSX, HTML, CSS, JSON, Markdown
- **Tier 2 (Popular):** Python, Java, C, C++, C#, Go, Rust, Ruby, PHP, Swift, Kotlin
- **Tier 3 (Web/Config):** Bash, GraphQL, PowerShell, SQL, TOML, XML, YAML
- **Tier 4 (Data):** CSV, Diff, JSON5, Regex
- **Tier 5 (Extended):** Lua, Dockerfile, Perl, R, Scala, Haskell, Elixir, and more

#### Themes
- **Dark:** VS Code Dark, GitHub Dark, Dracula, One Dark, Nord, Tokyo Night, Catppuccin Mocha, Monokai
- **Light:** VS Code Light, GitHub Light, One Light, Solarized Light, Catppuccin Latte
- **Accessibility:** High Contrast Dark, High Contrast Light

#### Integrations
- React components with hooks (`useCodeshine`, `useTheme`)
- VitePress/markdown integration
- Plugin system with transformers
- CSS variable generation for custom styling

#### Developer Experience
- Full TypeScript support with strict typing
- Tree-shakeable ES modules
- CommonJS support for Node.js
- Comprehensive API documentation
- 99%+ test coverage

### Security
- No external dependencies (zero supply chain risk)
- XSS-safe HTML output with proper escaping
- Content Security Policy (CSP) compatible

---

## [Unreleased]

### Planned
- Vue 3 component (official)
- Svelte component (official)
- VS Code extension
- More themes

[1.0.4]: https://github.com/ersinkoc/codeshine/releases/tag/v1.0.4
[1.0.3]: https://github.com/ersinkoc/codeshine/releases/tag/v1.0.3
[1.0.2]: https://github.com/ersinkoc/codeshine/releases/tag/v1.0.2
[1.0.1]: https://github.com/ersinkoc/codeshine/releases/tag/v1.0.1
[1.0.0]: https://github.com/ersinkoc/codeshine/releases/tag/v1.0.0
[Unreleased]: https://github.com/ersinkoc/codeshine/compare/v1.0.4...HEAD
