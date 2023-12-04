use std::fmt;
use std::num::ParseIntError;

use advent_of_code::utils::challenges::prelude::*;
use advent_of_code::utils::datastructures::Grid;

type DrawQueue = Vec<u64>;

#[derive(Debug, Default)]
struct Board {
    grid: Grid<usize, usize, BoardNumber>,
    is_winner: bool,
}

impl fmt::Display for Board {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.grid)
    }
}

#[derive(Debug, Default)]
struct BoardNumber(u64, bool);

impl fmt::Display for BoardNumber {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        if self.1 {
            write!(f, "x")?
        } else {
            write!(f, "{}", self.0)?
        }
        Ok(())
    }
}

impl Board {
    fn mark_as_bingo(&mut self, bingo_nr: u64) {
        for (_, BoardNumber(nr, ref mut marked)) in self.grid.iter_mut() {
            if *nr == bingo_nr {
                *marked = true;
            }
        }
    }

    fn has_bingo(&mut self) -> bool {
        let is_bingo = |board_nr: Option<&BoardNumber>| board_nr.unwrap().1;

        if self.grid.rows().any(|mut row| (
            row.all(is_bingo)
        )) {
            self.is_winner = true;
            return true;
        }

        if self.grid.columns().any(|mut col| (
            col.all(is_bingo)
        )) {
            self.is_winner = true;
            return true;
        }

        false
    }

    fn score(&self) -> u64 {
        self.grid.iter().fold(0, |sum, ((_, _), &BoardNumber(nr, marked)) | {
            sum + if marked { 0 } else { nr }
        })
    }
}

impl std::str::FromStr for Board {
    type Err = ParseIntError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut board = Self { ..Default::default() };
        // TODO: Refactor this with generic Grid::from_graphic()
        for (y, line) in s.lines().enumerate() {
            for (x, nr) in line.split_ascii_whitespace().enumerate() {
                let nr = BoardNumber(nr.parse().unwrap(), false);
                board.grid.set((y, x), nr);
            }
        }
        Ok(board)
    }
}

fn parse(input: &PuzzleInput) -> (DrawQueue, Vec<Board>) {
    let mut parts: Vec<&str> = input.trim().split("\n\n").collect();

    let queue: DrawQueue = parts.remove(0).split(",")
        .map(|s| s.parse().unwrap()).collect();

    let boards: Vec<Board> = parts.iter()
        .map(|b| b.parse().unwrap()).collect();

    (queue, boards)
}

fn part_one(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let (queue, mut boards) = parse(input);

    for num in queue {
        for board in &mut boards {
            board.mark_as_bingo(num);
            if board.has_bingo() {
                return Answer(board.score() * num);
            }
        }
    }

    Unsolved
}

fn part_two(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let (queue, mut boards) = parse(input);
    let length = boards.len();
    let mut num_winners = 0;

    for num in &queue {
        for board in &mut boards {
            if board.is_winner {
                continue;
            }
            board.mark_as_bingo(*num);
            if board.has_bingo() {
                num_winners += 1;
                if num_winners == length {
                    return Answer(board.score() * num);
                }
            }
        }
    }

    Unsolved
}

solve!(part_one, part_two);
