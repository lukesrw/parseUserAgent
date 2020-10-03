import {
    BrowserParserInterface,
    ParsedBrowserInterface,
    ParsedOperatingSystemInterface,
    ParsedUAInterface
} from "./interfaces/user-interface";

const regexes: BrowserParserInterface = require("../../data/regex.json");

export const UNKNOWN_BN = "Unknown Browser";
export const UNKNOWN_BV = "Unknown Browser Version";

export const UNKNOWN_OSN = "Unknown Operating System";
export const UNKNOWN_OSV = "Unknown Operating System Version";

export function parseBrowser(user_agent: string): ParsedBrowserInterface {
    let weight: number = 0;
    let result: ParsedBrowserInterface = {
        browser_name: UNKNOWN_BN,
        browser_version: UNKNOWN_BV
    };

    for (let pattern in regexes.bn) {
        if (Object.prototype.hasOwnProperty.call(regexes, pattern)) {
            let regex: RegExp = new RegExp(
                pattern.substr(1, pattern.lastIndexOf("/") - 1),
                `${pattern.substr(pattern.lastIndexOf("/") + 1)}u`
            );

            let matches = regex.exec(user_agent);

            if (matches && regexes.bn[pattern].w > weight) {
                weight = regexes.bn[pattern].w;

                result.browser_name = regexes.bn[pattern].bn;

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
                    result.browser_version = UNKNOWN_BV;
                }
            }
        }
    }

    return result;
}

export function parseOperatingSystem(
    user_agent: string
): ParsedOperatingSystemInterface {
    let weight = 0;
    let result: ParsedOperatingSystemInterface = {
        operating_system_name: UNKNOWN_OSN,
        operating_system_version: UNKNOWN_OSV
    };

    for (let pattern in regexes.osn) {
        if (Object.prototype.hasOwnProperty.call(regexes, pattern)) {
            let regex: RegExp = new RegExp(
                pattern.substr(1, pattern.lastIndexOf("/") - 1),
                `${pattern.substr(pattern.lastIndexOf("/") + 1)}u`
            );

            let matches = regex.exec(user_agent);

            if (matches && regexes.osn[pattern].w > weight) {
                weight = regexes.osn[pattern].w;

                result.operating_system_name = regexes.osn[pattern].osn;

                if (
                    matches.groups &&
                    Object.prototype.hasOwnProperty.call(
                        matches.groups,
                        "osv"
                    ) &&
                    matches.groups.osv
                ) {
                    result.operating_system_version = matches.groups.osv;
                } else if (
                    !Object.prototype.hasOwnProperty.call(
                        result,
                        "browser_version"
                    )
                ) {
                    result.operating_system_version = UNKNOWN_OSV;
                }
            }
        }
    }

    return result;
}

export function parseUserAgent(user_agent: string): ParsedUAInterface {
    return Object.assign(
        parseBrowser(user_agent),
        parseOperatingSystem(user_agent)
    );
}
