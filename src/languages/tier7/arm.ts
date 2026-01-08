/**
 * ARM Assembly language definition
 */
import { defineLang } from '../define-lang.js';

export const arm = defineLang({
  name: 'arm',
  aliases: ['armasm', 'arm-asm', 'aarch64'],
  extensions: ['.s', '.S', '.asm'],
  keywords: [
    // ARM directives
    'AREA', 'CODE', 'DATA', 'READONLY', 'READWRITE', 'ALIGN', 'ENTRY', 'END',
    'EXPORT', 'GLOBAL', 'IMPORT', 'EXTERN', 'PROC', 'ENDP', 'FUNCTION', 'ENDFUNC',
    'MACRO', 'MEND', 'MEXIT', 'IF', 'ELSE', 'ENDIF', 'WHILE', 'WEND',
    'EQU', 'SET', 'SETA', 'SETL', 'SETS', 'DCB', 'DCW', 'DCD', 'DCQ',
    'DCFS', 'DCFD', 'SPACE', 'FILL', 'LTORG', 'PRESERVE8', 'REQUIRE8',
    'THUMB', 'ARM', 'CODE16', 'CODE32',
    // GNU assembler directives
    '.text', '.data', '.bss', '.section', '.global', '.globl', '.extern',
    '.align', '.balign', '.p2align', '.byte', '.hword', '.word', '.quad',
    '.float', '.double', '.ascii', '.asciz', '.string', '.space', '.skip',
    '.zero', '.fill', '.org', '.equ', '.set', '.type', '.size', '.thumb',
    '.arm', '.syntax', '.unified', '.code', '.arch', '.cpu', '.fpu',
    '.if', '.else', '.elseif', '.endif', '.ifdef', '.ifndef', '.macro',
    '.endm', '.exitm', '.rept', '.endr', '.irp', '.irpc', '.include',
    '.incbin', '.comm', '.lcomm', '.weak', '.hidden', '.protected',
  ],
  builtins: [
    // Data processing instructions
    'MOV', 'MVN', 'ADD', 'ADC', 'SUB', 'SBC', 'RSB', 'RSC',
    'AND', 'ORR', 'EOR', 'BIC', 'ORN', 'TST', 'TEQ', 'CMP', 'CMN',
    'LSL', 'LSR', 'ASR', 'ROR', 'RRX',
    // Multiply instructions
    'MUL', 'MLA', 'MLS', 'UMULL', 'UMLAL', 'SMULL', 'SMLAL',
    'UMAAL', 'SMUAD', 'SMUSD', 'SMLAD', 'SMLSD', 'SDIV', 'UDIV',
    // Load/Store instructions
    'LDR', 'LDRB', 'LDRH', 'LDRSB', 'LDRSH', 'LDRD', 'LDREX', 'LDREXB', 'LDREXH',
    'STR', 'STRB', 'STRH', 'STRD', 'STREX', 'STREXB', 'STREXH',
    'LDM', 'LDMIA', 'LDMIB', 'LDMDA', 'LDMDB', 'LDMFD', 'LDMFA', 'LDMED', 'LDMEA',
    'STM', 'STMIA', 'STMIB', 'STMDA', 'STMDB', 'STMFD', 'STMFA', 'STMED', 'STMEA',
    'PUSH', 'POP', 'SWP', 'SWPB',
    // Branch instructions
    'B', 'BL', 'BX', 'BLX', 'BXJ', 'CBZ', 'CBNZ', 'TBB', 'TBH',
    // Status register access
    'MRS', 'MSR', 'CPS', 'CPSIE', 'CPSID', 'SETEND',
    // Hints
    'NOP', 'SEV', 'WFE', 'WFI', 'YIELD', 'DBG', 'PLD', 'PLDW', 'PLI',
    // Barriers
    'DMB', 'DSB', 'ISB', 'CLREX',
    // Coprocessor
    'CDP', 'LDC', 'STC', 'MCR', 'MRC', 'MCRR', 'MRRC', 'CDP2', 'LDC2', 'STC2', 'MCR2', 'MRC2',
    // SIMD/NEON
    'VABS', 'VADD', 'VSUB', 'VMUL', 'VMLA', 'VMLS', 'VMOV', 'VMVN',
    'VAND', 'VORR', 'VEOR', 'VBIC', 'VORN', 'VCMP', 'VCMPE',
    'VCVT', 'VDIV', 'VDUP', 'VEXT', 'VLD1', 'VLD2', 'VLD3', 'VLD4',
    'VST1', 'VST2', 'VST3', 'VST4', 'VLDR', 'VSTR', 'VLDM', 'VSTM',
    'VPUSH', 'VPOP', 'VNEG', 'VNMUL', 'VNMLA', 'VNMLS', 'VSQRT',
    // Thumb-2
    'IT', 'ITE', 'ITT', 'ITEE', 'ITTE', 'ITET', 'ITTTE', 'ITTEE',
    // AArch64 specific
    'ADRP', 'CSEL', 'CSET', 'CSINC', 'CSINV', 'CSNEG', 'MADD', 'MSUB',
    'SMADDL', 'SMSUBL', 'SMULH', 'UMADDL', 'UMSUBL', 'UMULH',
    'STP', 'LDP', 'STUR', 'LDUR', 'PRFM', 'PRFUM', 'CAS', 'CASA', 'CASAL', 'CASL',
    'RET', 'ERET', 'BRK', 'HLT', 'SVC', 'HVC', 'SMC',
  ],
  constants: [
    // Condition codes
    'EQ', 'NE', 'CS', 'HS', 'CC', 'LO', 'MI', 'PL', 'VS', 'VC',
    'HI', 'LS', 'GE', 'LT', 'GT', 'LE', 'AL', 'NV',
    // Shift types
    'LSL', 'LSR', 'ASR', 'ROR', 'RRX',
  ],
  patterns: [
    // Labels
    { pattern: /^[a-zA-Z_][a-zA-Z0-9_]*:/gm, type: 'label' },
    // Local labels
    { pattern: /^\d+:/gm, type: 'label' },
    { pattern: /\b\d+[bf]\b/g, type: 'label' },
    // Registers
    { pattern: /\b(?:r0|r1|r2|r3|r4|r5|r6|r7|r8|r9|r10|r11|r12|r13|r14|r15)\b/gi, type: 'variable' },
    { pattern: /\b(?:sp|lr|pc|fp|ip|sl|sb)\b/gi, type: 'variable' },
    { pattern: /\b(?:x0|x1|x2|x3|x4|x5|x6|x7|x8|x9|x10|x11|x12|x13|x14|x15|x16|x17|x18|x19|x20|x21|x22|x23|x24|x25|x26|x27|x28|x29|x30)\b/gi, type: 'variable' },
    { pattern: /\b(?:w0|w1|w2|w3|w4|w5|w6|w7|w8|w9|w10|w11|w12|w13|w14|w15|w16|w17|w18|w19|w20|w21|w22|w23|w24|w25|w26|w27|w28|w29|w30)\b/gi, type: 'variable' },
    { pattern: /\b(?:xzr|wzr|sp|wsp|lr|elr_el1|elr_el2|elr_el3)\b/gi, type: 'variable' },
    { pattern: /\b(?:cpsr|spsr|apsr|fpscr|fpsid|fpexc)\b/gi, type: 'variable' },
    { pattern: /\b[sdqvh]\d{1,2}\b/gi, type: 'variable' },
    // Immediate values
    { pattern: /#[+-]?(?:0x[0-9a-fA-F]+|0b[01]+|\d+)/g, type: 'number' },
    { pattern: /=0x[0-9a-fA-F]+|=\d+/g, type: 'number' },
    // Hex numbers
    { pattern: /\b0x[0-9a-fA-F]+\b/g, type: 'number' },
    // Binary numbers
    { pattern: /\b0b[01]+\b/g, type: 'number' },
    // Decimal numbers
    { pattern: /\b\d+\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%!<>=&|^~,#]+/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    line: '@',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
  ],
});

export default arm;
