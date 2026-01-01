#!/usr/bin/env node

/**
 * Build script for browser/CDN bundles
 */

import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { gzipSync } from 'zlib';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

// Ensure dist/browser directory exists
mkdirSync('./dist/browser', { recursive: true });

// Common build options
const commonOptions = {
  entryPoints: ['./src/index.ts'],
  bundle: true,
  target: ['es2020', 'chrome80', 'firefox80', 'safari14', 'edge80'],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  banner: {
    js: `/**
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * @license MIT
 * @author ${pkg.author}
 * @see ${pkg.homepage}
 */`,
  },
};

async function build() {
  console.log('Building browser bundles...\n');

  // ESM bundle (for modern browsers with <script type="module">)
  await esbuild.build({
    ...commonOptions,
    outfile: './dist/browser/codeshine.esm.js',
    format: 'esm',
    minify: false,
  });

  await esbuild.build({
    ...commonOptions,
    outfile: './dist/browser/codeshine.esm.min.js',
    format: 'esm',
    minify: true,
  });

  // IIFE bundle (for <script> tag usage)
  await esbuild.build({
    ...commonOptions,
    outfile: './dist/browser/codeshine.iife.js',
    format: 'iife',
    globalName: 'Codeshine',
    minify: false,
  });

  await esbuild.build({
    ...commonOptions,
    outfile: './dist/browser/codeshine.iife.min.js',
    format: 'iife',
    globalName: 'Codeshine',
    minify: true,
  });

  // Print bundle sizes
  console.log('\n📦 Bundle sizes:\n');

  const files = [
    'codeshine.esm.js',
    'codeshine.esm.min.js',
    'codeshine.iife.js',
    'codeshine.iife.min.js',
  ];

  for (const file of files) {
    const content = readFileSync(`./dist/browser/${file}`);
    const gzipped = gzipSync(content);
    const size = (content.length / 1024).toFixed(2);
    const gzSize = (gzipped.length / 1024).toFixed(2);
    console.log(`  ${file.padEnd(28)} ${size.padStart(8)} KB  (gzip: ${gzSize} KB)`);
  }

  // Generate size report JSON
  const sizeReport = {
    version: pkg.version,
    timestamp: new Date().toISOString(),
    bundles: files.map(file => {
      const content = readFileSync(`./dist/browser/${file}`);
      const gzipped = gzipSync(content);
      return {
        name: file,
        size: content.length,
        gzipSize: gzipped.length,
      };
    }),
  };

  writeFileSync('./dist/browser/size-report.json', JSON.stringify(sizeReport, null, 2));

  console.log('\n✅ Browser builds complete!');
  console.log('\nUsage:');
  console.log('  <!-- ESM (recommended for modern browsers) -->');
  console.log('  <script type="module">');
  console.log('    import { highlight } from "https://unpkg.com/@oxog/codeshine/dist/browser/codeshine.esm.min.js";');
  console.log('  </script>');
  console.log('');
  console.log('  <!-- IIFE (for older browsers) -->');
  console.log('  <script src="https://unpkg.com/@oxog/codeshine/dist/browser/codeshine.iife.min.js"></script>');
  console.log('  <script>');
  console.log('    const { highlight } = Codeshine;');
  console.log('  </script>');
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
