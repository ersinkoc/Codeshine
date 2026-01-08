import { useState, useMemo, ChangeEvent } from 'react';
import { CodeBlock } from '@/components/code/CodeBlock';
import { Search, Filter, ChevronDown, ChevronRight } from 'lucide-react';

// All language examples organized by tier
const LANGUAGE_EXAMPLES: Record<string, { tier: number; category: string; code: string }> = {
  // Tier 1 - Core
  javascript: {
    tier: 1,
    category: 'Core',
    code: `// JavaScript example
const greeting = (name) => \`Hello, \${name}!\`;

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

class Calculator {
  add(a, b) { return a + b; }
  multiply(a, b) { return a * b; }
}

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);`,
  },
  typescript: {
    tier: 1,
    category: 'Core',
    code: `// TypeScript example
interface User {
  id: number;
  name: string;
  email: string;
}

type Status = 'pending' | 'active' | 'completed';

async function getUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}

class UserService {
  private users: Map<number, User> = new Map();

  async findById(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
}`,
  },
  html: {
    tier: 1,
    category: 'Core',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="hero">
    <h1>Welcome</h1>
    <nav>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  <main id="content">
    <article>
      <h2>Article Title</h2>
      <p>Content goes here...</p>
    </article>
  </main>
  <script src="app.js"></script>
</body>
</html>`,
  },
  css: {
    tier: 1,
    category: 'Core',
    code: `/* CSS example */
:root {
  --primary-color: #3498db;
  --spacing: 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing);
}

.button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border-radius: 0.5rem;
  transition: transform 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .container {
    padding: calc(var(--spacing) / 2);
  }
}`,
  },
  json: {
    tier: 1,
    category: 'Core',
    code: `{
  "name": "@oxog/codeshine",
  "version": "1.0.3",
  "description": "Zero-dependency syntax highlighter",
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "types": "dist/types/index.d.ts",
  "keywords": ["syntax", "highlighter", "code"],
  "author": {
    "name": "Ersin KOC",
    "email": "ersin@example.com"
  },
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.0.0",
    "vitest": "^1.0.0"
  }
}`,
  },
  markdown: {
    tier: 1,
    category: 'Core',
    code: `# Codeshine

> Zero-dependency syntax highlighter

## Features

- **Zero Dependencies** - No runtime deps
- **135+ Languages** - Wide language support
- **14 Themes** - Beautiful built-in themes

## Installation

