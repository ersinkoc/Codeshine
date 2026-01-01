/**
 * Utility exports
 */

export { escapeHtml, unescapeHtml, escapeRegExp } from './escape.js';
export { deepMerge, mergeWithDefaults } from './merge.js';
export { hash, hashHex, contentId } from './hash.js';
export {
  parseRangeString,
  parseLineRange,
  parseLineRanges,
  isLineInRanges,
  toRangeString,
} from './range-parser.js';
export { classnames, bemClass } from './classnames.js';
