export interface TestUAInterface {
    browser_name: string;
    list: string[];
}

export interface TestUAListInterface {
    browser: {
        [browser_name: string]: {
            [browser_version: string]: string[];
        };
    };
    operating_system: {
        [operating_system_name: string]: {
            [operating_system_version: string]: string[];
        };
    };
}
