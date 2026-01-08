/**
 * HLSL (High Level Shading Language) definition
 */
import { defineLang } from '../define-lang.js';

export const hlsl = defineLang({
  name: 'hlsl',
  aliases: ['fx', 'cg', 'shaderlab'],
  extensions: ['.hlsl', '.fx', '.fxh', '.cginc', '.compute', '.shader'],
  keywords: [
    // Control flow
    'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue', 'return', 'discard',
    // Declarations
    'struct', 'typedef', 'class', 'interface', 'cbuffer', 'tbuffer', 'namespace',
    // Modifiers
    'const', 'static', 'extern', 'inline', 'volatile', 'uniform', 'varying', 'export',
    'nointerpolation', 'linear', 'centroid', 'noperspective', 'sample',
    'in', 'out', 'inout', 'precise', 'groupshared',
    // Semantics
    'register', 'packoffset',
    // Techniques
    'technique', 'technique10', 'technique11', 'pass', 'compile', 'VertexShader', 'PixelShader',
    'GeometryShader', 'HullShader', 'DomainShader', 'ComputeShader',
  ],
  typeKeywords: [
    // Scalar types
    'void', 'bool', 'int', 'uint', 'dword', 'half', 'float', 'double', 'min16float', 'min10float',
    'min16int', 'min12int', 'min16uint',
    // Vector types
    'bool1', 'bool2', 'bool3', 'bool4',
    'int1', 'int2', 'int3', 'int4',
    'uint1', 'uint2', 'uint3', 'uint4',
    'half1', 'half2', 'half3', 'half4',
    'float1', 'float2', 'float3', 'float4',
    'double1', 'double2', 'double3', 'double4',
    // Matrix types
    'bool1x1', 'bool1x2', 'bool1x3', 'bool1x4', 'bool2x1', 'bool2x2', 'bool2x3', 'bool2x4',
    'bool3x1', 'bool3x2', 'bool3x3', 'bool3x4', 'bool4x1', 'bool4x2', 'bool4x3', 'bool4x4',
    'int1x1', 'int1x2', 'int1x3', 'int1x4', 'int2x1', 'int2x2', 'int2x3', 'int2x4',
    'int3x1', 'int3x2', 'int3x3', 'int3x4', 'int4x1', 'int4x2', 'int4x3', 'int4x4',
    'float1x1', 'float1x2', 'float1x3', 'float1x4', 'float2x1', 'float2x2', 'float2x3', 'float2x4',
    'float3x1', 'float3x2', 'float3x3', 'float3x4', 'float4x1', 'float4x2', 'float4x3', 'float4x4',
    'double1x1', 'double1x2', 'double1x3', 'double1x4', 'double2x1', 'double2x2', 'double2x3', 'double2x4',
    'double3x1', 'double3x2', 'double3x3', 'double3x4', 'double4x1', 'double4x2', 'double4x3', 'double4x4',
    // Sampler types
    'sampler', 'sampler1D', 'sampler2D', 'sampler3D', 'samplerCUBE', 'sampler_state', 'SamplerState',
    'SamplerComparisonState',
    // Texture types
    'texture', 'Texture1D', 'Texture1DArray', 'Texture2D', 'Texture2DArray', 'Texture2DMS', 'Texture2DMSArray',
    'Texture3D', 'TextureCube', 'TextureCubeArray',
    // Buffer types
    'Buffer', 'ByteAddressBuffer', 'StructuredBuffer', 'AppendStructuredBuffer', 'ConsumeStructuredBuffer',
    'RWBuffer', 'RWByteAddressBuffer', 'RWStructuredBuffer', 'RWTexture1D', 'RWTexture1DArray',
    'RWTexture2D', 'RWTexture2DArray', 'RWTexture3D',
    // Other types
    'string', 'vector', 'matrix', 'InputPatch', 'OutputPatch',
  ],
  constants: [
    'true', 'false', 'NULL',
  ],
  builtins: [
    // Math functions
    'abs', 'acos', 'all', 'any', 'asin', 'atan', 'atan2', 'ceil', 'clamp', 'clip', 'cos', 'cosh',
    'cross', 'degrees', 'determinant', 'distance', 'dot', 'exp', 'exp2', 'faceforward', 'floor',
    'fmod', 'frac', 'frexp', 'fwidth', 'isfinite', 'isinf', 'isnan', 'ldexp', 'length', 'lerp',
    'lit', 'log', 'log10', 'log2', 'mad', 'max', 'min', 'modf', 'mul', 'normalize', 'pow',
    'radians', 'rcp', 'reflect', 'refract', 'round', 'rsqrt', 'saturate', 'sign', 'sin', 'sincos',
    'sinh', 'smoothstep', 'sqrt', 'step', 'tan', 'tanh', 'transpose', 'trunc',
    // Texture functions
    'tex1D', 'tex1Dbias', 'tex1Dgrad', 'tex1Dlod', 'tex1Dproj',
    'tex2D', 'tex2Dbias', 'tex2Dgrad', 'tex2Dlod', 'tex2Dproj',
    'tex3D', 'tex3Dbias', 'tex3Dgrad', 'tex3Dlod', 'tex3Dproj',
    'texCUBE', 'texCUBEbias', 'texCUBEgrad', 'texCUBElod', 'texCUBEproj',
    'Sample', 'SampleBias', 'SampleCmp', 'SampleCmpLevelZero', 'SampleGrad', 'SampleLevel', 'Load', 'Gather',
    // DDX/DDY
    'ddx', 'ddx_coarse', 'ddx_fine', 'ddy', 'ddy_coarse', 'ddy_fine',
    // Flow control
    'abort', 'errorf', 'printf',
    // Synchronization
    'AllMemoryBarrier', 'AllMemoryBarrierWithGroupSync', 'DeviceMemoryBarrier',
    'DeviceMemoryBarrierWithGroupSync', 'GroupMemoryBarrier', 'GroupMemoryBarrierWithGroupSync',
    // Atomic
    'InterlockedAdd', 'InterlockedAnd', 'InterlockedCompareExchange', 'InterlockedCompareStore',
    'InterlockedExchange', 'InterlockedMax', 'InterlockedMin', 'InterlockedOr', 'InterlockedXor',
    // Wave intrinsics
    'WaveActiveAllEqual', 'WaveActiveBitAnd', 'WaveActiveBitOr', 'WaveActiveBitXor',
    'WaveActiveCountBits', 'WaveActiveMax', 'WaveActiveMin', 'WaveActiveProduct', 'WaveActiveSum',
    'WaveGetLaneCount', 'WaveGetLaneIndex', 'WaveIsFirstLane', 'WavePrefixCountBits',
    'WavePrefixProduct', 'WavePrefixSum', 'WaveReadLaneAt', 'WaveReadLaneFirst',
    // Conversion
    'asfloat', 'asint', 'asuint', 'asdouble', 'f16tof32', 'f32tof16',
    // Bit operations
    'countbits', 'firstbithigh', 'firstbitlow', 'reversebits',
  ],
  patterns: [
    // Semantics
    { pattern: /:\s*[A-Z][A-Z0-9_]*/g, type: 'attribute' },
    // Register binding
    { pattern: /register\s*\(\s*[a-z]\d+\s*\)/gi, type: 'attribute' },
    // Preprocessor
    { pattern: /#\s*(?:define|undef|if|ifdef|ifndef|else|elif|endif|include|pragma|error|warning|line)\b.*/g, type: 'meta' },
    // Hexadecimal
    { pattern: /\b0[xX][0-9a-fA-F]+[uUlL]*/g, type: 'number' },
    // Float numbers
    { pattern: /\b\d+\.\d*(?:[eE][+-]?\d+)?[fFhHlL]?\b/g, type: 'number' },
    { pattern: /\b\d+[eE][+-]?\d+[fFhHlL]?\b/g, type: 'number' },
    { pattern: /\b\d+[fFhHlL]\b/g, type: 'number' },
    // Integer numbers
    { pattern: /\b\d+[uUlL]*\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=~?:]+/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: '//',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '<', close: '>' },
  ],
});

export default hlsl;
