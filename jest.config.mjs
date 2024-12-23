export default {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
  };
  