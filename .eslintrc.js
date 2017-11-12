module.exports = {
    "env": {
        "es6": true,
        "browser": true,
        "node": true,
        "mocha": true,
        "jasmine": true
    },
    "globals": {
        "app": true,
        "supertest": true,
        "assert": true,
        "expect": true,
        "sinon": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "rules": {
        "semi": [
            "error",
            "always"
        ]
    }
};
