/**
 * Interfaces (for testing)
 */
import { TestUAListInterface } from "../interfaces/user-interface-test";

/**
 * Test data
 */
const user_agents: TestUAListInterface = require("../../../data/user-agents.json");

/**
 * Self
 */
import { parseUserAgent, UNKNOWN } from "..";

Object.keys(user_agents).forEach(browser => {
    user_agents[browser].list.forEach(user_agent => {
        let result = parseUserAgent(user_agent);
        if (result.browser_name === UNKNOWN.browser.name) {
            console.log(`Unknown Browser: ${user_agent}`);
        } else if (result.browser_version === UNKNOWN.browser.version) {
            console.log(
                `Unknown Browser (${result.browser_name}) Version: ${user_agent}`
            );
        }

        if (result.operating_system_name === UNKNOWN.operating_system.name) {
            console.log(`Unknown Operating System: ${user_agent}`);
        } else if (
            result.operating_system_version === UNKNOWN.operating_system.version
        ) {
            console.log(
                `Unknown Operating System (${result.operating_system_name}) Version: ${user_agent}`
            );
        }
    });
});
