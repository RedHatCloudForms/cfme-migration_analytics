module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true
  },
  globals: {
    $: true,
    __: true,
    n__: true,
    stf: true,
    ManageIQ: true
  },
  extends: ['plugin:patternfly-react/recommended'],
  rules: {
    'react/no-danger': 'error'
  }
};
