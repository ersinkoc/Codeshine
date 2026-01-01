/**
 * Class name utilities
 */

type ClassValue = string | number | boolean | undefined | null | ClassValue[];

/**
 * Combine class names, filtering out falsy values
 */
export function classnames(...args: ClassValue[]): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) {
      continue;
    }

    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'number') {
      classes.push(String(arg));
    } else if (Array.isArray(arg)) {
      const nested = classnames(...arg);
      if (nested) {
        classes.push(nested);
      }
    }
  }

  return classes.join(' ');
}

/**
 * Create a class name with optional BEM modifiers
 */
export function bemClass(
  block: string,
  element?: string,
  modifiers?: Record<string, boolean | undefined>
): string {
  let className = block;

  if (element) {
    className += `__${element}`;
  }

  if (modifiers) {
    const modifierClasses = Object.entries(modifiers)
      .filter(([, active]) => active)
      .map(([modifier]) => `${className}--${modifier}`);

    if (modifierClasses.length > 0) {
      return `${className} ${modifierClasses.join(' ')}`;
    }
  }

  return className;
}
