# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- Vue 3 component
- Svelte component
- Browser/CDN build (UMD)
- Interactive playground
- Performance benchmarks
- VS Code extension

[1.0.0]: https://github.com/ersinkoc/codeshine/releases/tag/v1.0.0
[Unreleased]: https://github.com/ersinkoc/codeshine/compare/v1.0.0...HEAD
