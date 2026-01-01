/**
 * Tests for features module
 */

import { describe, it, expect } from 'vitest';
import { highlight } from '../../src/core/highlighter.js';

describe('Line numbers feature', () => {
  it('should render line numbers when enabled', () => {
    const html = highlight('const x = 1;\nconst y = 2;', {
      language: 'javascript',
      lineNumbers: true,
    });

    expect(html).toContain('cs-line-number');
    expect(html).toContain('1');
    expect(html).toContain('2');
  });

  it('should use custom start line number', () => {
    const html = highlight('const x = 1;', {
      language: 'javascript',
      lineNumbers: true,
      startLine: 10,
    });

    expect(html).toContain('10');
  });

  it('should not render line numbers when disabled', () => {
    const html = highlight('const x = 1;', {
      language: 'javascript',
      lineNumbers: false,
    });

    expect(html).not.toContain('cs-line-number');
  });
});

describe('Line highlighting feature', () => {
  it('should highlight specified lines', () => {
    const html = highlight('line1\nline2\nline3', {
      language: 'javascript',
      highlightLines: [2],
    });

    expect(html).toContain('cs-line-highlighted');
  });

  it('should highlight multiple lines', () => {
    const html = highlight('line1\nline2\nline3\nline4', {
      language: 'javascript',
      highlightLines: [1, 3],
    });

    const matches = html.match(/cs-line-highlighted/g);
    expect(matches?.length).toBe(2);
  });
});

describe('Focus lines feature', () => {
  it('should focus specified lines', () => {
    const html = highlight('line1\nline2\nline3', {
      language: 'javascript',
      focusLines: [2],
    });

    expect(html).toContain('cs-line-focused');
    expect(html).toContain('cs-line-dimmed');
  });

  it('should focus multiple lines', () => {
    const html = highlight('line1\nline2\nline3\nline4', {
      language: 'javascript',
      focusLines: [2, 3],
    });

    const focused = html.match(/cs-line-focused/g);
    expect(focused?.length).toBe(2);
  });
});

describe('Diff lines feature', () => {
  it('should mark added lines', () => {
    const html = highlight('line1\nline2\nline3', {
      language: 'javascript',
      diffLines: { added: [1], removed: [], modified: [] },
    });

    expect(html).toContain('cs-line-diff-added');
    expect(html).toContain('+');
  });

  it('should mark removed lines', () => {
    const html = highlight('line1\nline2\nline3', {
      language: 'javascript',
      diffLines: { added: [], removed: [2], modified: [] },
    });

    expect(html).toContain('cs-line-diff-removed');
    expect(html).toContain('-');
  });

  it('should mark modified lines', () => {
    const html = highlight('line1\nline2\nline3', {
      language: 'javascript',
      diffLines: { added: [], removed: [], modified: [3] },
    });

    expect(html).toContain('cs-line-diff-modified');
    expect(html).toContain('~');
  });
});

describe('Word highlighting feature', () => {
  it('should highlight specified words', () => {
    const html = highlight('const hello = "world";', {
      language: 'javascript',
      highlightWords: ['hello'],
    });

    expect(html).toContain('cs-word-highlighted');
    expect(html).toContain('hello');
  });

  it('should highlight multiple words', () => {
    const html = highlight('const hello = "world";', {
      language: 'javascript',
      highlightWords: ['hello', 'world'],
    });

    const matches = html.match(/cs-word-highlighted/g);
    expect(matches?.length).toBeGreaterThanOrEqual(1);
  });
});

describe('Copy button feature', () => {
  it('should include copy button when enabled', () => {
    const html = highlight('const x = 1;', {
      language: 'javascript',
      copyButton: true,
    });

    expect(html).toContain('cs-copy-button');
    expect(html).toContain('Copy');
  });

  it('should not include copy button when disabled', () => {
    const html = highlight('const x = 1;', {
      language: 'javascript',
      copyButton: false,
    });

    expect(html).not.toContain('cs-copy-button');
  });
});

describe('Language badge feature', () => {
  it('should show language badge when enabled', () => {
    const html = highlight('const x = 1;', {
      language: 'javascript',
      showLanguageBadge: true,
    });

    expect(html).toContain('cs-language-badge');
    expect(html).toContain('JavaScript');
  });

  it('should not show language badge when disabled', () => {
    const html = highlight('const x = 1;', {
      language: 'javascript',
      showLanguageBadge: false,
    });

    expect(html).not.toContain('cs-language-badge');
  });
});

describe('Filename header feature', () => {
  it('should show filename when provided', () => {
    const html = highlight('const x = 1;', {
      language: 'javascript',
      filename: 'example.js',
    });

    expect(html).toContain('cs-header');
    expect(html).toContain('cs-filename');
    expect(html).toContain('example.js');
  });

  it('should escape HTML in filename', () => {
    const html = highlight('const x = 1;', {
      language: 'javascript',
      filename: '<script>alert("xss")</script>',
    });

    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });
});

describe('Line wrapping feature', () => {
  it('should add wrap class when enabled', () => {
    const html = highlight('const longVariableName = "a very long string value";', {
      language: 'javascript',
      wrapLines: true,
    });

    expect(html).toContain('cs-wrap');
  });

  it('should not add wrap class when disabled', () => {
    const html = highlight('const x = 1;', {
      language: 'javascript',
      wrapLines: false,
    });

    expect(html).not.toContain('cs-wrap');
  });
});

describe('Max height feature', () => {
  it('should add max-height style when provided', () => {
    const html = highlight('line1\nline2\nline3', {
      language: 'javascript',
      maxHeight: '200px',
    });

    expect(html).toContain('max-height:200px');
    expect(html).toContain('overflow-y:auto');
  });
});

describe('Collapsible feature', () => {
  it('should add collapsible class when enabled', () => {
    const html = highlight('const x = 1;', {
      language: 'javascript',
      collapsible: true,
    });

    expect(html).toContain('cs-collapsible');
    expect(html).toContain('cs-collapse-toggle');
  });

  it('should add collapsed class when defaultCollapsed is true', () => {
    const html = highlight('const x = 1;', {
      language: 'javascript',
      collapsible: true,
      defaultCollapsed: true,
    });

    expect(html).toContain('cs-collapsed');
  });
});
