export default {
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/lib/$1",
  },
  preset: "ts-jest",
  setupFiles: ["<rootDir>/.jest/env.js"],
};
