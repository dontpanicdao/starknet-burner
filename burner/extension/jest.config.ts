/*
 * see https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  resetMocks: true,
  collectCoverage: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  roots: ["src"],
};
