/**
 * Assembly language definition (x86/x64)
 */
import { defineLang } from '../define-lang.js';

export const assembly = defineLang({
  name: 'assembly',
  aliases: ['asm', 'nasm', 'masm', 'gas', 'x86', 'x64'],
  extensions: ['.asm', '.s', '.S', '.nasm', '.inc'],
  keywords: [
    // Data directives
    'section', 'segment', 'global', 'extern', 'public', 'extrn',
    'db', 'dw', 'dd', 'dq', 'dt', 'do', 'dy', 'dz',
    'resb', 'resw', 'resd', 'resq', 'rest', 'reso', 'resy', 'resz',
    'byte', 'word', 'dword', 'qword', 'tword', 'oword', 'yword', 'zword',
    'incbin', 'equ', 'times', 'align', 'alignb',
    // Sections
    '.text', '.data', '.bss', '.rodata', '.code', '.const',
    // GAS directives
    '.global', '.globl', '.extern', '.byte', '.word', '.long', '.quad',
    '.ascii', '.asciz', '.string', '.space', '.fill', '.align', '.balign',
    '.section', '.text', '.data', '.bss', '.set', '.equ', '.equiv',
    '.type', '.size', '.file', '.loc', '.cfi_startproc', '.cfi_endproc',
    // Conditionals
    '%if', '%ifdef', '%ifndef', '%else', '%elif', '%endif',
    '%define', '%macro', '%endmacro', '%include', '%rep', '%endrep',
  ],
  typeKeywords: [
    // Section names
    '.text', '.data', '.bss', '.rodata',
  ],
  builtins: [
    // x86/x64 Instructions - Data Movement
    'mov', 'movzx', 'movsx', 'movsxd', 'movabs', 'lea', 'xchg',
    'push', 'pop', 'pusha', 'popa', 'pushf', 'popf', 'pushad', 'popad',
    'cmovz', 'cmovnz', 'cmovl', 'cmovg', 'cmovle', 'cmovge', 'cmova', 'cmovb',
    // Arithmetic
    'add', 'sub', 'mul', 'imul', 'div', 'idiv', 'inc', 'dec', 'neg',
    'adc', 'sbb', 'cmp', 'test',
    // Logical
    'and', 'or', 'xor', 'not', 'shl', 'shr', 'sal', 'sar', 'rol', 'ror',
    'rcl', 'rcr', 'shld', 'shrd',
    // Control Flow
    'jmp', 'je', 'jne', 'jz', 'jnz', 'js', 'jns', 'jo', 'jno',
    'jl', 'jle', 'jg', 'jge', 'jb', 'jbe', 'ja', 'jae', 'jc', 'jnc',
    'call', 'ret', 'retn', 'retf', 'enter', 'leave',
    'loop', 'loope', 'loopne', 'loopz', 'loopnz',
    'int', 'int3', 'into', 'iret', 'iretd', 'iretq', 'syscall', 'sysret',
    // String Operations
    'movs', 'movsb', 'movsw', 'movsd', 'movsq',
    'stos', 'stosb', 'stosw', 'stosd', 'stosq',
    'lods', 'lodsb', 'lodsw', 'lodsd', 'lodsq',
    'cmps', 'cmpsb', 'cmpsw', 'cmpsd', 'cmpsq',
    'scas', 'scasb', 'scasw', 'scasd', 'scasq',
    'rep', 'repe', 'repne', 'repz', 'repnz',
    // Bit Operations
    'bt', 'bts', 'btr', 'btc', 'bsf', 'bsr', 'bswap',
    'popcnt', 'lzcnt', 'tzcnt',
    // Set Operations
    'setz', 'setnz', 'sets', 'setns', 'seto', 'setno',
    'setl', 'setle', 'setg', 'setge', 'setb', 'setbe', 'seta', 'setae',
    // Misc
    'nop', 'hlt', 'wait', 'lock', 'cld', 'std', 'clc', 'stc', 'cmc',
    'cbw', 'cwde', 'cdqe', 'cwd', 'cdq', 'cqo',
    'xlat', 'xlatb', 'cpuid', 'rdtsc', 'rdtscp',
    // FPU
    'fld', 'fst', 'fstp', 'fild', 'fist', 'fistp',
    'fadd', 'fsub', 'fmul', 'fdiv', 'fabs', 'fchs', 'fsqrt',
    'fsin', 'fcos', 'fptan', 'fpatan', 'fyl2x', 'f2xm1',
    'fcom', 'fcomp', 'fcompp', 'fucom', 'fucomp', 'fucompp',
    'finit', 'fninit', 'fldcw', 'fstcw', 'fnstcw', 'fstsw', 'fnstsw',
    // SSE/AVX
    'movaps', 'movups', 'movapd', 'movupd', 'movdqa', 'movdqu',
    'addps', 'addpd', 'addss', 'addsd', 'subps', 'subpd', 'subss', 'subsd',
    'mulps', 'mulpd', 'mulss', 'mulsd', 'divps', 'divpd', 'divss', 'divsd',
    'sqrtps', 'sqrtpd', 'sqrtss', 'sqrtsd', 'rsqrtps', 'rsqrtss',
    'maxps', 'maxpd', 'maxss', 'maxsd', 'minps', 'minpd', 'minss', 'minsd',
    'cmpps', 'cmppd', 'cmpss', 'cmpsd', 'comiss', 'comisd', 'ucomiss', 'ucomisd',
    'andps', 'andpd', 'orps', 'orpd', 'xorps', 'xorpd', 'andnps', 'andnpd',
    'shufps', 'shufpd', 'unpckhps', 'unpcklps', 'unpckhpd', 'unpcklpd',
    'cvtsi2ss', 'cvtsi2sd', 'cvtss2si', 'cvtsd2si', 'cvtss2sd', 'cvtsd2ss',
    'pxor', 'por', 'pand', 'pandn', 'paddb', 'paddw', 'paddd', 'paddq',
  ],
  patterns: [
    // Registers - General Purpose
    { pattern: /\b(?:r(?:ax|bx|cx|dx|si|di|bp|sp|8|9|1[0-5])[dwb]?|e(?:ax|bx|cx|dx|si|di|bp|sp)|[abcd][hlx]|[sd]il?|[bs]pl?)\b/gi, type: 'variable' },
    // Registers - Segment
    { pattern: /\b(?:cs|ds|es|fs|gs|ss)\b/gi, type: 'variable' },
    // Registers - FPU
    { pattern: /\bst[0-7]?\b/gi, type: 'variable' },
    // Registers - SIMD
    { pattern: /\b(?:x|y|z)mm(?:1[0-5]|[0-9])\b/gi, type: 'variable' },
    { pattern: /\bmm[0-7]\b/gi, type: 'variable' },
    // Labels
    { pattern: /^[a-zA-Z_][a-zA-Z0-9_$]*:/gm, type: 'label' },
    { pattern: /\.[a-zA-Z_][a-zA-Z0-9_]*:/g, type: 'label' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F_]+\b/g, type: 'number' },
    { pattern: /\b0[bB][01_]+\b/g, type: 'number' },
    { pattern: /\b0[oO][0-7_]+\b/g, type: 'number' },
    { pattern: /\b[0-9][0-9a-fA-F]*[hH]\b/g, type: 'number' },
    { pattern: /\b[01]+[bB]\b/g, type: 'number' },
    { pattern: /\b[0-7]+[oOqQ]\b/g, type: 'number' },
    { pattern: /\b\d+\b/g, type: 'number' },
    // Memory references
    { pattern: /\[[^\]]+\]/g, type: 'variable' },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=:,]/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
    { start: '`', end: '`', escape: '\\' },
  ],
  comments: {
    line: ';',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default assembly;
