/*global context describe it*/

/**
 * Test data
 */
const user_agents: TestUAListInterface = require("../../../data/user-agents.json");

/**
 * Interfaces (for testing)
 */
import { ParsedUAInterface } from "../interfaces/user-interface";
import { TestUAListInterface } from "../interfaces/user-interface-test";

/**
 * Npm packages (for testing)
 */
// import * as chai from "chai";

/**
 * Self
 */
import { parseUserAgent } from "..";

let result: {
    [user_agent: string]: ParsedUAInterface;
} = {};
let errors = 0;

["Browser", "Operating System"].forEach(category => {
    let key: keyof TestUAListInterface;
    if (category === "Browser") {
        key = "browser";
    } else {
        key = "operating_system";
    }
    for (let name in user_agents[key]) {
        if (Object.prototype.hasOwnProperty.call(user_agents[key], name)) {
            for (let version in user_agents[key][name]) {
                if (
                    Object.prototype.hasOwnProperty.call(
                        user_agents[key][name],
                        version
                    )
                ) {
                    // eslint-disable-next-line no-loop-func
                    user_agents[key][name][version].forEach(user_agent => {
                        if (
                            !Object.prototype.hasOwnProperty.call(
                                result,
                                user_agent
                            )
                        ) {
                            result[user_agent] = parseUserAgent(user_agent);
                        }

                        if (
                            String(
                                result[user_agent][
                                    `${key}_name` as keyof ParsedUAInterface
                                ]
                            ) !== String(name) ||
                            String(
                                result[user_agent][
                                    `${key}_version` as keyof ParsedUAInterface
                                ]
                            ) !== String(version)
                        ) {
                            console.table({
                                category: key,
                                user_agent,
                                [result[user_agent][
                                    `${key}_name` as keyof ParsedUAInterface
                                ] as string]: name,
                                [result[user_agent][
                                    `${key}_version` as keyof ParsedUAInterface
                                ] as string]: version
                            });

                            errors += 1;
                        }
                    });
                    // context(
                    //     `Parsing "${name}" (${version}) User Agents`,
                    //     // eslint-disable-next-line no-loop-func
                    //     () => {
                    //     }
                    // );
                }
            }
        }
    }

    console.log(errors);

    // describe(`Parsing ${category}s`, () => {
    // });
});
