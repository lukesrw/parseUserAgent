import { join } from "path";

export interface ResultInterface {
    n: string;
    v?: string;
    w: number;
}

export interface UserAgentParserInterface {
    browser: {
        [regex: string]: ResultInterface;
    };
    operating_system: {
        [regex: string]: ResultInterface;
    };
}

export interface ParsedBrowserInterface {
    browser_name: string;
    browser_version: string;
}

export interface ParsedOperatingSystemInterface {
    operating_system_name: string;
    operating_system_version: string;
}

export interface ParsedUAInterface
    extends ParsedBrowserInterface,
        ParsedOperatingSystemInterface {
    is_mobile: boolean;
}

const regexes: UserAgentParserInterface = require(join(
    __dirname,
    "regex.json"
));
const cache: {
    [category: string]: any;
} = {};

export const MOBILE_BROWSER = ["Nokia Web Browser", "Opera Mini"];
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

export function parseWindowsVersion(old_version: ParsedUAInterface | string) {
    let version = old_version;
    if (typeof version === "object") {
        version = version.operating_system_version;
    }

    switch (parseFloat(parseFloat(version).toFixed(1))) {
        case 4:
            version = "95";
            break;

        case 4.1:
            version = "98";
            break;

        case 5:
            version = "2000";
            break;

        case 4.9:
            version = "Me";
            break;

        case 5.1:
        case 5.2:
            version = "XP";
            break;

        case 6:
            version = "Vista";
            break;

        case 6.1:
            version = "7";
            break;

        case 6.2:
            version = "8";
            break;

        case 6.3:
            version = "8.1";
            break;
    }

    if (typeof old_version === "object") {
        old_version.operating_system_version = version;

        return old_version;
    }

    return version;
}
