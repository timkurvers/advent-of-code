# Advent of Code

![Node Version](https://badgen.net/badge/node/12+/green)
[![MIT License](https://badgen.net/badge/license/custom%20MIT/)](LICENSE.md)
[![CI](https://github.com/timkurvers/advent-of-code/workflows/ci/badge.svg)](https://github.com/timkurvers/advent-of-code/actions?query=workflow%3Aci)

JavaScript / ES6+ solutions for https://adventofcode.com.

![Advent of Code](https://user-images.githubusercontent.com/378235/70389655-bb99f380-19c2-11ea-86e1-3946c1884b0a.png)

## Setup

Install [Node.js] 12 or higher for your platform.

Install dependencies through npm:

```bash
npm install
```

## Running solutions

To run all solutions for the current edition:

```bash
npm start
```

To run solutions for specific days, pass one or more days as arguments:

```bash
npm start 1 4 9
```

To run solutions for a different edition, specify the year:

```bash
npm start 2017
npm start 2017 1 4 9
```

To run a combination of solutions from different editions, mix and match years
and days, reading from left to right.

Example to run 2017 day 1 and 4, 2018 all days, and 2019 day 5:

```bash
npm start 2017 1 4 2018 2019 5
```

## Progress overview

To generate and display a progress overview, run:

```bash
npm run progress
```

## Development

To monitor code changes and re-run solutions during development:

```bash
npm run start:dev 2018 6
```

### Bootstrap solution

To bootstrap an empty solution for a given year and day, run:

```bash
npm run bootstrap 2019 20
```

Bootstrapping solutions for multiple days is not supported.

### Tests

To run tests for utilities:

```bash
npm run test
```

[Node.js]: https://nodejs.org/en/
