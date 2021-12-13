use std::cmp;

use lazy_static::lazy_static;
use regex::Regex;

use advent_of_code::utils::challenges::prelude::*;
use advent_of_code::utils::datastructures::Grid;

lazy_static! {
    static ref LINE_MATCHER: Regex = Regex::new(r"(?x)
        (?P<x1>\d+),(?P<y1>\d+)\s->\s(?P<x2>\d+),(?P<y2>\d+)
    ").unwrap();
}

fn parse(input: &PuzzleInput, adjacent_only: bool) -> Grid<i32, i32, u32> {
    let mut grid: Grid<i32, i32, u32> = Grid::default();

    for cap in LINE_MATCHER.captures_iter(input.trim()) {
        let (x1, y1, x2, y2) = (
            cap["x1"].parse::<i32>().unwrap(),
            cap["y1"].parse::<i32>().unwrap(),
            cap["x2"].parse::<i32>().unwrap(),
            cap["y2"].parse::<i32>().unwrap(),
        );

        let dx = (x2 - x1).signum();
        let dy = (y2 - y1).signum();

        let is_adjacent = dx == 0 || dy == 0;
        if adjacent_only && !is_adjacent {
            continue;
        }

        let length = cmp::max((x2 - x1).abs(), (y2 - y1).abs());

        let mut x = x1;
        let mut y = y1;
        for _i in 0..=length {
            let key = (x, y);
            let entry = grid.point(key).or_insert(0);
            *entry += 1;
            x += dx;
            y += dy;
        }
    }

    grid
}

fn part_one(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let grid = parse(input, true);
    let count = grid.iter().filter(|(_, &count)| count >= 2).count();
    Answer(count as u64)
}

fn part_two(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let grid = parse(input, false);
    let count = grid.iter().filter(|(_, &count)| count >= 2).count();
    Answer(count as u64)
}

solve!(part_one, part_two);
