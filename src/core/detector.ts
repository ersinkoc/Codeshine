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
      { pattern: /\bconst\s+\w+\s*=/, weight: 2 },
      { pattern: /\blet\s+\w+\s*=/, weight: 2 },
      { pattern: /\bfunction\s+\w+\s*\(/, weight: 2 },
      { pattern: /\bconsole\.\w+\(/, weight: 3 },
      { pattern: /\brequire\s*\(/, weight: 3 },
      { pattern: /\bexport\s+(default\s+)?/, weight: 2 },
      { pattern: /\bimport\s+.*\s+from\s+/, weight: 2 },
      { pattern: /=>\s*{/, weight: 1 },
      { pattern: /\.then\s*\(/, weight: 2 },
      { pattern: /async\s+function/, weight: 3 },
    ],
  },
  {
    name: 'typescript',
    patterns: [
      { pattern: /:\s*(string|number|boolean|any|void)\b/, weight: 4 },
      { pattern: /\binterface\s+\w+/, weight: 4 },
      { pattern: /\btype\s+\w+\s*=/, weight: 4 },
      { pattern: /<[A-Z]\w*>/, weight: 2 },
      { pattern: /\bas\s+\w+/, weight: 3 },
      { pattern: /\benum\s+\w+/, weight: 4 },
      { pattern: /\bnamespace\s+\w+/, weight: 4 },
      { pattern: /:\s*\w+\[\]/, weight: 3 },
      { pattern: /\bReadonly</, weight: 4 },
      { pattern: /\bPartial</, weight: 4 },
    ],
  },
  {
    name: 'python',
    shebang: /^#!.*\bpython/,
    patterns: [
      { pattern: /\bdef\s+\w+\s*\(/, weight: 3 },
      { pattern: /\bclass\s+\w+.*:$/, weight: 3 },
      { pattern: /\bimport\s+\w+/, weight: 2 },
      { pattern: /\bfrom\s+\w+\s+import/, weight: 3 },
      { pattern: /\bif\s+__name__\s*==\s*['"]__main__['"]/, weight: 5 },
      { pattern: /\bprint\s*\(/, weight: 2 },
      { pattern: /\bself\.\w+/, weight: 3 },
      { pattern: /\bNone\b/, weight: 2 },
      { pattern: /\bTrue\b|\bFalse\b/, weight: 1 },
      { pattern: /^\s*@\w+/, weight: 2 },
    ],
  },
  {
    name: 'java',
    patterns: [
      { pattern: /\bpublic\s+class\s+\w+/, weight: 5 },
      { pattern: /\bprivate\s+\w+\s+\w+;/, weight: 3 },
      { pattern: /\bpublic\s+static\s+void\s+main/, weight: 5 },
      { pattern: /\bSystem\.out\.print/, weight: 5 },
      { pattern: /\bimport\s+java\./, weight: 5 },
      { pattern: /\bnew\s+\w+\s*\(/, weight: 2 },
      { pattern: /\bpackage\s+[\w.]+;/, weight: 4 },
      { pattern: /\bextends\s+\w+/, weight: 2 },
      { pattern: /\bimplements\s+\w+/, weight: 2 },
      { pattern: /@Override/, weight: 4 },
    ],
  },
  {
    name: 'rust',
    patterns: [
      { pattern: /\bfn\s+\w+\s*\(/, weight: 4 },
      { pattern: /\blet\s+mut\s+/, weight: 5 },
      { pattern: /\bimpl\s+\w+/, weight: 4 },
      { pattern: /\bstruct\s+\w+/, weight: 3 },
      { pattern: /\benum\s+\w+/, weight: 2 },
      { pattern: /\bmatch\s+\w+\s*{/, weight: 4 },
      { pattern: /\bSome\(|\bNone\b/, weight: 3 },
      { pattern: /\bOk\(|\bErr\(/, weight: 3 },
      { pattern: /\buse\s+\w+::/, weight: 4 },
      { pattern: /\bpub\s+fn/, weight: 4 },
    ],
  },
  {
    name: 'go',
    patterns: [
      { pattern: /\bfunc\s+\w+\s*\(/, weight: 4 },
      { pattern: /\bpackage\s+\w+/, weight: 5 },
      { pattern: /\bimport\s+\(/, weight: 4 },
      { pattern: /\bfmt\.\w+/, weight: 5 },
      { pattern: /:=/, weight: 3 },
      { pattern: /\bgo\s+func/, weight: 5 },
      { pattern: /\bchan\s+\w+/, weight: 5 },
      { pattern: /\bdefer\s+/, weight: 4 },
      { pattern: /\binterface\s*{/, weight: 3 },
      { pattern: /\bstruct\s*{/, weight: 3 },
    ],
  },
  {
    name: 'html',
    patterns: [
      { pattern: /<!DOCTYPE\s+html>/i, weight: 10 },
      { pattern: /<html\b/i, weight: 5 },
      { pattern: /<head\b/i, weight: 3 },
      { pattern: /<body\b/i, weight: 3 },
      { pattern: /<div\b/i, weight: 2 },
      { pattern: /<span\b/i, weight: 2 },
      { pattern: /<script\b/i, weight: 2 },
      { pattern: /<style\b/i, weight: 2 },
      { pattern: /<\/\w+>/, weight: 2 },
      { pattern: /\sclass=["']/, weight: 2 },
    ],
  },
  {
    name: 'css',
    patterns: [
      { pattern: /\{[\s\S]*?}/, weight: 1 },
      { pattern: /\.\w+\s*\{/, weight: 3 },
      { pattern: /#\w+\s*\{/, weight: 3 },
      { pattern: /:\s*\d+px/, weight: 3 },
      { pattern: /@media\s+/, weight: 4 },
      { pattern: /@import\s+/, weight: 3 },
      { pattern: /background-color:/, weight: 3 },
      { pattern: /font-family:/, weight: 3 },
      { pattern: /display:\s*flex/, weight: 3 },
      { pattern: /margin:\s*\d+/, weight: 2 },
    ],
  },
  {
    name: 'json',
    patterns: [
      { pattern: /^\s*\{[\s\S]*\}\s*$/, weight: 3 },
      { pattern: /^\s*\[[\s\S]*\]\s*$/, weight: 3 },
      { pattern: /"[\w]+"\s*:\s*"[^"]*"/, weight: 2 },
      { pattern: /"[\w]+"\s*:\s*\d+/, weight: 2 },
      { pattern: /"[\w]+"\s*:\s*true/, weight: 2 },
      { pattern: /"[\w]+"\s*:\s*false/, weight: 2 },
      { pattern: /"[\w]+"\s*:\s*null/, weight: 2 },
      { pattern: /"[\w]+"\s*:\s*\[/, weight: 2 },
      { pattern: /"[\w]+"\s*:\s*\{/, weight: 2 },
    ],
  },
  {
    name: 'yaml',
    patterns: [
      { pattern: /^---\s*$/m, weight: 4 },
      { pattern: /^\w+:\s*$/m, weight: 2 },
      { pattern: /^\s*-\s+\w+/m, weight: 2 },
      { pattern: /^\w+:\s+\|/m, weight: 3 },
      { pattern: /^\w+:\s+>/m, weight: 3 },
      { pattern: /&\w+/, weight: 2 },
      { pattern: /\*\w+/, weight: 2 },
    ],
  },
  {
    name: 'markdown',
    patterns: [
      { pattern: /^#+\s+.+$/m, weight: 3 },
      { pattern: /^\s*[-*+]\s+/m, weight: 2 },
      { pattern: /\[.+\]\(.+\)/, weight: 3 },
      { pattern: /!\[.+\]\(.+\)/, weight: 4 },
      { pattern: /```\w*/, weight: 4 },
      { pattern: /\*\*.+\*\*/, weight: 2 },
      { pattern: /_.+_/, weight: 1 },
      { pattern: /^>\s+/m, weight: 2 },
    ],
  },
  {
    name: 'bash',
    shebang: /^#!.*\b(?:bash|sh|zsh)\b/,
    patterns: [
      { pattern: /^\s*#!/, weight: 3 },
      { pattern: /\$\{?\w+\}?/, weight: 2 },
      { pattern: /\becho\s+/, weight: 2 },
      { pattern: /\bif\s+\[/, weight: 3 },
      { pattern: /\bfi\b/, weight: 3 },
      { pattern: /\bfor\s+\w+\s+in\b/, weight: 3 },
      { pattern: /\bdone\b/, weight: 2 },
      { pattern: /\|\s*\w+/, weight: 1 },
      { pattern: /\bexport\s+\w+=/, weight: 3 },
    ],
  },
  {
    name: 'sql',
    patterns: [
      { pattern: /\bSELECT\b/i, weight: 3 },
      { pattern: /\bFROM\b/i, weight: 2 },
      { pattern: /\bWHERE\b/i, weight: 2 },
      { pattern: /\bINSERT\s+INTO\b/i, weight: 4 },
      { pattern: /\bUPDATE\b.*\bSET\b/i, weight: 4 },
      { pattern: /\bDELETE\s+FROM\b/i, weight: 4 },
      { pattern: /\bCREATE\s+TABLE\b/i, weight: 4 },
      { pattern: /\bJOIN\b/i, weight: 2 },
      { pattern: /\bGROUP\s+BY\b/i, weight: 3 },
      { pattern: /\bORDER\s+BY\b/i, weight: 3 },
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
