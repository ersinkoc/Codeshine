/**
 * Tests for language system
 */

import { describe, it, expect } from 'vitest';
import {
  defineLang,
  extendLang,
  registerLanguage,
  getLanguage,
  hasLanguage,
  getLanguageNames,
  allLanguages,
  tier1Languages,
  tier2Languages,
} from '../../src/languages/index.js';
import { javascript } from '../../src/languages/tier1/javascript.js';
import { typescript } from '../../src/languages/tier1/typescript.js';
import { python } from '../../src/languages/tier2/python.js';

describe('defineLang', () => {
  it('should create a language definition', () => {
    const lang = defineLang({
      name: 'test-lang',
      aliases: ['tl'],
      extensions: ['.tl'],
      patterns: [{ type: 'keyword', pattern: /\b(if|else|while)\b/g }],
    });

    expect(lang.name).toBe('test-lang');
    expect(lang.aliases).toContain('tl');
    expect(lang.extensions).toContain('.tl');
    expect(lang.patterns.length).toBe(1);
  });

  it('should include optional properties', () => {
    const lang = defineLang({
      name: 'custom-lang',
      aliases: [],
      extensions: [],
      patterns: [],
      strings: [{ start: '"', end: '"' }],
      comments: {
        line: '//',
        block: { start: '/*', end: '*/' },
      },
    });

    expect(lang.strings).toBeDefined();
    expect(lang.comments).toBeDefined();
    expect(lang.comments?.line).toBe('//');
  });
});

describe('extendLang', () => {
  it('should extend an existing language', () => {
    const extended = extendLang(javascript, {
      name: 'javascript-extended',
      aliases: ['jsx'],
    });

    expect(extended.name).toBe('javascript-extended');
    expect(extended.aliases).toContain('jsx');
    expect(extended.patterns.length).toBeGreaterThan(0);
  });

  it('should preserve base language patterns', () => {
    const extended = extendLang(javascript, {
      name: 'js-extended',
    });

    expect(extended.patterns).toEqual(javascript.patterns);
  });

  it('should allow adding new patterns', () => {
    const newPattern = { type: 'custom', pattern: /custom/g };
    const extended = extendLang(javascript, {
      name: 'js-extended',
      patterns: [...javascript.patterns, newPattern],
    });

    expect(extended.patterns).toContain(newPattern);
  });
});

describe('registerLanguage / getLanguage / hasLanguage', () => {
  it('should register and retrieve a language', () => {
    const lang = defineLang({
      name: 'my-custom-lang',
      aliases: ['mcl'],
      extensions: ['.mcl'],
      patterns: [],
    });

    registerLanguage(lang);

    expect(hasLanguage('my-custom-lang')).toBe(true);
    expect(getLanguage('my-custom-lang')).toBe(lang);
  });

  it('should find language by alias', () => {
    const lang = defineLang({
      name: 'alias-test-lang',
      aliases: ['atl', 'aliastest'],
      extensions: [],
      patterns: [],
    });

    registerLanguage(lang);

    expect(getLanguage('atl')).toBe(lang);
    expect(getLanguage('aliastest')).toBe(lang);
  });

  it('should return undefined for non-existent language', () => {
    expect(getLanguage('non-existent')).toBeUndefined();
  });

  it('should return false for non-existent language', () => {
    expect(hasLanguage('non-existent')).toBe(false);
  });
});

describe('getLanguageNames', () => {
  it('should return array of language names', () => {
    const names = getLanguageNames();

    expect(Array.isArray(names)).toBe(true);
  });

  it('should include registered languages', () => {
    const lang = defineLang({
      name: 'registered-lang-test',
      aliases: [],
      extensions: [],
      patterns: [],
    });
    registerLanguage(lang);

    const names = getLanguageNames();
    expect(names).toContain('registered-lang-test');
  });
});

describe('allLanguages', () => {
  it('should export all languages', () => {
    expect(allLanguages.length).toBeGreaterThan(20);
  });

  it('should include languages from all tiers', () => {
    const names = allLanguages.map((l) => l.name);

    // Tier 1
    expect(names).toContain('javascript');
    expect(names).toContain('typescript');

    // Tier 2
    expect(names).toContain('python');
    expect(names).toContain('rust');

    // Tier 3
    expect(names).toContain('yaml');
    expect(names).toContain('sql');
  });
});

describe('tier1Languages', () => {
  it('should include core web languages', () => {
    const names = tier1Languages.map((l) => l.name);

    expect(names).toContain('javascript');
    expect(names).toContain('typescript');
    expect(names).toContain('jsx');
    expect(names).toContain('tsx');
    expect(names).toContain('html');
    expect(names).toContain('css');
    expect(names).toContain('json');
    expect(names).toContain('markdown');
  });
});

describe('tier2Languages', () => {
  it('should include popular programming languages', () => {
    const names = tier2Languages.map((l) => l.name);

    expect(names).toContain('python');
    expect(names).toContain('java');
    expect(names).toContain('c');
    expect(names).toContain('cpp');
    expect(names).toContain('csharp');
    expect(names).toContain('go');
    expect(names).toContain('rust');
    expect(names).toContain('ruby');
    expect(names).toContain('php');
    expect(names).toContain('swift');
    expect(names).toContain('kotlin');
  });
});

