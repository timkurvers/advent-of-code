use advent_of_code::utils::challenges::prelude::*;

fn parse(input: &PuzzleInput) -> Vec<u32> {
    input.trim().split("\n\n").map(|s| {
        s.trim().lines().map(|line| line.parse::<u32>().unwrap()).sum()
    }).collect()
}

fn part_one(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let inventories = parse(input);
    Answer(*inventories.iter().max().unwrap() as u64)
}

fn part_two(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let mut inventories = parse(input);
    inventories.sort_unstable();

    let top3 = &inventories[inventories.len() - 3..];
    Answer(top3.iter().sum::<u32>() as u64)
}

solve!(part_one, part_two);
