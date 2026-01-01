/**
 * Codeshine class - reusable highlighter instance
 */

import type {
  HighlightOptions,
  Theme,
  CodeshineOptions,
  CodeshinePlugin,
  StreamOptions,
  CodeshineInstance,
} from './types.js';
import type { LanguageDefinition } from '../languages/types.js';
import { highlight, highlightAsync, resolveTheme } from './highlighter.js';
import { tokenize } from './tokenizer.js';
import { parseTokensToLines } from './parser.js';
import { render } from './renderer.js';
import { toRenderOptions } from '../renderers/types.js';
import { parseLineRanges } from '../utils/range-parser.js';
import {
  createLanguageRegistry,
  tier1Languages,
} from '../languages/index.js';
import {
  createThemeRegistry,
  allThemes,
  githubDark,
} from '../themes/index.js';

/**
 * Codeshine class for reusable highlighting
 */
export class Codeshine implements CodeshineInstance {
  private languageRegistry = createLanguageRegistry();
  private themeRegistry = createThemeRegistry();
  private currentTheme: Theme;
  private defaultLanguage: string | undefined;
  private plugins: CodeshinePlugin[] = [];

  constructor(options: CodeshineOptions = {}) {
    // Initialize with tier 1 languages
    for (const lang of tier1Languages) {
      this.languageRegistry.register(lang);
    }

    // Register additional languages
    if (options.languages) {
      for (const lang of options.languages) {
        this.languageRegistry.register(lang);
      }
    }

    // Initialize with all themes
    for (const theme of allThemes) {
      this.themeRegistry.register(theme);
    }

    // Register additional themes
    if (options.themes) {
      for (const theme of options.themes) {
        this.themeRegistry.register(theme);
      }
    }

    // Set default theme
    if (options.theme) {
      this.currentTheme = this.resolveTheme(options.theme);
    } else {
      this.currentTheme = githubDark;
    }

    // Set default language
    this.defaultLanguage = options.defaultLanguage;

    // Initialize plugins
    if (options.plugins) {
      for (const plugin of options.plugins) {
        this.use(plugin);
      }
    }
  }

  /**
   * Resolve theme from string or Theme object
   */
  private resolveTheme(theme: string | Theme): Theme {
    if (typeof theme === 'string') {
      return this.themeRegistry.get(theme) ?? githubDark;
    }
    return theme;
  }

  /**
   * Highlight code
   */
  highlight(code: string, options: HighlightOptions = {}): string {
    // Apply plugins before highlight
    let processedCode = code;
    let processedOptions = { ...options };

    for (const plugin of this.plugins) {
      if (plugin.onBeforeHighlight) {
        const result = plugin.onBeforeHighlight(processedCode, processedOptions);
        processedCode = result.code;
        processedOptions = result.options;
      }
    }

    // Resolve language
    const langName = processedOptions.language ?? this.defaultLanguage;
    const language = langName ? this.languageRegistry.resolve(langName) : undefined;

    // Resolve theme
    const theme = processedOptions.theme
      ? this.resolveTheme(processedOptions.theme)
      : this.currentTheme;

    if (!language) {
      return this.renderPlainText(processedCode, theme, processedOptions);
    }

    // Tokenize
    let tokens = tokenize(processedCode, language);

    // Apply plugin token processing
    for (const plugin of this.plugins) {
      if (plugin.onAfterTokenize) {
        tokens = plugin.onAfterTokenize(tokens);
      }
    }

    // Parse to lines
    const lines = parseTokensToLines(tokens);

    // Parse line ranges
    const parsedLines = {
      highlight: parseLineRanges(processedOptions.highlightLines),
      focus: parseLineRanges(processedOptions.focusLines),
      diff: {
        added: parseLineRanges(processedOptions.diffLines?.added),
        removed: parseLineRanges(processedOptions.diffLines?.removed),
        modified: parseLineRanges(processedOptions.diffLines?.modified),
      },
    };

    // Apply plugin before render
    let processedTokens = tokens;
    for (const plugin of this.plugins) {
      if (plugin.onBeforeRender) {
        processedTokens = plugin.onBeforeRender(processedTokens, processedOptions);
      }
    }

    // Render
    const renderOptions = toRenderOptions(processedOptions, theme, parsedLines);
    let html = render(lines, renderOptions);

    // Apply plugin after render
    for (const plugin of this.plugins) {
      if (plugin.onAfterRender) {
        html = plugin.onAfterRender(html);
      }
    }

    return html;
  }

