/**
 * AutoHotkey language definition
 */
import { defineLang } from '../define-lang.js';

export const autohotkey = defineLang({
  name: 'autohotkey',
  aliases: ['ahk'],
  extensions: ['.ahk', '.ahkl'],
  keywords: [
    // Control flow
    'if', 'else', 'switch', 'case', 'default', 'loop', 'while', 'for', 'until',
    'break', 'continue', 'return', 'goto', 'gosub', 'try', 'catch', 'finally',
    'throw',
    // Declarations
    'global', 'local', 'static', 'class', 'extends', 'new', 'this', 'super',
    'ByRef',
    // Boolean
    'true', 'false', 'and', 'or', 'not',
    // Directives
    '#If', '#IfWinActive', '#IfWinExist', '#IfWinNotActive', '#IfWinNotExist',
    '#Include', '#IncludeAgain', '#NoEnv', '#NoTrayIcon', '#Persistent',
    '#SingleInstance', '#UseHook', '#Warn', '#HotIf', '#Requires', '#DllLoad',
    '#ErrorStdOut', '#ClipboardTimeout', '#CommentFlag', '#Delimiter',
    '#DerefChar', '#EscapeChar', '#HotkeyInterval', '#HotkeyModifierTimeout',
    '#Hotstring', '#InputLevel', '#InstallKeybdHook', '#InstallMouseHook',
    '#KeyHistory', '#MaxHotkeysPerInterval', '#MaxMem', '#MaxThreads',
    '#MaxThreadsBuffer', '#MaxThreadsPerHotkey', '#MenuMaskKey', '#WinActivateForce',
  ],
  builtins: [
    // Window functions
    'WinExist', 'WinActive', 'WinWait', 'WinWaitActive', 'WinWaitNotActive',
    'WinWaitClose', 'WinActivate', 'WinActivateBottom', 'WinClose', 'WinKill',
    'WinMinimize', 'WinMaximize', 'WinRestore', 'WinHide', 'WinShow', 'WinMove',
    'WinMoveBottom', 'WinMoveTop', 'WinGetPos', 'WinGetTitle', 'WinGetClass',
    'WinGetText', 'WinGetControls', 'WinGetControlsHwnd', 'WinGetCount',
    'WinGetID', 'WinGetIDLast', 'WinGetList', 'WinGetMinMax', 'WinGetPID',
    'WinGetProcessName', 'WinGetProcessPath', 'WinGetStyle', 'WinGetExStyle',
    'WinGetTransColor', 'WinGetTransparent', 'WinSet', 'WinSetTitle',
    'WinSetAlwaysOnTop', 'WinSetEnabled', 'WinSetRedraw', 'WinSetRegion',
    'WinSetStyle', 'WinSetExStyle', 'WinSetTransColor', 'WinSetTransparent',
    // Control functions
    'Control', 'ControlClick', 'ControlFocus', 'ControlGetFocus', 'ControlGetHwnd',
    'ControlGetPos', 'ControlGetText', 'ControlMove', 'ControlSend', 'ControlSendRaw',
    'ControlSetText', 'ControlShow', 'ControlHide',
    // Input/Output
    'Send', 'SendRaw', 'SendInput', 'SendPlay', 'SendEvent', 'SendMode',
    'Click', 'MouseClick', 'MouseClickDrag', 'MouseMove', 'MouseGetPos',
    'KeyWait', 'GetKeyState', 'GetKeyName', 'GetKeySC', 'GetKeyVK',
    'Input', 'InputBox', 'MsgBox', 'ToolTip', 'TrayTip', 'Menu', 'Gui',
    'GuiControl', 'GuiControlGet',
    // String functions
    'InStr', 'SubStr', 'StrLen', 'StrLower', 'StrUpper', 'StrTitle', 'StrGet',
    'StrPut', 'StrReplace', 'StrSplit', 'Trim', 'LTrim', 'RTrim', 'RegExMatch',
    'RegExReplace', 'Format', 'Sort', 'Chr', 'Ord',
    // Math functions
    'Abs', 'Ceil', 'Exp', 'Floor', 'Log', 'Ln', 'Max', 'Min', 'Mod', 'Round',
    'Sqrt', 'Sin', 'Cos', 'Tan', 'ASin', 'ACos', 'ATan', 'Random',
    // File functions
    'FileExist', 'FileAppend', 'FileCopy', 'FileCreateDir', 'FileDelete',
    'FileEncoding', 'FileGetAttrib', 'FileGetShortcut', 'FileGetSize',
    'FileGetTime', 'FileGetVersion', 'FileInstall', 'FileMove', 'FileOpen',
    'FileRead', 'FileReadLine', 'FileRecycle', 'FileRecycleEmpty',
    'FileRemoveDir', 'FileSelectFile', 'FileSelectFolder', 'FileSetAttrib',
    'FileSetTime', 'IniDelete', 'IniRead', 'IniWrite',
    // Object functions
    'Array', 'ComObjActive', 'ComObjArray', 'ComObjConnect', 'ComObjCreate',
    'ComObjFlags', 'ComObjGet', 'ComObjQuery', 'ComObjType', 'ComObjValue',
    'ComObject', 'Func', 'IsFunc', 'IsLabel', 'IsObject', 'Map', 'Object',
    'ObjAddRef', 'ObjRelease', 'ObjBindMethod', 'ObjGetCapacity', 'ObjSetCapacity',
    'ObjGetBase', 'ObjSetBase', 'ObjRawGet', 'ObjRawSet', 'ObjHasOwnProp',
    // System functions
    'A_AhkPath', 'A_AhkVersion', 'A_AppData', 'A_AppDataCommon', 'A_ComputerName',
    'A_Desktop', 'A_DesktopCommon', 'A_IsAdmin', 'A_OSVersion', 'A_ProgramFiles',
    'A_Programs', 'A_ProgramsCommon', 'A_ScreenDPI', 'A_ScreenHeight',
    'A_ScreenWidth', 'A_ScriptDir', 'A_ScriptFullPath', 'A_ScriptHwnd',
    'A_ScriptName', 'A_Space', 'A_StartMenu', 'A_StartMenuCommon', 'A_Startup',
    'A_StartupCommon', 'A_Tab', 'A_Temp', 'A_ThisFunc', 'A_ThisHotkey',
    'A_ThisLabel', 'A_UserName', 'A_WinDir', 'A_WorkingDir',
    // Date/Time
    'A_Now', 'A_NowUTC', 'A_DD', 'A_DDD', 'A_DDDD', 'A_Hour', 'A_MDay', 'A_Min',
    'A_MM', 'A_MMM', 'A_MMMM', 'A_Mon', 'A_MSec', 'A_Sec', 'A_TickCount',
    'A_WDay', 'A_YDay', 'A_Year', 'A_YWeek', 'A_YYYY', 'FormatTime', 'DateAdd',
    'DateDiff',
    // Misc
    'Clipboard', 'ClipboardAll', 'DllCall', 'EnvGet', 'EnvSet', 'Exit', 'ExitApp',
    'NumGet', 'NumPut', 'OnClipboardChange', 'OnError', 'OnExit', 'OnMessage',
    'OutputDebug', 'Pause', 'Reload', 'Run', 'RunAs', 'RunWait', 'SetCapsLockState',
    'SetNumLockState', 'SetScrollLockState', 'SetTimer', 'SetWorkingDir', 'Sleep',
    'SoundBeep', 'SoundGet', 'SoundSet', 'SplitPath', 'StatusBarGetText',
    'StatusBarWait', 'SysGet', 'Thread', 'VarSetStrCapacity', 'Type',
  ],
  patterns: [
    // Hotkeys
    { pattern: /^[!+^#<>*~$]+[\w]+::/gm, type: 'keyword' },
    { pattern: /^[\w]+::/gm, type: 'keyword' },
    // Hotstrings
    { pattern: /^:[\w*?]*:[^:]+::/gm, type: 'keyword' },
    // Labels
    { pattern: /^[a-zA-Z_][a-zA-Z0-9_]*:/gm, type: 'label' },
    // Built-in variables
    { pattern: /\bA_[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Escape sequences
    { pattern: /`[nrtbvaf`%;]/g, type: 'string' },
    // Numbers
    { pattern: /\b0x[0-9a-fA-F]+\b/g, type: 'number' },
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/\\<>=!&|^~.:]+|:=|&&|\|\||<<|>>|\?\?/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '`' },
    { start: "'", end: "'", escape: '' },
  ],
  comments: {
    line: ';',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
  ],
});

export default autohotkey;
