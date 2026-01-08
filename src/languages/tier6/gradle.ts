/**
 * Gradle build configuration language definition (Groovy DSL)
 */
import { defineLang } from '../define-lang.js';

export const gradle = defineLang({
  name: 'gradle',
  aliases: ['gradle-groovy'],
  extensions: ['.gradle', 'build.gradle', 'settings.gradle'],
  keywords: [
    // Gradle keywords
    'plugins', 'buildscript', 'repositories', 'dependencies', 'configurations',
    'allprojects', 'subprojects', 'rootProject', 'project', 'tasks', 'task',
    'sourceSets', 'publishing', 'signing', 'java', 'kotlin', 'android',
    'implementation', 'api', 'compile', 'testImplementation', 'testCompile',
    'runtimeOnly', 'compileOnly', 'annotationProcessor', 'kapt',
    // Groovy keywords
    'def', 'var', 'class', 'interface', 'trait', 'enum', 'extends', 'implements',
    'import', 'package', 'as', 'in', 'if', 'else', 'for', 'while', 'do', 'switch',
    'case', 'default', 'break', 'continue', 'return', 'throw', 'try', 'catch',
    'finally', 'new', 'this', 'super', 'instanceof', 'assert',
    'public', 'private', 'protected', 'static', 'final', 'abstract', 'synchronized',
    'native', 'transient', 'volatile', 'strictfp',
  ],
  constants: [
    'true', 'false', 'null',
  ],
  builtins: [
    // Gradle methods
    'apply', 'from', 'version', 'group', 'name', 'description',
    'include', 'exclude', 'into', 'from', 'with', 'into',
    'doFirst', 'doLast', 'dependsOn', 'finalizedBy', 'mustRunAfter', 'shouldRunAfter',
    'onlyIf', 'enabled', 'inputs', 'outputs', 'ext',
    'copy', 'delete', 'mkdir', 'file', 'files', 'fileTree', 'zipTree', 'tarTree',
    'exec', 'javaexec', 'ant',
    // Repositories
    'mavenCentral', 'mavenLocal', 'google', 'jcenter', 'maven', 'ivy', 'flatDir',
    // Common tasks
    'clean', 'build', 'assemble', 'check', 'test', 'jar', 'war', 'publish',
    'compileJava', 'compileKotlin', 'processResources', 'classes',
    'compileTestJava', 'compileTestKotlin', 'processTestResources', 'testClasses',
    // Properties
    'buildDir', 'projectDir', 'rootDir', 'gradle', 'logger', 'ant',
    'sourceCompatibility', 'targetCompatibility',
  ],
  patterns: [
    // Groovy GString interpolation
    { pattern: /\$\{[^}]+\}/g, type: 'interpolation' },
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Annotations
    { pattern: /@[A-Z][a-zA-Z0-9_]*/g, type: 'decorator' },
    // Groovy string with slashes
    { pattern: /\/[^\/\n]+\//g, type: 'regexp' },
    // Method calls
    { pattern: /[a-zA-Z_][a-zA-Z0-9_]*(?=\s*[\(\{])/g, type: 'function' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?[LlFfDdGg]?\b/g, type: 'number' },
    { pattern: /\b0[xX][0-9a-fA-F]+[Ll]?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=~?:]+|\.\.<?|<=>|\*\*|=~|==~/g, type: 'operator' },
  ],
  strings: [
    { start: '"""', end: '"""', escape: '\\' },
    { start: "'''", end: "'''", escape: '\\' },
    { start: '"', end: '"', escape: '\\', interpolation: { start: '${', end: '}' } },
    { start: "'", end: "'", escape: '\\' },
  ],
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

export default gradle;
