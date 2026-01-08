/**
 * GLSL (OpenGL Shading Language) definition
 */
import { defineLang } from '../define-lang.js';

export const glsl = defineLang({
  name: 'glsl',
  aliases: ['shader', 'vert', 'frag', 'geom'],
  extensions: ['.glsl', '.vert', '.frag', '.geom', '.tesc', '.tese', '.comp', '.vs', '.fs', '.gs'],
  keywords: [
    'attribute', 'const', 'uniform', 'varying', 'buffer', 'shared', 'coherent',
    'volatile', 'restrict', 'readonly', 'writeonly', 'layout', 'centroid', 'flat',
    'smooth', 'noperspective', 'patch', 'sample', 'break', 'continue', 'do', 'for',
    'while', 'switch', 'case', 'default', 'if', 'else', 'subroutine', 'in', 'out',
    'inout', 'true', 'false', 'invariant', 'precise', 'discard', 'return', 'struct',
    'lowp', 'mediump', 'highp', 'precision',
  ],
  typeKeywords: [
    'void', 'bool', 'int', 'uint', 'float', 'double',
    'vec2', 'vec3', 'vec4', 'dvec2', 'dvec3', 'dvec4',
    'bvec2', 'bvec3', 'bvec4', 'ivec2', 'ivec3', 'ivec4', 'uvec2', 'uvec3', 'uvec4',
    'mat2', 'mat3', 'mat4', 'mat2x2', 'mat2x3', 'mat2x4',
    'mat3x2', 'mat3x3', 'mat3x4', 'mat4x2', 'mat4x3', 'mat4x4',
    'dmat2', 'dmat3', 'dmat4', 'dmat2x2', 'dmat2x3', 'dmat2x4',
    'dmat3x2', 'dmat3x3', 'dmat3x4', 'dmat4x2', 'dmat4x3', 'dmat4x4',
    'sampler1D', 'sampler2D', 'sampler3D', 'samplerCube',
    'sampler1DShadow', 'sampler2DShadow', 'samplerCubeShadow',
    'sampler1DArray', 'sampler2DArray', 'sampler1DArrayShadow', 'sampler2DArrayShadow',
    'isampler1D', 'isampler2D', 'isampler3D', 'isamplerCube', 'isampler1DArray', 'isampler2DArray',
    'usampler1D', 'usampler2D', 'usampler3D', 'usamplerCube', 'usampler1DArray', 'usampler2DArray',
    'sampler2DRect', 'sampler2DRectShadow', 'isampler2DRect', 'usampler2DRect',
    'samplerBuffer', 'isamplerBuffer', 'usamplerBuffer',
    'sampler2DMS', 'isampler2DMS', 'usampler2DMS', 'sampler2DMSArray', 'isampler2DMSArray', 'usampler2DMSArray',
    'samplerCubeArray', 'samplerCubeArrayShadow', 'isamplerCubeArray', 'usamplerCubeArray',
    'image1D', 'image2D', 'image3D', 'imageCube', 'image1DArray', 'image2DArray',
    'iimage1D', 'iimage2D', 'iimage3D', 'iimageCube', 'iimage1DArray', 'iimage2DArray',
    'uimage1D', 'uimage2D', 'uimage3D', 'uimageCube', 'uimage1DArray', 'uimage2DArray',
    'image2DRect', 'iimage2DRect', 'uimage2DRect', 'imageBuffer', 'iimageBuffer', 'uimageBuffer',
    'image2DMS', 'iimage2DMS', 'uimage2DMS', 'image2DMSArray', 'iimage2DMSArray', 'uimage2DMSArray',
    'imageCubeArray', 'iimageCubeArray', 'uimageCubeArray',
    'atomic_uint',
  ],
  builtins: [
    // Trigonometry
    'radians', 'degrees', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh',
    // Exponential
    'pow', 'exp', 'log', 'exp2', 'log2', 'sqrt', 'inversesqrt',
    // Common
    'abs', 'sign', 'floor', 'trunc', 'round', 'roundEven', 'ceil', 'fract', 'mod', 'modf', 'min', 'max', 'clamp', 'mix', 'step', 'smoothstep', 'isnan', 'isinf', 'floatBitsToInt', 'floatBitsToUint', 'intBitsToFloat', 'uintBitsToFloat', 'fma', 'frexp', 'ldexp',
    // Packing/unpacking
    'packUnorm2x16', 'packSnorm2x16', 'packUnorm4x8', 'packSnorm4x8', 'unpackUnorm2x16', 'unpackSnorm2x16', 'unpackUnorm4x8', 'unpackSnorm4x8', 'packHalf2x16', 'unpackHalf2x16', 'packDouble2x32', 'unpackDouble2x32',
    // Geometric
    'length', 'distance', 'dot', 'cross', 'normalize', 'faceforward', 'reflect', 'refract',
    // Matrix
    'matrixCompMult', 'outerProduct', 'transpose', 'determinant', 'inverse',
    // Vector relational
    'lessThan', 'lessThanEqual', 'greaterThan', 'greaterThanEqual', 'equal', 'notEqual', 'any', 'all', 'not',
    // Integer
    'uaddCarry', 'usubBorrow', 'umulExtended', 'imulExtended', 'bitfieldExtract', 'bitfieldInsert', 'bitfieldReverse', 'bitCount', 'findLSB', 'findMSB',
    // Texture
    'textureSize', 'textureQueryLod', 'textureQueryLevels', 'textureSamples', 'texture', 'textureProj', 'textureLod', 'textureOffset', 'texelFetch', 'texelFetchOffset', 'textureProjOffset', 'textureLodOffset', 'textureProjLod', 'textureProjLodOffset', 'textureGrad', 'textureGradOffset', 'textureProjGrad', 'textureProjGradOffset', 'textureGather', 'textureGatherOffset', 'textureGatherOffsets',
    // Fragment processing
    'dFdx', 'dFdy', 'dFdxFine', 'dFdyFine', 'dFdxCoarse', 'dFdyCoarse', 'fwidth', 'fwidthFine', 'fwidthCoarse', 'interpolateAtCentroid', 'interpolateAtSample', 'interpolateAtOffset',
    // Noise
    'noise1', 'noise2', 'noise3', 'noise4',
    // Geometry shader
    'EmitStreamVertex', 'EndStreamPrimitive', 'EmitVertex', 'EndPrimitive',
    // Shader invocation control
    'barrier', 'memoryBarrier', 'memoryBarrierAtomicCounter', 'memoryBarrierBuffer', 'memoryBarrierShared', 'memoryBarrierImage', 'groupMemoryBarrier',
    // Atomic
    'atomicCounterIncrement', 'atomicCounterDecrement', 'atomicCounter', 'atomicCounterAdd', 'atomicCounterSubtract', 'atomicCounterMin', 'atomicCounterMax', 'atomicCounterAnd', 'atomicCounterOr', 'atomicCounterXor', 'atomicCounterExchange', 'atomicCounterCompSwap', 'atomicAdd', 'atomicMin', 'atomicMax', 'atomicAnd', 'atomicOr', 'atomicXor', 'atomicExchange', 'atomicCompSwap',
    // Image
    'imageSize', 'imageSamples', 'imageLoad', 'imageStore', 'imageAtomicAdd', 'imageAtomicMin', 'imageAtomicMax', 'imageAtomicAnd', 'imageAtomicOr', 'imageAtomicXor', 'imageAtomicExchange', 'imageAtomicCompSwap',
    // Built-in variables
    'gl_Position', 'gl_PointSize', 'gl_ClipDistance', 'gl_CullDistance', 'gl_VertexID', 'gl_InstanceID', 'gl_PrimitiveIDIn', 'gl_InvocationID', 'gl_PrimitiveID', 'gl_Layer', 'gl_ViewportIndex', 'gl_TessLevelOuter', 'gl_TessLevelInner', 'gl_TessCoord', 'gl_PatchVerticesIn', 'gl_FragCoord', 'gl_FrontFacing', 'gl_PointCoord', 'gl_SampleID', 'gl_SamplePosition', 'gl_SampleMaskIn', 'gl_FragDepth', 'gl_SampleMask', 'gl_NumWorkGroups', 'gl_WorkGroupSize', 'gl_WorkGroupID', 'gl_LocalInvocationID', 'gl_GlobalInvocationID', 'gl_LocalInvocationIndex',
  ],
  patterns: [
    // Preprocessor
    { pattern: /#\s*(?:define|undef|if|ifdef|ifndef|else|elif|endif|error|pragma|extension|version|line)\b[^\n]*/g, type: 'macro' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F]+[uU]?\b/g, type: 'number' },
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[fFuU]?\b/g, type: 'number' },
    { pattern: /\b\.\d+(?:[eE][+-]?\d+)?[fF]?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=]=?|&&|\|\||<<|>>|\+\+|--|\?:/g, type: 'operator' },
  ],
  strings: [],
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

export default glsl;
