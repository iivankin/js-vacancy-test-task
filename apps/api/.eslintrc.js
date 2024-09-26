const path = require("path");

module.exports = {
  root: true,
  extends: ['custom/node'],
  ignorePatterns: ['jest.config.js'],
  parserOptions: {
    project: path.join(__dirname, './tsconfig.json'),
    ecmaVersion: 14,
    sourceType: 'module',
  },
};
