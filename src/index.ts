import {
    BrowserParserInterface,
    ParsedUAInterface
} from "./interfaces/user-interface";

const regexes: BrowserParserInterface = require("../../data/regex.json");

const UNKNOWN_BROWSER_VERSION = "Unknown Browser Version";

export function parseUserAgent(user_agent: string): ParsedUAInterface {
    let weight: number = 0;
    let result: ParsedUAInterface = {
        browser_name: "Unknown Browser",
        browser_version: UNKNOWN_BROWSER_VERSION
    };

    for (let pattern in regexes) {
        if (Object.prototype.hasOwnProperty.call(regexes, pattern)) {
            let regex: RegExp = new RegExp(
                pattern.substr(1, pattern.lastIndexOf("/") - 1),
                `${pattern.substr(pattern.lastIndexOf("/") + 1)}u`
            );

            let matches = regex.exec(user_agent);

            if (matches && regexes[pattern].w > weight) {
                weight = regexes[pattern].w;

                result.browser_name = regexes[pattern].bn;

                if (
                    matches.groups &&
                    Object.prototype.hasOwnProperty.call(
                        matches.groups,
                        "bv"
                    ) &&
                    matches.groups.bv
                ) {
                    result.browser_version = matches.groups.bv;
                } else if (
                    !Object.prototype.hasOwnProperty.call(
                        result,
                        "browser_version"
                    )
                ) {
                    result.browser_version = UNKNOWN_BROWSER_VERSION;
                }
            }
        }
    }

    return result;
}
