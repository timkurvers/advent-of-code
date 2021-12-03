# Advent of Code - Rust

[![MIT License](https://badgen.net/badge/license/MIT/)](LICENSE.md)
[![CI](https://github.com/timkurvers/advent-of-code/workflows/rust/badge.svg)](https://github.com/timkurvers/advent-of-code/actions?query=workflow%3Arust)

My Rust solutions for [Advent of Code](https://adventofcode.com).

**Note:** Make sure to run all commands in this README from this `rust`-folder.

## Setup

Install [Rust] for your platform and make sure `cargo` is available.

## Running solutions

To run all solutions for the current edition:

```bash
cargo run
```

To run solutions for specific days, pass one or more days as arguments:

```bash
cargo run 1 2
```

To run solutions for a different edition, specify the year:

```bash
cargo run 2019
cargo run 2019 1 2
```

To run a combination of solutions from different editions, mix and match years
and days, reading from left to right.

Example to run 2019 all days, and 2021 day 2:

```bash
cargo run 2019 2021 2
```

## Progress overview

TODO.

## Development

To monitor code changes and re-run solutions during development, first:

```bash
cargo install cargo-watch
```

Then:

```bash
cargo watch -x "run 2019 2"
```

### Bootstrap solution

TODO.

### Tests

To run tests for utilities:

```bash
cargo test
```

[Rust]: https://www.rust-lang.org/tools/install
