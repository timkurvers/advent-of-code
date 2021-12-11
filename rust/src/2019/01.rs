use std::cmp;

use advent_of_code::utils::challenges::prelude::*;

fn parse(input: &PuzzleInput) -> Vec<i32> {
    input.trim().lines().map(|s| s.parse().unwrap()).collect()
}

fn calculate_fuel(mass: &i32) -> i32 {
    cmp::max(0, mass / 3 - 2)
}

fn calculate_fuel_recursively(mass: &i32) -> i32 {
    let fuel = calculate_fuel(mass);
    if fuel > 0 {
        return fuel + calculate_fuel_recursively(&fuel)
    }
    fuel
}

fn part_one(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let modules = parse(&input);
    let sum: i32 = modules.iter().map(calculate_fuel).sum();
    Answer(sum as u64)
}

fn part_two(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let modules = parse(&input);
    let sum: i32 = modules.iter().map(calculate_fuel_recursively).sum();
    Answer(sum as u64)
}

solve!(part_one, part_two);
