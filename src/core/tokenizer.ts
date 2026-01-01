/**
 * Hybrid tokenization engine for Codeshine
 */

import type { Token, TokenType, TokenizerState, TokenizeResult } from './types.js';
import type { LanguageDefinition, StringDefinition } from '../languages/types.js';
import { escapeRegExp } from '../utils/escape.js';

/**
 * Default tokenizer state
 */
function createDefaultState(): TokenizerState {
  return {
    inString: false,
    stringDelimiter: undefined,
    inComment: false,
    commentType: undefined,
    inTemplate: false,
    templateDepth: 0,
    inRegex: false,
    embeddedLanguage: undefined,
    bracketStack: [],
  };
}

/**
 * Create a token
 */
function createToken(
  type: TokenType,
  value: string,
  start: number,
  line: number,
  scopes?: string[]
): Token {
  return {
    type,
    value,
    start,
    end: start + value.length,
    line,
    scopes,
  };
}

/**
 * Match keywords in a string
 */
function matchKeyword(
  word: string,
  keywords: string[] | undefined,
  typeKeywords: string[] | undefined,
  constants: string[] | undefined
): TokenType | null {
  if (keywords?.includes(word)) {
    return 'keyword';
  }
  if (typeKeywords?.includes(word)) {
    return 'type';
  }
  if (constants?.includes(word)) {
    return 'constant';
  }
  return null;
}

/**
 * Find string definition that matches at position
 */
function findStringStart(
  code: string,
  pos: number,
  strings: StringDefinition[] | undefined
): StringDefinition | null {
  if (!strings) return null;

  for (const strDef of strings) {
    if (typeof strDef.start === 'string') {
      if (code.slice(pos, pos + strDef.start.length) === strDef.start) {
        return strDef;
      }
    } else {
      const match = code.slice(pos).match(strDef.start);
      if (match && match.index === 0) {
        return strDef;
      }
    }
  }
  return null;
}

/**
 * Check if position is at string end
 */
function isStringEnd(
  code: string,
  pos: number,
  strDef: StringDefinition,
  escapeActive: boolean
): boolean {
  if (escapeActive) return false;

  if (typeof strDef.end === 'string') {
    return code.slice(pos, pos + strDef.end.length) === strDef.end;
  }
  const match = code.slice(pos).match(strDef.end);
  return match !== null && match.index === 0;
}

/**
 * Tokenize a single line
 */
