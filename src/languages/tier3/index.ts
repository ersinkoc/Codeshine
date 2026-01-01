/**
 * Tier 3 languages - Web/Config languages
 */

export { yaml } from './yaml.js';
export { toml } from './toml.js';
export { xml } from './xml.js';
export { graphql } from './graphql.js';
export { sql } from './sql.js';
export { bash } from './bash.js';
export { powershell } from './powershell.js';

import { yaml } from './yaml.js';
import { toml } from './toml.js';
import { xml } from './xml.js';
import { graphql } from './graphql.js';
import { sql } from './sql.js';
import { bash } from './bash.js';
import { powershell } from './powershell.js';

/**
 * All Tier 3 languages
 */
export const tier3Languages = [
  yaml,
  toml,
  xml,
  graphql,
  sql,
  bash,
  powershell,
];

export default tier3Languages;
