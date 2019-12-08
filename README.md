# Advent of Code

JavaScript / ES6+ solutions for https://adventofcode.com.

**Supported Node versions: 12 or higher**

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
npm run start 2017 1 4 2018 2019 5
```

## Development

To monitor code changes and re-run solutions during development:

```bash
npm run start:dev 2018 6
```

[Node.js]: https://nodejs.org/en/
