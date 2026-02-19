let mk_list s =
    List.map String.trim @@
    List.filter (fun s->String.length s <> 0) @@
    String.split_on_char '\n' s

(* projects *)
let xs = mk_list {|
    2D ray tracer
    5D fractals
    a debugger
    a vector font renderer
    a web scraper
    algebraic recipes
    anthropic
    asteroid mining game
    astrology charts
    audio-based programming interface
    binary search
    body idiom catalog
    Buffy search
    cellular automata
    chinese idiom instruction
    CJK segmentation
    CNC painter
    Eulerian paths
    Facebook
    farming game
    friend fair-travel planner
    I Ching
    1337 code challenges
    library registry
    karaoke server
    Minesweeper
    minimal comparison sort
    Misrosoft Powerpint
    Open Telemetry
    Presentation-Driven Development
    project idea generator
    public Unix box
    ray-traced audio
    RCTV
    replacement for SQL
    silicone controllers
    snake game
    Stripe
    surveillance collars
    tarot
    text-based MUD
    the service formerly known as Twitter
    Uber
|}
(* targets *)
let ys = mk_list {|
    après-ski
    bears
    cats
    chess actions
    dance partners
    dogs
    the enterprise
    geometric group theorists
    goats
    karaoke singers
    LLMs
    Nix users
    NSA cryppies
    prose/fiction
    survivor junkies
    vampires
    whale sharks
|}
(* languages *)
let zs = mk_list {|
    assembly
    C
    Clojure
    COBOL
    Elixir
    Gleam
    Godot
    Haskell
    JavaScript
    an LSP server
    MarkDownLang
    an MCP server
    OCaml
    PEGs
    proc macros
    pure vibecoding
    Python
    QBasic
    a recursive CTE
    timing monoids
    vim script
    SKI combinators
    Zig
|}
(* platforms *)
let bs = mk_list {|
    a 6502
    the blockchain
    an LED hat
    nix
    an Nvidia H100
    POSEVAC
    the RapidRiter
    a Raspberry Pi
    the RCade
    RCTV
    transmission over audio
|}
(* misc attribute *)
let cs = mk_list {|
    and it's been golfed
    at nuclear test sites
    but e2e encrypted
    but social
    but *very* fast
    but vibecoded
    configured in Nix
    solving the halting problem
    via embeddings
    with a classical Latin UX
    with a swiping twist
    with a IOT twist
    with camera input
    with extra AI
    with phong shading
    with a Quichua UX
    with spinner inputs
|}
