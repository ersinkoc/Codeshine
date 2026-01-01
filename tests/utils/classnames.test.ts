/**
 * Tests for classnames utilities
 */

import { describe, it, expect } from 'vitest';
import { classnames, bemClass } from '../../src/utils/classnames.js';

describe('classnames', () => {
  it('should join class names', () => {
    expect(classnames('a', 'b', 'c')).toBe('a b c');
  });

  it('should filter out falsy values', () => {
    expect(classnames('a', false, 'b', null, 'c', undefined)).toBe('a b c');
  });

  it('should handle empty input', () => {
    expect(classnames()).toBe('');
  });

  it('should handle single class', () => {
    expect(classnames('single')).toBe('single');
  });

  it('should handle all falsy values', () => {
    expect(classnames(false, null, undefined)).toBe('');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const isDisabled = false;

    expect(classnames('btn', isActive && 'btn-active', isDisabled && 'btn-disabled')).toBe(
      'btn btn-active'
    );
  });

  it('should filter empty strings', () => {
    expect(classnames('a', '', 'b')).toBe('a b');
  });

  it('should handle nested arrays', () => {
    expect(classnames('a', ['b', 'c'], 'd')).toBe('a b c d');
  });

  it('should handle numbers', () => {
    expect(classnames('class', 1, 2)).toBe('class 1 2');
  });
});

describe('bemClass', () => {
  it('should generate block class', () => {
    expect(bemClass('button')).toBe('button');
  });

  it('should generate element class', () => {
    expect(bemClass('button', 'icon')).toBe('button__icon');
  });

  it('should generate modifier class using object', () => {
    expect(bemClass('button', undefined, { primary: true })).toBe('button button--primary');
  });

  it('should generate element with modifier using object', () => {
    expect(bemClass('button', 'icon', { large: true })).toBe('button__icon button__icon--large');
  });

  it('should handle multiple modifiers using object', () => {
    expect(bemClass('button', undefined, { primary: true, large: true })).toBe(
      'button button--primary button--large'
    );
  });

  it('should filter falsy modifiers', () => {
    expect(bemClass('button', undefined, { primary: true, disabled: false, large: true })).toBe(
      'button button--primary button--large'
    );
  });

  it('should handle empty modifiers object', () => {
    expect(bemClass('button', 'icon', {})).toBe('button__icon');
  });

  it('should handle undefined modifiers', () => {
    expect(bemClass('button', 'icon', { large: undefined })).toBe('button__icon');
  });
});
