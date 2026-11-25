/**
 * Utility exports
 */

export { escapeHtml, unescapeHtml, escapeRegExp } from './escape.js';
export { deepMerge, mergeWithDefaults } from './merge.js';
export { hash, hashHex, contentId } from './hash.js';
export {
  MAX_RANGE_LINES,
  parseRangeString,
  parseLineRange,
  parseLineRanges,
  isLineInRanges,
  toRangeString,
} from './range-parser.js';
export { classnames, bemClass } from './classnames.js';
export { expandTabs } from './tabs.js';
