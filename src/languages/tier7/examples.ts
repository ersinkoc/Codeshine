/**
 * Example code snippets for Tier 7 languages
 * Used for testing and documentation
 */

export const tier7Examples = {
  // Shell Languages
  fish: `#!/usr/bin/fish
# Fish shell script example
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

  zsh: `#!/bin/zsh
# Zsh script example
autoload -Uz compinit && compinit

typeset -A colors
colors=(red "\\e[31m" green "\\e[32m" reset "\\e[0m")

function greet() {
    local name=\${1:-"World"}
    print -P "%F{green}Hello, $name!%f"
}

for i in {1..5}; do
    echo "Count: $i"
done

[[ -f ~/.zshrc ]] && source ~/.zshrc
greet "User"`,

  tcsh: `#!/bin/tcsh
# TCSH script example
set path = ($HOME/bin $path)
setenv EDITOR vim

if ( -f ~/.cshrc ) then
    source ~/.cshrc
endif

foreach i (1 2 3 4 5)
    echo "Count: $i"
end

alias ll 'ls -la'
alias grep 'grep --color=auto'

set prompt = "%n@%m:%~%# "`,

  ksh: `#!/bin/ksh
# KornShell script example
typeset -i count=0

function factorial {
    typeset -i n=$1
    if (( n <= 1 )); then
        print 1
    else
        print $(( n * $(factorial $((n-1))) ))
    fi
}

while (( count < 5 )); do
    print "Count: $count"
    (( count++ ))
done

result=$(factorial 5)
print "5! = $result"`,

  // Text Processing
  tcl: `#!/usr/bin/tclsh
# Tcl script example
package require Tk

proc factorial {n} {
    if {$n <= 1} {
        return 1
    }
    return [expr {$n * [factorial [expr {$n - 1}]]}]
}

set numbers {1 2 3 4 5}
foreach num $numbers {
    puts "Factorial of $num is [factorial $num]"
}

# Create a simple GUI
button .hello -text "Hello" -command {puts "Hello, World!"}
pack .hello`,

  awk: `#!/usr/bin/awk -f
# AWK script example
BEGIN {
    FS = ","
    OFS = "\\t"
    print "Name", "Age", "City"
    print "----", "---", "----"
}

{
    name = $1
    age = $2
    city = $3

    if (age > 18) {
        adults++
    }

    printf "%-10s %3d %s\\n", name, age, city
}

END {
    print ""
    print "Total adults:", adults
    print "Total records:", NR
}`,

  sed: `# Sed script example
# Remove blank lines
/^$/d

# Replace tabs with spaces
s/\\t/    /g

# Convert to uppercase
y/abcdefghijklmnopqrstuvwxyz/ABCDEFGHIJKLMNOPQRSTUVWXYZ/

# Add line numbers
=

# Delete lines containing pattern
/DELETE_ME/d

# Substitute with backreference
s/\\([0-9]\\{4\\}\\)-\\([0-9]\\{2\\}\\)-\\([0-9]\\{2\\}\\)/\\3\\/\\2\\/\\1/g`,

  // Database Languages
  mongodb: `// MongoDB query example
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

  redis: `# Redis commands example
SET user:1:name "John Doe"
GET user:1:name
EXPIRE user:1:name 3600

HSET user:1 name "John" age 30 email "john@example.com"
HGETALL user:1
HINCRBY user:1 age 1

LPUSH notifications "New message"
RPUSH notifications "System update"
LRANGE notifications 0 -1

ZADD leaderboard 100 "player1" 200 "player2" 150 "player3"
ZREVRANGE leaderboard 0 2 WITHSCORES

SUBSCRIBE channel:updates
PUBLISH channel:updates "Hello subscribers!"`,

  cassandra: `-- CQL (Cassandra Query Language) example
CREATE KEYSPACE IF NOT EXISTS my_app
WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 3
};

USE my_app;

CREATE TABLE users (
  user_id UUID PRIMARY KEY,
  username TEXT,
  email TEXT,
  created_at TIMESTAMP
);

INSERT INTO users (user_id, username, email, created_at)
VALUES (uuid(), 'john_doe', 'john@example.com', toTimestamp(now()));

SELECT * FROM users WHERE user_id = ?;

CREATE INDEX ON users (email);`,

  sparql: `# SPARQL query example
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dbo: <http://dbpedia.org/ontology/>

SELECT ?name ?birthDate ?birthPlace
WHERE {
  ?person rdf:type dbo:Person .
  ?person foaf:name ?name .
  ?person dbo:birthDate ?birthDate .
  OPTIONAL { ?person dbo:birthPlace ?birthPlace }
  FILTER (YEAR(?birthDate) > 1990)
}
ORDER BY ?birthDate
LIMIT 100`,

  hiveql: `-- HiveQL query example
CREATE DATABASE IF NOT EXISTS analytics;
USE analytics;

CREATE EXTERNAL TABLE IF NOT EXISTS events (
  event_id STRING,
  user_id STRING,
  event_type STRING,
  event_data MAP<STRING, STRING>,
  created_at TIMESTAMP
)
PARTITIONED BY (dt STRING)
STORED AS PARQUET
LOCATION '/data/events';

SELECT
  user_id,
  COUNT(*) as event_count,
  COLLECT_SET(event_type) as event_types
FROM events
WHERE dt >= '2024-01-01'
GROUP BY user_id
HAVING COUNT(*) > 10
ORDER BY event_count DESC
LIMIT 1000;`,

  // Query Languages
  xpath: `<!-- XPath expressions example -->
/bookstore/book
/bookstore/book[1]
/bookstore/book[last()]
/bookstore/book[position()<3]
/bookstore/book[price>35]
//title[@lang='en']
/bookstore/book/title | /bookstore/book/price
//book[author='J.K. Rowling']/title/text()
//book[@category='fiction' and price<30]
count(//book)
sum(//book/price)
//book[contains(title, 'Harry')]
//book[starts-with(author, 'J')]`,

  xquery: `(: XQuery example :)
xquery version "3.1";

declare namespace books = "http://example.com/books";

declare function local:discount($price as xs:decimal) as xs:decimal {
  $price * 0.9
};

let $books := doc("books.xml")//book
for $book in $books
where $book/price > 30
order by $book/title
return
  <discounted-book>
    <title>{$book/title/text()}</title>
    <original-price>{$book/price/text()}</original-price>
    <discounted-price>{local:discount($book/price)}</discounted-price>
  </discounted-book>`,

  jq: `# jq JSON processing example
.users[] | select(.age >= 18) | {name, email}

# Group by country and count
group_by(.country) | map({country: .[0].country, count: length})

# Transform nested structure
{
  total: .items | length,
  sum: [.items[].price] | add,
  names: [.items[].name] | unique
}

# Filter and map with conditions
.data | map(select(.status == "active")) | sort_by(.created_at) | reverse

# Recursive descent
.. | objects | select(has("error")) | .error`,

  // Hardware Description Languages
  vhdl: `-- VHDL example: 4-bit counter
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

  systemverilog: `// SystemVerilog example: FIFO
module fifo #(
    parameter DATA_WIDTH = 8,
    parameter DEPTH = 16
)(
    input  logic                  clk,
    input  logic                  rst_n,
    input  logic                  wr_en,
    input  logic                  rd_en,
    input  logic [DATA_WIDTH-1:0] wr_data,
    output logic [DATA_WIDTH-1:0] rd_data,
    output logic                  full,
    output logic                  empty
);

    logic [DATA_WIDTH-1:0] mem [DEPTH-1:0];
    logic [$clog2(DEPTH):0] wr_ptr, rd_ptr;

    assign full  = (wr_ptr[$clog2(DEPTH)] != rd_ptr[$clog2(DEPTH)]) &&
                   (wr_ptr[$clog2(DEPTH)-1:0] == rd_ptr[$clog2(DEPTH)-1:0]);
    assign empty = (wr_ptr == rd_ptr);

    always_ff @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            wr_ptr <= '0;
            rd_ptr <= '0;
        end else begin
            if (wr_en && !full)
                wr_ptr <= wr_ptr + 1;
            if (rd_en && !empty)
                rd_ptr <= rd_ptr + 1;
        end
    end