\`\`\`bash
npm install @oxog/codeshine
\`\`\`

## Usage

\`\`\`typescript
import { highlight } from '@oxog/codeshine';

const html = highlight(code, {
  language: 'typescript',
  theme: 'github-dark'
});
\`\`\`

| Feature | Status |
|---------|--------|
| React   | ✅     |
| Vue     | ✅     |
| Svelte  | ✅     |`,
  },

  // Tier 2 - Popular
  python: {
    tier: 2,
    category: 'Popular',
    code: `# Python example
from typing import List, Optional
from dataclasses import dataclass

@dataclass
class User:
    id: int
    name: str
    email: str

class UserRepository:
    def __init__(self):
        self._users: dict[int, User] = {}

    async def find_by_id(self, id: int) -> Optional[User]:
        return self._users.get(id)

    def find_all(self) -> List[User]:
        return list(self._users.values())

# List comprehension
numbers = [1, 2, 3, 4, 5]
squares = [n ** 2 for n in numbers if n % 2 == 0]

# Lambda and map
doubled = list(map(lambda x: x * 2, numbers))`,
  },
  rust: {
    tier: 2,
    category: 'Popular',
    code: `// Rust example
use std::collections::HashMap;

#[derive(Debug, Clone)]
struct User {
    id: u64,
    name: String,
    email: String,
}

impl User {
    fn new(id: u64, name: &str, email: &str) -> Self {
        Self {
            id,
            name: name.to_string(),
            email: email.to_string(),
        }
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut users: HashMap<u64, User> = HashMap::new();

    let user = User::new(1, "Alice", "alice@example.com");
    users.insert(user.id, user);

    if let Some(u) = users.get(&1) {
        println!("Found: {:?}", u);
    }

    Ok(())
}`,
  },
  go: {
    tier: 2,
    category: 'Popular',
    code: `// Go example
package main

import (
    "context"
    "encoding/json"
    "fmt"
    "net/http"
)

type User struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

type UserService struct {
    users map[int]*User
}

func (s *UserService) GetUser(ctx context.Context, id int) (*User, error) {
    user, ok := s.users[id]
    if !ok {
        return nil, fmt.Errorf("user %d not found", id)
    }
    return user, nil
}

func main() {
    http.HandleFunc("/api/users", func(w http.ResponseWriter, r *http.Request) {
        users := []User{{ID: 1, Name: "Alice"}}
        json.NewEncoder(w).Encode(users)
    })

    http.ListenAndServe(":8080", nil)
}`,
  },
  java: {
    tier: 2,
    category: 'Popular',
    code: `// Java example
package com.example.app;

import java.util.*;
import java.util.stream.Collectors;

public class UserService {
    private final Map<Long, User> users = new HashMap<>();

    public record User(Long id, String name, String email) {}

    public Optional<User> findById(Long id) {
        return Optional.ofNullable(users.get(id));
    }

    public List<User> findByNameContaining(String query) {
        return users.values().stream()
            .filter(u -> u.name().toLowerCase().contains(query.toLowerCase()))
            .sorted(Comparator.comparing(User::name))
            .collect(Collectors.toList());
    }

    public User save(User user) {
        users.put(user.id(), user);
        return user;
    }
}`,
  },
  cpp: {
    tier: 2,
    category: 'Popular',
    code: `// C++ example
#include <iostream>
#include <vector>
#include <memory>
#include <algorithm>

class User {
public:
    int id;
    std::string name;
    std::string email;

    User(int id, std::string name, std::string email)
        : id(id), name(std::move(name)), email(std::move(email)) {}
};

class UserRepository {
private:
    std::vector<std::unique_ptr<User>> users;

public:
    void add(std::unique_ptr<User> user) {
        users.push_back(std::move(user));
    }

    User* findById(int id) {
        auto it = std::find_if(users.begin(), users.end(),
            [id](const auto& u) { return u->id == id; });
        return it != users.end() ? it->get() : nullptr;
    }
};

int main() {
    UserRepository repo;
    repo.add(std::make_unique<User>(1, "Alice", "alice@example.com"));

    if (auto* user = repo.findById(1)) {
        std::cout << "Found: " << user->name << std::endl;
    }
    return 0;
}`,
  },

  // Tier 3 - Web/Config
  yaml: {
    tier: 3,
    category: 'Config',
    code: `# YAML configuration example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
    version: "1.0"

spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app

  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: app
          image: my-app:latest
          ports:
            - containerPort: 8080
          env:
            - name: NODE_ENV
              value: production
          resources:
            limits:
              cpu: "500m"
              memory: "256Mi"`,
  },
  sql: {
    tier: 3,
    category: 'Database',
    code: `-- SQL example
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

INSERT INTO users (name, email)
VALUES ('Alice', 'alice@example.com'),
       ('Bob', 'bob@example.com');

SELECT
    u.id,
    u.name,
    COUNT(o.id) as order_count,
    SUM(o.total) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 10;`,
  },
  bash: {
    tier: 3,
    category: 'Shell',
    code: `#!/bin/bash
# Bash script example

set -euo pipefail

readonly APP_NAME="myapp"
readonly LOG_FILE="/var/log/\${APP_NAME}.log"

log() {
    local level="\$1"
    shift
    echo "[\$(date '+%Y-%m-%d %H:%M:%S')] [\$level] \$*" | tee -a "\$LOG_FILE"
}

check_dependencies() {
    local deps=("docker" "curl" "jq")
    for dep in "\${deps[@]}"; do
        if ! command -v "\$dep" &> /dev/null; then
            log "ERROR" "\$dep is required but not installed"
            exit 1
        fi
    done
}

main() {
    log "INFO" "Starting \$APP_NAME..."
    check_dependencies

    for i in {1..5}; do
        echo "Processing item \$i"
    done

    log "INFO" "Completed successfully"
}

main "\$@"`,
  },
  graphql: {
    tier: 3,
    category: 'API',
    code: `# GraphQL schema example
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
  createdAt: DateTime!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  comments: [Comment!]!
  published: Boolean!
}

type Query {
  user(id: ID!): User
  users(limit: Int = 10, offset: Int = 0): [User!]!
  post(id: ID!): Post
  searchPosts(query: String!): [Post!]!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
  createPost(input: CreatePostInput!): Post!
}

input CreateUserInput {
  name: String!
  email: String!
}`,
  },

  // Tier 5 - Extended
  lua: {
    tier: 5,
    category: 'Scripting',
    code: `-- Lua example
local json = require("cjson")

local Player = {}
Player.__index = Player

function Player:new(name, health)
    local self = setmetatable({}, Player)
    self.name = name
    self.health = health or 100
    self.inventory = {}
    return self
end

function Player:takeDamage(amount)
    self.health = math.max(0, self.health - amount)
    if self.health == 0 then
        self:onDeath()
    end
end

function Player:onDeath()
    print(self.name .. " has died!")
end

-- Create players
local players = {}
for i = 1, 5 do
    table.insert(players, Player:new("Player" .. i))
end

-- Game loop
for _, player in ipairs(players) do
    player:takeDamage(math.random(10, 50))
    print(player.name .. ": " .. player.health .. " HP")
end`,
  },
  haskell: {
    tier: 5,
    category: 'Functional',
    code: `-- Haskell example
module Main where

import Data.List (sortBy)
import Data.Ord (comparing)
import Control.Monad (forM_)

data User = User
  { userId :: Int
  , userName :: String
  , userEmail :: String
  } deriving (Show, Eq)

-- Functor instance
instance Functor Maybe where
  fmap _ Nothing  = Nothing
  fmap f (Just x) = Just (f x)

-- Quick sort implementation
quickSort :: Ord a => [a] -> [a]
quickSort [] = []
quickSort (x:xs) =
  let smaller = quickSort [a | a <- xs, a <= x]
      larger  = quickSort [a | a <- xs, a > x]
  in smaller ++ [x] ++ larger

-- Fibonacci with memoization
fibs :: [Integer]
fibs = 0 : 1 : zipWith (+) fibs (tail fibs)

main :: IO ()
main = do
  let users = [User 1 "Alice" "alice@example.com"]
  forM_ users $ \\user ->
    putStrLn $ "User: " ++ userName user
  print $ take 10 fibs`,
  },
  scala: {
    tier: 5,
    category: 'JVM',
    code: `// Scala example
package com.example

import scala.concurrent.{Future, ExecutionContext}
import scala.util.{Success, Failure}

case class User(id: Long, name: String, email: String)

trait UserRepository {
  def findById(id: Long): Future[Option[User]]
  def findAll(): Future[Seq[User]]
  def save(user: User): Future[User]
}

class UserService(repo: UserRepository)(implicit ec: ExecutionContext) {
  def getActiveUsers(): Future[Seq[User]] = {
    repo.findAll().map { users =>
      users.filter(_.name.nonEmpty)
           .sortBy(_.name)
    }
  }

  def processUsers(): Unit = {
    getActiveUsers().onComplete {
      case Success(users) => users.foreach(println)
      case Failure(ex) => println(s"Error: \${ex.getMessage}")
    }
  }
}

object Main extends App {
  val numbers = List(1, 2, 3, 4, 5)
  val doubled = numbers.map(_ * 2)
  val sum = numbers.foldLeft(0)(_ + _)
  println(s"Sum: $sum")
}`,
  },
  elixir: {
    tier: 5,
    category: 'Functional',
    code: `# Elixir example
defmodule MyApp.UserService do
  use GenServer

  defstruct [:id, :name, :email]

  # Client API
  def start_link(opts \\\\ []) do
    GenServer.start_link(__MODULE__, %{}, opts)
  end

  def get_user(pid, id) do
    GenServer.call(pid, {:get_user, id})
  end

  # Server Callbacks
  @impl true
  def init(state) do
    {:ok, state}
  end

  @impl true
  def handle_call({:get_user, id}, _from, state) do
    user = Map.get(state, id)
    {:reply, user, state}
  end
end

# Pipeline example
defmodule DataProcessor do
  def process(data) do
    data
    |> Enum.filter(&(&1 > 0))
    |> Enum.map(&(&1 * 2))
    |> Enum.sort()
    |> Enum.take(10)
  end
end

# Pattern matching
case {:ok, "hello"} do
  {:ok, result} -> IO.puts("Success: #{result}")
  {:error, reason} -> IO.puts("Error: #{reason}")
end`,
  },

  // Tier 7 - Specialized
  fish: {
    tier: 7,
    category: 'Shell',
    code: `#!/usr/bin/fish
# Fish shell script
set -x PATH $HOME/.local/bin $PATH

function greet
    set name $argv[1]
    echo "Hello, $name!"
end

for i in (seq 1 5)
    echo "Count: $i"
end

if test -f ~/.config/fish/config.fish
    source ~/.config/fish/config.fish
end

greet "World"`,
  },
  mongodb: {
    tier: 7,
    category: 'Database',
    code: `// MongoDB query example
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  roles: ["admin", "user"],
  createdAt: new Date()
});

db.users.find({
  age: { $gte: 18 },
  roles: { $in: ["admin"] }
}).sort({ name: 1 }).limit(10);

db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: {
      _id: "$userId",
      total: { $sum: "$amount" },
      count: { $sum: 1 }
  }},
  { $sort: { total: -1 } }
]);`,
  },
  vhdl: {
    tier: 7,
    category: 'Hardware',
    code: `-- VHDL: 4-bit counter
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity counter is
    Port (
        clk     : in  STD_LOGIC;
        reset   : in  STD_LOGIC;
        enable  : in  STD_LOGIC;
        count   : out STD_LOGIC_VECTOR(3 downto 0)
    );
end counter;

architecture Behavioral of counter is
    signal count_reg : unsigned(3 downto 0) := (others => '0');
begin
    process(clk, reset)
    begin
        if reset = '1' then
            count_reg <= (others => '0');
        elsif rising_edge(clk) then
            if enable = '1' then
                count_reg <= count_reg + 1;
            end if;
        end if;
    end process;

    count <= std_logic_vector(count_reg);
end Behavioral;`,
  },
  gdscript: {
    tier: 7,
    category: 'Game Dev',
    code: `# GDScript (Godot Engine)
extends CharacterBody2D

class_name Player

@export var speed: float = 200.0
@export var jump_force: float = -400.0

var gravity: float = ProjectSettings.get_setting("physics/2d/default_gravity")
var health: int = 100

@onready var sprite: Sprite2D = $Sprite2D
@onready var animation: AnimationPlayer = $AnimationPlayer

signal health_changed(new_health: int)
signal died

func _ready() -> void:
    health_changed.emit(health)

func _physics_process(delta: float) -> void:
    if not is_on_floor():
        velocity.y += gravity * delta

    if Input.is_action_just_pressed("jump") and is_on_floor():
        velocity.y = jump_force

    var direction := Input.get_axis("move_left", "move_right")
    velocity.x = direction * speed

    move_and_slide()`,
  },
  hcl: {
    tier: 7,
    category: 'Config',
    code: `# HCL (Terraform) example
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

variable "environment" {
  type        = string
  default     = "production"
}

locals {
  common_tags = {
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

resource "aws_instance" "web" {
  count         = 3
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"

  tags = merge(local.common_tags, {
    Name = "web-\${count.index + 1}"
  })
}`,
  },
  brainfuck: {
    tier: 7,
    category: 'Esoteric',
    code: `Hello World in Brainfuck

++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]
>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.`,
  },
  applescript: {
    tier: 7,
    category: 'Automation',
    code: `-- AppleScript example
tell application "Finder"
    set desktopPath to path to desktop folder as text

    set newFolder to make new folder at desktop with properties {name:"Scripts"}

    set fileList to every file of desktop

    repeat with aFile in fileList
        set fileName to name of aFile
        if fileName ends with ".txt" then
            move aFile to newFolder
        end if
    end repeat
end tell

display dialog "Enter your name:" default answer ""
set userName to text returned of result

display notification "Hello, " & userName with title "Greeting"`,
  },
  autohotkey: {
    tier: 7,
    category: 'Automation',
    code: `; AutoHotkey example
#Requires AutoHotkey v2.0
#SingleInstance Force

global AppName := "My Script"
global Counter := 0

; Hotkey: Ctrl+Shift+H
^+h:: {
    MsgBox("Hello from AutoHotkey!")
}

; Hotstring
::btw::by the way

CenterWindow(WinTitle) {
    WinGetPos(,, &Width, &Height, WinTitle)
    WinMove((A_ScreenWidth - Width) / 2, (A_ScreenHeight - Height) / 2,,, WinTitle)
}

MyGui := Gui(, AppName)
MyGui.Add("Text",, "Enter your name:")
NameEdit := MyGui.Add("Edit", "w200")
MyGui.Add("Button", "Default", "OK").OnEvent("Click", ButtonOK)
MyGui.Show()

ButtonOK(*) {
    MsgBox("Hello, " . NameEdit.Value)
}`,
  },
};

