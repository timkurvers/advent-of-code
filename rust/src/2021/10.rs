use std::collections::HashMap;

use advent_of_code::utils::challenges::prelude::*;

type Chunk = char;
type Line = Vec<Chunk>;
type Stack = Vec<Chunk>;
type Score = u64;

#[derive(Debug)]
enum LineStatus {
    Valid,
    Incomplete(Stack),
    Corrupt(Chunk),
}

lazy_static! {
    static ref CHUNK_PAIRS: HashMap<Chunk, Chunk> = HashMap::from([
        ('(', ')'),
        ('[', ']'),
        ('{', '}'),
        ('<', '>'),
    ]);

    static ref CORRUPT_SCORES: HashMap<Chunk, Score> = HashMap::from([
        (')', 3),
        (']', 57),
        ('}', 1197),
        ('>', 25137),
    ]);

    static ref COMPLETION_SCORES: HashMap<Chunk, Score> = HashMap::from([
        (')', 1),
        (']', 2),
        ('}', 3),
        ('>', 4),
    ]);
}

fn parse(input: &PuzzleInput) -> Vec<Line> {
    input.trim().lines().map(|s| s.chars().collect()).collect()
}

fn analyze_line(line: &Line) -> LineStatus {
    let mut stack: Stack = vec![];

    for chunk in line {
        let closing = CHUNK_PAIRS.get(&chunk);

        if let Some(closing) = closing {
            stack.push(*closing);
        } else {
            if let Some(expected) = stack.last() {
                if expected == chunk {
                    stack.pop();
                    continue;
                }
            }
            return LineStatus::Corrupt(*chunk)
        }
    }

    if stack.is_empty() {
        LineStatus::Valid
    } else {
        LineStatus::Incomplete(stack)
    }
}

fn part_one(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let lines = parse(input);

    let score = lines.iter().fold(0, |score, line| {
        let result = analyze_line(line);
        if let LineStatus::Corrupt(which) = result {
            score + CORRUPT_SCORES.get(&which).unwrap()
        } else {
            score
        }
    });

    Answer(score)
}

fn part_two(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let lines = parse(input);

    let mut candidates: Vec<Score> = vec![];

    for line in lines {
        let result = analyze_line(&line);
        if let LineStatus::Incomplete(stack) = result {
            let score = stack.iter().rev().fold(0, |subscore, chunk| {
                subscore * 5 + COMPLETION_SCORES.get(chunk).unwrap()
            });
            candidates.push(score);
        }
    }

    candidates.sort();
    Answer(candidates[candidates.len() / 2])
}

solve!(part_one, part_two);
