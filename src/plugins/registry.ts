/**
 * Plugin registry for Codeshine
 */

import type { CodeshinePlugin } from '../core/types.js';
import type { PluginRegistry } from './types.js';

/**
 * Create a new plugin registry
 */
export function createPluginRegistry(): PluginRegistry {
  const plugins = new Map<string, CodeshinePlugin>();

  return {
    register(plugin: CodeshinePlugin): void {
      plugins.set(plugin.name, plugin);
    },

    get(name: string): CodeshinePlugin | undefined {
      return plugins.get(name);
    },

    has(name: string): boolean {
      return plugins.has(name);
    },

    getAll(): CodeshinePlugin[] {
      return [...plugins.values()];
    },

    getNames(): string[] {
      return [...plugins.keys()];
    },
  };
}

/**
 * Global plugin registry instance
 */
export const globalPluginRegistry = createPluginRegistry();

/**
 * Register a plugin in the global registry
 */
export function registerPlugin(plugin: CodeshinePlugin): void {
  globalPluginRegistry.register(plugin);
}

/**
 * Get a plugin from the global registry
 */
export function getPlugin(name: string): CodeshinePlugin | undefined {
  return globalPluginRegistry.get(name);
}

/**
 * Check if a plugin exists in the global registry
 */
export function hasPlugin(name: string): boolean {
  return globalPluginRegistry.has(name);
}

/**
 * Get all registered plugin names
 */
export function getPluginNames(): string[] {
  return globalPluginRegistry.getNames();
}
