use std::{collections::BTreeMap, ops::Index};

use advent_of_code::utils::challenges::prelude::*;

fn parse(input: &PuzzleInput) -> (Vec<i32>, Vec<i32>) {
    let mut left: Vec<i32> = vec![];
    let mut right: Vec<i32> = vec![];
    for line in input.trim().lines() {
        let (lhs, rhs) = line.split_once("   ").unwrap();
        left.push(lhs.parse::<i32>().unwrap());
        right.push(rhs.parse::<i32>().unwrap());
    }
    (left, right)
}

fn part_one(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let (mut left, mut right) = parse(input);

    left.sort();
    right.sort();

    let distance = left.into_iter().enumerate().fold(0, |total, (index, left_value)| {
        let right_value = right.index(index);
        let diff = (left_value - right_value).abs();
        total + diff
    });

    Answer(distance as u64)
}

fn part_two(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let (left, right) = parse(input);

    let mut cache = BTreeMap::new();
    let similarity = left.into_iter().fold(0, |total, left_value| {
        let count = *cache.entry(left_value).or_insert_with(||
            right.iter().filter(|i| **i == left_value).count()
        );
        total + (left_value * count as i32)
    });

    Answer(similarity as u64)
}

solve!(part_one, part_two);
