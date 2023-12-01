use std::collections::HashMap;
use regex::Regex;

use advent_of_code::utils::challenges::prelude::*;

lazy_static! {
    static ref COMPLEX_DIGIT_MATCHER: Regex = Regex::new(r"(?x)
        \d|one|two|three|four|five|six|seven|six|seven|eight|nine
    ").unwrap();

    static ref WORDS_TO_DIGITS: HashMap<&'static str, &'static str> = HashMap::from([
        ("one", "1"), ("two", "2"), ("three", "3"),
        ("four", "4"), ("five", "5"), ("six", "6"),
        ("seven", "7"), ("eight", "8"), ("nine", "9"),
    ]);
}

fn parse(input: &PuzzleInput) -> std::str::Lines {
    input.trim().lines()
}

// TODO: Should probably operate solely on iterators here
fn find_digits_as_strings(line: &str) -> Vec<&str> {
    line.matches(char::is_numeric).collect()
}

// In addition to regular digits, also finds digit words (one, two, etc.)
fn find_all_digits_as_strings(line: &str) -> Vec<&str> {
    let mut matches = Vec::new();
    let mut index = 0;
    while let Some(m) = COMPLEX_DIGIT_MATCHER.find_at(line, index) {
        let word = m.as_str();
        let string_digit = *WORDS_TO_DIGITS.get(word).unwrap_or(&word);
        matches.push(string_digit);
        index = m.start() + 1
    }
    matches
}

fn calibrate_value(string_digits: Vec<&str>) -> u64 {
    let first = string_digits.first().unwrap();
    let last = string_digits.last().unwrap();
    let combined = first.to_string() + last;
    combined.parse::<u64>().unwrap()
}

fn part_one(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let lines = parse(input).map(find_digits_as_strings);
    Answer(lines.map(calibrate_value).sum())
}

fn part_two(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let lines = parse(input).map(find_all_digits_as_strings);
    Answer(lines.map(calibrate_value).sum())
}

solve!(part_one, part_two);
