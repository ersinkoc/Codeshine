/**
 * Hybrid tokenization engine for Codeshine
 */

import type { Token, TokenType, TokenizerState, TokenizeResult } from './types.js';
import type {
  EmbeddedLanguage,
  LanguageDefinition,
  StringDefinition,
} from '../languages/types.js';
import { getLanguage } from '../languages/registry.js';
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
 * Whether a word is a declared contextual keyword that is being called.
 *
 * `get`, `set`, `async`, `of` and `from` are keywords only in specific
 * positions; as identifiers they stay callable, so a call belongs to the
 * language's call pattern rather than to the keyword rule.
 */
function isContextualCall(
  word: string,
  pos: number,
  line: string,
  contextualKeywords: string[] | undefined
): boolean {
  if (!contextualKeywords?.includes(word)) return false;
  return /^\s*\(/.test(line.slice(pos + word.length));
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
 * Sticky clones of lookbehind-first custom patterns, keyed by the declaration.
 *
 * A lookbehind asserts on the text just before the match, so those patterns
 * must be evaluated against the whole line: `line.slice(pos)` removes the very
 * characters the lookbehind needs to see, which makes every lookbehind-first
 * rule unmatchable. The clone is sticky (`y`) so it is still anchored at `pos`.
 */
const stickyPatterns = new WeakMap<RegExp, RegExp>();

/**
 * Characters that continue an identifier.
 */
function isIdentifierChar(char: string): boolean {
  return char !== '' && /[A-Za-z0-9_$]/.test(char);
}

/**
 * Whether a match ends in the middle of an identifier.
 *
 * A greedy word class followed by a negative lookahead can backtrack out of
 * the lookahead's failure: `/\w+(?!\s*\()/` on `a.field()` matches `fiel`,
 * because the lookahead then sees `d`. Accepting that match splits one
 * identifier across two tokens, so the match is left to the next rule (or to
 * the identifier fallback), which consumes the whole word.
 */
function splitsIdentifier(line: string, pos: number, text: string): boolean {
  if (text.length === 0) return false;
  return (
    isIdentifierChar(text.charAt(text.length - 1)) &&
    isIdentifierChar(line.charAt(pos + text.length))
  );
}

/**
 * Match a custom pattern at `pos`, preserving lookbehind context.
 *
 * Patterns that do not start with a lookbehind keep the historical slice path,
 * so `^`-anchored and lookahead-only rules behave exactly as before.
 */
function matchPatternAt(line: string, pos: number, pattern: RegExp): string | null {
  let text: string;

  if (!/^\(\?<[=!]/.test(pattern.source)) {
    const match = line.slice(pos).match(pattern);
    if (!match || match.index !== 0) return null;
    text = match[0];
  } else {
    let sticky = stickyPatterns.get(pattern);
    if (!sticky) {
      sticky = new RegExp(pattern.source, pattern.flags.replace(/[gy]/g, '') + 'y');
      stickyPatterns.set(pattern, sticky);
    }
    sticky.lastIndex = pos;
    const match = sticky.exec(line);
    if (!match) return null;
    text = match[0];
  }

  return splitsIdentifier(line, pos, text) ? null : text;
}

/**
 * An embedded delimiter may be declared as a string or a RegExp.
 */
function toRegExp(delimiter: RegExp | string): RegExp {
  return delimiter instanceof RegExp ? delimiter : new RegExp(escapeRegExp(delimiter));
}

/**
 * Index of the first match of an end delimiter in `text`, or -1.
 */
function matchEndDelimiter(text: string, end: RegExp): number {
  const match = text.match(end);
  return match && match.index !== undefined ? match.index : -1;
}

/**
 * Embedded region declarations of a language.
 *
 * `embedded` is the older spelling of the same field; several definitions
 * (vue, svelte, handlebars) still declare their regions there, so both must be
 * honoured. `embeddedLanguages` wins when a language declares both.
 */
function embeddedDefinitions(language: LanguageDefinition): EmbeddedLanguage[] {
  return language.embeddedLanguages ?? language.embedded ?? [];
}

/**
 * Find an embedded language region starting at position
 */
function findEmbeddedStart(
  line: string,
  pos: number,
  language: LanguageDefinition
): { def: EmbeddedLanguage; text: string } | null {
  for (const def of embeddedDefinitions(language)) {
    const start = toRegExp(def.start);
    // A delimiter that matches the empty string cannot delimit a region
    // (handlebars declares `{ language: 'html', start: '', end: '' }\`);
    // accepting it would open a region at every position.
    if (start.test('')) continue;

    const match = line.slice(pos).match(start);
    if (match && match.index === 0) {
      return { def, text: match[0] };
    }
  }
  return null;
}

/**
 * Sticky clones of delimiters tested at one position (`matchesAt`). Kept apart
 * from `stickyPatterns`, which exists to preserve lookbehinds.
 */
const anchoredPatterns = new WeakMap<RegExp, RegExp>();

/**
 * Whether `pattern` matches exactly at `pos`.
 */
function matchesAt(text: string, pos: number, pattern: RegExp): boolean {
  let sticky = anchoredPatterns.get(pattern);
  if (!sticky) {
    sticky = new RegExp(pattern.source, pattern.flags.replace(/[gy]/g, '') + 'y');
    anchoredPatterns.set(pattern, sticky);
  }
  sticky.lastIndex = pos;
  return sticky.test(text);
}

/**
 * Characters that terminate the "script" temp buffer of the double escape
 * start / end states (WHATWG HTML §13.2.5.26, §13.2.5.31).
 */
const SCRIPT_TAG_DELIMITER = /[\t\n\f />]/;

/**
 * Whether `<script` or `</script` (case-insensitive) is followed by a delimiter
 * at `pos`. The end of the line counts as a delimiter: the tokenizer splits on
 * newlines, and a line break is one of the characters in the spec's set.
 */
function isScriptTagAt(
  text: string,
  pos: number,
  prefix: '<script' | '</script'
): boolean {
  if (text.slice(pos, pos + prefix.length).toLowerCase() !== prefix) return false;
  const after = text.charAt(pos + prefix.length);
  return after === '' || SCRIPT_TAG_DELIMITER.test(after);
}

/**
 * Find where the host's end delimiter closes a `<script>` region, honouring the
 * HTML script-data escape states (WHATWG HTML §13.2.5):
 *
 *   script data         -- `<!--`              --> escaped
 *                       -- `</script` + delim --> closes the element
 *   script data escaped -- `-->`               --> script data
 *                       -- `<script` + delim   --> double escaped
 *                       -- `</script` + delim  --> closes the element
 *   script data double  -- `-->`               --> script data
 *     escaped           -- `</script` + delim  --> escaped (not a close)
 *
 * The HTML tokenizer works on raw text, so these sequences count inside
 * JavaScript strings and comments too. `state.scriptEscape` carries the state
 * across lines. Returns the index of the closing delimiter, or -1 when the rest
 * of the line is script text.
 */
function scanScriptEnd(text: string, state: TokenizerState, end: RegExp): number {
  let escape = state.scriptEscape;
  let pos = 0;

  while (pos < text.length) {
    const char = text[pos];

    if (escape === 'double-escaped') {
      if (char === '-' && text.startsWith('-->', pos)) {
        escape = undefined;
        pos += 3;
      } else if (char === '<' && isScriptTagAt(text, pos, '</script')) {
        escape = 'escaped';
        pos += '</script'.length;
      } else {
        pos++;
      }
      continue;
    }

    if (escape === 'escaped') {
      if (char === '-' && text.startsWith('-->', pos)) {
        escape = undefined;
        pos += 3;
      } else if (char === '<' && matchesAt(text, pos, end)) {
        state.scriptEscape = escape;
        return pos;
      } else if (char === '<' && isScriptTagAt(text, pos, '<script')) {
        escape = 'double-escaped';
        pos += '<script'.length;
      } else {
        pos++;
      }
      continue;
    }

    if (char === '<' && matchesAt(text, pos, end)) {
      state.scriptEscape = undefined;
      return pos;
    }
    if (char === '<' && text.startsWith('<!--', pos)) {
      escape = 'escaped';
      pos += '<!--'.length;
      continue;
    }
    pos++;
  }

  state.scriptEscape = escape;
  return -1;
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

  /**
   * Tokenize the current embedded language region from `pos`.
   *
   * Returns true when the host's end delimiter closed the region (the host loop
   * resumes at `pos`), false when the rest of the line belongs to the region.
   */
  const processEmbeddedRegion = (): boolean => {
    const embedded = getLanguage(currentState.embeddedLanguage ?? '');
    const embeddedDef = embeddedDefinitions(language).find(
      (def) => def.language === currentState.embeddedLanguage
    );

    if (!embedded || !embeddedDef) {
      // A declaration whose definition was never loaded: fall back to the host.
      currentState.embeddedLanguage = undefined;
      currentState.embeddedState = undefined;
      return true;
    }

    const rest = line.slice(pos);
    const innerState = currentState.embeddedState ?? createDefaultState();
    const endDelimiter = toRegExp(embeddedDef.end);
    // A `<script>` region is HTML script text, where comment-like text can hide
    // an inner `</script>` (§13.2.5); every other region, including vue and
    // svelte script blocks, ends at the first delimiter.
    const endIndex = embeddedDef.scriptEscapeStates
      ? scanScriptEnd(rest, innerState, endDelimiter)
      : matchEndDelimiter(rest, endDelimiter);
    const segmentLength = endIndex === -1 ? rest.length : endIndex;
    const segment = rest.slice(0, segmentLength);

    if (segment.length > 0) {
      const result = tokenizeLine(segment, lineNumber, embedded, innerState);
      for (const token of result.tokens) {
        tokens.push({
          ...token,
          start: token.start + pos,
          end: token.end + pos,
        });
      }
      currentState.embeddedState = result.state;
    } else {
      currentState.embeddedState = innerState;
    }

    pos += segmentLength;

    if (endIndex !== -1) {
      // The host's end delimiter closes the region; the host resumes here.
      currentState.embeddedLanguage = undefined;
      currentState.embeddedState = undefined;
      return true;
    }

    return false;
  };

  // Process an embedded language region that started on a previous line
  if (currentState.embeddedLanguage && !processEmbeddedRegion()) {
    return { tokens, state: currentState };
  }

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
          if (interpStart.length > 0 && line.slice(strEnd, strEnd + interpStart.length) === interpStart) {
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

    // Check for an embedded language region start (e.g. <script> in HTML)
    const embeddedStart = findEmbeddedStart(line, pos, language);
    if (embeddedStart) {
      tokens.push(createToken('tag', embeddedStart.text, pos, lineNumber));
      pos += embeddedStart.text.length;
      currentState.embeddedLanguage = embeddedStart.def.language;
      currentState.embeddedState = createDefaultState();
      if (!processEmbeddedRegion()) {
        return { tokens, state: currentState };
      }
      continue;
    }

    // Declared reserved words take precedence over identifier-shaped patterns:
    // the javascript "Function call" pattern would otherwise type `if (`,
    // `for (` and `while (` as functions. A word after a dot is member access
    // (`promise.catch(fn)`), and a contextual keyword that is called (`get(`,
    // `of(`, `async(`) is an ordinary callable identifier, so keywords do not
    // win in either case.
    if (line[pos - 1] !== '.') {
      const wordMatch = line.slice(pos).match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/);
      const word = wordMatch?.[0];
      const keywordType =
        word && !isContextualCall(word, pos, line, language.contextualKeywords)
          ? matchKeyword(word, language.keywords, language.typeKeywords, language.constants)
          : null;
      if (word && keywordType) {
        tokens.push(createToken(keywordType, word, pos, lineNumber));
        pos += word.length;
        continue;
      }
    }

    // Check custom patterns
    for (const pattern of language.patterns) {
      const text = matchPatternAt(line, pos, pattern.pattern);
      if (text) {
        tokens.push(createToken(pattern.type, text, pos, lineNumber, pattern.scopes));
        pos += text.length;
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
