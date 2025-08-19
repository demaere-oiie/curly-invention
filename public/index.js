const xs = [
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
];

const zs = [
"COBOL",
"JavaScript",
"Python",
];

function sample(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function main() {
    const elem = document.querySelector("#genText");
    elem.innerHTML = `${sample(xs)} for ${sample(ys)} in ${sample(zs)}`;
}

main();
