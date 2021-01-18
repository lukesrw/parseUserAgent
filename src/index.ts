import {
    UserAgentParserInterface,
    ParsedBrowserInterface,
    ParsedOperatingSystemInterface,
    ParsedUAInterface
} from "./interfaces/user-interface";

import * as Generic from "./interfaces/generic";

const regexes: UserAgentParserInterface = require("../../data/regex.json");
const cache: Generic.Object = {};

export const MOBILE_BROWSER = ["Nokia Web Browser"];
export const MOBILE_OPERATING_SYSTEMS = [
    "Android",
    "iOS",
    "BlackBerry OS",
    "PlayStation Portable System Software"
];

export const UNKNOWN: {
    browser: {
        name: string;
        version: string;
    };
    operating_system: {
        name: string;
        version: string;
    };
} = {
    browser: {
        name: "Unknown Browser",
        version: ""
    },
    operating_system: {
        name: "Unknown Operating System",
        version: ""
    }
};
UNKNOWN.browser.version = `${UNKNOWN.browser.name} Version`;
UNKNOWN.operating_system.version = `${UNKNOWN.operating_system.name} Version`;

function getCache(name: string, user_agent: string, result?: any) {
    if (!Object.prototype.hasOwnProperty.call(cache, name)) {
        cache[name] = {};
    }
    if (result) {
        cache[name][user_agent] = result;

        return cache[name][user_agent];
    }

    return cache[name][user_agent] || false;
}

export function parse(
    category: keyof UserAgentParserInterface,
    user_agent: string
) {
    let cache = getCache(`parse__${category}`, user_agent);
    if (cache) return cache;

    let weight: number = 0;
    let result = {
        name: UNKNOWN[category].name,
        version: UNKNOWN[category].version
    };

    for (let pattern in regexes[category]) {
        if (Object.prototype.hasOwnProperty.call(regexes[category], pattern)) {
            let regex: RegExp = new RegExp(
                pattern.substr(1, pattern.lastIndexOf("/") - 1),
                `${pattern.substr(pattern.lastIndexOf("/") + 1)}u`
            );

            let matches = regex.exec(user_agent);
            if (matches && regexes[category][pattern].w > weight) {
                weight = regexes[category][pattern].w;

                result.name = regexes[category][pattern].n.trim();

                if (matches.groups && matches.groups.v) {
                    result.version = matches.groups.v.trim();
                } else if (
                    Object.prototype.hasOwnProperty.call(
                        regexes[category][pattern],
                        "v"
                    )
                ) {
                    result.version = regexes[category][pattern].v || "";
                } else {
                    result.version = UNKNOWN[category].version;
                }
            }
        }
    }

    return getCache(`parse__${category}`, user_agent, result);
}

export function parseBrowser(user_agent: string): ParsedBrowserInterface {
    let result = parse("browser", user_agent);

    return {
        browser_name: result.name,
        browser_version: result.version
    };
}

export function parseOperatingSystem(
    user_agent: string
): ParsedOperatingSystemInterface {
    let result = parse("operating_system", user_agent);

    return {
        operating_system_name: result.name,
        operating_system_version: result.version
    };
}

export function parseIsMobile(user_agent: string): boolean {
    let cache = getCache("parseIsMobile", user_agent);
    if (cache) return cache;

    let browser = parseBrowser(user_agent);
    let os = parseOperatingSystem(user_agent);

    return getCache(
        "parseIsMobile",
        user_agent,
        MOBILE_OPERATING_SYSTEMS.includes(os.operating_system_name) ||
            MOBILE_BROWSER.includes(browser.browser_name) ||
            /(^|\s|\(|ie)mobile(safari)?/iu.test(user_agent)
    );
}

export function parseUserAgent(user_agent: string): ParsedUAInterface {
    return Object.assign(
        parseBrowser(user_agent),
        parseOperatingSystem(user_agent),
        {
            is_mobile: parseIsMobile(user_agent)
        }
    );
}
