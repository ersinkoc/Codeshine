/**
 * NASM (Netwide Assembler) language definition
 */
import { defineLang } from '../define-lang.js';

export const nasm = defineLang({
  name: 'nasm',
  aliases: ['nasmx86', 'x86asm'],
  extensions: ['.asm', '.nasm', '.inc'],
  keywords: [
    // Directives
    'section', 'segment', 'global', 'extern', 'common', 'bits', 'use16', 'use32',
    'use64', 'default', 'absolute', 'cpu', 'float', 'org', 'align', 'alignb',
    'sectalign', 'struc', 'endstruc', 'istruc', 'iend', 'at', 'times', 'incbin',
    '%include', '%define', '%undef', '%assign', '%macro', '%endmacro', '%unmacro',
    '%if', '%ifdef', '%ifndef', '%elif', '%elifdef', '%elifndef', '%else', '%endif',
    '%rep', '%endrep', '%error', '%warning', '%fatal', '%push', '%pop', '%repl',
    '%arg', '%local', '%stacksize', '%line', '%pragma', '%comment', '%endcomment',
    // Data definitions
    'db', 'dw', 'dd', 'dq', 'dt', 'do', 'dy', 'dz', 'resb', 'resw', 'resd',
    'resq', 'rest', 'reso', 'resy', 'resz', 'equ',
    // Prefix instructions
    'lock', 'rep', 'repe', 'repz', 'repne', 'repnz',
  ],
  builtins: [
    // x86 Instructions
    'aaa', 'aad', 'aam', 'aas', 'adc', 'add', 'and', 'call', 'cbw', 'cdq', 'cdqe',
    'clc', 'cld', 'cli', 'cmc', 'cmp', 'cmps', 'cmpsb', 'cmpsd', 'cmpsq', 'cmpsw',
    'cmpxchg', 'cmpxchg8b', 'cmpxchg16b', 'cpuid', 'cqo', 'cwd', 'cwde', 'daa',
    'das', 'dec', 'div', 'enter', 'hlt', 'idiv', 'imul', 'in', 'inc', 'ins',
    'insb', 'insd', 'insw', 'int', 'into', 'iret', 'iretd', 'iretq', 'ja', 'jae',
    'jb', 'jbe', 'jc', 'jcxz', 'jecxz', 'jrcxz', 'je', 'jg', 'jge', 'jl', 'jle',
    'jmp', 'jna', 'jnae', 'jnb', 'jnbe', 'jnc', 'jne', 'jng', 'jnge', 'jnl',
    'jnle', 'jno', 'jnp', 'jns', 'jnz', 'jo', 'jp', 'jpe', 'jpo', 'js', 'jz',
    'lahf', 'lar', 'lds', 'lea', 'leave', 'les', 'lfs', 'lgdt', 'lgs', 'lidt',
    'lldt', 'lmsw', 'lods', 'lodsb', 'lodsd', 'lodsq', 'lodsw', 'loop', 'loope',
    'loopne', 'loopnz', 'loopz', 'lsl', 'lss', 'ltr', 'mov', 'movs', 'movsb',
    'movsd', 'movsq', 'movsw', 'movsx', 'movsxd', 'movzx', 'mul', 'neg', 'nop',
    'not', 'or', 'out', 'outs', 'outsb', 'outsd', 'outsw', 'pop', 'popa', 'popad',
    'popf', 'popfd', 'popfq', 'push', 'pusha', 'pushad', 'pushf', 'pushfd',
    'pushfq', 'rcl', 'rcr', 'rdmsr', 'rdpmc', 'rdtsc', 'rdtscp', 'ret', 'retf',
    'retn', 'rol', 'ror', 'rsm', 'sahf', 'sal', 'sar', 'sbb', 'scas', 'scasb',
    'scasd', 'scasq', 'scasw', 'seta', 'setae', 'setb', 'setbe', 'setc', 'sete',
    'setg', 'setge', 'setl', 'setle', 'setna', 'setnae', 'setnb', 'setnbe',
    'setnc', 'setne', 'setng', 'setnge', 'setnl', 'setnle', 'setno', 'setnp',
    'setns', 'setnz', 'seto', 'setp', 'setpe', 'setpo', 'sets', 'setz', 'sgdt',
    'shl', 'shld', 'shr', 'shrd', 'sidt', 'sldt', 'smsw', 'stc', 'std', 'sti',
    'stos', 'stosb', 'stosd', 'stosq', 'stosw', 'str', 'sub', 'syscall',
    'sysenter', 'sysexit', 'sysret', 'test', 'ud2', 'verr', 'verw', 'wait',
    'wbinvd', 'wrmsr', 'xadd', 'xchg', 'xlat', 'xlatb', 'xor',
    // FPU instructions
    'f2xm1', 'fabs', 'fadd', 'faddp', 'fbld', 'fbstp', 'fchs', 'fclex', 'fcmovb',
    'fcmovbe', 'fcmove', 'fcmovnb', 'fcmovnbe', 'fcmovne', 'fcmovnu', 'fcmovu',
    'fcom', 'fcomi', 'fcomip', 'fcomp', 'fcompp', 'fcos', 'fdecstp', 'fdiv',
    'fdivp', 'fdivr', 'fdivrp', 'ffree', 'fiadd', 'ficom', 'ficomp', 'fidiv',
    'fidivr', 'fild', 'fimul', 'fincstp', 'finit', 'fist', 'fistp', 'fisttp',
    'fisub', 'fisubr', 'fld', 'fld1', 'fldcw', 'fldenv', 'fldl2e', 'fldl2t',
    'fldlg2', 'fldln2', 'fldpi', 'fldz', 'fmul', 'fmulp', 'fnclex', 'fninit',
    'fnop', 'fnsave', 'fnstcw', 'fnstenv', 'fnstsw', 'fpatan', 'fprem', 'fprem1',
    'fptan', 'frndint', 'frstor', 'fsave', 'fscale', 'fsin', 'fsincos', 'fsqrt',
    'fst', 'fstcw', 'fstenv', 'fstp', 'fstsw', 'fsub', 'fsubp', 'fsubr', 'fsubrp',
    'ftst', 'fucom', 'fucomi', 'fucomip', 'fucomp', 'fucompp', 'fwait', 'fxam',
    'fxch', 'fxrstor', 'fxsave', 'fxtract', 'fyl2x', 'fyl2xp1',
    // SSE/AVX instructions
    'addps', 'addss', 'addpd', 'addsd', 'andps', 'andpd', 'andnps', 'andnpd',
    'cmpps', 'cmppd', 'cmpss', 'cmpsd', 'comiss', 'comisd', 'cvtdq2pd', 'cvtdq2ps',
    'cvtpd2dq', 'cvtpd2pi', 'cvtpd2ps', 'cvtpi2pd', 'cvtpi2ps', 'cvtps2dq',
    'cvtps2pd', 'cvtps2pi', 'cvtsd2si', 'cvtsd2ss', 'cvtsi2sd', 'cvtsi2ss',
    'cvtss2sd', 'cvtss2si', 'cvttpd2dq', 'cvttpd2pi', 'cvttps2dq', 'cvttps2pi',
    'cvttsd2si', 'cvttss2si', 'divps', 'divpd', 'divss', 'divsd', 'maxps',
    'maxpd', 'maxss', 'maxsd', 'minps', 'minpd', 'minss', 'minsd', 'movaps',
    'movapd', 'movd', 'movdqa', 'movdqu', 'movhlps', 'movhpd', 'movhps', 'movlhps',
    'movlpd', 'movlps', 'movmskpd', 'movmskps', 'movntdq', 'movntpd', 'movntps',
    'movntq', 'movq', 'movss', 'movsd', 'movups', 'movupd', 'mulps', 'mulpd',
    'mulss', 'mulsd', 'orps', 'orpd', 'packssdw', 'packsswb', 'packuswb', 'paddb',
    'paddd', 'paddq', 'paddsb', 'paddsw', 'paddusb', 'paddusw', 'paddw', 'pand',
    'pandn', 'pavgb', 'pavgw', 'pcmpeqb', 'pcmpeqd', 'pcmpeqw', 'pcmpgtb',
    'pcmpgtd', 'pcmpgtw', 'pmaddwd', 'pmaxsw', 'pmaxub', 'pminsw', 'pminub',
    'pmovmskb', 'pmulhuw', 'pmulhw', 'pmullw', 'pmuludq', 'por', 'psadbw', 'pshufd',
    'pshufhw', 'pshuflw', 'pshufw', 'pslld', 'pslldq', 'psllq', 'psllw', 'psrad',
    'psraw', 'psrld', 'psrldq', 'psrlq', 'psrlw', 'psubb', 'psubd', 'psubq',
    'psubsb', 'psubsw', 'psubusb', 'psubusw', 'psubw', 'punpckhbw', 'punpckhdq',
    'punpckhqdq', 'punpckhwd', 'punpcklbw', 'punpckldq', 'punpcklqdq', 'punpcklwd',
    'pxor', 'rcpps', 'rcpss', 'rsqrtps', 'rsqrtss', 'shufpd', 'shufps', 'sqrtpd',
    'sqrtps', 'sqrtsd', 'sqrtss', 'subpd', 'subps', 'subsd', 'subss', 'ucomiss',
    'ucomisd', 'unpckhpd', 'unpckhps', 'unpcklpd', 'unpcklps', 'xorpd', 'xorps',
  ],
  patterns: [
    // Labels
    { pattern: /^[a-zA-Z_.?][a-zA-Z0-9_$#@~.?]*:/gm, type: 'label' },
    { pattern: /^\.[a-zA-Z_][a-zA-Z0-9_]*:/gm, type: 'label' },
    // Registers
    { pattern: /\b(?:eax|ebx|ecx|edx|esi|edi|ebp|esp|ax|bx|cx|dx|si|di|bp|sp|al|ah|bl|bh|cl|ch|dl|dh|rax|rbx|rcx|rdx|rsi|rdi|rbp|rsp|r8|r9|r10|r11|r12|r13|r14|r15|r8d|r9d|r10d|r11d|r12d|r13d|r14d|r15d|r8w|r9w|r10w|r11w|r12w|r13w|r14w|r15w|r8b|r9b|r10b|r11b|r12b|r13b|r14b|r15b|cs|ds|es|fs|gs|ss|cr0|cr2|cr3|cr4|dr0|dr1|dr2|dr3|dr6|dr7|st0|st1|st2|st3|st4|st5|st6|st7|mm0|mm1|mm2|mm3|mm4|mm5|mm6|mm7|xmm0|xmm1|xmm2|xmm3|xmm4|xmm5|xmm6|xmm7|xmm8|xmm9|xmm10|xmm11|xmm12|xmm13|xmm14|xmm15|ymm0|ymm1|ymm2|ymm3|ymm4|ymm5|ymm6|ymm7|ymm8|ymm9|ymm10|ymm11|ymm12|ymm13|ymm14|ymm15)\b/gi, type: 'variable' },
    // Size specifiers
    { pattern: /\b(?:byte|word|dword|qword|tword|oword|yword|zword|ptr)\b/gi, type: 'keyword' },
    // Hex numbers
    { pattern: /\b0[xh][0-9a-fA-F]+\b/g, type: 'number' },
    { pattern: /\b[0-9][0-9a-fA-F]*h\b/gi, type: 'number' },
    // Binary numbers
    { pattern: /\b0[by][01]+\b/g, type: 'number' },
    { pattern: /\b[01]+b\b/gi, type: 'number' },
    // Octal numbers
    { pattern: /\b0[oq][0-7]+\b/g, type: 'number' },
    { pattern: /\b[0-7]+[oq]\b/gi, type: 'number' },
    // Decimal numbers
    { pattern: /\b[0-9]+d?\b/gi, type: 'number' },
    // Special characters
    { pattern: /[$?@~.]/g, type: 'operator' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|^~:]+|<<|>>/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
    { start: '`', end: '`', escape: '\\' },
  ],
  comments: {
    line: ';',
    block: { start: '%comment', end: '%endcomment' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
  ],
});

export default nasm;
