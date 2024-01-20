module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  moduleDirectories: ["node_modules", "app/javascript"],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "./jestSetup.ts",
  ],
  testEnvironment: "jsdom",
};
