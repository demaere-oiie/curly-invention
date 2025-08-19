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

function sample(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function main() {
    const elem = document.querySelector("#genText");
    const template = Math.floor(Math.random() * 2);
    if (template == 0) {
        elem.innerHTML = `${sample(xs)} for ${sample(ys)} in ${sample(zs)}`;
    } else if (template == 1) {
        elem.innerHTML = `${sample(zs)} implemented in ${sample(zs)} on ${sample(bs)}`;
    } else if (template == 2) {
        elem.innerHTML = `${sample(xs)} meets ${sample(xs)} ${sample(cs)}`;
    }
}

main();
