let mk_list s =
    List.map String.trim @@
    List.filter (fun s->String.length s <> 0) @@
    String.split_on_char '\n' s

let xs = mk_list {|
    2D ray tracer
    5D fractals
    a debugger
    a vector font renderer
    a web scraper
    anthropic
    body idiom catalog
    Buffy search
    cellular automata
    chinese idiom instruction
    CJK segmentation
    Eulerian paths
    Facebook
    farming game
    friend fair-travel planner
    I Ching
    karaoke server
    Minesweeper
    Misrosoft Powerpint
    Open Telemetry
    project idea generator
    public Unix box
    ray-traced audio
    RCTV
    replacement for SQL
    silicone controllers
    Stripe
    text-based MUD
    the service formerly known as Twitter
    Uber
|}
let ys = mk_list {|
    bears
    cats
    chess actions
    dance partners
    dogs
    the enterprise
    karaoke singers
    LLMs
    Nix users
    prose/fiction
    vampires
    whale sharks
|}
let zs = mk_list {|
    assembly
    C
    COBOL
    Elixir
    Gleam
    Godot
    Haskell
    JavaScript
    an LSP server
    an MCP server
    OCaml
    PEGs
    Python
    a recursive CTE
    vim script
    Zig
|}
let bs = mk_list {|
    a 6502
    the blockchain
    nix
    an Nvidia H100
    POSEVAC
    the RapidRiter
    a Raspberry Pi
    the RCade
    RCTV
|}
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
    with a swiping twist
    with a IOT twist
    with camera input
    with extra AI
    with phong shading
    with spinner inputs
|}
