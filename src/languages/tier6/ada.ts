/**
 * Ada programming language definition
 */
import { defineLang } from '../define-lang.js';

export const ada = defineLang({
  name: 'ada',
  aliases: ['adb', 'ads'],
  extensions: ['.adb', '.ads', '.ada'],
  keywords: [
    'abort', 'abs', 'abstract', 'accept', 'access', 'aliased', 'all', 'and', 'array',
    'at', 'begin', 'body', 'case', 'constant', 'declare', 'delay', 'delta', 'digits',
    'do', 'else', 'elsif', 'end', 'entry', 'exception', 'exit', 'for', 'function',
    'generic', 'goto', 'if', 'in', 'interface', 'is', 'limited', 'loop', 'mod',
    'new', 'not', 'null', 'of', 'or', 'others', 'out', 'overriding', 'package',
    'pragma', 'private', 'procedure', 'protected', 'raise', 'range', 'record',
    'rem', 'renames', 'requeue', 'return', 'reverse', 'select', 'separate', 'some',
    'subtype', 'synchronized', 'tagged', 'task', 'terminate', 'then', 'type',
    'until', 'use', 'when', 'while', 'with', 'xor',
  ],
  typeKeywords: [
    'Boolean', 'Integer', 'Natural', 'Positive', 'Float', 'Long_Float', 'Short_Float',
    'Character', 'Wide_Character', 'Wide_Wide_Character', 'String', 'Wide_String',
    'Wide_Wide_String', 'Duration', 'Address', 'Storage_Offset', 'Storage_Count',
    'Storage_Element', 'Storage_Array',
  ],
  constants: [
    'True', 'False', 'null',
  ],
  builtins: [
    // Attributes
    'Access', 'Address', 'Adjacent', 'Aft', 'Alignment', 'Base', 'Bit_Order',
    'Body_Version', 'Callable', 'Caller', 'Ceiling', 'Class', 'Component_Size',
    'Compose', 'Constrained', 'Copy_Sign', 'Count', 'Definite', 'Delta', 'Denorm',
    'Digits', 'Exponent', 'External_Tag', 'First', 'First_Bit', 'Floor', 'Fore',
    'Fraction', 'Has_Same_Storage', 'Identity', 'Image', 'Input', 'Last', 'Last_Bit',
    'Leading_Part', 'Length', 'Machine', 'Machine_Emax', 'Machine_Emin',
    'Machine_Mantissa', 'Machine_Overflows', 'Machine_Radix', 'Machine_Rounding',
    'Machine_Rounds', 'Max', 'Max_Alignment_For_Allocation', 'Max_Size_In_Storage_Elements',
    'Min', 'Mod', 'Model', 'Model_Emin', 'Model_Epsilon', 'Model_Mantissa', 'Model_Small',
    'Modulus', 'Output', 'Overlaps_Storage', 'Partition_Id', 'Pos', 'Position', 'Pred',
    'Priority', 'Range', 'Read', 'Remainder', 'Round', 'Rounding', 'Safe_First', 'Safe_Last',
    'Scale', 'Scaling', 'Signed_Zeros', 'Size', 'Small', 'Storage_Pool', 'Storage_Size',
    'Stream_Size', 'Succ', 'Tag', 'Terminated', 'Truncation', 'Unbiased_Rounding',
    'Unchecked_Access', 'Val', 'Valid', 'Value', 'Version', 'Wide_Image', 'Wide_Value',
    'Wide_Wide_Image', 'Wide_Wide_Value', 'Wide_Wide_Width', 'Wide_Width', 'Width', 'Write',
    // Standard packages
    'Ada', 'Text_IO', 'Integer_IO', 'Float_IO', 'Enumeration_IO', 'Modular_IO', 'Fixed_IO',
    'Decimal_IO', 'Get', 'Put', 'Put_Line', 'Get_Line', 'New_Line', 'Skip_Line',
    'Set_Input', 'Set_Output', 'Standard_Input', 'Standard_Output', 'Standard_Error',
    'Open', 'Create', 'Close', 'Delete', 'Reset', 'End_Of_File', 'End_Of_Line',
    'Numerics', 'Elementary_Functions', 'Random', 'Strings', 'Characters', 'Handling',
    'Command_Line', 'Argument_Count', 'Argument', 'Command_Name',
    'Calendar', 'Clock', 'Year', 'Month', 'Day', 'Seconds', 'Time_Of', 'Split',
    'Exceptions', 'Exception_Name', 'Exception_Message', 'Exception_Information',
    'Raise_Exception', 'Save_Occurrence', 'Reraise_Occurrence',
  ],
  patterns: [
    // Attributes
    { pattern: /'[A-Za-z_][A-Za-z0-9_]*/g, type: 'attribute' },
    // Character literals
    { pattern: /'(?:[^'\\]|\\.)'/g, type: 'string' },
    // Based numbers
    { pattern: /\b\d+#[0-9a-fA-F_]+(?:\.[0-9a-fA-F_]+)?#(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Decimal numbers
    { pattern: /\b\d[0-9_]*(?:\.\d[0-9_]*)?(?:[eE][+-]?\d[0-9_]*)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/<>=&|]+|:=|\.\./g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '"' },
  ],
  comments: {
    line: '--',
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '[', close: ']' },
  ],
});

export default ada;
