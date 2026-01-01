/**
 * Tier 4 languages - Data/Query languages
 */

export { json5 } from './json5.js';
export { csv } from './csv.js';
export { regex } from './regex.js';
export { diff } from './diff.js';

import { json5 } from './json5.js';
import { csv } from './csv.js';
import { regex } from './regex.js';
import { diff } from './diff.js';

/**
 * All Tier 4 languages
 */
export const tier4Languages = [
  json5,
  csv,
  regex,
  diff,
];

export default tier4Languages;
