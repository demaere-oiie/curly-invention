const xs = [
"Anthropic",
"Facebook",
"Stripe",
"the service formerly known as Twitter",
"Uber",
];

const ys = [
"cats",
"dogs",
"the Enterprise",
"LLMs",
"vampires",
];

const zs = [
"assembly",
"COBOL",
"Haskell",
"JavaScript",
"Python",
];

const bs = [
"a 6502",
"the blockchain",
"an Nvidia A16",
"a Raspberry Pi",
];

function sample(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function main() {
    const elem = document.querySelector("#genText");
    const template = Math.floor(Math.random() * 2);
    if (template == 0) {
        elem.innerHTML = `${sample(xs)} for ${sample(ys)} in ${sample(zs)}`;
    } else if (template == 1) {
        elem.innerHTML = `${sample(zs)} implemented in ${sample(zs)} on a ${sample(bs)}`;
    }
}

main();
