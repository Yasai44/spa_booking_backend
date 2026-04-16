module.exports = {
  preset: "ts-jest",
  testEnvironment: "<rootDir>/prisma-test-environment.ts",
  testMatch: ["**/*.integration.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  verbose: true
};
