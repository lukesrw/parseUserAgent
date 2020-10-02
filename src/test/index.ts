/*global context describe it*/

/**
 * Test data
 */
const user_agents: TestUAListInterface = require("../../../data/user-agents.json");

/**
 * Interfaces (for testing)
 */
import { TestUAListInterface } from "../interfaces/user-interface-test";

/**
 * Npm packages (for testing)
 */
import * as chai from "chai";

/**
 * Self
 */
import { parseUserAgent } from "..";

for (let browser_name in user_agents) {
    if (Object.prototype.hasOwnProperty.call(user_agents, browser_name)) {
        context(`Parsing "${browser_name}" User Agents`, () => {
            user_agents[browser_name].list.forEach(user_agent => {
                let result = parseUserAgent(user_agent);

                browser_name = browser_name
                    .replace(/\bmobile\b/giu, "")
                    .replace(/\s{2}/gu, " ")
                    .trim()
                    .toLowerCase();

                describe(`Parsing "${user_agent}"`, () => {
                    it("Parsing Successful", () => {
                        chai.expect(result.browser_name.toLowerCase()).to.equal(
                            browser_name
                        );
                    });
                });
            });
        });
    }
}