endmodule`,

  // Assembly Languages
  arm: `// ARM Assembly example
.global _start
.section .text

_start:
    // Initialize stack pointer
    LDR SP, =stack_top

    // Load values
    MOV R0, #10        // First number
    MOV R1, #20        // Second number

    // Call function
    BL add_numbers

    // Store result
    LDR R2, =result
    STR R0, [R2]

    // Exit
    MOV R7, #1
    SWI 0

add_numbers:
    PUSH {LR}
    ADD R0, R0, R1
    POP {PC}

.section .data
result: .word 0

.section .bss
    .space 1024
stack_top:`,

  mips: `# MIPS Assembly example
.data
    message: .asciiz "Hello, World!\\n"
    array:   .word 5, 3, 8, 1, 9, 2, 7, 4, 6
    size:    .word 9

.text
.globl main

main:
    # Print message
    li $v0, 4
    la $a0, message
    syscall

    # Load array address and size
    la $t0, array
    lw $t1, size

    # Sum array elements
    li $t2, 0          # sum = 0
    li $t3, 0          # i = 0

loop:
    bge $t3, $t1, done
    sll $t4, $t3, 2    # offset = i * 4
    add $t4, $t0, $t4  # address = base + offset
    lw $t5, 0($t4)     # load element
    add $t2, $t2, $t5  # sum += element
    addi $t3, $t3, 1   # i++
    j loop

