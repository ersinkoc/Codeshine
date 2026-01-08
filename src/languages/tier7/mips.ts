/**
 * MIPS Assembly language definition
 */
import { defineLang } from '../define-lang.js';

export const mips = defineLang({
  name: 'mips',
  aliases: ['mipsasm', 'mips-asm'],
  extensions: ['.s', '.S', '.asm', '.mips'],
  keywords: [
    // Assembler directives
    '.text', '.data', '.bss', '.ktext', '.kdata', '.section',
    '.align', '.ascii', '.asciiz', '.byte', '.half', '.word', '.dword',
    '.float', '.double', '.space', '.extern', '.globl', '.global',
    '.set', '.macro', '.endm', '.include', '.equ', '.org', '.end',
    '.ent', '.frame', '.mask', '.fmask', '.cpload', '.cprestore',
  ],
  builtins: [
    // Arithmetic instructions
    'add', 'addi', 'addiu', 'addu', 'sub', 'subu', 'mult', 'multu',
    'div', 'divu', 'mul', 'rem', 'remu', 'abs', 'neg', 'negu',
    // Logical instructions
    'and', 'andi', 'or', 'ori', 'xor', 'xori', 'nor', 'not',
    // Shift instructions
    'sll', 'sllv', 'srl', 'srlv', 'sra', 'srav', 'rol', 'ror',
    // Comparison instructions
    'slt', 'slti', 'sltiu', 'sltu', 'seq', 'sne', 'sge', 'sgeu',
    'sgt', 'sgtu', 'sle', 'sleu',
    // Branch instructions
    'beq', 'bne', 'blt', 'ble', 'bgt', 'bge', 'bltu', 'bleu',
    'bgtu', 'bgeu', 'bltz', 'blez', 'bgtz', 'bgez', 'beqz', 'bnez',
    'bltzal', 'bgezal',
    // Jump instructions
    'j', 'jal', 'jr', 'jalr',
    // Load instructions
    'lb', 'lbu', 'lh', 'lhu', 'lw', 'lwl', 'lwr', 'ld',
    'la', 'li', 'lui', 'ldc1', 'lwc1', 'l.s', 'l.d',
    // Store instructions
    'sb', 'sh', 'sw', 'swl', 'swr', 'sd', 'sdc1', 'swc1', 's.s', 's.d',
    // Move instructions
    'move', 'mfhi', 'mflo', 'mthi', 'mtlo', 'mfc0', 'mtc0', 'mfc1', 'mtc1',
    'movn', 'movz', 'mov.s', 'mov.d',
    // Floating point
    'add.s', 'add.d', 'sub.s', 'sub.d', 'mul.s', 'mul.d', 'div.s', 'div.d',
    'neg.s', 'neg.d', 'abs.s', 'abs.d', 'sqrt.s', 'sqrt.d',
    'cvt.s.d', 'cvt.d.s', 'cvt.s.w', 'cvt.d.w', 'cvt.w.s', 'cvt.w.d',
    'c.eq.s', 'c.eq.d', 'c.lt.s', 'c.lt.d', 'c.le.s', 'c.le.d',
    'bc1t', 'bc1f',
    // System instructions
    'syscall', 'break', 'nop', 'eret', 'wait', 'sync', 'cache',
    'teq', 'teqi', 'tne', 'tnei', 'tlt', 'tlti', 'tge', 'tgei',
    // Pseudo-instructions
    'li', 'la', 'move', 'clear', 'b', 'bal', 'bgt', 'blt', 'bge', 'ble',
  ],
  patterns: [
    // Labels
    { pattern: /^[a-zA-Z_][a-zA-Z0-9_]*:/gm, type: 'label' },
    // Registers
    { pattern: /\$(?:zero|at|v[0-1]|a[0-3]|t[0-9]|s[0-7]|k[0-1]|gp|sp|fp|ra)\b/g, type: 'variable' },
    { pattern: /\$(?:[0-9]|[12][0-9]|3[01])\b/g, type: 'variable' },
    { pattern: /\$f(?:[0-9]|[12][0-9]|3[01])\b/g, type: 'variable' },
    // Immediate values
    { pattern: /\b0x[0-9a-fA-F]+\b/g, type: 'number' },
    { pattern: /\b0b[01]+\b/g, type: 'number' },
    { pattern: /\b0[0-7]+\b/g, type: 'number' },
    { pattern: /[+-]?\b\d+\b/g, type: 'number' },
    // Character constants
    { pattern: /'\\?.'/g, type: 'string' },
    // Operators
    { pattern: /[+\-*\/%(),:<>]+/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: '#',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '[', close: ']' },
  ],
});

export default mips;
