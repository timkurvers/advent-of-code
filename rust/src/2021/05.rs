use std::cmp;
use std::collections::HashMap;
use std::fmt;

use lazy_static::lazy_static;
use regex::Regex;

use crate::utils::challenges::prelude::*;

#[derive(Debug, Default)]
struct Grid {
    points: HashMap<GridPoint, GridValue>,
}
type GridPoint = (i32, i32);
type GridValue = u32;

impl Grid {
    fn xs(&self) -> impl Iterator<Item = i32> + '_ {
        self.points.iter().map(|((x, _), _)| *x)
    }

    fn min_x(&self) -> i32 {
        self.xs().min().unwrap()
    }

    fn max_x(&self) -> i32 {
        self.xs().max().unwrap()
    }

    fn ys(&self) -> impl Iterator<Item = i32> + '_ {
        self.points.iter().map(|((_, y), _)| *y)
    }

    fn min_y(&self) -> i32 {
        self.ys().min().unwrap()
    }

    fn max_y(&self) -> i32 {
        self.ys().max().unwrap()
    }
}

impl fmt::Display for Grid {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for y in self.min_y()..self.max_y() {
            for x in self.min_x()..self.max_x() {
                if let Some(value) = self.points.get(&(x, y)) {
                    write!(f, "{}", value)?;
                } else {
                    write!(f, ".")?;
                }
            }
            write!(f, "\n")?;
        }
        Ok(())
    }
}

lazy_static! {
    static ref LINE_MATCHER: Regex = Regex::new(r"(?x)
        (?P<x1>\d+),(?P<y1>\d+)\s->\s(?P<x2>\d+),(?P<y2>\d+)
    ").unwrap();
}

fn parse(input: &PuzzleInput, adjacent_only: bool) -> Grid {
    let mut grid = Grid { ..Default::default() };

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
            let entry = grid.points.entry(key).or_insert(0);
            *entry += 1;
            x += dx;
            y += dy;
        }
    }

    grid
}

fn part_one(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let grid = parse(input, true);
    let count = grid.points.iter().filter(|(_, &count)| count >= 2).count();
    Answer(count as u64)
}

fn part_two(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let grid = parse(input, false);
    let count = grid.points.iter().filter(|(_, &count)| count >= 2).count();
    Answer(count as u64)
}

solve!(part_one, part_two);
