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
        ParsedOperatingSystemInterface {}
