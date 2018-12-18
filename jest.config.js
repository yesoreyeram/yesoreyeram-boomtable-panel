module.exports = {
    "verbose": true,
    "transform": {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.js$": "./node_modules/babel-jest"
    },
    "testRegex": "(\\.|/)(spec|jest)\\.(jsx?|tsx?)$",
    "roots": [
      "tests",
      "src"
    ],
    "moduleDirectories": [
      "node_modules",
      "bower_components",
      "src",
    ],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
  };