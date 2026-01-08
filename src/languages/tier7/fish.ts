/**
 * Fish shell language definition
 */
import { defineLang } from '../define-lang.js';

export const fish = defineLang({
  name: 'fish',
  aliases: ['fishshell'],
  extensions: ['.fish'],
  keywords: [
    'if', 'else', 'switch', 'case', 'for', 'in', 'while', 'begin', 'end',
    'function', 'return', 'break', 'continue', 'and', 'or', 'not',
    'set', 'set_color', 'source', 'status', 'test', 'true', 'false',
    'builtin', 'command', 'exec', 'exit', 'read', 'string', 'math',
    'contains', 'count', 'echo', 'printf', 'type', 'abbr', 'alias',
    'argparse', 'bind', 'block', 'cd', 'cdh', 'commandline', 'complete',
    'dirh', 'dirs', 'disown', 'emit', 'eval', 'fg', 'fish', 'fish_add_path',
    'fish_breakpoint_prompt', 'fish_config', 'fish_git_prompt', 'fish_greeting',
    'fish_indent', 'fish_key_reader', 'fish_mode_prompt', 'fish_opt',
    'fish_prompt', 'fish_right_prompt', 'fish_svn_prompt', 'fish_title',
    'fish_update_completions', 'fish_vcs_prompt', 'funced', 'funcsave',
    'functions', 'help', 'history', 'isatty', 'jobs', 'nextd', 'open',
    'popd', 'prevd', 'prompt_hostname', 'prompt_login', 'prompt_pwd',
    'psub', 'pushd', 'pwd', 'random', 'realpath', 'set_color', 'suspend',
    'time', 'trap', 'ulimit', 'umask', 'vared', 'wait',
  ],
  constants: [
    'true', 'false', 'status', 'fish_pid', 'last_pid', 'pipestatus',
    'fish_kill_signal', 'fish_read_limit', 'fish_user_paths',
    'HOME', 'PATH', 'PWD', 'USER', 'SHELL', 'TERM', 'EDITOR', 'VISUAL',
  ],
  patterns: [
    // Variables
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    { pattern: /\$\{[^}]+\}/g, type: 'variable' },
    // Command substitution
    { pattern: /\([^)]+\)/g, type: 'interpolation' },
    // Options
    { pattern: /\s--?[a-zA-Z][a-zA-Z0-9-]*/g, type: 'attribute' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[|&;<>!]+|\|\||&&/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\', interpolation: { start: '$', end: '' } },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    line: '#',
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: 'begin', close: 'end' },
  ],
});

export default fish;
