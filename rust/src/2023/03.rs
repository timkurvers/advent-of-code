use std::fmt;

use advent_of_code::utils::{challenges::prelude::*, datastructures::Grid};

#[derive(Debug, Default)]
struct Schema {
    grid: Grid<isize, isize, SchemaEntry>,
}

impl fmt::Display for Schema {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.grid)?;
        Ok(())
    }
}

impl From<&str> for Schema {
    fn from(str: &str) -> Self {
        let mut schema = Self { ..Default::default() };
        // TODO: Refactor this with generic Grid::from_graphic()
        for (y, line) in str.lines().enumerate() {
            for (x, char) in line.chars().enumerate() {
                let point = match char {
                    '0'..='9' => { SchemaEntry::Number(char.to_digit(10).unwrap())}
                    '*' => { SchemaEntry::Gear }
                    '.' => { SchemaEntry::Empty }
                    _ => SchemaEntry::Other
                };
                schema.grid.set((y as isize, x as isize), point);
            }
        }
        schema
    }
}

#[derive(Debug, Default)]
enum SchemaEntry {
    Number(u32),
    Gear,
    Other,
    #[default]
    Empty,
}

impl fmt::Display for SchemaEntry {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let char = match self {
            Self::Number(nr) => { char::from_digit(*nr, 10).unwrap() },
            Self::Gear => { '*' },
            Self::Empty => { '.' },
            Self::Other => { '?' }
        };
        write!(f, "{}", char)?;
        Ok(())
    }
}

fn is_symbol(entry: &SchemaEntry) -> bool {
    matches!(entry, SchemaEntry::Gear) || matches!(entry, SchemaEntry::Other)
}

fn parse(input: &PuzzleInput) -> Schema {
    input.trim().into()
}

fn part_one(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let schema = parse(input);

    let mut is_valid_part = false;
    let mut part = 0;
    let mut parts: Vec<u32> = vec![];

    for ((y, x), entry) in schema.grid.iter() {
        if let SchemaEntry::Number(nr) = entry {
            part = part * 10 + nr;

            for (_, neighbor) in schema.grid.neighbors_iter((*y, *x)) {
                if is_symbol(neighbor) {
                    is_valid_part = true;
                }
            }

            let right = schema.grid.get_point((*y, x + 1));
            if right.is_none() || !matches!(right.unwrap().1, SchemaEntry::Number(_)) {
                if is_valid_part {
                    parts.push(part);
                }
                part = 0;
                is_valid_part = false;
            }
        }
    }

    Answer(parts.iter().sum::<u32>() as u64)
}

solve!(part_one);
