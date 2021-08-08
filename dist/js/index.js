Object.defineProperty(exports, "__esModule", { value: true });
exports.parseWindowsVersion = exports.parseUserAgent = exports.parseIsMobile = exports.parseOperatingSystem = exports.parseBrowser = exports.parse = exports.UNKNOWN = exports.MOBILE_OPERATING_SYSTEMS = exports.MOBILE_BROWSER = void 0;
const path_1 = require("path");
const regexes = require(path_1.join(__dirname, "regex.json"));
const cache = {};
exports.MOBILE_BROWSER = ["Nokia Web Browser", "Opera Mini"];
exports.MOBILE_OPERATING_SYSTEMS = [
    "Android",
    "iOS",
    "BlackBerry OS",
    "PlayStation Portable System Software"
];
exports.UNKNOWN = {
    browser: {
        name: "Unknown Browser",
        version: ""
    },
    operating_system: {
        name: "Unknown Operating System",
        version: ""
    }
};
exports.UNKNOWN.browser.version = `${exports.UNKNOWN.browser.name} Version`;
exports.UNKNOWN.operating_system.version = `${exports.UNKNOWN.operating_system.name} Version`;
function getCache(name, user_agent, result) {
    if (!Object.prototype.hasOwnProperty.call(cache, name)) {
        cache[name] = {};
    }
    if (result) {
        cache[name][user_agent] = result;
        return cache[name][user_agent];
    }
    return cache[name][user_agent] || false;
}
function parse(category, user_agent) {
    let cache = getCache(`parse__${category}`, user_agent);
    if (cache)
        return cache;
    let weight = 0;
    let result = {
        name: exports.UNKNOWN[category].name,
        version: exports.UNKNOWN[category].version
    };
    for (let pattern in regexes[category]) {
        if (Object.prototype.hasOwnProperty.call(regexes[category], pattern)) {
            let regex = new RegExp(pattern.substr(1, pattern.lastIndexOf("/") - 1), `${pattern.substr(pattern.lastIndexOf("/") + 1)}u`);
            let matches = regex.exec(user_agent);
            if (matches && regexes[category][pattern].w > weight) {
                weight = regexes[category][pattern].w;
                result.name = regexes[category][pattern].n.trim();
                if (matches.groups && matches.groups.v) {
                    result.version = matches.groups.v.trim();
                }
                else if (Object.prototype.hasOwnProperty.call(regexes[category][pattern], "v")) {
                    result.version = regexes[category][pattern].v || "";
                }
                else {
                    result.version = exports.UNKNOWN[category].version;
                }
            }
        }
    }
    return getCache(`parse__${category}`, user_agent, result);
}
exports.parse = parse;
function parseBrowser(user_agent) {
    let result = parse("browser", user_agent);
    return {
        browser_name: result.name,
        browser_version: result.version
    };
}
exports.parseBrowser = parseBrowser;
function parseOperatingSystem(user_agent) {
    let result = parse("operating_system", user_agent);
    return {
        operating_system_name: result.name,
        operating_system_version: result.version
    };
}
exports.parseOperatingSystem = parseOperatingSystem;
function parseIsMobile(user_agent) {
    let cache = getCache("parseIsMobile", user_agent);
    if (cache)
        return cache;
    let browser = parseBrowser(user_agent);
    let os = parseOperatingSystem(user_agent);
    return getCache("parseIsMobile", user_agent, exports.MOBILE_OPERATING_SYSTEMS.includes(os.operating_system_name) ||
        exports.MOBILE_BROWSER.includes(browser.browser_name) ||
        /(^|\s|\(|ie)mobile(safari)?/iu.test(user_agent));
}
exports.parseIsMobile = parseIsMobile;
function parseUserAgent(user_agent) {
    return Object.assign(parseBrowser(user_agent), parseOperatingSystem(user_agent), {
        is_mobile: parseIsMobile(user_agent)
    });
}
exports.parseUserAgent = parseUserAgent;
function parseWindowsVersion(old_version) {
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
exports.parseWindowsVersion = parseWindowsVersion;
