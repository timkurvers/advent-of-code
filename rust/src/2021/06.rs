use advent_of_code::utils::challenges::prelude::*;

type Fish = usize;

fn parse(input: &PuzzleInput) -> Vec<Fish> {
    input.trim().split(',').map(|s| s.parse().unwrap()).collect()
}

fn count(fishies: Vec<Fish>, days: u64) -> u64 {
    const SLOTS: usize = 9;
    let mut lifetimes = [0; SLOTS];

    for fish in fishies {
        lifetimes[fish] += 1;
    }

    for _ in 0..days {
        let birthing = lifetimes[0];
        for i in 0..SLOTS - 1 {
            lifetimes[i] = lifetimes[i + 1];
        }
        lifetimes[6] += birthing;
        lifetimes[8] = birthing;
    }
    lifetimes.iter().sum()
}

fn part_one(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let fishies = parse(input);
    let total = count(fishies, 80);
    Answer(total)
}

fn part_two(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let fishies = parse(input);
    let total = count(fishies, 256);
    Answer(total)
}

solve!(part_one, part_two);