  /**
   * Render plain text
   */
  private renderPlainText(
    code: string,
    theme: Theme,
    options: HighlightOptions
  ): string {
    const lines = code.split('\n').map((content, index) => ({
      number: index + 1,
      content,
      tokens: [
        {
          type: 'plain' as const,
          value: content,
          start: 0,
          end: content.length,
          line: index + 1,
        },
      ],
      attributes: {},
      classes: ['cs-line'],
    }));

    const parsedLines = {
      highlight: parseLineRanges(options.highlightLines),
      focus: parseLineRanges(options.focusLines),
      diff: {
        added: parseLineRanges(options.diffLines?.added),
        removed: parseLineRanges(options.diffLines?.removed),
        modified: parseLineRanges(options.diffLines?.modified),
      },
    };

    const renderOptions = toRenderOptions(options, theme, parsedLines);
    return render(lines, renderOptions);
  }

  /**
   * Highlight code asynchronously
   */
  async highlightAsync(
    code: string,
    options: HighlightOptions = {}
  ): Promise<string> {
    return new Promise((resolve) => {
      resolve(this.highlight(code, options));
    });
  }

  /**
   * Streaming highlight for large files
   */
  async *highlightStream(
    code: string,
    options: StreamOptions = {}
  ): AsyncGenerator<string, void, unknown> {
    const chunkSize = options.chunkSize ?? 100;
    const lines = code.split('\n');
    const totalLines = lines.length;

    let processed = 0;

    while (processed < totalLines) {
      const chunk = lines.slice(processed, processed + chunkSize).join('\n');
      const html = this.highlight(chunk, {
        ...options,
        startLine: (options.startLine ?? 1) + processed,
      });

      processed += chunkSize;
      const progress = Math.min(100, Math.round((processed / totalLines) * 100));

      if (options.onChunk) {
        options.onChunk(html, progress);
      }

      yield html;
    }
  }

  /**
   * Set current theme
   */
  setTheme(theme: string | Theme): this {
    this.currentTheme = this.resolveTheme(theme);
    return this;
  }

  /**
   * Set default language
   */
  setLanguage(language: string): this {
    this.defaultLanguage = language;
    return this;
  }

  /**
   * Register a language
   */
  registerLanguage(language: LanguageDefinition): this {
    this.languageRegistry.register(language);
    return this;
  }

  /**
   * Register a theme
   */
  registerTheme(theme: Theme): this {
    this.themeRegistry.register(theme);
    return this;
  }

  /**
   * Use a plugin
   */
  use(plugin: CodeshinePlugin): this {
    this.plugins.push(plugin);

    // Register plugin languages
    if (plugin.languages) {
      for (const lang of plugin.languages) {
        this.languageRegistry.register(lang);
      }
    }

    // Register plugin themes
    if (plugin.themes) {
      for (const theme of plugin.themes) {
        this.themeRegistry.register(theme);
      }
    }

    // Initialize plugin
    if (plugin.onInit) {
      plugin.onInit(this);
    }

    return this;
  }

  /**
   * Get all registered language names
   */
  getLanguages(): string[] {
    return this.languageRegistry.getNames();
  }

  /**
   * Get all registered theme names
   */
  getThemes(): string[] {
    return this.themeRegistry.getNames();
  }

  /**
   * Get current theme
   */
  getTheme(): Theme {
    return this.currentTheme;
  }
}

export default Codeshine;
