module.exports = {
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "identity-obj-proxy",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  "transform": {
    "^.+\\.jsx?$": "babel-jest"
  },
  setupFiles: [
      "<rootDir>/src/jestSetupFile.js"
  ],
  clearMocks: true,
  roots: ["<rootDir>/src/", "<rootDir>/integration"],
  collectCoverageFrom: ['**/src/**/*.js?'],
  reporters: [ "default", "jest-junit" ]
};