describe('built-in languages', () => {
  describe('javascript', () => {
    it('should have correct properties', () => {
      expect(javascript.name).toBe('javascript');
      expect(javascript.aliases).toContain('js');
      expect(javascript.extensions).toContain('.js');
    });

    it('should have patterns', () => {
      expect(javascript.patterns).toBeDefined();
      expect(javascript.patterns.length).toBeGreaterThan(0);
    });

    it('should have keywords array', () => {
      expect(javascript.keywords).toBeDefined();
      expect(javascript.keywords).toContain('const');
      expect(javascript.keywords).toContain('function');
    });

    it('should have string definitions', () => {
      expect(javascript.strings).toBeDefined();
      expect(javascript.strings?.length).toBeGreaterThan(0);
    });

    it('should have comment definitions', () => {
      expect(javascript.comments).toBeDefined();
      expect(javascript.comments?.line).toBe('//');
      expect(javascript.comments?.block).toBeDefined();
    });
  });

  describe('typescript', () => {
    it('should have correct properties', () => {
      expect(typescript.name).toBe('typescript');
      expect(typescript.aliases).toContain('ts');
      expect(typescript.extensions).toContain('.ts');
    });

    it('should have patterns', () => {
      expect(typescript.patterns).toBeDefined();
      expect(typescript.patterns.length).toBeGreaterThan(0);
    });
  });

  describe('python', () => {
    it('should have correct properties', () => {
      expect(python.name).toBe('python');
      expect(python.aliases).toContain('py');
      expect(python.extensions).toContain('.py');
    });

    it('should have keywords', () => {
      expect(python.keywords).toBeDefined();
      expect(python.keywords).toContain('def');
      expect(python.keywords).toContain('class');
    });

    it('should have string definitions', () => {
      expect(python.strings).toBeDefined();
      expect(python.strings?.length).toBeGreaterThan(0);
    });
  });
});

describe('language patterns', () => {
  it('all languages should have valid patterns array', () => {
    for (const lang of allLanguages) {
      expect(lang.patterns).toBeDefined();
      expect(Array.isArray(lang.patterns)).toBe(true);
    }
  });

  it('all pattern objects should have type', () => {
    for (const lang of allLanguages) {
      for (const pattern of lang.patterns) {
        expect(pattern.type).toBeDefined();
      }
    }
  });
});

describe('defineLang validation', () => {
  it('should throw if name is missing', () => {
    expect(() =>
      defineLang({
        name: '',
        patterns: [],
      })
    ).toThrow('Language definition must have a name');
  });

  it('should throw if patterns is not an array', () => {
    expect(() =>
      defineLang({
        name: 'test',
        // @ts-expect-error testing invalid input
        patterns: null,
      })
    ).toThrow('Language definition must have patterns array');
  });

  it('should throw if pattern has no RegExp', () => {
    expect(() =>
      defineLang({
        name: 'test',
        patterns: [
          // @ts-expect-error testing invalid input
          { type: 'keyword', pattern: 'not a regex' },
        ],
      })
    ).toThrow('Each pattern must have a RegExp pattern');
  });

  it('should throw if pattern has no type', () => {
    expect(() =>
      defineLang({
        name: 'test',
        patterns: [
          // @ts-expect-error testing invalid input
          { pattern: /test/ },
        ],
      })
    ).toThrow('Each pattern must have a type');
  });

  it('should freeze the language definition', () => {
    const lang = defineLang({
      name: 'frozen-test',
      patterns: [{ type: 'keyword', pattern: /test/ }],
      keywords: ['test'],
      typeKeywords: ['int'],
      constants: ['TRUE'],
    });

    expect(Object.isFrozen(lang)).toBe(true);
    expect(Object.isFrozen(lang.patterns)).toBe(true);
  });
});

describe('language registry edge cases', () => {
  it('should resolve language case-insensitively', () => {
    // First register the language
    registerLanguage(javascript);
    const lang = getLanguage('JAVASCRIPT');
    expect(lang?.name).toBe('javascript');
  });

  it('should resolve alias case-insensitively', () => {
    registerLanguage(javascript);
    const lang = getLanguage('JS');
    expect(lang?.name).toBe('javascript');
  });

  it('should resolve by alias', () => {
    registerLanguage(javascript);
    registerLanguage(python);
    expect(hasLanguage('js')).toBe(true);
    expect(hasLanguage('py')).toBe(true);
  });

  it('should provide getAll and getNames from registry', async () => {
    const { createLanguageRegistry } = await import('../../src/languages/registry.js');
    const registry = createLanguageRegistry();
    registry.register(javascript);
    registry.register(python);

    expect(registry.getAll().length).toBe(2);
    expect(registry.getNames()).toContain('javascript');
    expect(registry.getNames()).toContain('python');
  });
});
