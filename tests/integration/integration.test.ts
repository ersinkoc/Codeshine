/**
 * Integration tests for Codeshine
 */

import { describe, it, expect } from 'vitest';
import {
  highlight,
  highlightAsync,
  Codeshine,
  tokenize,
  parseTokensToLines,
  render,
  detectLanguage,
  getLanguage,
  getTheme,
  githubDark,
  githubLight,
} from '../../src/index.js';

describe('End-to-end highlighting', () => {
  it('should highlight JavaScript code', () => {
    const code = `
const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};

greet("World");
`.trim();

    const html = highlight(code, { language: 'javascript' });

    expect(html).toContain('cs-codeblock');
    expect(html).toContain('cs-keyword'); // const
    expect(html).toContain('cs-function'); // greet
    expect(html).toContain('cs-string'); // template literal
  });

  it('should highlight TypeScript code', () => {
    const code = `
interface User {
  name: string;
  age: number;
}

function greet(user: User): void {
  console.log(user.name);
}
`.trim();

    const html = highlight(code, { language: 'typescript' });

    expect(html).toContain('cs-keyword'); // interface, function
    expect(html).toContain('cs-type'); // User
  });

  it('should highlight Python code', () => {
    const code = `
def greet(name: str) -> None:
    print(f"Hello, {name}!")

greet("World")
`.trim();

    const html = highlight(code, { language: 'python' });

    expect(html).toContain('cs-codeblock');
    expect(html).toContain('def');
    expect(html).toContain('greet');
  });

  it('should highlight HTML code', () => {
    const code = `
<!DOCTYPE html>
<html>
<head>
  <title>Hello</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>
`.trim();

    const html = highlight(code, { language: 'html' });

    expect(html).toContain('cs-codeblock');
    expect(html).toContain('cs-tag');
  });

  it('should highlight CSS code', () => {
    const code = `
.container {
  display: flex;
  color: #333;
}
`.trim();

    const html = highlight(code, { language: 'css' });

    expect(html).toContain('cs-codeblock');
    expect(html).toContain('container');
    expect(html).toContain('display');
    expect(html).toContain('#333');
  });
});

describe('Async highlighting', () => {
  it('should highlight code asynchronously', async () => {
    const code = 'const x = 1;';
    const html = await highlightAsync(code, { language: 'javascript' });

    expect(html).toContain('cs-codeblock');
    expect(html).toContain('const');
  });
});

describe('Codeshine class', () => {
  it('should create instance with options', () => {
    const instance = new Codeshine({
      language: 'javascript',
      theme: 'github-dark',
      lineNumbers: true,
    });

    expect(instance).toBeDefined();
  });

  it('should highlight code with instance', () => {
    const instance = new Codeshine({
      language: 'javascript',
      theme: 'github-dark',
    });

    const html = instance.highlight('const x = 1;');

    expect(html).toContain('cs-codeblock');
    expect(html).toContain('const');
  });

  it('should allow changing theme', () => {
    const instance = new Codeshine({ defaultLanguage: 'javascript' });

    const html1 = instance.highlight('const x = 1;');
    instance.setTheme('github-light');
    const html2 = instance.highlight('const x = 1;');

    expect(html1).toContain(githubDark.colors.background);
    expect(html2).toContain(githubLight.colors.background);
  });

  it('should allow changing default language', () => {
    const instance = new Codeshine();
    instance.setLanguage('javascript');

    const html = instance.highlight('const x = 1;');

    expect(html).toContain('cs-codeblock');
  });
});

describe('Tokenization pipeline', () => {
  it('should tokenize and parse to lines', () => {
    const code = 'const x = 1;\nconst y = 2;';
    const lang = getLanguage('javascript')!;
    const tokens = tokenize(code, lang);
    const lines = parseTokensToLines(tokens, code);

    expect(lines.length).toBe(2);
    expect(lines[0].tokens.length).toBeGreaterThan(0);
    expect(lines[1].tokens.length).toBeGreaterThan(0);
  });

  it('should render lines to HTML', () => {
    const code = 'const x = 1;';
    const lang = getLanguage('javascript')!;
    const tokens = tokenize(code, lang);
    const lines = parseTokensToLines(tokens, code);
    const html = render(lines, { theme: githubDark });

    expect(html).toContain('<pre');
    expect(html).toContain('</pre>');
    expect(html).toContain('const');
  });
});

describe('Language detection', () => {
  it('should detect JavaScript', () => {
    const result = detectLanguage('const x = () => {};');

    expect(result?.language).toBe('javascript');
  });

  it('should detect Python', () => {
    const result = detectLanguage('def greet(name):');

    expect(result?.language).toBe('python');
  });

  it('should detect from shebang', () => {
    const result = detectLanguage('#!/usr/bin/env python\nprint("hello")');

    expect(result?.language).toBe('python');
  });

  it('should detect HTML', () => {
    const result = detectLanguage('<!DOCTYPE html><html></html>');

    expect(result?.language).toBe('html');
  });
});

