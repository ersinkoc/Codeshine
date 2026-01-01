/**
 * HTML escaping utilities
 */

const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const HTML_ESCAPE_REGEX = /[&<>"']/g;

/**
 * Escape HTML special characters in a string
 */
export function escapeHtml(str: string): string {
  return str.replace(HTML_ESCAPE_REGEX, (char) => HTML_ESCAPE_MAP[char] ?? char);
}

/**
 * Unescape HTML entities in a string
 */
export function unescapeHtml(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * Escape special characters for use in a RegExp
 */
export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