done:
    # Exit
    li $v0, 10
    syscall`,

  nasm: `; NASM x86-64 Assembly example
section .data
    message db "Hello, World!", 10, 0
    msglen  equ $ - message

section .bss
    buffer resb 256

section .text
    global _start

_start:
    ; Write message to stdout
    mov rax, 1          ; sys_write
    mov rdi, 1          ; stdout
    mov rsi, message    ; buffer
    mov rdx, msglen     ; length
    syscall

    ; Call factorial function
    mov rdi, 5
    call factorial

    ; Exit
    mov rax, 60         ; sys_exit
    xor rdi, rdi        ; status 0
    syscall

factorial:
    push rbp
    mov rbp, rsp

    cmp rdi, 1
    jle .base_case

    push rdi
    dec rdi
    call factorial
    pop rdi
    imul rax, rdi
    jmp .done

.base_case:
    mov rax, 1

.done:
    pop rbp
    ret`,

  // Game Development
  gdscript: `# GDScript example (Godot Engine)
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

    move_and_slide()
    update_animation(direction)

func take_damage(amount: int) -> void:
    health -= amount
    health_changed.emit(health)
    if health <= 0:
        died.emit()`,

  unrealscript: `// UnrealScript example (Unreal Engine 3)
class MyCharacter extends Pawn
    config(Game);

var config float MoveSpeed;
var config float JumpHeight;
var int Health;
var repnotify bool bIsDead;

replication
{
    if (bNetDirty)
        Health, bIsDead;
}

simulated event PostBeginPlay()
{
    Super.PostBeginPlay();
    Health = 100;
    SetTimer(1.0, true, 'RegenerateHealth');
}

function TakeDamage(int Damage, Controller InstigatedBy,
                   vector HitLocation, vector Momentum,
                   class<DamageType> DamageType)
{
    Health -= Damage;
    if (Health <= 0)
    {
        bIsDead = true;
        GotoState('Dead');
    }
}

state Dead
{
    ignores TakeDamage;

    event BeginState(Name PreviousStateName)
    {
        PlayDying();
        SetTimer(3.0, false, 'Respawn');
    }
}

defaultproperties
{
    MoveSpeed=600.0
    JumpHeight=400.0
    Health=100
}`,

  angelscript: `// AngelScript example
class Player {
    private float health = 100.0f;
    private vec3 position;
    private string name;

    Player(const string &in playerName) {
        name = playerName;
        position = vec3(0, 0, 0);
    }

    void Update(float deltaTime) {
        // Movement logic
        vec3 input = GetInputVector();
        position += input * MOVE_SPEED * deltaTime;

        // Clamp position
        position.x = clamp(position.x, -100.0f, 100.0f);
        position.z = clamp(position.z, -100.0f, 100.0f);
    }

