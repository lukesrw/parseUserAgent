const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

let regex = JSON.stringify(
    JSON.parse(readFileSync(join(__dirname, "..", "src", "data", "regex.json")))
);

writeFileSync(join(__dirname, "..", "dist", "php", "regex.json"), regex);
writeFileSync(join(__dirname, "..", "dist", "js", "regex.json"), regex);
