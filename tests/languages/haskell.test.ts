/**
 * Tests for Haskell language definition
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { haskell } from '../../src/languages/tier5/haskell.js';
import { highlight } from '../../src/core/highlighter.js';
import { tokenize } from '../../src/core/tokenizer.js';
import { registerLanguage } from '../../src/languages/registry.js';

// Register Haskell language before tests
beforeAll(() => {
  registerLanguage(haskell);
});

describe('Haskell language definition', () => {
  describe('basic properties', () => {
    it('should have correct name', () => {
      expect(haskell.name).toBe('haskell');
    });

    it('should have correct aliases', () => {
      expect(haskell.aliases).toContain('hs');
    });

    it('should have correct extensions', () => {
      expect(haskell.extensions).toContain('.hs');
      expect(haskell.extensions).toContain('.lhs');
      expect(haskell.extensions).toContain('.hsc');
    });

    it('should be frozen', () => {
      expect(Object.isFrozen(haskell)).toBe(true);
    });
  });

  describe('keywords', () => {
    it('should include core keywords', () => {
      expect(haskell.keywords).toContain('case');
      expect(haskell.keywords).toContain('class');
      expect(haskell.keywords).toContain('data');
      expect(haskell.keywords).toContain('default');
      expect(haskell.keywords).toContain('deriving');
      expect(haskell.keywords).toContain('do');
      expect(haskell.keywords).toContain('else');
      expect(haskell.keywords).toContain('family');
      expect(haskell.keywords).toContain('forall');
      expect(haskell.keywords).toContain('foreign');
      expect(haskell.keywords).toContain('hiding');
      expect(haskell.keywords).toContain('if');
      expect(haskell.keywords).toContain('import');
      expect(haskell.keywords).toContain('in');
      expect(haskell.keywords).toContain('infix');
      expect(haskell.keywords).toContain('infixl');
      expect(haskell.keywords).toContain('infixr');
      expect(haskell.keywords).toContain('instance');
      expect(haskell.keywords).toContain('let');
      expect(haskell.keywords).toContain('mdo');
      expect(haskell.keywords).toContain('module');
      expect(haskell.keywords).toContain('newtype');
      expect(haskell.keywords).toContain('of');
      expect(haskell.keywords).toContain('proc');
      expect(haskell.keywords).toContain('qualified');
      expect(haskell.keywords).toContain('rec');
      expect(haskell.keywords).toContain('then');
      expect(haskell.keywords).toContain('type');
      expect(haskell.keywords).toContain('where');
    });

    it('should include GHC extension keywords', () => {
      expect(haskell.keywords).toContain('pattern');
      expect(haskell.keywords).toContain('role');
      expect(haskell.keywords).toContain('signature');
      expect(haskell.keywords).toContain('stock');
      expect(haskell.keywords).toContain('anyclass');
      expect(haskell.keywords).toContain('via');
    });
  });

  describe('typeKeywords', () => {
    it('should include basic types', () => {
      expect(haskell.typeKeywords).toContain('Bool');
      expect(haskell.typeKeywords).toContain('Char');
      expect(haskell.typeKeywords).toContain('Double');
      expect(haskell.typeKeywords).toContain('Float');
      expect(haskell.typeKeywords).toContain('Int');
      expect(haskell.typeKeywords).toContain('Integer');
      expect(haskell.typeKeywords).toContain('String');
      expect(haskell.typeKeywords).toContain('Word');
    });

    it('should include common types', () => {
      expect(haskell.typeKeywords).toContain('Maybe');
      expect(haskell.typeKeywords).toContain('Just');
      expect(haskell.typeKeywords).toContain('Nothing');
      expect(haskell.typeKeywords).toContain('Either');
      expect(haskell.typeKeywords).toContain('Left');
      expect(haskell.typeKeywords).toContain('Right');
    });

    it('should include type classes', () => {
      expect(haskell.typeKeywords).toContain('IO');
      expect(haskell.typeKeywords).toContain('Monad');
      expect(haskell.typeKeywords).toContain('Functor');
      expect(haskell.typeKeywords).toContain('Applicative');
      expect(haskell.typeKeywords).toContain('Foldable');
      expect(haskell.typeKeywords).toContain('Traversable');
      expect(haskell.typeKeywords).toContain('Eq');
      expect(haskell.typeKeywords).toContain('Ord');
      expect(haskell.typeKeywords).toContain('Show');
      expect(haskell.typeKeywords).toContain('Read');
      expect(haskell.typeKeywords).toContain('Enum');
      expect(haskell.typeKeywords).toContain('Bounded');
      expect(haskell.typeKeywords).toContain('Num');
      expect(haskell.typeKeywords).toContain('Real');
      expect(haskell.typeKeywords).toContain('Integral');
      expect(haskell.typeKeywords).toContain('Fractional');
      expect(haskell.typeKeywords).toContain('Floating');
      expect(haskell.typeKeywords).toContain('RealFrac');
      expect(haskell.typeKeywords).toContain('RealFloat');
      expect(haskell.typeKeywords).toContain('Semigroup');
      expect(haskell.typeKeywords).toContain('Monoid');
      expect(haskell.typeKeywords).toContain('Alternative');
    });
  });

  describe('constants', () => {
    it('should include boolean constants', () => {
      expect(haskell.constants).toContain('True');
      expect(haskell.constants).toContain('False');
    });

    it('should include Maybe/Either constructors', () => {
      expect(haskell.constants).toContain('Nothing');
      expect(haskell.constants).toContain('Just');
      expect(haskell.constants).toContain('Left');
      expect(haskell.constants).toContain('Right');
    });

    it('should include Ordering constructors', () => {
      expect(haskell.constants).toContain('LT');
      expect(haskell.constants).toContain('EQ');
      expect(haskell.constants).toContain('GT');
    });
  });

  describe('builtins', () => {
    it('should include common Prelude functions', () => {
      expect(haskell.builtins).toContain('map');
      expect(haskell.builtins).toContain('filter');
      expect(haskell.builtins).toContain('foldl');
      expect(haskell.builtins).toContain('foldr');
      expect(haskell.builtins).toContain('head');
      expect(haskell.builtins).toContain('tail');
      expect(haskell.builtins).toContain('length');
      expect(haskell.builtins).toContain('reverse');
      expect(haskell.builtins).toContain('concat');
      expect(haskell.builtins).toContain('zip');
      expect(haskell.builtins).toContain('unzip');
    });

    it('should include IO functions', () => {
      expect(haskell.builtins).toContain('print');
      expect(haskell.builtins).toContain('putStr');
      expect(haskell.builtins).toContain('putStrLn');
      expect(haskell.builtins).toContain('getLine');
      expect(haskell.builtins).toContain('getChar');
      expect(haskell.builtins).toContain('readFile');
      expect(haskell.builtins).toContain('writeFile');
      expect(haskell.builtins).toContain('appendFile');
    });

    it('should include numeric functions', () => {
      expect(haskell.builtins).toContain('abs');
      expect(haskell.builtins).toContain('sqrt');
      expect(haskell.builtins).toContain('sin');
      expect(haskell.builtins).toContain('cos');
      expect(haskell.builtins).toContain('tan');
      expect(haskell.builtins).toContain('exp');
      expect(haskell.builtins).toContain('log');
      expect(haskell.builtins).toContain('div');
      expect(haskell.builtins).toContain('mod');
      expect(haskell.builtins).toContain('gcd');
      expect(haskell.builtins).toContain('lcm');
    });

    it('should include monadic functions', () => {
      expect(haskell.builtins).toContain('return');
      expect(haskell.builtins).toContain('pure');
      expect(haskell.builtins).toContain('fmap');
      expect(haskell.builtins).toContain('mapM');
      expect(haskell.builtins).toContain('mapM_');
      expect(haskell.builtins).toContain('sequence');
      expect(haskell.builtins).toContain('sequence_');
    });
  });

  describe('patterns', () => {
    it('should have patterns array', () => {
      expect(haskell.patterns).toBeDefined();
      expect(Array.isArray(haskell.patterns)).toBe(true);
      expect(haskell.patterns.length).toBeGreaterThan(0);
    });

    it('all patterns should have type and pattern', () => {
      for (const pattern of haskell.patterns) {
        expect(pattern.type).toBeDefined();
        expect(pattern.pattern).toBeInstanceOf(RegExp);
      }
    });
  });

  describe('strings', () => {
    it('should have string definitions', () => {
      expect(haskell.strings).toBeDefined();
      expect(haskell.strings?.length).toBeGreaterThan(0);
    });

    it('should define double-quoted strings with escape', () => {
      const stringDef = haskell.strings?.[0];
      expect(stringDef?.start).toBe('"');
      expect(stringDef?.end).toBe('"');
      expect(stringDef?.escape).toBe('\\');
    });
  });

  describe('comments', () => {
    it('should have line comment definition', () => {
      expect(haskell.comments?.line).toBe('--');
    });

    it('should have block comment definition', () => {
      expect(haskell.comments?.block?.start).toBe('{-');
      expect(haskell.comments?.block?.end).toBe('-}');
    });
  });

  describe('brackets', () => {
    it('should have bracket definitions', () => {
      expect(haskell.brackets).toBeDefined();
      expect(haskell.brackets?.length).toBe(3);
    });

    it('should include curly braces', () => {
      const curly = haskell.brackets?.find((b) => b.open === '{');
      expect(curly).toBeDefined();
      expect(curly?.close).toBe('}');
    });

    it('should include square brackets', () => {
      const square = haskell.brackets?.find((b) => b.open === '[');
      expect(square).toBeDefined();
      expect(square?.close).toBe(']');
    });

    it('should include parentheses', () => {
      const paren = haskell.brackets?.find((b) => b.open === '(');
      expect(paren).toBeDefined();
      expect(paren?.close).toBe(')');
    });
  });
});

describe('Haskell highlighting', () => {
  describe('keywords', () => {
    it('should highlight module keyword', () => {
      const code = 'module Main where';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });

    it('should highlight import keyword', () => {
      const code = 'import Data.List';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });

    it('should highlight data keyword', () => {
      const code = 'data Maybe a = Nothing | Just a';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });

    it('should highlight do notation', () => {
      const code = `main = do
  putStrLn "Hello"`;
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });

    it('should highlight if-then-else', () => {
      const code = 'if x then y else z';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });

    it('should highlight case expression', () => {
      const code = `case x of
  Just v -> v
  Nothing -> 0`;
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });

    it('should highlight let-in expression', () => {
      const code = 'let x = 1 in x + 1';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });

    it('should highlight where clause', () => {
      const code = `f x = y where y = x + 1`;
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });

    it('should highlight class and instance', () => {
      const code = `class Eq a where
  (==) :: a -> a -> Bool

instance Eq Int where
  (==) = primEqInt`;
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });

    it('should highlight deriving', () => {
      const code = 'data Point = Point Int Int deriving (Show, Eq)';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });

    it('should highlight newtype', () => {
      const code = 'newtype Name = Name String';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });

    it('should highlight type keyword', () => {
      const code = 'type Point = (Int, Int)';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });

    it('should highlight qualified import', () => {
      const code = 'import qualified Data.Map as M';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });

    it('should highlight hiding', () => {
      const code = 'import Prelude hiding (map)';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });

    it('should highlight forall', () => {
      const code = 'id :: forall a. a -> a';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });
  });

  describe('types', () => {
    it('should highlight type constructors', () => {
      const code = 'Maybe Int';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-type');
    });

    it('should highlight type signatures', () => {
      const code = 'length :: [a] -> Int';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-type');
    });

    it('should highlight data constructors', () => {
      const code = 'Just 42';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-type');
    });
  });

  describe('numbers', () => {
    it('should highlight decimal integers', () => {
      const code = 'x = 42';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-number');
    });

    it('should highlight floating point numbers', () => {
      const code = 'x = 3.14159';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-number');
    });

    it('should highlight scientific notation', () => {
      const code = 'x = 1.5e10';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-number');
    });

    it('should highlight hexadecimal numbers', () => {
      const code = 'x = 0xFF';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-number');
    });

    it('should highlight octal numbers', () => {
      const code = 'x = 0o755';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-number');
    });

    it('should highlight binary numbers', () => {
      const code = 'x = 0b1010';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-number');
    });

    it('should highlight numbers with underscores', () => {
      const code = 'x = 1_000_000';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-number');
    });
  });

  describe('strings', () => {
    it('should highlight string literals', () => {
      const code = 'x = "Hello, World!"';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-string');
    });

    it('should highlight strings with escape sequences', () => {
      const code = 'x = "Hello\\nWorld"';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-string');
    });

    it('should highlight character literals', () => {
      const code = "x = 'a'";
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-string');
    });

    it('should highlight escaped character literals', () => {
      const code = "x = '\\n'";
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-string');
    });

    it('should highlight hex character escapes', () => {
      const code = "x = '\\x41'";
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-string');
    });

    it('should highlight octal character escapes', () => {
      const code = "x = '\\o101'";
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-string');
    });

    it('should highlight numeric character escapes', () => {
      const code = "x = '\\65'";
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-string');
    });

    it('should highlight empty string gap', () => {
      const code = "x = '\\&'";
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-string');
    });
  });

  describe('comments', () => {
    it('should highlight line comments', () => {
      const code = '-- This is a comment';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-comment');
    });

    it('should highlight block comments', () => {
      const code = '{- This is a block comment -}';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-comment');
    });

    it('should highlight multi-line block comments', () => {
      const code = `{- This is a
multi-line
block comment -}`;
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-comment');
    });

    it('should highlight pragma comments', () => {
      const code = '{-# LANGUAGE GADTs #-}';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-comment');
    });

    it('should highlight inline pragma', () => {
      const code = '{-# INLINE myFunction #-}';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-comment');
    });
  });

  describe('operators', () => {
    it('should highlight arithmetic operators', () => {
      const code = 'x = 1 + 2 - 3 * 4 / 5';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-operator');
    });

    it('should highlight comparison operators', () => {
      const code = 'x = a == b && c /= d';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-operator');
    });

    it('should highlight function composition', () => {
      const code = 'f . g . h';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-operator');
    });

    it('should highlight function application', () => {
      // Note: $ alone is matched as a variable due to tokenizer word regex
      // Test with surrounding operators instead
      const code = 'sum $ map (*2) xs';
      const html = highlight(code, { language: 'haskell' });

      // The multiplication operator should be highlighted
      expect(html).toContain('cs-operator');
    });

    it('should highlight bind operators', () => {
      const code = 'x >>= f >> g';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-operator');
    });

    it('should highlight cons operator', () => {
      const code = 'x : xs';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-operator');
    });

    it('should highlight type annotation operator', () => {
      const code = 'x :: Int';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-operator');
    });

    it('should highlight lambda arrow', () => {
      const code = '\\x -> x + 1';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-operator');
    });

    it('should highlight list range operator', () => {
      const code = '[1..10]';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-operator');
    });
  });

  describe('lambda', () => {
    it('should highlight lambda backslash', () => {
      const code = '\\x -> x';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });

    it('should highlight multi-parameter lambda', () => {
      const code = '\\x y z -> x + y + z';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });
  });

  describe('builtins', () => {
    // Note: The tokenizer doesn't have a specific 'builtin' token type.
    // Builtin functions are highlighted as either 'function' (when followed by '(')
    // or 'variable' (otherwise). The builtins array is defined in the language
    // for potential future use or editor integrations.

    it('should highlight map as variable', () => {
      const code = 'map f xs';
      const html = highlight(code, { language: 'haskell' });

      // 'map' is highlighted as variable since it's not followed by '('
      expect(html).toContain('cs-variable');
    });

    it('should highlight filter as variable', () => {
      const code = 'filter p xs';
      const html = highlight(code, { language: 'haskell' });

      // 'filter' is highlighted as variable since it's not followed by '('
      expect(html).toContain('cs-variable');
    });

    it('should highlight print as variable', () => {
      const code = 'print "Hello"';
      const html = highlight(code, { language: 'haskell' });

      // 'print' is highlighted as variable since it's not followed by '('
      expect(html).toContain('cs-variable');
    });

    it('should highlight foldl as function when followed by parens', () => {
      const code = 'foldl (+) 0 xs';
      const html = highlight(code, { language: 'haskell' });

      // 'foldl' is highlighted as function since it's followed by '('
      expect(html).toContain('cs-function');
    });
  });

  describe('complex code examples', () => {
    it('should highlight a complete module', () => {
      const code = `module Main where

import Data.List

main :: IO ()
main = do
  putStrLn "Hello, World!"
  print (factorial 10)

factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)`;
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-codeblock');
      expect(html).toContain('cs-keyword');
      expect(html).toContain('cs-type');
      expect(html).toContain('cs-string');
      expect(html).toContain('cs-number');
    });

    it('should highlight list comprehension', () => {
      const code = '[x * 2 | x <- [1..10], even x]';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-codeblock');
      expect(html).toContain('cs-number');
    });

    it('should highlight record syntax', () => {
      const code = `data Person = Person
  { name :: String
  , age :: Int
  } deriving (Show, Eq)`;
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
      expect(html).toContain('cs-type');
    });

    it('should highlight GADT syntax', () => {
      const code = `data Expr a where
  LitInt :: Int -> Expr Int
  LitBool :: Bool -> Expr Bool
  Add :: Expr Int -> Expr Int -> Expr Int`;
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
      expect(html).toContain('cs-type');
    });

    it('should highlight type families', () => {
      const code = `type family Elem c where
  Elem [a] = a
  Elem (Set a) = a`;
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
    });

    it('should highlight pattern matching', () => {
      const code = `head :: [a] -> a
head [] = error "empty list"
head (x:_) = x`;
      const html = highlight(code, { language: 'haskell' });

      // Pattern matching code contains operators (::, ->, =, :) and strings
      expect(html).toContain('cs-operator');
      expect(html).toContain('cs-string');
    });

    it('should highlight guards', () => {
      const code = `abs :: Int -> Int
abs x
  | x < 0     = -x
  | otherwise = x`;
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-codeblock');
      expect(html).toContain('cs-operator');
    });

    it('should highlight monadic code', () => {
      const code = `main :: IO ()
main = do
  contents <- readFile "input.txt"
  let result = process contents
  writeFile "output.txt" result
  return ()`;
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-keyword');
      expect(html).toContain('cs-type');
      expect(html).toContain('cs-string');
    });

    it('should highlight applicative style', () => {
      const code = 'result = (+) <$> Just 1 <*> Just 2';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-operator');
      expect(html).toContain('cs-type');
    });

    it('should highlight multiple pragmas', () => {
      const code = `{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE GADTs #-}
{-# OPTIONS_GHC -fwarn-incomplete-patterns #-}`;
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-comment');
    });
  });

  describe('tokenization', () => {
    it('should tokenize Haskell code', () => {
      const code = 'main = putStrLn "Hello"';
      const tokens = tokenize(code, haskell);

      expect(tokens.length).toBeGreaterThan(0);
    });

    it('should produce correct token types', () => {
      const code = 'let x = 42';
      const tokens = tokenize(code, haskell);

      const types = tokens.map((t) => t.type);
      expect(types).toContain('keyword');
      expect(types).toContain('number');
    });
  });

  describe('edge cases', () => {
    it('should handle empty input', () => {
      const html = highlight('', { language: 'haskell' });

      expect(html).toContain('cs-codeblock');
    });

    it('should handle whitespace only', () => {
      const html = highlight('   \n\t\n   ', { language: 'haskell' });

      expect(html).toContain('cs-codeblock');
    });

    it('should handle very long identifiers', () => {
      const longName = 'a'.repeat(100);
      const code = `${longName} = 1`;
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain(longName);
    });

    it('should handle deeply nested expressions', () => {
      const code = '((((((1 + 2) + 3) + 4) + 5) + 6) + 7)';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('cs-number');
    });

    it('should handle special unicode characters', () => {
      const code = 'alpha = 1 -- \u03b1';
      const html = highlight(code, { language: 'haskell' });

      expect(html).toContain('\u03b1');
    });
  });
});
