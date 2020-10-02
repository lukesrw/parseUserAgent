export interface BrowserInterface {
    bn: string;
    bv?: string;
    w: number;
}

export interface BrowserParserInterface {
    [regex: string]: BrowserInterface;
}

export interface ParsedUAInterface {
    browser_name: string;
    browser_version: string;
    // operating_system_name: string;
    // operating_system_version: string;
}