describe('Theme system', () => {
  it('should get theme by name', () => {
    const theme = getTheme('github-dark');

    expect(theme).toBeDefined();
    expect(theme?.name).toBe('github-dark');
  });

  it('should apply theme colors', () => {
    const html = highlight('const x = 1;', {
      language: 'javascript',
      theme: 'github-dark',
    });

    expect(html).toContain(githubDark.colors.background);
  });

  it('should switch between themes', () => {
    const code = 'const x = 1;';

    const darkHtml = highlight(code, {
      language: 'javascript',
      theme: 'github-dark',
    });

    const lightHtml = highlight(code, {
      language: 'javascript',
      theme: 'github-light',
    });

    expect(darkHtml).toContain(githubDark.colors.background);
    expect(lightHtml).toContain(githubLight.colors.background);
    expect(darkHtml).not.toBe(lightHtml);
  });
});

describe('Multiple languages', () => {
  const languages = [
    { name: 'javascript', code: 'const x = 1;' },
    { name: 'typescript', code: 'const x: number = 1;' },
    { name: 'python', code: 'x = 1' },
    { name: 'java', code: 'int x = 1;' },
    { name: 'rust', code: 'let x = 1;' },
    { name: 'go', code: 'var x = 1' },
    { name: 'ruby', code: 'x = 1' },
    { name: 'php', code: '<?php $x = 1;' },
    { name: 'html', code: '<div>test</div>' },
    { name: 'css', code: '.class { color: red; }' },
    { name: 'json', code: '{"key": "value"}' },
    { name: 'yaml', code: 'key: value' },
    { name: 'sql', code: 'SELECT * FROM users' },
    { name: 'bash', code: 'echo "hello"' },
    { name: 'markdown', code: '# Hello World' },
  ];

  for (const { name, code } of languages) {
    it(`should highlight ${name} code`, () => {
      const html = highlight(code, { language: name });

      expect(html).toContain('cs-codeblock');
    });
  }
});

describe('Complex code scenarios', () => {
  it('should handle multi-line strings', () => {
    const code = `
const template = \`
  <div>
    <p>Hello, World!</p>
  </div>
\`;
`.trim();

    const html = highlight(code, { language: 'javascript' });

    expect(html).toContain('cs-string');
  });

  it('should handle nested comments', () => {
    const code = `
/* Outer comment
  // Inner comment
  Still outer */
const x = 1;
`.trim();

    const html = highlight(code, { language: 'javascript' });

    expect(html).toContain('cs-comment');
  });

  it('should handle regex patterns', () => {
    const code = 'const pattern = /hello\\s+world/gi;';

    const html = highlight(code, { language: 'javascript' });

    expect(html).toContain('cs-regex');
  });

  it('should handle empty code', () => {
    const html = highlight('', { language: 'javascript' });

    expect(html).toContain('cs-codeblock');
  });

  it('should handle code with only whitespace', () => {
    const html = highlight('   \n   \n   ', { language: 'javascript' });

    expect(html).toContain('cs-codeblock');
  });

  it('should handle very long lines', () => {
    const longLine = 'const x = "' + 'a'.repeat(1000) + '";';

    const html = highlight(longLine, { language: 'javascript' });

    expect(html).toContain('cs-codeblock');
    expect(html).toContain('a'.repeat(100)); // At least part of the long string
  });

  it('should handle code with many lines', () => {
    const manyLines = Array(100)
      .fill('const x = 1;')
      .join('\n');

    const html = highlight(manyLines, { language: 'javascript' });

    expect(html).toContain('cs-codeblock');
  });
});

describe('Special characters', () => {
  it('should escape HTML in code', () => {
    const code = 'const x = "<script>alert(1)</script>";';

    const html = highlight(code, { language: 'javascript' });

    expect(html).not.toContain('<script>alert');
    expect(html).toContain('&lt;script&gt;');
  });

  it('should handle unicode characters', () => {
    const code = 'const emoji = "👍";';

    const html = highlight(code, { language: 'javascript' });

    expect(html).toContain('👍');
  });

  it('should handle non-ASCII identifiers', () => {
    const code = 'const über = "test";';

    const html = highlight(code, { language: 'javascript' });

    // The tokenizer may split non-ASCII chars differently, but content should be present
    expect(html).toContain('ü');
    expect(html).toContain('ber');
    expect(html).toContain('test');
  });
});

describe('All features combined', () => {
  it('should work with all features enabled', () => {
    const code = `
const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};

greet("World");
`.trim();

    const html = highlight(code, {
      language: 'javascript',
      theme: 'github-dark',
      lineNumbers: true,
      highlightLines: [2],
      focusLines: [2, 3],
      diffLines: { added: [1], removed: [], modified: [] },
      highlightWords: ['greet'],
      copyButton: true,
      showLanguageBadge: true,
      filename: 'example.js',
      wrapLines: true,
      maxHeight: '300px',
      collapsible: true,
    });

    expect(html).toContain('cs-codeblock');
    expect(html).toContain('cs-line-number');
    expect(html).toContain('cs-line-highlighted');
    expect(html).toContain('cs-line-focused');
    expect(html).toContain('cs-line-diff-added');
    expect(html).toContain('cs-word-highlighted');
    expect(html).toContain('cs-copy-button');
    expect(html).toContain('cs-language-badge');
    expect(html).toContain('cs-filename');
    expect(html).toContain('cs-wrap');
    expect(html).toContain('max-height');
    expect(html).toContain('cs-collapsible');
  });
});
