use std::num::ParseIntError;

use advent_of_code::utils::challenges::prelude::*;

#[derive(Debug)]
enum Command {
    Forward(i64),
    Down(i64),
    Up(i64),
}

impl std::str::FromStr for Command {
    type Err = ParseIntError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let parts: Vec<_> = s.split(" ").collect();
        let value: i64 = parts[1].parse()?;
        match parts[0] {
            "forward" => Ok(Self::Forward(value)),
            "down" => Ok(Self::Down(value)),
            "up" => Ok(Self::Up(value)),
            _ => panic!("unknown direction: {}", parts[0]),
        }
    }
}

fn parse(input: &PuzzleInput) -> Vec<Command> {
    input.trim().lines().map(|s| s.parse().unwrap()).collect()
}

fn navigate(commands: Vec<Command>, rtfm: bool) -> u64 {
    let mut position = 0;
    let mut depth = 0;
    let mut aim = 0;

    for command in commands {
        match command {
            Command::Forward(value) if !rtfm => { position += value }
            Command::Down(value) if !rtfm => { depth += value }
            Command::Up(value) if !rtfm => { depth -= value }

            // After reading the manual
            Command::Forward(value) => {
                position += value;
                depth += aim * value;
            },
            Command::Down(value) => { aim += value },
            Command::Up(value) => { aim -= value },
        }
    }
    (position * depth) as u64
}

fn part_one(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let commands = parse(input);
    let result = navigate(commands, false);
    Answer(result)
}

fn part_two(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let commands = parse(input);
    let result = navigate(commands, true);
    Answer(result)
}

solve!(part_one, part_two);
