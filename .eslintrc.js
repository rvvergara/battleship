module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        'indent': 0,
        'eol-last': 0,
        'quotes': 0,
        'no-unused-expressions': 0,
        'arrow-parens': 0,
    }
};