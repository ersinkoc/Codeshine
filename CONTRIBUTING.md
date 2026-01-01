# Contributing to Codeshine

First off, thank you for considering contributing to Codeshine! It's people like you that make Codeshine such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by the [Codeshine Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, links to files)
- **Describe the behavior you observed and what you expected**
- **Include your environment details** (OS, Node.js version, browser)

### Suggesting Features

Feature suggestions are tracked as GitHub issues. When creating a feature request:

- **Use a clear and descriptive title**
- **Provide a detailed description of the proposed feature**
- **Explain why this feature would be useful**
- **List any alternatives you've considered**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code follows the existing style
6. Issue the pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/codeshine.git
cd codeshine

# Install dependencies
npm install

# Run tests in watch mode
npm run dev

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Build the project
npm run build

# Lint the code
npm run lint

# Format the code
npm run format
```

## Project Structure

```
codeshine/
├── src/
│   ├── core/           # Core highlighting engine
│   │   ├── engine.ts   # Main Codeshine class
│   │   ├── tokenizer.ts
│   │   ├── parser.ts
│   │   └── renderer.ts
│   ├── languages/      # Language definitions
│   │   ├── tier1/      # Core languages (always bundled)
│   │   ├── tier2/      # Popular languages
│   │   └── ...
│   ├── themes/         # Theme definitions
│   │   ├── dark/
│   │   └── light/
│   ├── renderers/      # Output renderers
│   │   └── react/      # React components
│   ├── plugins/        # Plugin system
│   └── utils/          # Utility functions
├── tests/              # Test files (mirrors src structure)
├── website/            # Documentation site
└── dist/               # Build output
```

## Adding a New Language

1. Create a new file in the appropriate tier folder:
   ```typescript
   // src/languages/tier3/mylang.ts
   import { defineLanguage } from '../types.js';

   export const mylang = defineLanguage({
     name: 'mylang',
     aliases: ['ml'],
     extensions: ['.ml'],
     patterns: [
       { pattern: /\/\/.*$/gm, type: 'comment' },
       { pattern: /"[^"]*"/g, type: 'string' },
       { pattern: /\b(if|else|while)\b/g, type: 'keyword' },
       // ... more patterns
     ],
   });
   ```

2. Export from the tier index file
3. Add to the main languages index
4. Add tests in `tests/languages/`
5. Update documentation

## Adding a New Theme

1. Create a new file in `src/themes/dark/` or `src/themes/light/`:
   ```typescript
   // src/themes/dark/mytheme.ts
   import { defineTheme } from '../index.js';

   export const mytheme = defineTheme({
     name: 'mytheme',
     type: 'dark',
     colors: {
       background: '#1a1a2e',
       foreground: '#eaeaea',
       tokens: {
         keyword: '#c792ea',
         string: '#c3e88d',
         // ... all token types
       },
     },
   });
   ```

2. Export from the theme index
3. Add tests
4. Add to theme documentation

## Style Guide

### TypeScript

- Use strict TypeScript (`strict: true`)
- Prefer `const` over `let`
- Use explicit return types for functions
- Use `interface` for object shapes, `type` for unions/intersections
- No `any` - use `unknown` if type is truly unknown

### Code Style

- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multiline
- 100 character line width

### Commits

- Use conventional commits format:
  - `feat:` new feature
  - `fix:` bug fix
  - `docs:` documentation
  - `style:` formatting
  - `refactor:` code restructuring
  - `test:` adding tests
  - `chore:` maintenance

### Tests

- Write tests for all new features
- Maintain 99%+ line coverage
- Use descriptive test names
- Group related tests with `describe`

## Release Process

Releases are automated via GitHub Actions when a version tag is pushed:

```bash
# Update version in package.json
npm version patch|minor|major

# Push with tags
git push --follow-tags
```

## Questions?

Feel free to open an issue with the "question" label or reach out to the maintainers.

Thank you for contributing!
