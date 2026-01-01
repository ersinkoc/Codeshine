/**
 * Deep merge utilities
 */

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Check if a value is a plain object
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

/**
 * Deep merge two objects
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: DeepPartial<T>
): T {
  const result = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
        (result as Record<string, unknown>)[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as DeepPartial<Record<string, unknown>>
        );
      } else if (sourceValue !== undefined) {
        (result as Record<string, unknown>)[key] = sourceValue;
      }
    }
  }

  return result;
}

/**
 * Shallow merge with defaults
 */
export function mergeWithDefaults<T extends Record<string, unknown>>(
  defaults: T,
  overrides?: Partial<T>
): T {
  if (!overrides) {
    return { ...defaults };
  }
  return { ...defaults, ...overrides };
}
