use std::num::ParseIntError;

use crate::utils::challenges::prelude::*;

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

#[derive(Debug, Default)]
struct Submarine {
    position: i64,
    depth: i64,
    aim: i64,
}

fn parse(input: &PuzzleInput) -> Vec<Command> {
    input.trim().split("\n").map(|s| s.parse().unwrap()).collect()
}

fn navigate(commands: Vec<Command>, rtfm: bool) -> u64 {
    let mut submarine = Submarine { ..Default::default() };
    for command in commands {
        match command {
            Command::Forward(value) if !rtfm => {
                submarine.position += value
            },
            Command::Down(value) if !rtfm => {
                submarine.depth += value
            },
            Command::Up(value) if !rtfm => {
                submarine.depth -= value
            },

            // After reading the manual
            Command::Forward(value) => {
                submarine.position += value;
                submarine.depth += submarine.aim * value;
            },
            Command::Down(value) => {
                submarine.aim += value
            },
            Command::Up(value) => {
                submarine.aim -= value
            },

            _ => panic!("could not execute: {:?}", command)
        }
    }
    (submarine.position * submarine.depth).try_into().unwrap()
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
