/**
 * Tests for language detector
 */

import { describe, it, expect } from 'vitest';
import { detectLanguage } from '../../src/core/detector.js';

describe('detectLanguage', () => {
  it('should detect JavaScript', () => {
    const code = `
      const x = 42;
      function hello() {
        console.log("Hello");
      }
    `;
    const result = detectLanguage(code);

    expect(result.language).toBe('javascript');
    expect(result.confidence).toBeGreaterThan(0);
  });

  it('should detect TypeScript', () => {
    const code = `
      interface User {
        name: string;
        age: number;
      }
      const user: User = { name: "John", age: 30 };
    `;
    const result = detectLanguage(code);

    expect(result.language).toBe('typescript');
    expect(result.confidence).toBeGreaterThan(0);
  });

  it('should detect Python', () => {
    const code = `
      def hello(name):
          print(f"Hello, {name}")

      if __name__ == "__main__":
          hello("World")
    `;
    const result = detectLanguage(code);

    expect(result.language).toBe('python');
    expect(result.confidence).toBeGreaterThan(0);
  });

  it('should detect HTML', () => {
    const code = `
      <!DOCTYPE html>
      <html>
        <head><title>Test</title></head>
        <body><div class="container">Hello</div></body>
      </html>
    `;
    const result = detectLanguage(code);

    expect(result.language).toBe('html');
    expect(result.confidence).toBeGreaterThan(0);
  });

  it('should detect CSS', () => {
    const code = `
      .container {
        display: flex;
        padding: 10px;
        background-color: #fff;
      }
    `;
    const result = detectLanguage(code);

    expect(result.language).toBe('css');
    expect(result.confidence).toBeGreaterThan(0);
  });

  it('should detect JSON', () => {
    const code = `
      {
        "name": "test",
        "version": 1,
        "enabled": true
      }
    `;
    const result = detectLanguage(code);

    expect(result.language).toBe('json');
    expect(result.confidence).toBeGreaterThan(0);
  });

  it('should detect Bash by shebang', () => {
    const code = `#!/bin/bash
      echo "Hello World"
    `;
    const result = detectLanguage(code);

    expect(result.language).toBe('bash');
    expect(result.confidence).toBe(0.95);
  });

  it('should detect Python by shebang', () => {
    const code = `#!/usr/bin/env python3
      print("Hello")
    `;
    const result = detectLanguage(code);

    expect(result.language).toBe('python');
    expect(result.confidence).toBe(0.95);
  });

  it('should detect SQL', () => {
    const code = `
      SELECT * FROM users
      WHERE age > 18
      ORDER BY name ASC;
    `;
    const result = detectLanguage(code);

    expect(result.language).toBe('sql');
    expect(result.confidence).toBeGreaterThan(0);
  });

  it('should detect Rust', () => {
    const code = `
      fn main() {
          let mut x = 5;
          println!("x = {}", x);
      }
    `;
    const result = detectLanguage(code);

    expect(result.language).toBe('rust');
    expect(result.confidence).toBeGreaterThan(0);
  });

  it('should detect Go', () => {
    const code = `
      package main

      import "fmt"

      func main() {
          fmt.Println("Hello")
      }
    `;
    const result = detectLanguage(code);

    expect(result.language).toBe('go');
    expect(result.confidence).toBeGreaterThan(0);
  });

  it('should return low confidence for unknown code', () => {
    const code = 'some random text that is not code';
    const result = detectLanguage(code);

    expect(result.confidence).toBeLessThan(0.5);
  });
});
