use crate::utils::challenges::prelude::*;

fn parse(input: &PuzzleInput) -> Vec<u32> {
    input.trim().split("\n").map(|s| s.parse().unwrap()).collect()
}

fn part_one(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let measurements = parse(input);

    let count = measurements
        .windows(2)
        .filter(|window| window[0] < window[1])
        .count();

    Answer(count as u64)
}

fn part_two(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let measurements = parse(input);

    let window_sums: Vec<u32> = measurements
        .windows(3)
        .map(|window| window.iter().sum())
        .collect();

    let count = window_sums
        .windows(2)
        .filter(|window| window[0] < window[1])
        .count();

    Answer(count as u64)
}

solve!(part_one, part_two);
