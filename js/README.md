# Advent of Code - JavaScript

![Node Version](https://badgen.net/badge/node/18+/green)
[![MIT License](https://badgen.net/badge/license/MIT/)](LICENSE.md)
[![CI](https://github.com/timkurvers/advent-of-code/workflows/js/badge.svg)](https://github.com/timkurvers/advent-of-code/actions?query=workflow%3Ajs)

My JavaScript / ES2021+ solutions for [Advent of Code](https://adventofcode.com).

**Note:** Make sure to run all commands in this README from this `js`-folder.

![Advent of Code](https://user-images.githubusercontent.com/378235/143501953-bdab61e8-67c8-435e-ab4b-01c9895be220.png)

## Setup

Install [Node.js] 18 or higher for your platform.

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
