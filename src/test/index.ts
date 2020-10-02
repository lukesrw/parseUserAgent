import { parseUserAgent } from "../index";

import { TestUAListInterface } from "../interfaces/user-interface-test";

const user_agents: TestUAListInterface = require("../../../data/user-agents.json");

for (let browser_name in user_agents) {
    if (Object.prototype.hasOwnProperty.call(user_agents, browser_name)) {
        user_agents[browser_name].list.forEach(user_agent => {
            let result = parseUserAgent(user_agent);

            browser_name = browser_name
                .replace(/\bmobile\b/giu, "")
                .replace(/\s{2}/gu, " ")
                .trim();

            if (
                result.browser_name.toLowerCase() !== browser_name.toLowerCase()
            ) {
                console.log(
                    `Said "${result.browser_name}" instead of "${browser_name}" for "${user_agent}"`
                );
            }
        });
    }
}
