"use strict";
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@app/(.*)$": "<rootDir>/app/$1",
    },
    collectCoverageFrom: ["<rootDir>/app/**/*.ts"],
};
