open Brr

module L = Reus.Lib
module D = Reus.Data

let ( !! ) = Jstr.v
let gen = El.find_first_by_selector !!"#genText" |> Option.get

let t = L.trm
let mkalts xs = L.alts @@ List.map t xs

let xs = mkalts D.xs
let ys = mkalts D.ys
let zs = mkalts D.zs
let bs = mkalts D.bs
let cs = mkalts D.cs

let xpr = L.Leq (L.alts [L.seqs [xs;t "for";ys;t "in";zs];
                         L.seqs [zs;t "implemented in";zs;t "on";bs];
                         L.seqs [zs;t "version of";xs;cs];
                         L.seqs [xs;t "meets";xs;cs];
                         L.seqs [xs;cs;t "—";t "in";zs]])

let () = 
  let sent = fun s -> String.capitalize_ascii s ^ "!" in
  Random.self_init(); print_int @@ L.ways 10 xpr;
  Jv.set (El.to_jv gen) "innerHTML" @@ Jv.of_string @@ sent @@ L.pick 10 @@ xpr
