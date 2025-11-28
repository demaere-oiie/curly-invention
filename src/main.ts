"use strict";

interface Node_ {
    ways(n:number): number;
    kth(n:number, k:number): string;
};

class Node_ {
}

interface Terminal {
    text: string;
};

class Terminal extends Node_ {
   constructor(text:string) {
       super();
       this.text = text;
   }
   ways(n:number) {
       return (n==1 ? 1 : 0);
   }
   kth(n:number,k:number) {
       return (n==1 ? this.text : "*barf*");
   }
}

class Empty extends Node_ {
   constructor() {
       super();
   }
   ways(n:number) {
       return (n==0 ? 1 : 0);
   }
   kth(n:number,k:number) {
       return (n==0 ? "" : "*barf*");
   }
}

interface Alt {
    l: Node_;
    r: Node_;
};

class Alt extends Node_ {
    constructor(left:Node_,right:Node_) {
        super();
        this.l = left;
        this.r = right;
    }
    ways(n:number) {
        return this.l.ways(n) + this.r.ways(n);
    }
    kth(n:number,k:number) {
        let lefts = this.l.ways(n);
        if (k < lefts) {
            return this.l.kth(n,k);
        } else {
            return this.r.kth(n,k-lefts);
        }
    }
}

interface Seq {
    l: Node_;
    r: Node_;
};

class Seq extends Node_ {
    constructor(left:Node_,right:Node_) {
        super();
        this.l = left;
        this.r = right;
    }
    ways(n:number) {
        let tot = 0;
        for(let m = 0; m <= n; m++) {
            tot += this.l.ways(m) * this.r.ways(n-m);
        }
        return tot;
    }
    kth(n:number,k:number) {
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

type Kludge = Node_ | string;

function Alts(list:Kludge[]):Node_ {
    if(list.length == 1) {
        if (list[0] instanceof Node_) { return list[0]; }
        return new Terminal(list[0]);
    } else {
        let m = Math.floor(list.length / 2);
        return new Alt(Alts(list.slice(0,m)),Alts(list.slice(m)));
    }
}

function Seqs(list:Kludge[]):Node_ {
    if(list.length == 1) {
        if (list[0] instanceof Node_) { return list[0]; }
        return new Terminal(list[0]);
    } else {
        let m = Math.floor(list.length / 2);
        return new Seq(Seqs(list.slice(0,m)),Seqs(list.slice(m)));
    }
}

function sample(list:any[]) {
    return list[Math.floor(Math.random() * list.length)];
}

function Sentence(val:string) {
     return String(val).charAt(0).toUpperCase() + String(val).slice(1) + "!";
}

function main() {
    const elem = document.querySelector("#genText");
    let xpr = Alts([Seqs([Alts(xs),"for",Alts(ys),"in",Alts(zs)]),
                    Seqs([Alts(zs),"implemented in",Alts(zs),"on",Alts(bs)]),
                    Seqs([Alts(zs),"version of",Alts(xs),Alts(cs)]),
                    Seqs([Alts(xs),"meets",Alts(xs),Alts(cs)]),
                    Seqs([Alts(xs),Alts(cs),"—","in",Alts(zs)])]);

    let toks = sample([4,5]);
    let ways = xpr.ways(toks);
    console.log(ways);
    let k = Math.floor(Math.random() * ways);
    elem.innerHTML = Sentence(xpr.kth(toks,k));
}

main();
