"use strict";

const xs = [
"Anthropic",
"Chinese Idiom instruction",
"Facebook",
"Project idea generator",
"Stripe",
"Text-based MUD",
"The service formerly known as Twitter",
"Uber",
];

const ys = [
"cats",
"chess actions",
"dogs",
"the Enterprise",
"LLMs",
"prose/fiction",
"vampires",
];

const zs = [
"Assembly",
"COBOL",
"Elixir",
"Gleam",
"Haskell",
"JavaScript",
"an LSP server",
"an MCP server",
"Python",
];

const bs = [
"a 6502",
"the blockchain",
"an Nvidia A16",
"the Rapidriter",
"a Raspberry Pi",
];

const cs = [
"but e2e encrypted",
"but social",
"but *very* fast",
"with a swiping twist",
"with a IOT twist",
"with extra AI",
];

class Node {
}

class Terminal extends Node {
   constructor(text) {
       super();
       this.text = text;
   }
   ways(n) {
       return (n==1 ? 1 : 0);
   }
   kth(n,k) {
       return (n==1 ? this.text : "*barf*");
   }
}

class Empty extends Node {
   constructor() {
       super();
   }
   ways(n) {
       return (n==0 ? 1 : 0);
   }
   kth(n,k) {
       return (n==0 ? "" : "*barf*");
   }
}

class Alt extends Node {
    constructor(left,right) {
        super();
        this.l = left;
        this.r = right;
    }
    ways(n) {
        return this.l.ways(n) + this.r.ways(n);
    }
    kth(n,k) {
        let lefts = this.l.ways(n);
        if (k < lefts) {
            return this.l.kth(n,k);
        } else {
            return this.r.kth(n,k-lefts);
        }
    }
}

class Seq extends Node {
    constructor(left,right) {
        super();
        this.l = left;
        this.r = right;
    }
    ways(n) {
        let tot = 0;
        for(let m = 0; m <= n; m++) {
            tot += this.l.ways(m) * this.r.ways(n-m);
        }
        return tot;
    }
    kth(n,k) {
        let tot = 0;
        for(let m = 0; m <= n; m++) {
            let more = this.l.ways(m) * this.r.ways(n-m);
            if (k < tot + more) {
                // console.log(`ways ${m} ${n} / ${this.l.ways(m)} ${this.r.ways(n-m)}`);
                let mod = this.l.ways(m);
                let knew = k - tot;
                return (this.l.kth(m,knew % mod) + " " +
                        this.r.kth(n-m,Math.floor(knew / mod)));
            }
            tot += more;
        }
    }
}

function Alts(list) {
    if(list.length == 1) {
        if (list[0] instanceof Node) { return list[0]; }
        return new Terminal(list[0]);
    } else {
        let m = Math.floor(list.length / 2);
        return new Alt(Alts(list.slice(0,m)),Alts(list.slice(m)));
    }
}

function Seqs(list) {
    if(list.length == 1) {
        if (list[0] instanceof Node) { return list[0]; }
        return new Terminal(list[0]);
    } else {
        let m = Math.floor(list.length / 2);
        return new Seq(Seqs(list.slice(0,m)),Seqs(list.slice(m)));
    }
}

function sample(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function main() {
    const elem = document.querySelector("#genText");
    /*
    const template = Math.floor(Math.random() * 3);
    if (template == 0) {
        elem.innerHTML = `${sample(xs)} for ${sample(ys)} in ${sample(zs)}`;
    } else if (template == 1) {
        elem.innerHTML = `${sample(zs)} implemented in ${sample(zs)} on ${sample(bs)}`;
    } else if (template == 2) {
        elem.innerHTML = `${sample(xs)} meets ${sample(xs)} ${sample(cs)}`;
    }*/

    let xpr = Alts([Seqs([Alts(xs),"for",Alts(ys),"in",Alts(zs)]),
                    Seqs([Alts(zs),"implemented in",Alts(zs),"on",Alts(bs)]),
                    Seqs([Alts(xs),"meets",Alts(xs),Alts(cs)])]);

    console.log(xpr);
    let toks = sample([5,5,4]);
    let ways = xpr.ways(toks);
    console.log(ways);
    let k = Math.floor(Math.random() * ways);
    elem.innerHTML = xpr.kth(toks,k);
}

main();
