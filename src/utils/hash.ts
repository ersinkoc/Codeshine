/**
 * String hashing utilities
 */

/**
 * Generate a simple hash from a string (djb2 algorithm)
 */
export function hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0;
}

/**
 * Generate a hex hash string from a string
 */
export function hashHex(str: string): string {
  return hash(str).toString(16);
}

/**
 * Generate a short unique ID based on content
 */
export function contentId(content: string, prefix = 'cs'): string {
  return `${prefix}-${hashHex(content).slice(0, 8)}`;
}
