import { describe, test, expect } from 'vitest';
import { Codeshine } from '../src/core/engine.js';
import { defineLang } from '../src/languages/define-lang.js';

describe('BUG FIX VERIFICATION', () => {
  
  // BUG-001: ReDoS in applyWordHighlighting
  // Verification: Ensure it processes quickly and doesn't crash/hang
  test('BUG-001: ReDoS fixed and logic correct', () => {
    const codeshine = new Codeshine();
    const longLine = '>' + 'a'.repeat(50000) + '<';
    const start = performance.now();
    
    // Use unknown language to avoid syntax highlighting interference, testing pure applyWordHighlighting via renderPlainText
    const html = codeshine.highlight(longLine, {
      language: 'unknown-lang-xyz', 
      highlightWords: ['MATCH_ME_NOT'],
    });
    
    const end = performance.now();
    console.log(`ReDoS test took ${end - start}ms`);
    
    // Should be fast
    expect(end - start).toBeLessThan(100);
    
    // Should contain original text (escaped)
    expect(html).toContain(longLine.replace('<', '&lt;').replace('>', '&gt;'));
  });

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
    const start = performance.now();
    const html = codeshine.highlight('"test"', { language: 'bad-lang' });
    const end = performance.now();
    
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