/*global context describe it*/

/**
 * Test data
 */
const user_agents: TestUAListInterface = require("../../../data/user-agents-new.json");

/**
 * Interfaces (for testing)
 */
import { ParsedUAInterface } from "../interfaces/user-interface";
import { TestUAListInterface } from "../interfaces/user-interface-test";

/**
 * Npm packages (for testing)
 */
import * as chai from "chai";

/**
 * Self
 */
import { parseUserAgent } from "..";

let result: {
    [user_agent: string]: ParsedUAInterface;
} = {};

["Browser", "Operating System"].forEach(category => {
    let key: keyof TestUAListInterface;
    if (category === "Browser") {
        key = "browser";
    } else {
        key = "operating_system";
    }

    describe(`Parsing ${category}s`, () => {
        for (let name in user_agents[key]) {
            if (Object.prototype.hasOwnProperty.call(user_agents[key], name)) {
                for (let version in user_agents[key][name]) {
                    if (
                        Object.prototype.hasOwnProperty.call(
                            user_agents[key][name],
                            version
                        )
                    ) {
                        context(
                            `Parsing "${name}" (v${version}) User Agents`,
                            () => {
                                user_agents[key][name][version].forEach(
                                    user_agent => {
                                        if (
                                            !Object.prototype.hasOwnProperty.call(
                                                result,
                                                user_agent
                                            )
                                        ) {
                                            result[user_agent] = parseUserAgent(
                                                user_agent
                                            );
                                        }

                                        it(`Parses "${user_agent}" ${category} Name`, () => {
                                            chai.expect(
                                                String(
                                                    result[user_agent][
                                                        `${key}_name` as keyof ParsedUAInterface
                                                    ]
                                                )
                                            ).to.equal(String(name));
                                        });

                                        it(`Parses "${user_agent}" ${category} Version`, () => {
                                            chai.expect(
                                                String(
                                                    result[user_agent][
                                                        `${key}_version` as keyof ParsedUAInterface
                                                    ]
                                                )
                                            ).is.equal(String(version));
                                        });
                                    }
                                );
                            }
                        );
                    }
                }
            }
        }
    });
});