export function tokenizeLine(
  line: string,
  lineNumber: number,
  language: LanguageDefinition,
  state: TokenizerState = createDefaultState()
): TokenizeResult {
  const tokens: Token[] = [];
  let pos = 0;
  const currentState = { ...state };

  // Helper to add plain token for unmatched text
  const addPlainToken = (value: string, start: number): void => {
    if (value.length > 0) {
      tokens.push(createToken('plain', value, start, lineNumber));
    }
  };

  // Process block comment continuation
  if (currentState.inComment && currentState.commentType === 'block') {
    const blockEnd = language.comments?.block?.end;
    if (blockEnd) {
      const endPos = line.indexOf(blockEnd, pos);
      if (endPos !== -1) {
        tokens.push(
          createToken('comment', line.slice(0, endPos + blockEnd.length), 0, lineNumber)
        );
        pos = endPos + blockEnd.length;
        currentState.inComment = false;
        currentState.commentType = undefined;
      } else {
        tokens.push(createToken('comment', line, 0, lineNumber));
        return { tokens, state: currentState };
      }
    }
  }

  // Process multi-line string continuation
  if (currentState.inString && currentState.stringDelimiter) {
    const strDef = language.strings?.find((s) => {
      if (typeof s.start === 'string') {
        return s.start === currentState.stringDelimiter;
      }
      return false;
    });

    if (strDef) {
      let escaped = false;
      let foundEnd = false;
      let endPos = 0;

      for (let i = pos; i < line.length; i++) {
        if (escaped) {
          escaped = false;
          continue;
        }

        if (strDef.escape && line[i] === strDef.escape) {
          escaped = true;
          continue;
        }

        if (isStringEnd(line, i, strDef, escaped)) {
          const endStr = typeof strDef.end === 'string' ? strDef.end : '';
          endPos = i + endStr.length;
          foundEnd = true;
          break;
        }
      }

      if (foundEnd) {
        tokens.push(createToken('string', line.slice(0, endPos), 0, lineNumber));
        pos = endPos;
        currentState.inString = false;
        currentState.stringDelimiter = undefined;
      } else {
        tokens.push(createToken('string', line, 0, lineNumber));
        return { tokens, state: currentState };
      }
    }
  }

  // Main tokenization loop
  while (pos < line.length) {
    const char = line[pos];
    let matched = false;

    // Skip whitespace
    if (char === ' ' || char === '\t') {
      let wsEnd = pos + 1;
      while (wsEnd < line.length && (line[wsEnd] === ' ' || line[wsEnd] === '\t')) {
        wsEnd++;
      }
      tokens.push(createToken('plain', line.slice(pos, wsEnd), pos, lineNumber));
      pos = wsEnd;
      continue;
    }

    // Check for line comment
    const lineComment = language.comments?.line;
    if (lineComment && line.slice(pos, pos + lineComment.length) === lineComment) {
      tokens.push(createToken('comment', line.slice(pos), pos, lineNumber));
      break;
    }

    // Check for block comment start
    const blockComment = language.comments?.block;
    if (blockComment && line.slice(pos, pos + blockComment.start.length) === blockComment.start) {
      const endPos = line.indexOf(blockComment.end, pos + blockComment.start.length);
      if (endPos !== -1) {
        tokens.push(
          createToken(
            'comment',
            line.slice(pos, endPos + blockComment.end.length),
            pos,
            lineNumber
          )
        );
        pos = endPos + blockComment.end.length;
      } else {
        tokens.push(createToken('comment', line.slice(pos), pos, lineNumber));
        currentState.inComment = true;
        currentState.commentType = 'block';
        break;
      }
      continue;
    }

    // Check for string start
    const strDef = findStringStart(line, pos, language.strings);
    if (strDef) {
      const startStr = typeof strDef.start === 'string' ? strDef.start : '';
      const startLen = startStr.length || 1;
      let strEnd = pos + startLen;
      let escaped = false;
      let foundEnd = false;
      let hasInterpolation = false;
      const interpolationTokens: Token[] = [];

      while (strEnd < line.length) {
        if (escaped) {
          escaped = false;
          strEnd++;
          continue;
        }

        const currentChar = line[strEnd];

        if (strDef.escape && currentChar === strDef.escape) {
          escaped = true;
          strEnd++;
          continue;
        }

        // Check for interpolation
        if (strDef.interpolation) {
          const interpStart = strDef.interpolation.start;
          if (line.slice(strEnd, strEnd + interpStart.length) === interpStart) {
            hasInterpolation = true;
            // Find matching end
            let depth = 1;
            let interpEnd = strEnd + interpStart.length;
            while (interpEnd < line.length && depth > 0) {
              if (line.slice(interpEnd, interpEnd + strDef.interpolation.end.length) === strDef.interpolation.end) {
                depth--;
                if (depth === 0) {
                  interpEnd += strDef.interpolation.end.length;
                  break;
                }
              } else if (line[interpEnd] === '{') {
                depth++;
              }
              interpEnd++;
            }
            interpolationTokens.push(
              createToken('interpolation', line.slice(strEnd, interpEnd), strEnd, lineNumber)
            );
            strEnd = interpEnd;
            continue;
          }
        }

        if (isStringEnd(line, strEnd, strDef, escaped)) {
          const endStr = typeof strDef.end === 'string' ? strDef.end : '';
          strEnd += endStr.length || 1;
          foundEnd = true;
          break;
        }

        strEnd++;
      }

      if (foundEnd || !strDef.multiline) {
        if (hasInterpolation && interpolationTokens.length > 0) {
          // Split string around interpolations
          let lastEnd = pos;
          for (const interpToken of interpolationTokens) {
            if (interpToken.start > lastEnd) {
              tokens.push(createToken('string', line.slice(lastEnd, interpToken.start), lastEnd, lineNumber));
            }
            tokens.push(interpToken);
            lastEnd = interpToken.end;
          }
          if (lastEnd < strEnd) {
            tokens.push(createToken('string', line.slice(lastEnd, strEnd), lastEnd, lineNumber));
          }
        } else {
          tokens.push(createToken('string', line.slice(pos, strEnd), pos, lineNumber));
        }
        pos = strEnd;
      } else {
        tokens.push(createToken('string', line.slice(pos), pos, lineNumber));
        currentState.inString = true;
        currentState.stringDelimiter = startStr;
        break;
      }
      continue;
    }

    // Check custom patterns
    for (const pattern of language.patterns) {
      const match = line.slice(pos).match(pattern.pattern);
      if (match && match.index === 0) {
        tokens.push(createToken(pattern.type, match[0], pos, lineNumber, pattern.scopes));
        pos += match[0].length;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // Check for identifier (word)
    const wordMatch = line.slice(pos).match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/);
    if (wordMatch) {
      const word = wordMatch[0];
      const keywordType = matchKeyword(word, language.keywords, language.typeKeywords, language.constants);
      if (keywordType) {
        tokens.push(createToken(keywordType, word, pos, lineNumber));
      } else {
        // Check if it's a function call
        const afterWord = line.slice(pos + word.length).trimStart();
        if (afterWord.startsWith('(')) {
          tokens.push(createToken('function', word, pos, lineNumber));
        } else if (/^[A-Z]/.test(word)) {
          tokens.push(createToken('class', word, pos, lineNumber));
        } else {
          tokens.push(createToken('variable', word, pos, lineNumber));
        }
      }
      pos += word.length;
      continue;
    }

    // Check for number
    const numMatch = line.slice(pos).match(/^(?:0x[\da-fA-F]+|0b[01]+|0o[0-7]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/);
    if (numMatch) {
      tokens.push(createToken('number', numMatch[0], pos, lineNumber));
      pos += numMatch[0].length;
      continue;
    }

    // Check for operators
    if (language.operators) {
      if (language.operators instanceof RegExp) {
        const opMatch = line.slice(pos).match(language.operators);
        if (opMatch && opMatch.index === 0) {
          tokens.push(createToken('operator', opMatch[0], pos, lineNumber));
          pos += opMatch[0].length;
          continue;
        }
      } else {
        const sortedOps = [...language.operators].sort((a, b) => b.length - a.length);
        for (const op of sortedOps) {
          if (line.slice(pos, pos + op.length) === op) {
            tokens.push(createToken('operator', op, pos, lineNumber));
            pos += op.length;
            matched = true;
            break;
          }
        }
        if (matched) continue;
      }
    }

    // Check for punctuation
    const punctMatch = line.slice(pos).match(/^[{}[\]();,.:]/);
    if (punctMatch) {
      tokens.push(createToken('punctuation', punctMatch[0], pos, lineNumber));
      pos += punctMatch[0].length;
      continue;
    }

    // Unknown character - add as plain
    addPlainToken(char ?? '', pos);
    pos++;
  }

  return { tokens, state: currentState };
}

/**
 * Tokenize complete code
 */
export function tokenize(code: string, language: LanguageDefinition): Token[] {
  const lines = code.split('\n');
  const allTokens: Token[] = [];
  let state = createDefaultState();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? '';
    const result = tokenizeLine(line, i + 1, language, state);
    allTokens.push(...result.tokens);
    state = result.state;

    // Add newline token between lines (except for last line)
    if (i < lines.length - 1) {
      allTokens.push(createToken('plain', '\n', line.length, i + 1));
    }
  }

  return allTokens;
}

/**
 * Get tokens grouped by line
 */
export function getTokensByLine(tokens: Token[]): Map<number, Token[]> {
  const byLine = new Map<number, Token[]>();

  for (const token of tokens) {
    const lineTokens = byLine.get(token.line);
    if (lineTokens) {
      lineTokens.push(token);
    } else {
      byLine.set(token.line, [token]);
    }
  }

  return byLine;
}

export { createDefaultState };
