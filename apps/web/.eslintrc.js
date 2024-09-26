const path = require("path");

module.exports = {
  root: true,
  extends: ['custom/next'],
  parserOptions: {
    project: path.join(__dirname, './tsconfig.json'),
    ecmaVersion: 14,
    sourceType: 'module',
  },
};
