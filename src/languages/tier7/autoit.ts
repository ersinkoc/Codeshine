/**
 * AutoIt language definition
 */
import { defineLang } from '../define-lang.js';

export const autoit = defineLang({
  name: 'autoit',
  aliases: ['au3'],
  extensions: ['.au3'],
  keywords: [
    // Control flow
    'If', 'Then', 'Else', 'ElseIf', 'EndIf', 'Select', 'Case', 'EndSelect',
    'Switch', 'EndSwitch', 'For', 'To', 'Step', 'Next', 'While', 'WEnd',
    'Do', 'Until', 'With', 'EndWith', 'ContinueLoop', 'ContinueCase',
    'ExitLoop', 'Exit', 'Return',
    // Declarations
    'Func', 'EndFunc', 'Local', 'Global', 'Dim', 'ReDim', 'Const', 'Static',
    'Enum', 'ByRef', 'Default',
    // Logic
    'And', 'Or', 'Not', 'True', 'False', 'Null',
    // Directives
    '#include', '#include-once', '#NoTrayIcon', '#RequireAdmin', '#OnAutoItStartRegister',
    '#pragma', '#cs', '#ce', '#comments-start', '#comments-end', '#Region', '#EndRegion',
    '#forceref', '#ignorefunc',
  ],
  builtins: [
    // Window functions
    'WinActivate', 'WinActive', 'WinClose', 'WinExists', 'WinFlash', 'WinGetCaretPos',
    'WinGetClassList', 'WinGetClientSize', 'WinGetHandle', 'WinGetPos', 'WinGetProcess',
    'WinGetState', 'WinGetText', 'WinGetTitle', 'WinKill', 'WinList', 'WinMenuSelectItem',
    'WinMinimizeAll', 'WinMinimizeAllUndo', 'WinMove', 'WinSetOnTop', 'WinSetState',
    'WinSetTitle', 'WinSetTrans', 'WinWait', 'WinWaitActive', 'WinWaitClose',
    'WinWaitNotActive',
    // Control functions
    'ControlClick', 'ControlCommand', 'ControlDisable', 'ControlEnable', 'ControlFocus',
    'ControlGetFocus', 'ControlGetHandle', 'ControlGetPos', 'ControlGetText',
    'ControlHide', 'ControlListView', 'ControlMove', 'ControlSend', 'ControlSetText',
    'ControlShow', 'ControlTreeView',
    // Mouse/Keyboard
    'MouseClick', 'MouseClickDrag', 'MouseDown', 'MouseGetCursor', 'MouseGetPos',
    'MouseMove', 'MouseUp', 'MouseWheel', 'Send', 'SendKeepActive',
    // String functions
    'String', 'StringAddCR', 'StringCompare', 'StringFormat', 'StringFromASCIIArray',
    'StringInStr', 'StringIsAlNum', 'StringIsAlpha', 'StringIsASCII', 'StringIsDigit',
    'StringIsFloat', 'StringIsInt', 'StringIsLower', 'StringIsSpace', 'StringIsUpper',
    'StringIsXDigit', 'StringLeft', 'StringLen', 'StringLower', 'StringMid',
    'StringRegExp', 'StringRegExpReplace', 'StringReplace', 'StringReverse',
    'StringRight', 'StringSplit', 'StringStripCR', 'StringStripWS', 'StringToASCIIArray',
    'StringToBinary', 'StringTrimLeft', 'StringTrimRight', 'StringUpper',
    // Array functions
    'UBound', '_ArrayAdd', '_ArrayBinarySearch', '_ArrayCombinations', '_ArrayConcatenate',
    '_ArrayDelete', '_ArrayDisplay', '_ArrayExtract', '_ArrayFindAll', '_ArrayInsert',
    '_ArrayMax', '_ArrayMaxIndex', '_ArrayMin', '_ArrayMinIndex', '_ArrayPermute',
    '_ArrayPop', '_ArrayPush', '_ArrayReverse', '_ArraySearch', '_ArrayShuffle',
    '_ArraySort', '_ArraySwap', '_ArrayToClip', '_ArrayToString', '_ArrayTranspose',
    '_ArrayTrim', '_ArrayUnique',
    // File functions
    'DirCopy', 'DirCreate', 'DirGetSize', 'DirMove', 'DirRemove', 'DriveGetDrive',
    'DriveGetFileSystem', 'DriveGetLabel', 'DriveGetSerial', 'DriveGetType',
    'DriveMapAdd', 'DriveMapDel', 'DriveMapGet', 'DriveSetLabel', 'DriveSpaceFree',
    'DriveSpaceTotal', 'DriveStatus', 'FileChangeDir', 'FileClose', 'FileCopy',
    'FileCreateNTFSLink', 'FileCreateShortcut', 'FileDelete', 'FileExists',
    'FileFindFirstFile', 'FileFindNextFile', 'FileFlush', 'FileGetAttrib',
    'FileGetEncoding', 'FileGetLongName', 'FileGetPos', 'FileGetShortcut',
    'FileGetShortName', 'FileGetSize', 'FileGetTime', 'FileGetVersion', 'FileInstall',
    'FileMove', 'FileOpen', 'FileOpenDialog', 'FileRead', 'FileReadLine',
    'FileReadToArray', 'FileRecycle', 'FileRecycleEmpty', 'FileSaveDialog',
    'FileSelectFolder', 'FileSetAttrib', 'FileSetEnd', 'FileSetPos', 'FileSetTime',
    'FileWrite', 'FileWriteLine', 'IniDelete', 'IniRead', 'IniReadSection',
    'IniReadSectionNames', 'IniRenameSection', 'IniWrite', 'IniWriteSection',
    // Math functions
    'Abs', 'ACos', 'ASin', 'ATan', 'BitAND', 'BitNOT', 'BitOR', 'BitRotate',
    'BitShift', 'BitXOR', 'Ceiling', 'Cos', 'Exp', 'Floor', 'Log', 'Mod',
    'Random', 'Round', 'Sin', 'Sqrt', 'Tan',
    // GUI functions
    'GUICreate', 'GUICtrlCreateButton', 'GUICtrlCreateCheckbox', 'GUICtrlCreateCombo',
    'GUICtrlCreateContextMenu', 'GUICtrlCreateDate', 'GUICtrlCreateDummy',
    'GUICtrlCreateEdit', 'GUICtrlCreateGraphic', 'GUICtrlCreateGroup',
    'GUICtrlCreateIcon', 'GUICtrlCreateInput', 'GUICtrlCreateLabel',
    'GUICtrlCreateList', 'GUICtrlCreateListView', 'GUICtrlCreateListViewItem',
    'GUICtrlCreateMenu', 'GUICtrlCreateMenuItem', 'GUICtrlCreateMonthCal',
    'GUICtrlCreateObj', 'GUICtrlCreatePic', 'GUICtrlCreateProgress',
    'GUICtrlCreateRadio', 'GUICtrlCreateSlider', 'GUICtrlCreateTab',
    'GUICtrlCreateTabItem', 'GUICtrlCreateTreeView', 'GUICtrlCreateTreeViewItem',
    'GUICtrlCreateUpdown', 'GUICtrlDelete', 'GUICtrlGetHandle', 'GUICtrlGetState',
    'GUICtrlRead', 'GUICtrlRecvMsg', 'GUICtrlRegisterListViewSort', 'GUICtrlSendMsg',
    'GUICtrlSendToDummy', 'GUICtrlSetBkColor', 'GUICtrlSetColor', 'GUICtrlSetCursor',
    'GUICtrlSetData', 'GUICtrlSetDefBkColor', 'GUICtrlSetDefColor', 'GUICtrlSetFont',
    'GUICtrlSetGraphic', 'GUICtrlSetImage', 'GUICtrlSetLimit', 'GUICtrlSetOnEvent',
    'GUICtrlSetPos', 'GUICtrlSetResizing', 'GUICtrlSetState', 'GUICtrlSetStyle',
    'GUICtrlSetTip', 'GUIDelete', 'GUIGetCursorInfo', 'GUIGetMsg', 'GUIGetStyle',
    'GUIRegisterMsg', 'GUISetAccelerators', 'GUISetBkColor', 'GUISetCoord',
    'GUISetCursor', 'GUISetFont', 'GUISetHelp', 'GUISetIcon', 'GUISetOnEvent',
    'GUISetState', 'GUISetStyle', 'GUIStartGroup', 'GUISwitch',
    // System functions
    'AutoItSetOption', 'AutoItWinGetTitle', 'AutoItWinSetTitle', 'ClipGet', 'ClipPut',
    'ConsoleRead', 'ConsoleWrite', 'ConsoleWriteError', 'DllCall', 'DllCallAddress',
    'DllCallbackFree', 'DllCallbackGetPtr', 'DllCallbackRegister', 'DllClose',
    'DllOpen', 'DllStructCreate', 'DllStructGetData', 'DllStructGetPtr',
    'DllStructGetSize', 'DllStructSetData', 'EnvGet', 'EnvSet', 'EnvUpdate',
    'Execute', 'Eval', 'IsAdmin', 'MsgBox', 'ProcessClose', 'ProcessExists',
    'ProcessList', 'ProcessSetPriority', 'ProcessWait', 'ProcessWaitClose',
    'RegDelete', 'RegEnumKey', 'RegEnumVal', 'RegRead', 'RegWrite', 'Run',
    'RunAs', 'RunAsWait', 'RunWait', 'ShellExecute', 'ShellExecuteWait',
    'Shutdown', 'Sleep', 'SoundPlay', 'SoundSetWaveVolume', 'TrayCreateItem',
    'TrayCreateMenu', 'TrayGetMsg', 'TrayItemDelete', 'TrayItemGetHandle',
    'TrayItemGetState', 'TrayItemGetText', 'TrayItemSetOnEvent', 'TrayItemSetState',
    'TrayItemSetText', 'TraySetClick', 'TraySetIcon', 'TraySetOnEvent',
    'TraySetPauseIcon', 'TraySetState', 'TraySetToolTip', 'TrayTip',
    // Misc
    'Assign', 'Beep', 'Call', 'Chr', 'Asc', 'Number', 'Int', 'Hex', 'Binary',
    'BinaryLen', 'BinaryMid', 'BinaryToString', 'InputBox', 'IsBinary', 'IsBool',
    'IsDeclared', 'IsFloat', 'IsFunc', 'IsHWnd', 'IsInt', 'IsKeyword', 'IsMap',
    'IsNumber', 'IsObj', 'IsPtr', 'IsString', 'ObjCreate', 'ObjCreateInterface',
    'ObjEvent', 'ObjGet', 'ObjName', 'SetError', 'SetExtended', 'SplashImageOn',
    'SplashOff', 'SplashTextOn', 'StatusbarGetText', 'TimerDiff', 'TimerInit',
    'ToolTip', 'VarGetType',
  ],
  patterns: [
    // Macros
    { pattern: /@[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Variables
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Numbers
    { pattern: /\b0x[0-9a-fA-F]+\b/g, type: 'number' },
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/^<>=&]+|<>|<=|>=|==|<>/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '""' },
    { start: "'", end: "'", escape: "''" },
  ],
  comments: {
    line: ';',
    block: { start: '#cs', end: '#ce' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '[', close: ']' },
  ],
});

export default autoit;