// Get unique categories
const getCategories = () => {
  const categories = new Set<string>();
  Object.values(LANGUAGE_EXAMPLES).forEach(({ category }) => categories.add(category));
  return Array.from(categories).sort();
};

// Get unique tiers
const getTiers = () => {
  const tiers = new Set<number>();
  Object.values(LANGUAGE_EXAMPLES).forEach(({ tier }) => tiers.add(tier));
  return Array.from(tiers).sort();
};

export function LanguageShowcase() {
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedLanguages, setExpandedLanguages] = useState<Set<string>>(new Set(['javascript', 'python', 'rust']));

  const categories = useMemo(() => getCategories(), []);
  const tiers = useMemo(() => getTiers(), []);

  const filteredLanguages = useMemo(() => {
    return Object.entries(LANGUAGE_EXAMPLES).filter(([name, { tier, category }]) => {
      const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
      const matchesTier = selectedTier === null || tier === selectedTier;
      const matchesCategory = selectedCategory === null || category === selectedCategory;
      return matchesSearch && matchesTier && matchesCategory;
    });
  }, [search, selectedTier, selectedCategory]);

  const toggleLanguage = (name: string) => {
    setExpandedLanguages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedLanguages(new Set(Object.keys(LANGUAGE_EXAMPLES)));
  };

  const collapseAll = () => {
    setExpandedLanguages(new Set());
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Language Showcase</h1>
          <p className="text-lg text-muted-foreground">
            Explore syntax highlighting for all {Object.keys(LANGUAGE_EXAMPLES).length}+ supported languages.
          </p>
        </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search languages..."
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            className="w-full pl-10 px-3 py-2 rounded-md border bg-background text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={selectedTier ?? ''}
            onChange={(e) => setSelectedTier(e.target.value ? Number(e.target.value) : null)}
            className="px-3 py-2 rounded-md border bg-background text-sm"
          >
            <option value="">All Tiers</option>
            {tiers.map(tier => (
              <option key={tier} value={tier}>Tier {tier}</option>
            ))}
          </select>

          <select
            value={selectedCategory ?? ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="px-3 py-2 rounded-md border bg-background text-sm"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-2 text-sm rounded-md border hover:bg-muted transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-2 text-sm rounded-md border hover:bg-muted transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredLanguages.length} of {Object.keys(LANGUAGE_EXAMPLES).length} languages
      </p>

      {/* Language list */}
      <div className="space-y-4">
        {filteredLanguages.map(([name, { tier, category, code }]) => (
          <div key={name} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleLanguage(name)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {expandedLanguages.has(name) ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
                <span className="font-mono font-medium">{name}</span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                  Tier {tier}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
                  {category}
                </span>
              </div>
            </button>

            {expandedLanguages.has(name) && (
              <div className="border-t">
                <CodeBlock
                  code={code}
                  language={name}
                  showLineNumbers
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredLanguages.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No languages found matching your filters.
        </div>
      )}
      </div>
    </div>
  );
}
