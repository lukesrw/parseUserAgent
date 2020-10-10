const fs = require("fs");
const path = require("path");

/*eslint-disable no-sync*/

let regex = fs.readFileSync(path.join(__dirname, "regex_raw.json"));

fs.writeFileSync(
    path.join(__dirname, "regex.json"),
    JSON.stringify(JSON.parse(regex))
);
