---
layout: home

hero:
  name: Codeshine
  text: Zero-dependency syntax highlighter
  tagline: Beautiful, fast, and customizable code highlighting for the modern web
  image:
    src: /logo.svg
    alt: Codeshine
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/ersinkoc/codeshine

features:
  - icon: ⚡
    title: Zero Dependencies
    details: No external runtime dependencies. Lightweight and fast with a small bundle size.
  - icon: 🎨
    title: 15+ Themes
    details: Beautiful built-in themes including GitHub, Dracula, Monokai, Nord, and more.
  - icon: 🌍
    title: 50+ Languages
    details: Support for JavaScript, TypeScript, Python, Rust, Go, and many more languages.
  - icon: 📝
    title: Rich Features
    details: Line numbers, line highlighting, diff view, word highlighting, copy button, and more.
  - icon: 🔌
    title: Extensible
    details: Plugin system for custom transformers, languages, and themes.
  - icon: ⚛️
    title: React Ready
    details: First-class React components and hooks for seamless integration.
---

<script setup>
import { ref, onMounted } from 'vue'

const highlighted = ref('')

onMounted(async () => {
  // Demo code will be shown here
})
</script>

## Quick Start

Install Codeshine via npm:

```bash
npm install @oxog/codeshine
```

Use it in your project:

```javascript
import { highlight } from '@oxog/codeshine';

const code = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
}`;

const html = highlight(code, {
  language: 'javascript',
  theme: 'github-dark',
  lineNumbers: true,
});

document.getElementById('code').innerHTML = html;
```

## Features at a Glance

### Line Highlighting

```javascript {2,4-6}
function processData(data) {
  // This line is highlighted
  const result = [];
  for (const item of data) {  // These lines
    result.push(transform(item)); // are also
  }                               // highlighted
  return result;
}
```

### Diff View

```diff
- const oldValue = 'deprecated';
+ const newValue = 'updated';
  const unchanged = 'same';
```

### Word Highlighting

Highlight specific words or patterns in your code for emphasis.

### Copy Button

Every code block can have a copy button for easy code sharing.

## Why Codeshine?

- **Performance**: Optimized tokenizer with streaming support for large files
- **TypeScript**: Full TypeScript support with strict types
- **Customizable**: Create custom themes and languages easily
- **Modern**: ES modules, tree-shakeable, and future-proof
- **Tested**: 99%+ test coverage with comprehensive test suite
