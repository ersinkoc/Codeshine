/**
 * CSS variables generator for themes
 */

import type { Theme } from './types.js';
import type { CSSVariables, ThemeInjectionOptions } from './types.js';

/**
 * CSS variable prefix
 */
const PREFIX = '--cs';

/**
 * Generate CSS variables from a theme
 */
export function generateCSSVars(theme: Theme): CSSVariables {
  const vars: CSSVariables = {};

  // Editor colors
  vars[`${PREFIX}-bg`] = theme.colors.background;
  vars[`${PREFIX}-fg`] = theme.colors.foreground;
  vars[`${PREFIX}-line-number`] = theme.colors.lineNumber;
  vars[`${PREFIX}-line-number-active`] = theme.colors.lineNumberActive;
  vars[`${PREFIX}-line-highlight`] = theme.colors.lineHighlight;
  vars[`${PREFIX}-selection`] = theme.colors.selection;
  vars[`${PREFIX}-cursor`] = theme.colors.cursor;

  // Gutter
  vars[`${PREFIX}-gutter-bg`] = theme.colors.gutterBackground;
  vars[`${PREFIX}-gutter-border`] = theme.colors.gutterBorder;

  // Diff
  vars[`${PREFIX}-diff-added-bg`] = theme.colors.diffAddedBackground;
  vars[`${PREFIX}-diff-added-text`] = theme.colors.diffAddedText;
  vars[`${PREFIX}-diff-removed-bg`] = theme.colors.diffRemovedBackground;
  vars[`${PREFIX}-diff-removed-text`] = theme.colors.diffRemovedText;
  vars[`${PREFIX}-diff-modified-bg`] = theme.colors.diffModifiedBackground;
  vars[`${PREFIX}-diff-modified-text`] = theme.colors.diffModifiedText;

  // Focus
  vars[`${PREFIX}-focus-dimmed`] = theme.colors.focusDimmed;

  // Word highlight
  vars[`${PREFIX}-word-highlight`] = theme.colors.wordHighlight;

  // UI elements
  vars[`${PREFIX}-border`] = theme.colors.border;
  vars[`${PREFIX}-badge-bg`] = theme.colors.badgeBackground;
  vars[`${PREFIX}-badge-text`] = theme.colors.badgeText;
  vars[`${PREFIX}-button-bg`] = theme.colors.buttonBackground;
  vars[`${PREFIX}-button-text`] = theme.colors.buttonText;
  vars[`${PREFIX}-button-hover`] = theme.colors.buttonHover;
  vars[`${PREFIX}-scrollbar`] = theme.colors.scrollbar;
  vars[`${PREFIX}-scrollbar-hover`] = theme.colors.scrollbarHover;

  // Token colors
  vars[`${PREFIX}-token-keyword`] = theme.colors.tokens.keyword;
  vars[`${PREFIX}-token-string`] = theme.colors.tokens.string;
  vars[`${PREFIX}-token-number`] = theme.colors.tokens.number;
  vars[`${PREFIX}-token-comment`] = theme.colors.tokens.comment;
  vars[`${PREFIX}-token-operator`] = theme.colors.tokens.operator;
  vars[`${PREFIX}-token-punctuation`] = theme.colors.tokens.punctuation;
  vars[`${PREFIX}-token-function`] = theme.colors.tokens.function;
  vars[`${PREFIX}-token-variable`] = theme.colors.tokens.variable;
  vars[`${PREFIX}-token-class`] = theme.colors.tokens.class;
  vars[`${PREFIX}-token-type`] = theme.colors.tokens.type;
  vars[`${PREFIX}-token-constant`] = theme.colors.tokens.constant;
  vars[`${PREFIX}-token-property`] = theme.colors.tokens.property;
  vars[`${PREFIX}-token-attribute`] = theme.colors.tokens.attribute;
  vars[`${PREFIX}-token-tag`] = theme.colors.tokens.tag;
  vars[`${PREFIX}-token-regexp`] = theme.colors.tokens.regexp;
  vars[`${PREFIX}-token-escape`] = theme.colors.tokens.escape;
  vars[`${PREFIX}-token-interpolation`] = theme.colors.tokens.interpolation;
  vars[`${PREFIX}-token-meta`] = theme.colors.tokens.meta;
  vars[`${PREFIX}-token-invalid`] = theme.colors.tokens.invalid;

  // Fonts
  if (theme.fonts) {
    if (theme.fonts.family) vars[`${PREFIX}-font-family`] = theme.fonts.family;
    if (theme.fonts.size) vars[`${PREFIX}-font-size`] = theme.fonts.size;
    if (theme.fonts.lineHeight) vars[`${PREFIX}-line-height`] = String(theme.fonts.lineHeight);
    if (theme.fonts.weight) vars[`${PREFIX}-font-weight`] = String(theme.fonts.weight);
  }

  // Spacing
  if (theme.spacing) {
    if (theme.spacing.padding) vars[`${PREFIX}-padding`] = theme.spacing.padding;
    if (theme.spacing.lineNumberWidth) vars[`${PREFIX}-line-number-width`] = theme.spacing.lineNumberWidth;
    if (theme.spacing.gutterPadding) vars[`${PREFIX}-gutter-padding`] = theme.spacing.gutterPadding;
  }

  // Borders
  if (theme.borders) {
    if (theme.borders.radius) vars[`${PREFIX}-border-radius`] = theme.borders.radius;
    if (theme.borders.width) vars[`${PREFIX}-border-width`] = theme.borders.width;
  }

  return vars;
}

/**
 * Generate CSS string from variables
 */
export function generateCSSString(theme: Theme, selector = ':root'): string {
  const vars = generateCSSVars(theme);
  const declarations = Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return `${selector} {\n${declarations}\n}`;
}

/**
 * Inject theme styles into the document (browser only)
 */
export function injectThemeStyles(
  theme: Theme,
  options: ThemeInjectionOptions = {}
): void {
  if (typeof document === 'undefined') {
    return;
  }

  const { scope = ':root', id = `codeshine-theme-${theme.name}` } = options;

  // Remove existing style element if present
  const existing = document.getElementById(id);
  if (existing) {
    existing.remove();
  }

  // Create new style element
  const style = document.createElement('style');
  style.id = id;
  style.textContent = generateCSSString(theme, scope);

  // Append to head
  document.head.appendChild(style);
}

/**
 * Remove injected theme styles (browser only)
 */
export function removeThemeStyles(themeName: string): void {
  if (typeof document === 'undefined') {
    return;
  }

  const id = `codeshine-theme-${themeName}`;
  const existing = document.getElementById(id);
  if (existing) {
    existing.remove();
  }
}
