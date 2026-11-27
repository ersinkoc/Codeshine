import { describe, test, expect } from 'vitest';
import { Codeshine } from '../src/core/engine.js';
import { defineLang } from '../src/languages/define-lang.js';

describe('BUG FIX VERIFICATION', () => {
  
  // BUG-001: ReDoS in applyWordHighlighting
  // Deterministic: the 50k-character line must be processed to completion with
  // its escaped text preserved exactly. The catastrophic-backtracking version
  // never returned, so a regression fails this test through its own 5s timeout
  // instead of through a machine-speed threshold.
  test(
    'BUG-001: ReDoS fixed and logic correct',
    () => {
      const codeshine = new Codeshine();
      const longLine = '>' + 'a'.repeat(50000) + '<';

      // Use unknown language to avoid syntax highlighting interference, testing pure applyWordHighlighting via renderPlainText
      const html = codeshine.highlight(longLine, {
        language: 'unknown-lang-xyz',
        highlightWords: ['MATCH_ME_NOT'],
      });

      // Whole line preserved (escaped), and the absent word is not highlighted.
      expect(html).toContain(longLine.replace('<', '&lt;').replace('>', '&gt;'));
      expect(html).not.toContain('word-highlighted');

      // A present word is still wrapped, so the linear scan really did the work.
      const matched = codeshine.highlight('a MATCH_ME_NOT b', {
        language: 'unknown-lang-xyz',
        highlightWords: ['MATCH_ME_NOT'],
      });
      expect(matched).toContain('<span class="cs-word-highlighted">MATCH_ME_NOT</span>');
    },
    5000
  );

  // BUG-002: Infinite Loop in Tokenizer
  // Verification: Ensure it completes without hanging
  test('BUG-002: Infinite Loop prevention', async () => {
    const badLang = defineLang({
      name: 'bad-lang',
      patterns: [],
      strings: [{
        start: '"',
        end: '"',
        interpolation: {
          start: '', // EMPTY START - Previously caused infinite loop
          end: ''
        }
      }]
    });

    const codeshine = new Codeshine();
    codeshine.registerLanguage(badLang);

    // This should now run quickly and not hang
    const start = globalThis.performance.now();
    const html = codeshine.highlight('"test"', { language: 'bad-lang' });
    const end = globalThis.performance.now();
    
    expect(html).toBeDefined();
    // Should be very fast
    expect(end - start).toBeLessThan(50);
  });

  // BUG-003: Range Highlighting
  // Verification: Ensure class is applied
  test('BUG-003: Range highlighting implemented', () => {
    const codeshine = new Codeshine();
    const code = 'const x = 1;';
    // const x = 1;
    // 012345678901
    // 'const' is 0-5. ' ' is 5-6. 'x' is 6-7.
    
    const html = codeshine.highlight(code, {
      language: 'javascript',
      highlightRanges: [{
        start: 6,
        end: 7,
        line: 1,
        className: 'custom-range-class'
      }]
    });
    
    // Should contain the custom class
    expect(html).toContain('custom-range-class');
    // And verify structure roughly: <span class="custom-range-class"><span ...>x</span></span>
    expect(html).toMatch(/class="custom-range-class"[^>]*><span[^>]*cs-variable/);
  });

});