/**
 * Tier 7 Languages - Specialized and niche languages
 * Shell variants, database languages, query languages, config formats, etc.
 */

// Shell languages
export { fish } from './fish.js';
export { zsh } from './zsh.js';
export { tcsh } from './tcsh.js';
export { ksh } from './ksh.js';

// Text processing
export { tcl } from './tcl.js';
export { awk } from './awk.js';
export { sed } from './sed.js';

// Database languages
export { mongodb } from './mongodb.js';
export { redis } from './redis.js';
export { cassandra } from './cassandra.js';
export { sparql } from './sparql.js';
export { hiveql } from './hiveql.js';

// Query languages
export { xpath } from './xpath.js';
export { xquery } from './xquery.js';
export { jq } from './jq.js';

// Hardware description languages
export { vhdl } from './vhdl.js';
export { systemverilog } from './systemverilog.js';

// Assembly languages
export { arm } from './arm.js';
export { mips } from './mips.js';
export { nasm } from './nasm.js';

// Game development
export { gdscript } from './gdscript.js';
export { unrealscript } from './unrealscript.js';
export { angelscript } from './angelscript.js';

// CSS preprocessors
export { stylus } from './stylus.js';
export { sass } from './sass.js';
export { postcss } from './postcss.js';

// Config languages
export { jsonnet } from './jsonnet.js';
export { hcl } from './hcl.js';
export { cue } from './cue.js';
export { dhall } from './dhall.js';
export { hocon } from './hocon.js';

// Scientific/Statistical
export { sas } from './sas.js';
export { stata } from './stata.js';
export { maxima } from './maxima.js';

// Legacy languages
export { basic } from './basic.js';
export { foxpro } from './foxpro.js';
export { clipper } from './clipper.js';

// Esoteric languages
export { brainfuck } from './brainfuck.js';
export { befunge } from './befunge.js';
export { whitespace } from './whitespace.js';

// Scripting/Automation
export { applescript } from './applescript.js';
export { autohotkey } from './autohotkey.js';
export { autoit } from './autoit.js';

// Imports for tier7Languages array
import { fish } from './fish.js';
import { zsh } from './zsh.js';
import { tcsh } from './tcsh.js';
import { ksh } from './ksh.js';
import { tcl } from './tcl.js';
import { awk } from './awk.js';
import { sed } from './sed.js';
import { mongodb } from './mongodb.js';
import { redis } from './redis.js';
import { cassandra } from './cassandra.js';
import { sparql } from './sparql.js';
import { hiveql } from './hiveql.js';
import { xpath } from './xpath.js';
import { xquery } from './xquery.js';
import { jq } from './jq.js';
import { vhdl } from './vhdl.js';
import { systemverilog } from './systemverilog.js';
import { arm } from './arm.js';
import { mips } from './mips.js';
import { nasm } from './nasm.js';
import { gdscript } from './gdscript.js';
import { unrealscript } from './unrealscript.js';
import { angelscript } from './angelscript.js';
import { stylus } from './stylus.js';
import { sass } from './sass.js';
import { postcss } from './postcss.js';
import { jsonnet } from './jsonnet.js';
import { hcl } from './hcl.js';
import { cue } from './cue.js';
import { dhall } from './dhall.js';
import { hocon } from './hocon.js';
import { sas } from './sas.js';
import { stata } from './stata.js';
import { maxima } from './maxima.js';
import { basic } from './basic.js';
import { foxpro } from './foxpro.js';
import { clipper } from './clipper.js';
import { brainfuck } from './brainfuck.js';
import { befunge } from './befunge.js';
import { whitespace } from './whitespace.js';
import { applescript } from './applescript.js';
import { autohotkey } from './autohotkey.js';
import { autoit } from './autoit.js';

/**
 * All Tier 7 languages
 */
export const tier7Languages = [
  // Shell
  fish,
  zsh,
  tcsh,
  ksh,
  // Text processing
  tcl,
  awk,
  sed,
  // Database
  mongodb,
  redis,
  cassandra,
  sparql,
  hiveql,
  // Query
  xpath,
  xquery,
  jq,
  // Hardware
  vhdl,
  systemverilog,
  // Assembly
  arm,
  mips,
  nasm,
  // Game dev
  gdscript,
  unrealscript,
  angelscript,
  // CSS
  stylus,
  sass,
  postcss,
  // Config
  jsonnet,
  hcl,
  cue,
  dhall,
  hocon,
  // Scientific
  sas,
  stata,
  maxima,
  // Legacy
  basic,
  foxpro,
  clipper,
  // Esoteric
  brainfuck,
  befunge,
  whitespace,
  // Automation
  applescript,
  autohotkey,
  autoit,
];

// Examples
export { tier7Examples } from './examples.js';

export default tier7Languages;
