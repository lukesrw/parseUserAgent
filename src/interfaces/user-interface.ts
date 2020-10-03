export interface BrowserInterface {
    bn: string;
    bv?: string;
    w: number;
}

export interface OperatingSystemInterface {
    osn: string;
    osv?: string;
    w: number;
}

export interface BrowserParserInterface {
    bn: {
        [regex: string]: BrowserInterface;
    };
    osn: {
        [regex: string]: OperatingSystemInterface;
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