    void TakeDamage(float amount) {
        health -= amount;
        if (health <= 0) {
            OnDeath();
        }
    }

    bool get_IsAlive() const property {
        return health > 0;
    }

    void set_Position(const vec3 &in pos) property {
        position = pos;
    }
}

void main() {
    Player@ player = Player("Hero");
    player.Position = vec3(10, 0, 10);

    while (player.IsAlive) {
        player.Update(0.016f);
    }
}`,

  // CSS Preprocessors
  stylus: `// Stylus example
$primary-color = #3498db
$secondary-color = #2ecc71
$font-stack = 'Helvetica Neue', sans-serif

border-radius($radius = 5px)
  -webkit-border-radius $radius
  -moz-border-radius $radius
  border-radius $radius

box-shadow($shadow...)
  -webkit-box-shadow $shadow
  -moz-box-shadow $shadow
  box-shadow $shadow

.container
  max-width 1200px
  margin 0 auto
  padding 20px

.button
  display inline-block
  padding 10px 20px
  background $primary-color
  color white
  border-radius(4px)
  transition all 0.3s ease

  &:hover
    background darken($primary-color, 10%)
    box-shadow(0 2px 10px rgba(0,0,0,0.2))

  &.secondary
    background $secondary-color`,

  sass: `// Sass (indented syntax) example
$primary: #3498db
$font-size: 16px
$spacing: 20px

=flex-center
  display: flex
  justify-content: center
  align-items: center

=responsive($breakpoint)
  @if $breakpoint == mobile
    @media (max-width: 480px)
      @content
  @else if $breakpoint == tablet
    @media (max-width: 768px)
      @content

%button-base
  padding: 10px 20px
  border: none
  cursor: pointer
  transition: all 0.3s ease

.container
  max-width: 1200px
  margin: 0 auto
  +flex-center

  +responsive(mobile)
    padding: $spacing / 2

.button
  @extend %button-base
  background: $primary
  color: white

  &:hover
    background: darken($primary, 10%)`,

  postcss: `/* PostCSS example with modern CSS features */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --spacing: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing);

  @media (width <= 768px) {
    padding: calc(var(--spacing) / 2);
  }
}

.button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--primary-color);
  color: white;
  border-radius: 4px;

  &:hover {
    background: color-mix(in srgb, var(--primary-color), black 10%);
  }

  &:is(:focus, :focus-visible) {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
}

@layer utilities {
  .sr-only {
    position: absolute;
    clip: rect(0 0 0 0);
  }
}`,

  // Config Languages
  jsonnet: `// Jsonnet example
local utils = import 'utils.libsonnet';

local config = {
  name: 'my-app',
  version: '1.0.0',

  local base_port = 3000,

  services: {
    api: {
      port: base_port,
      replicas: 3,
      env: {
        NODE_ENV: 'production',
        LOG_LEVEL: 'info',
      },
    },
    worker: {
      port: base_port + 1,
      replicas: 2,
      env: self.api.env + {
        WORKER_CONCURRENCY: '4',
      },
    },
  },

  generate_service(name, config):: {
    apiVersion: 'v1',
    kind: 'Service',
    metadata: { name: name },
    spec: {
      ports: [{ port: config.port }],
      selector: { app: name },
    },
  },
};

{
  ['service-%s.json' % name]: config.generate_service(name, svc)
  for name, svc in config.services
}`,

  hcl: `# HCL (Terraform) example
terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket = "my-terraform-state"
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
  }
}

variable "environment" {
  type        = string
  default     = "production"
  description = "Deployment environment"
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

  lifecycle {
    create_before_destroy = true
  }
}

output "instance_ips" {
  value = aws_instance.web[*].public_ip
}`,

  cue: `// CUE example
package config

import "strings"

#Service: {
    name:     string & =~"^[a-z]+$"
    port:     int & >0 & <65536
    replicas: int | *1
    env: [string]: string
}

#Deployment: {
    apiVersion: "apps/v1"
    kind:       "Deployment"
    metadata: {
        name:      string
        namespace: string | *"default"
        labels:    #Labels
    }
    spec: {
        replicas: int | *1
        selector: matchLabels: #Labels
    }
}

