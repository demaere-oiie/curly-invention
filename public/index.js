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
"LSP server",
"MCP server",
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
       console.log(`${n} ${k}`);
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
                console.log(`ways ${m} ${n} / ${this.l.ways(m)} ${this.r.ways(n-m)}`);
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
        return new Terminal(list[0]);
    } else {
        let m = Math.floor(list.length / 2);
        return new Alt(Alts(list.slice(0,m)),Alts(list.slice(m)));
    }
}

function Seqs(list) {
    if(list.length == 1) {
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
    const template = Math.floor(Math.random() * 3);
    if (template == 0) {
        elem.innerHTML = `${sample(xs)} for ${sample(ys)} in ${sample(zs)}`;
    } else if (template == 1) {
        elem.innerHTML = `${sample(zs)} implemented in ${sample(zs)} on ${sample(bs)}`;
    } else if (template == 2) {
        elem.innerHTML = `${sample(xs)} meets ${sample(xs)} ${sample(cs)}`;
    }

    /*
    console.log(Alts(["a","b","c","d","e"]).ways(0));
    console.log(Alts(["a","b","c","d","e"]).ways(1));
    console.log(Alts(["a","b","c","d","e"]).ways(2));
    console.log("----");
    console.log(Seqs(["a","b","c","d","e"]).ways(4));
    console.log(Seqs(["a","b","c","d","e"]).ways(5));
    console.log(Seqs(["a","b","c","d","e"]).ways(6));
    console.log("----");
    console.log(Alts(["a","b","c","d","e"]).kth(1,0));
    console.log(Alts(["a","b","c","d","e"]).kth(1,1));
    console.log(Alts(["a","b","c","d","e"]).kth(1,2));
    console.log(Alts(["a","b","c","d","e"]).kth(1,3));
    console.log(Alts(["a","b","c","d","e"]).kth(1,4));
    console.log("----");
    console.log(new Seq(Alts(["a","b"]),Alts(["c","d"])).ways(1));
    console.log(new Seq(Alts(["a","b"]),Alts(["c","d"])).ways(2));
    console.log(new Seq(Alts(["a","b"]),Alts(["c","d"])).ways(3));
    console.log(new Seq(Alts(["a","b"]),Alts(["c","d"])).kth(2,0));
    console.log(new Seq(Alts(["a","b"]),Alts(["c","d"])).kth(2,1));
    console.log(new Seq(Alts(["a","b"]),Alts(["c","d"])).kth(2,2));
    console.log(new Seq(Alts(["a","b"]),Alts(["c","d"])).kth(2,3));
    //console.log("----");
    //console.log(Alts(["a","b"]).ways(1));
    //console.log(Alts(["a","b"]).kth(1,0));
    //console.log(Alts(["a","b"]).kth(1,1));
    */
    /*
    let xpr = Seqs([Alts(xs),"for",Alts(ys),"in",Alts(zs)]);
    console.log(xpr);
    let ways = xpr.ways(5);
    let k = Math.floor(Math.random() * ways);
    console.log(ways);
    console.log(xpr.kth(5,k));
    */
}

main();
