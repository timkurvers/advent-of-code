use advent_of_code::utils::challenges::prelude::*;

fn parse(input: &PuzzleInput) -> Vec<i32> {
    input.trim().split(',').map(|s| s.parse().unwrap()).collect()
}

fn part_one(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let mut crabs = parse(input);
    crabs.sort();
    let target = crabs[crabs.len() / 2];
    let fuel = crabs.iter().fold(0, |acc, crab| (
        acc + (target - crab).abs()
    ));
    Answer(fuel as u64)
}

fn part_two(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let crabs = parse(input);
    let highest = crabs.iter().max().unwrap();

    let candidates = (0..=*highest).map(|i| {
        crabs.iter().fold(0, |acc, crab| {
            let distance = (i - crab).abs();
            // See: https://en.wikipedia.org/wiki/Triangular_number
            acc + (distance * (distance + 1)) / 2
        })
    });
    Answer(candidates.min().unwrap() as u64)
}

solve!(part_one, part_two);