#Labels: {
    app:         string
    environment: "dev" | "staging" | "prod"
}

services: [Name=_]: #Service & {
    name: strings.ToLower(Name)
}

services: {
    api: {
        port:     3000
        replicas: 3
        env: {
            NODE_ENV: "production"
        }
    }
    worker: {
        port:     3001
        replicas: 2
    }
}`,

  dhall: `-- Dhall example
let Prelude = https://prelude.dhall-lang.org/v21.1.0/package.dhall

let Config = { name : Text, port : Natural, debug : Bool }

let Service = { Type = Config, default = { port = 8080, debug = False } }

let makeService = \\(name : Text) -> Service::{ name }

let services =
      [ makeService "api" // { port = 3000 }
      , makeService "worker" // { port = 3001 }
      , makeService "scheduler" // { debug = True }
      ]

let generateConfig =
      \\(svc : Config) ->
        ''
        [service]
        name = "\${svc.name}"
        port = \${Natural/show svc.port}
        debug = \${if svc.debug then "true" else "false"}
        ''

let allConfigs = Prelude.Text.concatMap Config generateConfig services

in  { services, allConfigs }`,

  hocon: `# HOCON example
app {
  name = "my-application"
  version = "1.0.0"

  # Include environment-specific config
  include required("environment.conf")

  database {
    host = "localhost"
    host = \${?DB_HOST}  # Override from environment
    port = 5432
    name = "myapp"

    pool {
      min-connections = 5
      max-connections = 20
      timeout = 30 seconds
    }
  }

  http {
    port = 8080
    bind-address = "0.0.0.0"

    cors {
      allowed-origins = ["https://example.com"]
      allowed-methods = ["GET", "POST", "PUT", "DELETE"]
    }
  }

  features {
    feature-flags = {
      new-dashboard = true
      beta-api = false
    }
  }
}`,

  // Scientific/Statistical
  sas: `/* SAS example */
libname mylib '/data/project';

data work.customers;
    set mylib.raw_customers;

    /* Create derived variables */
    age = intck('year', birth_date, today());

    /* Categorize customers */
    length segment $20;
    if total_purchases > 10000 then segment = 'Premium';
    else if total_purchases > 1000 then segment = 'Regular';
    else segment = 'New';

    /* Format dates */
    format birth_date date9. last_purchase datetime20.;
run;

proc sql;
    create table work.summary as
    select
        segment,
        count(*) as customer_count,
        mean(total_purchases) as avg_purchases,
        sum(total_purchases) as total_revenue
    from work.customers
    group by segment
    order by total_revenue desc;
quit;

proc sgplot data=work.summary;
    vbar segment / response=total_revenue;
    title 'Revenue by Customer Segment';
run;`,

  stata: `* Stata example
clear all
set more off

* Load data
use "customers.dta", clear

* Summary statistics
summarize age income purchases, detail

* Create categories
gen age_group = .
replace age_group = 1 if age < 30
replace age_group = 2 if age >= 30 & age < 50
replace age_group = 3 if age >= 50

label define age_lbl 1 "Young" 2 "Middle" 3 "Senior"
label values age_group age_lbl

* Regression analysis
regress purchases income age i.age_group, robust

* Store results
estimates store model1

* Margins
margins age_group, atmeans

* Export results
esttab model1 using "results.rtf", replace ///
    b(%9.3f) se(%9.3f) star(* 0.10 ** 0.05 *** 0.01) ///
    title("Regression Results")`,

  maxima: `/* Maxima Computer Algebra System example */

/* Define a function */
f(x) := x^3 - 2*x^2 + x - 1;

/* Differentiate */
diff(f(x), x);

/* Integrate */
integrate(f(x), x);

/* Solve equation */
solve(f(x) = 0, x);

/* Matrix operations */
A: matrix([1, 2, 3], [4, 5, 6], [7, 8, 9]);
B: matrix([9, 8, 7], [6, 5, 4], [3, 2, 1]);

/* Matrix multiplication */
A . B;

