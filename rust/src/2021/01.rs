use crate::utils::challenges::prelude::*;

fn parse(input: &PuzzleInput) -> Vec<u32> {
    input.trim().split("\n").map(|s| s.parse().unwrap()).collect()
}

fn part_one(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let measurements = parse(input);

    let count = measurements
        .windows(2)
        .fold(0u32, |acc, window| {
            if window[0] < window[1] {
                return acc + 1
            }
            acc
        });

    Answer(count.into())
}

fn part_two(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let measurements = parse(input);

    let window_sums: Vec<u32> = measurements
        .windows(3)
        .map(|window| window.iter().sum())
        .collect();

    let count = window_sums
        .windows(2)
        .fold(0u32, |acc, window| {
            if window[0] < window[1] {
                return acc + 1
            }
            acc
        });

    Answer(count.into())
}

solve!(part_one, part_two);
