export interface TestUAInterface {
    browser_name: string;
    list: string[];
}

export interface TestUAListInterface {
    [browser_name: string]: TestUAInterface;
}