/* Eigenvalues */
eigenvalues(A);

/* Taylor series */
taylor(sin(x), x, 0, 5);

/* Limit */
limit(sin(x)/x, x, 0);

/* Simplify expression */
ratsimp((x^2 - 1)/(x - 1));`,

  // Legacy Languages
  basic: `REM BASIC example program
10 PRINT "Number Guessing Game"
20 LET SECRET = INT(RND * 100) + 1
30 LET TRIES = 0

40 INPUT "Guess a number (1-100): ", GUESS
50 LET TRIES = TRIES + 1

60 IF GUESS < SECRET THEN PRINT "Too low!": GOTO 40
70 IF GUESS > SECRET THEN PRINT "Too high!": GOTO 40

80 PRINT "Correct! You got it in "; TRIES; " tries!"

90 INPUT "Play again (Y/N)? ", AGAIN$
100 IF AGAIN$ = "Y" OR AGAIN$ = "y" THEN GOTO 20
110 END

' Subroutine example
200 SUB PrintMenu
210   PRINT "1. New Game"
220   PRINT "2. High Scores"
230   PRINT "3. Exit"
240 END SUB`,

  foxpro: `* FoxPro/Visual FoxPro example
SET TALK OFF
SET EXACT ON

LOCAL lcName, lnAge, ldDate

* Open table
USE customers IN 0 ALIAS cust

* Create cursor with SQL
SELECT customer_id, ;
       ALLTRIM(first_name) + " " + ALLTRIM(last_name) AS full_name, ;
       DTOS(order_date) AS order_date, ;
       total_amount ;
FROM orders ;
INNER JOIN customers ON orders.customer_id = customers.id ;
WHERE YEAR(order_date) = YEAR(DATE()) ;
ORDER BY total_amount DESC ;
INTO CURSOR curResults

* Loop through results
SCAN
    ? "Customer: " + full_name
    ? "Amount: " + TRANSFORM(total_amount, "$999,999.99")
    ?
ENDSCAN

* Create class
DEFINE CLASS Customer AS Custom
    cName = ""
    nAge = 0

    PROCEDURE Init(tcName, tnAge)
        THIS.cName = tcName
        THIS.nAge = tnAge
    ENDPROC

    PROCEDURE GetInfo
        RETURN THIS.cName + " (" + ALLTRIM(STR(THIS.nAge)) + ")"
    ENDPROC
ENDDEFINE`,

  clipper: `// Clipper/Harbour example
#include "inkey.ch"
#include "dbstruct.ch"

FUNCTION Main()
    LOCAL aCustomers := {}
    LOCAL nChoice

    SET DATE FORMAT "yyyy-mm-dd"
    SET DELETED ON

    // Open database
    USE customers NEW ALIAS cust
    INDEX ON customer_id TO cust_id

    // Menu loop
    DO WHILE .T.
        @ 2, 10 SAY "Customer Management System"
        @ 4, 10 PROMPT "1. Add Customer"
        @ 5, 10 PROMPT "2. Edit Customer"
        @ 6, 10 PROMPT "3. Delete Customer"
        @ 7, 10 PROMPT "4. List Customers"
        @ 8, 10 PROMPT "5. Exit"

        MENU TO nChoice

        DO CASE
            CASE nChoice == 1
                AddCustomer()
            CASE nChoice == 5
                EXIT
        ENDCASE
    ENDDO

    CLOSE ALL
RETURN NIL

FUNCTION AddCustomer()
    LOCAL cName := SPACE(50)
    LOCAL cEmail := SPACE(100)

    @ 10, 10 SAY "Name: " GET cName PICTURE "@!"
    @ 11, 10 SAY "Email:" GET cEmail
    READ

    IF LASTKEY() != K_ESC
        APPEND BLANK
        REPLACE name WITH ALLTRIM(cName)
        REPLACE email WITH ALLTRIM(cEmail)
    ENDIF
RETURN NIL`,

  // Esoteric Languages
  brainfuck: `Hello World in Brainfuck
++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]
>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.

