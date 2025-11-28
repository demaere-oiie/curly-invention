"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var xs = [
    "5D fractals",
    "a debugger",
    "a vector font renderer",
    "a web scraper",
    "anthropic",
    "body idiom catalog",
    "Buffy Search",
    "cellular automata",
    "chinese Idiom instruction",
    "Eulerian paths",
    "Facebook",
    "I Ching",
    "Minesweeper",
    "Misrosoft Powerpint",
    "Open Telemetry",
    "project idea generator",
    "public Unix box",
    "ray-traced audio",
    "RCTV",
    "replacement for SQL",
    "Stripe",
    "text-based MUD",
    "the service formerly known as Twitter",
    "Uber",
];
var ys = [
    "bears",
    "cats",
    "chess actions",
    "dance partners",
    "dogs",
    "the Enterprise",
    "LLMs",
    "Nix users",
    "prose/fiction",
    "vampires",
    "whale sharks",
];
var zs = [
    "assembly",
    "C",
    "COBOL",
    "Elixir",
    "Gleam",
    "Haskell",
    "JavaScript",
    "an LSP server",
    "an MCP server",
    "OCaml",
    "PEGs",
    "Python",
    "a recursive CTE",
    "vim script",
    "Zig",
];
var bs = [
    "a 6502",
    "the blockchain",
    "nix",
    "an Nvidia H100",
    "POSEVAC",
    "the RapidRiter",
    "a Raspberry Pi",
    "the RCade",
    "RCTV",
];
var cs = [
    "and it's been golfed",
    "at nuclear test sites",
    "but e2e encrypted",
    "but social",
    "but *very* fast",
    "but vibecoded",
    "configured in Nix",
    "solving the halting problem",
    "via embeddings",
    "with a swiping twist",
    "with a IOT twist",
    "with camera input",
    "with extra AI",
    "with phong shading",
];
;
var Node_ = (function () {
    function Node_() {
    }
    return Node_;
}());
;
var Terminal = (function (_super) {
    __extends(Terminal, _super);
    function Terminal(text) {
        var _this = _super.call(this) || this;
        _this.text = text;
        return _this;
    }
    Terminal.prototype.ways = function (n) {
        return (n == 1 ? 1 : 0);
    };
    Terminal.prototype.kth = function (n, k) {
        return (n == 1 ? this.text : "*barf*");
    };
    return Terminal;
}(Node_));
var Empty = (function (_super) {
    __extends(Empty, _super);
    function Empty() {
        return _super.call(this) || this;
    }
    Empty.prototype.ways = function (n) {
        return (n == 0 ? 1 : 0);
    };
    Empty.prototype.kth = function (n, k) {
        return (n == 0 ? "" : "*barf*");
    };
    return Empty;
}(Node_));
;
var Alt = (function (_super) {
    __extends(Alt, _super);
    function Alt(left, right) {
        var _this = _super.call(this) || this;
        _this.l = left;
        _this.r = right;
        return _this;
    }
    Alt.prototype.ways = function (n) {
        return this.l.ways(n) + this.r.ways(n);
    };
    Alt.prototype.kth = function (n, k) {
        var lefts = this.l.ways(n);
        if (k < lefts) {
            return this.l.kth(n, k);
        }
        else {
            return this.r.kth(n, k - lefts);
        }
    };
    return Alt;
}(Node_));
;
var Seq = (function (_super) {
    __extends(Seq, _super);
    function Seq(left, right) {
        var _this = _super.call(this) || this;
        _this.l = left;
        _this.r = right;
        return _this;
    }
    Seq.prototype.ways = function (n) {
        var tot = 0;
        for (var m = 0; m <= n; m++) {
            tot += this.l.ways(m) * this.r.ways(n - m);
        }
        return tot;
    };
    Seq.prototype.kth = function (n, k) {
        var tot = 0;
        for (var m = 0; m <= n; m++) {
            var more = this.l.ways(m) * this.r.ways(n - m);
            if (k < tot + more) {
                var mod = this.l.ways(m);
                var knew = k - tot;
                return (this.l.kth(m, knew % mod) + " " +
                    this.r.kth(n - m, Math.floor(knew / mod)));
            }
            tot += more;
        }
    };
    return Seq;
}(Node_));
;
var Dist = (function (_super) {
    __extends(Dist, _super);
    function Dist(right) {
        var _this = _super.call(this) || this;
        _this.r = right;
        return _this;
    }
    Dist.prototype.ways = function (n) {
        var tot = 0;
        for (var m = 0; m <= n; m++) {
            tot += this.r.ways(m);
            console.log(tot);
        }
        return tot;
    };
    Dist.prototype.kth = function (n, k) {
        var tot = 0;
        for (var m = 0; m <= n; m++) {
            var more = this.r.ways(m);
            if (k < tot + more) {
                return this.r.kth(m, k - tot);
            }
            tot += more;
        }
    };
    return Dist;
}(Node_));
function Alts(list) {
    if (list.length == 1) {
        if (list[0] instanceof Node_) {
            return list[0];
        }
        return new Terminal(list[0]);
    }
    else {
        var m = Math.floor(list.length / 2);
        return new Alt(Alts(list.slice(0, m)), Alts(list.slice(m)));
    }
}
function Seqs(list) {
    if (list.length == 1) {
        if (list[0] instanceof Node_) {
            return list[0];
        }
        return new Terminal(list[0]);
    }
    else {
        var m = Math.floor(list.length / 2);
        return new Seq(Seqs(list.slice(0, m)), Seqs(list.slice(m)));
    }
}
function Sentence(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1) + "!";
}
function main() {
    var elem = document.querySelector("#genText");
    var xpr = new Dist(Alts([Seqs([Alts(xs), "for", Alts(ys), "in", Alts(zs)]),
        Seqs([Alts(zs), "implemented in", Alts(zs), "on", Alts(bs)]),
        Seqs([Alts(zs), "version of", Alts(xs), Alts(cs)]),
        Seqs([Alts(xs), "meets", Alts(xs), Alts(cs)]),
        Seqs([Alts(xs), Alts(cs), "—", "in", Alts(zs)])]));
    var ways = xpr.ways(10);
    var k = Math.floor(Math.random() * ways);
    elem.innerHTML = Sentence(xpr.kth(10, k));
}
main();
//# sourceMappingURL=index.js.map