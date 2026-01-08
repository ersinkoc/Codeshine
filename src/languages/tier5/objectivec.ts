/**
 * Objective-C language definition
 */
import { defineLang } from '../define-lang.js';

export const objectivec = defineLang({
  name: 'objectivec',
  aliases: ['objc', 'obj-c', 'objc++', 'objective-c'],
  extensions: ['.m', '.mm', '.M', '.h'],
  keywords: [
    // C keywords
    'auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do',
    'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'inline',
    'int', 'long', 'register', 'restrict', 'return', 'short', 'signed', 'sizeof',
    'static', 'struct', 'switch', 'typedef', 'union', 'unsigned', 'void',
    'volatile', 'while', '_Bool', '_Complex', '_Imaginary',
    // Objective-C keywords
    '@autoreleasepool', '@catch', '@class', '@compatibility_alias', '@defs',
    '@dynamic', '@encode', '@end', '@finally', '@implementation', '@interface',
    '@optional', '@package', '@private', '@property', '@protected', '@protocol',
    '@public', '@required', '@selector', '@synchronized', '@synthesize',
    '@throw', '@try',
    // Property attributes
    'atomic', 'nonatomic', 'assign', 'copy', 'retain', 'strong', 'weak',
    'unsafe_unretained', 'readonly', 'readwrite', 'getter', 'setter',
    'nonnull', 'nullable', 'null_unspecified', 'null_resettable',
    // Blocks
    '__block', '__weak', '__strong', '__unsafe_unretained', '__autoreleasing',
    // Literals
    'self', 'super', 'nil', 'Nil', 'YES', 'NO', 'NULL', 'true', 'false',
  ],
  typeKeywords: [
    'id', 'Class', 'SEL', 'IMP', 'BOOL', 'instancetype',
    'NSObject', 'NSString', 'NSArray', 'NSMutableArray', 'NSDictionary',
    'NSMutableDictionary', 'NSSet', 'NSMutableSet', 'NSNumber', 'NSData',
    'NSMutableData', 'NSDate', 'NSURL', 'NSError', 'NSException',
    'NSInteger', 'NSUInteger', 'CGFloat', 'CGPoint', 'CGSize', 'CGRect',
    'NSRange', 'NSNotification', 'NSBundle', 'NSIndexPath',
  ],
  builtins: [
    'alloc', 'init', 'new', 'copy', 'mutableCopy', 'dealloc', 'release',
    'retain', 'autorelease', 'retainCount', 'description', 'debugDescription',
    'hash', 'isEqual', 'class', 'superclass', 'isKindOfClass', 'isMemberOfClass',
    'respondsToSelector', 'conformsToProtocol', 'performSelector',
    'NSLog', 'NSAssert', 'NSParameterAssert',
  ],
  patterns: [
    // Objective-C string literals
    { pattern: /@"(?:[^"\\]|\\.)*"/g, type: 'string' },
    // Number literals
    { pattern: /@-?\d+(?:\.\d+)?/g, type: 'number' },
    { pattern: /@YES|@NO|@true|@false/g, type: 'constant' },
    // Array/Dictionary literals
    { pattern: /@\[/g, type: 'punctuation' },
    { pattern: /@\{/g, type: 'punctuation' },
    { pattern: /@\(/g, type: 'punctuation' },
    // Selectors
    { pattern: /@selector\s*\([^)]*\)/g, type: 'function' },
    // Message sends
    { pattern: /\[[\s\S]*?\]/g, type: 'default' },
    // Preprocessor
    { pattern: /#\s*(?:import|include|define|undef|if|ifdef|ifndef|else|elif|endif|error|warning|pragma|line)\b[^\n]*/g, type: 'macro' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F]+[uUlL]*\b/g, type: 'number' },
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[fFlL]?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=~]=?|&&|\|\||\+\+|--|->/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    line: '//',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default objectivec;