Simple counter (prints 0-9)
++++++++++[>+++++++>++++++++++>+++>+<<<<-]
>++.>+.+++++++..+++.>++.>++++++++++++++.
------------.<++++++++.--------.+++.------.--------.>+.

Add two numbers (2+3=5)
++>+++[<+>-]<.`,

  befunge: `v Hello World in Befunge-93
>              v
v"Hello World!"<
>:v
^,_@

v Simple counter
0>:9\\'0+.v
 ^  +1:<

v Calculate factorial of 5
5>:1-:v v *_$.@
  ^   _$>\\:^`,

  whitespace: `Whitespace: Hello World
(Note: Actual whitespace code uses spaces, tabs, and newlines)

Push 72 (H)
Push 101 (e)
Push 108 (l)
Push 108 (l)
Push 111 (o)
Push 32 (space)
Push 87 (W)
Push 111 (o)
Push 114 (r)
Push 108 (l)
Push 100 (d)
Push 33 (!)
Output characters
End program`,

  // Scripting/Automation
  applescript: `-- AppleScript example
tell application "Finder"
    set desktopPath to path to desktop folder as text

    -- Create new folder
    set newFolder to make new folder at desktop with properties {name:"My Scripts"}

    -- Get list of files
    set fileList to every file of desktop

    repeat with aFile in fileList
        set fileName to name of aFile
        if fileName ends with ".txt" then
            move aFile to newFolder
        end if
    end repeat
end tell

-- Dialog example
display dialog "Enter your name:" default answer ""
set userName to text returned of result

display notification "Hello, " & userName with title "Greeting"

-- System events
tell application "System Events"
    keystroke "Hello World"
    key code 36 -- Return key
end tell`,

  autohotkey: `; AutoHotkey example
#Requires AutoHotkey v2.0
#SingleInstance Force

; Global variables
global AppName := "My Script"
global Counter := 0

; Hotkey: Ctrl+Shift+H
^+h:: {
    MsgBox("Hello from AutoHotkey!")
}

; Hotstring: Type "btw" to expand
::btw::by the way

; Function to center window
CenterWindow(WinTitle) {
    WinGetPos(,, &Width, &Height, WinTitle)
    WinMove((A_ScreenWidth - Width) / 2, (A_ScreenHeight - Height) / 2,,, WinTitle)
}

; GUI example
MyGui := Gui(, AppName)
MyGui.Add("Text",, "Enter your name:")
NameEdit := MyGui.Add("Edit", "w200")
MyGui.Add("Button", "Default", "OK").OnEvent("Click", ButtonOK)
MyGui.Show()

ButtonOK(*) {
    global Counter
    Counter++
    MsgBox("Hello, " . NameEdit.Value . "! Click count: " . Counter)
}`,

  autoit: `; AutoIt example
#include <GUIConstantsEx.au3>
#include <WindowsConstants.au3>
#include <Array.au3>

Global $sAppName = "My Application"
Global $aItems[0]

; Create GUI
$hGUI = GUICreate($sAppName, 400, 300)
$idList = GUICtrlCreateList("", 10, 10, 200, 200)
$idInput = GUICtrlCreateInput("", 10, 220, 200, 25)
$idAddBtn = GUICtrlCreateButton("Add", 220, 220, 80, 25)
$idRemoveBtn = GUICtrlCreateButton("Remove", 310, 220, 80, 25)

GUISetState(@SW_SHOW)

; Main loop
While 1
    $nMsg = GUIGetMsg()

    Switch $nMsg
        Case $GUI_EVENT_CLOSE
            ExitLoop

        Case $idAddBtn
            $sText = GUICtrlRead($idInput)
            If $sText <> "" Then
                _ArrayAdd($aItems, $sText)
                GUICtrlSetData($idList, $sText)
                GUICtrlSetData($idInput, "")
            EndIf

        Case $idRemoveBtn
            $sSelected = GUICtrlRead($idList)
            If $sSelected <> "" Then
                $iIndex = _ArraySearch($aItems, $sSelected)
                If $iIndex >= 0 Then
                    _ArrayDelete($aItems, $iIndex)
                EndIf
            EndIf
    EndSwitch
WEnd

GUIDelete($hGUI)`,
};

export default tier7Examples;
