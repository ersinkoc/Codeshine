---
layout: page
title: Playground
---

<script setup>
import { ref, computed, onMounted } from 'vue'

const code = ref(`function greet(name) {
  // Say hello
  console.log(\`Hello, \${name}!\`);
  return { greeting: "Hello", name };
}

const result = greet("World");
console.log(result);`)

const language = ref('javascript')
const theme = ref('githubDark')
const lineNumbers = ref(true)
const highlightLines = ref('')

const languages = [
  'javascript', 'typescript', 'python', 'rust', 'go',
  'java', 'c', 'cpp', 'csharp', 'ruby', 'php', 'swift',
  'html', 'css', 'json', 'yaml', 'sql', 'bash', 'markdown'
]

const themes = [
  { value: 'githubDark', label: 'GitHub Dark' },
  { value: 'githubLight', label: 'GitHub Light' },
  { value: 'dracula', label: 'Dracula' },
  { value: 'monokai', label: 'Monokai' },
  { value: 'nord', label: 'Nord' },
  { value: 'oneDark', label: 'One Dark' },
  { value: 'tokyoNight', label: 'Tokyo Night' },
  { value: 'vsDark', label: 'VS Code Dark' },
  { value: 'vsLight', label: 'VS Code Light' },
  { value: 'catppuccinMocha', label: 'Catppuccin Mocha' },
  { value: 'solarizedLight', label: 'Solarized Light' },
]

const highlightedCode = ref('')
const copied = ref(false)

async function updateHighlight() {
  if (typeof window !== 'undefined' && window.Codeshine) {
    const { highlight, themes: allThemes } = window.Codeshine
    const themeObj = allThemes[theme.value] || allThemes.githubDark

    const lines = highlightLines.value
      .split(',')
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n))

    highlightedCode.value = highlight(code.value, {
      language: language.value,
      theme: themeObj,
      lineNumbers: lineNumbers.value,
      highlightLines: lines.length > 0 ? lines : undefined,
    })
  }
}

function copyCode() {
  navigator.clipboard.writeText(code.value)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

onMounted(async () => {
  // Load Codeshine from CDN
  const script = document.createElement('script')
  script.src = 'https://unpkg.com/@oxog/codeshine/dist/browser/codeshine.iife.min.js'
  script.onload = () => updateHighlight()
  document.head.appendChild(script)
})
</script>

# Interactive Playground

Try Codeshine with your own code. Edit the code, change themes, and see the results instantly.

<div class="playground-container">
  <div class="playground-controls">
    <div class="control-group">
      <label>Language</label>
      <select v-model="language" @change="updateHighlight">
        <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
      </select>
    </div>

    <div class="control-group">
      <label>Theme</label>
      <select v-model="theme" @change="updateHighlight">
        <option v-for="t in themes" :key="t.value" :value="t.value">{{ t.label }}</option>
      </select>
    </div>

    <div class="control-group">
      <label>
        <input type="checkbox" v-model="lineNumbers" @change="updateHighlight" />
        Line Numbers
      </label>
    </div>

    <div class="control-group">
      <label>Highlight Lines</label>
      <input
        type="text"
        v-model="highlightLines"
        @input="updateHighlight"
        placeholder="e.g. 2, 3, 5"
        class="highlight-input"
      />
    </div>
  </div>

  <div class="playground-editor">
    <div class="editor-header">
      <span>Input Code</span>
      <button @click="copyCode" class="copy-btn">
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
    <textarea
      v-model="code"
      @input="updateHighlight"
      spellcheck="false"
      class="code-input"
    ></textarea>
  </div>

  <div class="playground-output">
    <div class="output-header">
      <span>Output</span>
    </div>
    <div class="output-content" v-html="highlightedCode"></div>
  </div>
</div>

## Code Examples

Try these examples by copying them into the editor:

### TypeScript

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

### Python

```python
from dataclasses import dataclass
from typing import List

@dataclass
class Task:
    id: int
    title: str
    completed: bool = False

def filter_completed(tasks: List[Task]) -> List[Task]:
    return [t for t in tasks if t.completed]
```

### Rust

```rust
use std::collections::HashMap;

fn word_count(text: &str) -> HashMap<String, usize> {
    let mut counts = HashMap::new();
    for word in text.split_whitespace() {
        *counts.entry(word.to_lowercase()).or_insert(0) += 1;
    }
    counts
}
```

<style>
.playground-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 24px 0;
}

.playground-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.control-group label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.control-group select,
.control-group input[type="text"] {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.highlight-input {
  width: 120px;
}

.playground-editor,
.playground-output {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.editor-header,
.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-border);
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.copy-btn {
  padding: 4px 12px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.copy-btn:hover {
  background: var(--vp-c-brand-dark);
}

.code-input {
  width: 100%;
  min-height: 200px;
  padding: 16px;
  border: none;
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
}

.code-input:focus {
  outline: none;
}

.output-content {
  padding: 0;
  min-height: 200px;
  overflow-x: auto;
}

.output-content .cs-codeblock {
  margin: 0;
  border-radius: 0;
}
</style>
