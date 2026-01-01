# Languages

Codeshine supports 45+ programming languages with accurate syntax highlighting.

## Supported Languages

### Tier 1 - Core Languages

These languages have the most comprehensive grammar support:

| Language | Aliases |
|----------|---------|
| JavaScript | `javascript`, `js` |
| TypeScript | `typescript`, `ts` |
| JSX | `jsx` |
| TSX | `tsx` |
| HTML | `html` |
| CSS | `css` |
| JSON | `json` |
| Markdown | `markdown`, `md` |

### Tier 2 - Popular Languages

| Language | Aliases |
|----------|---------|
| Python | `python`, `py` |
| Java | `java` |
| C | `c` |
| C++ | `cpp`, `c++` |
| C# | `csharp`, `cs` |
| Go | `go`, `golang` |
| Rust | `rust`, `rs` |
| Ruby | `ruby`, `rb` |
| PHP | `php` |
| Swift | `swift` |
| Kotlin | `kotlin`, `kt` |

### Tier 3 - Modern Languages

| Language | Aliases |
|----------|---------|
| Zig | `zig` |
| Elixir | `elixir`, `ex` |
| Scala | `scala` |
| Haskell | `haskell`, `hs` |
| Clojure | `clojure`, `clj` |
| F# | `fsharp`, `fs` |
| OCaml | `ocaml`, `ml` |
| Erlang | `erlang`, `erl` |
| Julia | `julia`, `jl` |
| R | `r` |
| Dart | `dart` |
| Lua | `lua` |
| Perl | `perl`, `pl` |

### Tier 4 - Config & Data

| Language | Aliases |
|----------|---------|
| YAML | `yaml`, `yml` |
| TOML | `toml` |
| XML | `xml` |
| GraphQL | `graphql`, `gql` |
| SQL | `sql` |
| Dockerfile | `dockerfile`, `docker` |
| Shell | `shell`, `bash`, `sh`, `zsh` |
| PowerShell | `powershell`, `ps1` |
| Makefile | `makefile`, `make` |
| INI | `ini` |

### Tier 5 - Other Languages

| Language | Aliases |
|----------|---------|
| WASM | `wasm`, `wat` |
| Assembly | `asm`, `assembly` |
| LaTeX | `latex`, `tex` |
| Diff | `diff`, `patch` |
| Plain Text | `text`, `plain`, `txt` |

## Usage

### Specify Language

```typescript
import { Codeshine } from '@oxog/codeshine';

const codeshine = new Codeshine();

// Use language name
codeshine.highlight(code, { language: 'typescript' });

// Use alias
codeshine.highlight(code, { language: 'ts' });
```

### Auto Detection

```typescript
import { detectLanguage } from '@oxog/codeshine';

const code = `
def hello():
    print("Hello!")
`;

const language = detectLanguage(code);
// Returns: 'python'

// Or use 'auto' as language
codeshine.highlight(code, { language: 'auto' });
```

## Language Detection

Codeshine can automatically detect the language based on:

1. **Shebang lines** - `#!/usr/bin/env python`
2. **Keywords** - Language-specific keywords
3. **Syntax patterns** - Unique syntax features
4. **File extensions** - When filename is provided

```typescript
// Detection with filename hint
const language = detectLanguage(code, { filename: 'app.tsx' });
```

## Getting Language Info

```typescript
import { getLanguage, listLanguages } from '@oxog/codeshine';

// Get language definition
const tsLang = getLanguage('typescript');
console.log(tsLang.name);    // 'TypeScript'
console.log(tsLang.aliases); // ['ts']

// List all languages
const languages = listLanguages();
languages.forEach(lang => {
  console.log(`${lang.name}: ${lang.aliases.join(', ')}`);
});
```

## Language Features

Each language grammar includes patterns for:

- **Keywords** - Reserved words (`if`, `for`, `function`)
- **Strings** - String literals with escape sequences
- **Numbers** - Integer, float, hex, binary, octal
- **Comments** - Single and multi-line comments
- **Operators** - Arithmetic, logical, comparison
- **Functions** - Function definitions and calls
- **Types** - Type annotations and declarations
- **Classes** - Class definitions and members
- **Variables** - Variable declarations
- **Constants** - Built-in constants
- **Regex** - Regular expressions
- **Templates** - Template literals and interpolation

## Example: Multiple Languages

```typescript
const codeshine = new Codeshine();

// JavaScript
const jsHtml = codeshine.highlight(`
const greet = (name) => \`Hello, \${name}!\`;
`, { language: 'javascript' });

// Python
const pyHtml = codeshine.highlight(`
def greet(name):
    return f"Hello, {name}!"
`, { language: 'python' });

// Rust
const rsHtml = codeshine.highlight(`
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
`, { language: 'rust' });

// Go
const goHtml = codeshine.highlight(`
func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}
`, { language: 'go' });
```

## Plain Text

For code without syntax highlighting:

```typescript
codeshine.highlight(text, { language: 'text' });
// or
codeshine.highlight(text, { language: 'plain' });
```

## Language-Specific Features

### JSX/TSX

Full support for React syntax:

```tsx
function Button({ label }: Props) {
  return (
    <button className="btn" onClick={handleClick}>
      {label}
    </button>
  );
}
```

### Markdown

Fenced code blocks, headers, lists:

```markdown
# Heading

- Item 1
- Item 2

\`\`\`javascript
const x = 1;
\`\`\`
```

### Shell

Commands, variables, pipes:

```bash
#!/bin/bash
NAME="World"
echo "Hello, $NAME!" | grep -o "Hello"
```

### SQL

Keywords, strings, comments:

```sql
SELECT id, name, email
FROM users
WHERE active = TRUE
ORDER BY created_at DESC
LIMIT 10;
```
