use std::num::ParseIntError;

use crate::utils::challenges::prelude::*;

type DrawQueue = Vec<u64>;

#[derive(Clone, Debug, Default, Eq, Hash, PartialEq)]
struct Board {
    rows: Vec<BoardAxis>,
    is_winner: bool,
}
type BoardAxis = Vec<BoardNumber>;
type BoardNumber = (u64, bool);

impl Board {
    fn columns(&self) -> Vec<BoardAxis> {
        let size = self.rows[0].len();
        (0..size).map(|x| (
            self.rows.iter().map(|row| row[x]).collect()
        )).collect()
    }

    fn mark_as_bingo(&mut self, bingo_nr: u64) {
        for row in &mut self.rows {
            for board_nr in row {
                if board_nr.0 == bingo_nr {
                    board_nr.1 = true;
                }
            }
        }
    }

    fn has_bingo(&mut self) -> bool {
        let is_bingo = |board_nr: &BoardNumber| board_nr.1;

        if self.rows.iter().any(|row| (
            row.iter().all(is_bingo)
        )) {
            self.is_winner = true;
            return true;
        }

        if self.columns().iter().any(|row| (
            row.iter().all(is_bingo)
        )) {
            self.is_winner = true;
            return true;
        }

        false
    }

    fn score(&self) -> u64 {
        self.rows.iter().map(|row| (
            row.iter().map(|board_nr| (
                if board_nr.1 { 0 } else { board_nr.0 }
            )).sum::<u64>()
        )).sum()
    }
}

impl std::str::FromStr for Board {
    type Err = ParseIntError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let rows: Vec<BoardAxis> = s.lines().map(|line| {
            line.split_ascii_whitespace()
                .map(|s| (s.parse().unwrap(), false)).collect()
        }).collect();
        Ok(Self { rows, ..Default::default() })
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
