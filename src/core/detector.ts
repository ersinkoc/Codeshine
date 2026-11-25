/**
 * Auto language detection for Codeshine
 */

import type { DetectionResult } from './types.js';

interface LanguageSignature {
  name: string;
  shebang?: RegExp;
  patterns: Array<{
    pattern: RegExp;
    weight: number;
  }>;
}

/**
 * Language signatures for detection
 */
const signatures: LanguageSignature[] = [
  {
    name: 'javascript',
    shebang: /^#!.*\bnode\b/,
    patterns: [
      { pattern: /\bconst\s+\w+\s*=/g, weight: 2 },
      { pattern: /\blet\s+\w+\s*=/g, weight: 2 },
      { pattern: /\bfunction\s+\w+\s*\(/g, weight: 2 },
      { pattern: /\bconsole\.\w+\(/g, weight: 3 },
      { pattern: /\brequire\s*\(/g, weight: 3 },
      { pattern: /\bexport\s+(default\s+)?/g, weight: 2 },
      { pattern: /\bimport\s+.*\s+from\s+/g, weight: 2 },
      { pattern: /=>\s*{/g, weight: 1 },
      { pattern: /\.then\s*\(/g, weight: 2 },
      { pattern: /async\s+function/g, weight: 3 },
    ],
  },
  {
    name: 'typescript',
    patterns: [
      { pattern: /:\s*(string|number|boolean|any|void)\b/g, weight: 4 },
      { pattern: /\binterface\s+\w+/g, weight: 4 },
      { pattern: /\btype\s+\w+\s*=/g, weight: 4 },
      { pattern: /<[A-Z]\w*>/g, weight: 2 },
      { pattern: /\bas\s+\w+/g, weight: 3 },
      { pattern: /\benum\s+\w+/g, weight: 4 },
      { pattern: /\bnamespace\s+\w+/g, weight: 4 },
      { pattern: /:\s*\w+\[\]/g, weight: 3 },
      { pattern: /\bReadonly</g, weight: 4 },
      { pattern: /\bPartial</g, weight: 4 },
    ],
  },
  {
    name: 'python',
    shebang: /^#!.*\bpython/,
    patterns: [
      { pattern: /\bdef\s+\w+\s*\(/g, weight: 3 },
      { pattern: /\bclass\s+\w+.*:$/g, weight: 3 },
      { pattern: /\bimport\s+\w+/g, weight: 2 },
      { pattern: /\bfrom\s+\w+\s+import/g, weight: 3 },
      { pattern: /\bif\s+__name__\s*==\s*['"]__main__['"]/g, weight: 5 },
      { pattern: /\bprint\s*\(/g, weight: 2 },
      { pattern: /\bself\.\w+/g, weight: 3 },
      { pattern: /\bNone\b/g, weight: 2 },
      { pattern: /\bTrue\b|\bFalse\b/g, weight: 1 },
      { pattern: /^\s*@\w+/g, weight: 2 },
    ],
  },
  {
    name: 'java',
    patterns: [
      { pattern: /\bpublic\s+class\s+\w+/g, weight: 5 },
      { pattern: /\bprivate\s+\w+\s+\w+;/g, weight: 3 },
      { pattern: /\bpublic\s+static\s+void\s+main/g, weight: 5 },
      { pattern: /\bSystem\.out\.print/g, weight: 5 },
      { pattern: /\bimport\s+java\./g, weight: 5 },
      { pattern: /\bnew\s+\w+\s*\(/g, weight: 2 },
      { pattern: /\bpackage\s+[\w.]+;/g, weight: 4 },
      { pattern: /\bextends\s+\w+/g, weight: 2 },
      { pattern: /\bimplements\s+\w+/g, weight: 2 },
      { pattern: /@Override/g, weight: 4 },
    ],
  },
  {
    name: 'rust',
    patterns: [
      { pattern: /\bfn\s+\w+\s*\(/g, weight: 4 },
      { pattern: /\blet\s+mut\s+/g, weight: 5 },
      { pattern: /\bimpl\s+\w+/g, weight: 4 },
      { pattern: /\bstruct\s+\w+/g, weight: 3 },
      { pattern: /\benum\s+\w+/g, weight: 2 },
      { pattern: /\bmatch\s+\w+\s*{/g, weight: 4 },
      { pattern: /\bSome\(|\bNone\b/g, weight: 3 },
      { pattern: /\bOk\(|\bErr\(/g, weight: 3 },
      { pattern: /\buse\s+\w+::/g, weight: 4 },
      { pattern: /\bpub\s+fn/g, weight: 4 },
    ],
  },
  {
    name: 'go',
    patterns: [
      { pattern: /\bfunc\s+\w+\s*\(/g, weight: 4 },
      { pattern: /\bpackage\s+\w+/g, weight: 5 },
      { pattern: /\bimport\s+\(/g, weight: 4 },
      { pattern: /\bfmt\.\w+/g, weight: 5 },
      { pattern: /:=/g, weight: 3 },
      { pattern: /\bgo\s+func/g, weight: 5 },
      { pattern: /\bchan\s+\w+/g, weight: 5 },
      { pattern: /\bdefer\s+/g, weight: 4 },
      { pattern: /\binterface\s*{/g, weight: 3 },
      { pattern: /\bstruct\s*{/g, weight: 3 },
    ],
  },
  {
    name: 'html',
    patterns: [
      { pattern: /<!DOCTYPE\s+html>/ig, weight: 10 },
      { pattern: /<html\b/ig, weight: 5 },
      { pattern: /<head\b/ig, weight: 3 },
      { pattern: /<body\b/ig, weight: 3 },
      { pattern: /<div\b/ig, weight: 2 },
      { pattern: /<span\b/ig, weight: 2 },
      { pattern: /<script\b/ig, weight: 2 },
      { pattern: /<style\b/ig, weight: 2 },
      { pattern: /<\/\w+>/g, weight: 2 },
      { pattern: /\sclass=["']/g, weight: 2 },
    ],
  },
  {
    name: 'css',
    patterns: [
      { pattern: /\{[\s\S]*?}/g, weight: 1 },
      { pattern: /\.\w+\s*\{/g, weight: 3 },
      { pattern: /#\w+\s*\{/g, weight: 3 },
      { pattern: /:\s*\d+px/g, weight: 3 },
      { pattern: /@media\s+/g, weight: 4 },
      { pattern: /@import\s+/g, weight: 3 },
      { pattern: /background-color:/g, weight: 3 },
      { pattern: /font-family:/g, weight: 3 },
      { pattern: /display:\s*flex/g, weight: 3 },
      { pattern: /margin:\s*\d+/g, weight: 2 },
    ],
  },
  {
    name: 'json',
    patterns: [
      { pattern: /^\s*\{[\s\S]*\}\s*$/g, weight: 3 },
      { pattern: /^\s*\[[\s\S]*\]\s*$/g, weight: 3 },
      { pattern: /"[\w]+"\s*:\s*"[^"]*"/g, weight: 2 },
      { pattern: /"[\w]+"\s*:\s*\d+/g, weight: 2 },
      { pattern: /"[\w]+"\s*:\s*true/g, weight: 2 },
      { pattern: /"[\w]+"\s*:\s*false/g, weight: 2 },
      { pattern: /"[\w]+"\s*:\s*null/g, weight: 2 },
      { pattern: /"[\w]+"\s*:\s*\[/g, weight: 2 },
      { pattern: /"[\w]+"\s*:\s*\{/g, weight: 2 },
    ],
  },
  {
    name: 'yaml',
    patterns: [
      { pattern: /^---\s*$/mg, weight: 4 },
      { pattern: /^\w+:\s*$/mg, weight: 2 },
      { pattern: /^\s*-\s+\w+/mg, weight: 2 },
      { pattern: /^\w+:\s+\|/mg, weight: 3 },
      { pattern: /^\w+:\s+>/mg, weight: 3 },
      { pattern: /&\w+/g, weight: 2 },
      { pattern: /\*\w+/g, weight: 2 },
    ],
  },
  {
    name: 'markdown',
    patterns: [
      { pattern: /^#+\s+.+$/mg, weight: 3 },
      { pattern: /^\s*[-*+]\s+/mg, weight: 2 },
      { pattern: /\[.+\]\(.+\)/g, weight: 3 },
      { pattern: /!\[.+\]\(.+\)/g, weight: 4 },
      { pattern: /```\w*/g, weight: 4 },
      { pattern: /\*\*.+\*\*/g, weight: 2 },
      { pattern: /_.+_/g, weight: 1 },
      { pattern: /^>\s+/mg, weight: 2 },
    ],
  },
  {
    name: 'bash',
    shebang: /^#!.*\b(?:bash|sh|zsh)\b/,
    patterns: [
      { pattern: /^\s*#!/g, weight: 3 },
      { pattern: /\$\{?\w+\}?/g, weight: 2 },
      { pattern: /\becho\s+/g, weight: 2 },
      { pattern: /\bif\s+\[/g, weight: 3 },
      { pattern: /\bfi\b/g, weight: 3 },
      { pattern: /\bfor\s+\w+\s+in\b/g, weight: 3 },
      { pattern: /\bdone\b/g, weight: 2 },
      { pattern: /\|\s*\w+/g, weight: 1 },
      { pattern: /\bexport\s+\w+=/g, weight: 3 },
    ],
  },
  {
    name: 'sql',
    patterns: [
      { pattern: /\bSELECT\b/ig, weight: 3 },
      { pattern: /\bFROM\b/ig, weight: 2 },
      { pattern: /\bWHERE\b/ig, weight: 2 },
      { pattern: /\bINSERT\s+INTO\b/ig, weight: 4 },
      { pattern: /\bUPDATE\b.*\bSET\b/ig, weight: 4 },
      { pattern: /\bDELETE\s+FROM\b/ig, weight: 4 },
      { pattern: /\bCREATE\s+TABLE\b/ig, weight: 4 },
      { pattern: /\bJOIN\b/ig, weight: 2 },
      { pattern: /\bGROUP\s+BY\b/ig, weight: 3 },
      { pattern: /\bORDER\s+BY\b/ig, weight: 3 },
    ],
  },
];

/**
 * Detect language from code
 */
export function detectLanguage(code: string): DetectionResult {
  const scores = new Map<string, number>();

  // Check shebang first
  const firstLine = code.split('\n')[0] ?? '';
  for (const sig of signatures) {
    if (sig.shebang && sig.shebang.test(firstLine)) {
      return { language: sig.name, confidence: 0.95 };
    }
  }

  // Score based on patterns
  for (const sig of signatures) {
    let score = 0;

    for (const { pattern, weight } of sig.patterns) {
      const matches = code.match(pattern);
      if (matches) {
        score += weight * matches.length;
      }
    }

    if (score > 0) {
      scores.set(sig.name, score);
    }
  }

  // Find best match
  let bestLanguage = 'text';
  let bestScore = 0;
  let totalScore = 0;

  for (const [lang, score] of scores) {
    totalScore += score;
    if (score > bestScore) {
      bestScore = score;
      bestLanguage = lang;
    }
  }

  // Calculate confidence
  const confidence = totalScore > 0 ? Math.min(0.95, bestScore / totalScore) : 0;

  return { language: bestLanguage, confidence };
}

export default detectLanguage;
