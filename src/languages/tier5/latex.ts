/**
 * LaTeX language definition
 */
import { defineLang } from '../define-lang.js';

export const latex = defineLang({
  name: 'latex',
  aliases: ['tex', 'context'],
  extensions: ['.tex', '.latex', '.ltx', '.sty', '.cls', '.dtx', '.ins', '.bbl'],
  keywords: [
    // Document structure
    'documentclass', 'usepackage', 'begin', 'end',
    'part', 'chapter', 'section', 'subsection', 'subsubsection', 'paragraph', 'subparagraph',
    'title', 'author', 'date', 'maketitle', 'tableofcontents',
    'appendix', 'frontmatter', 'mainmatter', 'backmatter',
    // Text formatting
    'textbf', 'textit', 'texttt', 'textrm', 'textsf', 'textsc', 'emph', 'underline',
    'tiny', 'scriptsize', 'footnotesize', 'small', 'normalsize', 'large', 'Large', 'LARGE', 'huge', 'Huge',
    // Math
    'frac', 'sqrt', 'sum', 'prod', 'int', 'oint', 'partial', 'nabla',
    'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta',
    'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'pi', 'rho', 'sigma', 'tau',
    'upsilon', 'phi', 'chi', 'psi', 'omega',
    'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'log', 'ln', 'exp', 'lim', 'inf', 'sup',
    // Environments
    'equation', 'align', 'gather', 'multline', 'array', 'matrix', 'bmatrix', 'pmatrix', 'vmatrix',
    'figure', 'table', 'tabular', 'enumerate', 'itemize', 'description',
    'verbatim', 'quote', 'quotation', 'verse', 'center', 'flushleft', 'flushright',
    'abstract', 'theorem', 'lemma', 'proof', 'definition', 'example', 'remark',
    // References
    'label', 'ref', 'pageref', 'cite', 'bibliography', 'bibliographystyle',
    'footnote', 'index', 'glossary',
    // Floats
    'caption', 'includegraphics', 'centering',
    // Misc
    'newcommand', 'renewcommand', 'newenvironment', 'renewenvironment',
    'def', 'let', 'gdef', 'edef', 'xdef',
    'input', 'include', 'includeonly',
    'hspace', 'vspace', 'hfill', 'vfill', 'linebreak', 'pagebreak', 'newpage', 'clearpage',
    'noindent', 'par',
  ],
  patterns: [
    // Commands
    { pattern: /\\[a-zA-Z@]+\*?/g, type: 'keyword' },
    // Special characters
    { pattern: /\\[{}$&#%_^~\\]/g, type: 'string' },
    // Math mode
    { pattern: /\$\$[\s\S]*?\$\$/g, type: 'string' },
    { pattern: /\$[^$]*\$/g, type: 'string' },
    { pattern: /\\\[[\s\S]*?\\\]/g, type: 'string' },
    { pattern: /\\\([\s\S]*?\\\)/g, type: 'string' },
    // Environment delimiters
    { pattern: /\\begin\{([^}]+)\}/g, type: 'keyword' },
    { pattern: /\\end\{([^}]+)\}/g, type: 'keyword' },
    // Arguments
    { pattern: /\{[^{}]*\}/g, type: 'default' },
    { pattern: /\[[^\]]*\]/g, type: 'default' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?\b/g, type: 'number' },
  ],
  strings: [],
  comments: {
    line: '%',
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default latex;
