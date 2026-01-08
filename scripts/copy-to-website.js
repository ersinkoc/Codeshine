#!/usr/bin/env node

/**
 * Copy dist files to website/lib/codeshine
 * This allows the website to use the local build instead of npm package
 */

import { cpSync, rmSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const sourceDir = resolve(rootDir, 'dist');
const targetDir = resolve(rootDir, 'website/lib/codeshine');

async function copyToWebsite() {
  console.log('Copying dist to website/lib/codeshine...\n');

  // Check if dist exists
  if (!existsSync(sourceDir)) {
    console.error('❌ Error: dist/ folder not found. Run `npm run build` first.');
    process.exit(1);
  }

  // Clean target directory if exists
  if (existsSync(targetDir)) {
    console.log('  Cleaning existing lib/codeshine...');
    rmSync(targetDir, { recursive: true, force: true });
  }

  // Ensure parent directory exists
  mkdirSync(dirname(targetDir), { recursive: true });

  // Copy dist to website/lib/codeshine
  console.log('  Copying files...');
  cpSync(sourceDir, targetDir, { recursive: true });

  console.log('\n✅ Copied successfully!');
  console.log(`   Source: ${sourceDir}`);
  console.log(`   Target: ${targetDir}`);
  console.log('\n📝 Remember to update website imports if needed.');
}

copyToWebsite().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
