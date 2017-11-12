# node-js-es6-rest

node js (ES6 + Babel + mocha + chai + sinnon + jwt) study

## Installation
```bash
npm i -g yarn
yarn
```

## Execution

Start with the default database configurations

```bash
babel-node index.js
```

or

```bash
yarn start
```

## Production Exection

Necessary to separate between Windows and Unix environment due the environment variables set syntax differences.
The set of the environment maps the database configurations that will be used, on this case, the production configurations.

For windows:
```bash
yarn start:windows:production
```

For unix:
```bash
yarn start:unix:production
```

## Test Execution

We have to

### Unit Tests

```bash
yarn test:unit
```

### Integration Tests

Necessary to separate between Windows and Unix environment due the environment variables set syntax differences.
The set of the environment maps the database configurations that will be used, on this case, the test configurations.

For windows:
```bash
yarn test:windows:integration
```

For unix:
```bash
yarn test:unix:integration
```

## ESLINT Validation

```bash
yarn lint
```
