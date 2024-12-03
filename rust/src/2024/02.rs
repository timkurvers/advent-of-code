use std::ops::Index;

use advent_of_code::utils::challenges::prelude::*;

type Report = Vec<i32>;

fn parse(input: &PuzzleInput) -> Vec<Report> {
    input.trim().lines().map(|line| {
        line.split_ascii_whitespace().map(|level| level.parse::<i32>().unwrap()).collect()
    }).collect()
}

fn is_safe(report: &Report) -> bool {
    let mut sign: i32 = 0;
    for i in 0..report.len() - 1 {
        let (a, b) = (report.index(i), report.index(i + 1));

        let diff = a - b;
        let diffabs = diff.abs();
        if diffabs < 1 || diffabs > 3 { return false }

        let diffsign = diff.signum();
        if sign != 0 && sign != diffsign { return false }
        sign = diffsign
    }

    true
}

fn is_safe_with_removal(report: &Report) -> bool {
    for index in 0..report.len() {
        let mut variation = report.clone();
        variation.remove(index);
        if is_safe(&variation) {
            return true
        }
    }
    false
}

fn part_one(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let reports = parse(input);

    let safe = reports.into_iter().filter(is_safe);
    Answer(safe.count() as u64)
}

fn part_two(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let reports = parse(input);

    let safe = reports.into_iter().filter(is_safe_with_removal);
    Answer(safe.count() as u64)
}

solve!(part_one, part_two);
