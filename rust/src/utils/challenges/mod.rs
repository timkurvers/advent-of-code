use colored::*;
use core::fmt::Debug;
use lazy_static::lazy_static;
use regex::Regex;
use serde::Deserialize;
use std::collections::BTreeMap;
use std::fmt;
use std::fs;
use std::path::PathBuf;
use std::time::{Duration, Instant};

use super::strings::StringExt;

pub mod macros;
pub mod prelude;

pub const PUZZLE_ROOT: &str = "../puzzles";

type Day = u32;
type Year = u32;
pub type PuzzleInput = String;
type PartIdentifier = String;

#[derive(Debug, PartialEq)]
pub enum Solution {
    Answer(String),
    Unsolved,
}

type SolutionFn = fn(&PuzzleInput) -> Solution;

pub struct SolutionPart {
    pub ident: PartIdentifier,
    pub solution_fn: SolutionFn,
}

impl fmt::Debug for SolutionPart {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        f.debug_struct("SolutionPart")
            .field("ident", &self.ident)
            .field("solution_fn", &format_args!("{:p}", &self.solution_fn))
            .finish()
    }
}

impl SolutionPart {
    pub fn title(&self) -> String {
        self.ident.to_string().titleize()
    }

    pub fn new(ident: &'static str, solution_fn: SolutionFn) -> SolutionPart {
        SolutionPart { ident: PartIdentifier::from(ident.to_string()), solution_fn }
    }
}

#[derive(Debug, Deserialize)]
#[serde(untagged)]
enum PuzzleArgument {
    String(String),
    Integer(u64),
}

#[derive(Debug, Deserialize)]
struct Example {
    pub input: PuzzleInput,
    pub answer: String,
    #[serde(default)]
    pub args: BTreeMap<String, PuzzleArgument>,
}

type ExamplesByPart = BTreeMap<PartIdentifier, Vec<Example>>;

#[derive(Debug)]
pub struct Challenge {
    pub year: Year,
    pub day: Day,
    pub parts: &'static Vec<SolutionPart>,
}

impl Challenge {
    fn input(&self) -> PuzzleInput {
        let mut path: PathBuf = self.puzzle_path();
        path.push("input.txt");

        fs::read_to_string(&path)
            .expect(&format!("No puzzle input in {:?}", path))
    }

    fn examples(&self) -> ExamplesByPart {
        let mut path: PathBuf = self.puzzle_path();
        path.push("examples.yaml");

        let contents = fs::read_to_string(&path)
            .expect(&format!("No examples in {:?}", path))

            // TODO: Do these replacements properly via Serde somehow
            .replace("part-one", "part_one")
            .replace("part-two", "part_two");

        serde_yaml::from_str(&contents)
            .expect(&format!("Malformed YAML in {:?}", path))
    }

    fn puzzle_path(&self) -> PathBuf {
        let mut path: PathBuf = PathBuf::from(PUZZLE_ROOT);
        path.push(self.year.to_string());
        path.push(format!("{:02}", self.day));
        path
    }

    fn execute<'a>(&self, part: &SolutionPart, input: &'a PuzzleInput) -> (Solution, Duration) {
        let start = Instant::now();
        let result = (part.solution_fn)(input);
        let duration = start.elapsed();
        (result, duration)
    }

    pub fn run(&self) {
        let examples_by_part = self.examples();
        let input = self.input();

        lazy_static! {
            static ref WHITESPACE: Regex = Regex::new(r"\s+").unwrap();
        }

        for part in self.parts {
            let fmt_header = format!(
                "{} · Day {} · {}", self.year, self.day, part.title(),
            ).cyan();
            println!("{}", fmt_header);

            if let Some(examples) = examples_by_part.get(&part.ident) {
                for Example {
                    input,
                    answer: expected,
                    ..
                } in examples {
                    let excerpt: String = WHITESPACE.replace_all(input, " ")
                        .chars().take(25).collect();
                    let (result, duration) = self.execute(part, &input);
                    self.output(&result, &duration, Some(expected), Some(&excerpt));
                }
            }

            let (result, duration) = self.execute(part, &input);
            self.output(&result, &duration, None, None);
            println!();
        }
    }

    fn output(
        &self, result: &Solution, duration: &Duration,
        expected: Option<&str>, excerpt: Option<&str>
    ) {
        let is_example = expected.is_some();

        let fmt_label = if is_example {
            format!("Example {}", excerpt.unwrap().yellow()).normal()
        } else {
            "Answer".normal()
        };

        let fmt_text = match result {
            Solution::Answer(answer) => {
                if is_example && *answer != expected.unwrap() {
                    format!("{} (expected: {})", answer, expected.unwrap()).red()
                } else {
                    answer.green()
                }
            },
            Solution::Unsolved => "[not yet solved]".red(),
        };

        let fmt_suffix = if matches!(result, Solution::Answer(_)) {
            let fmt_duration = format!("{:?}", duration).bright_black();
            format!(" {}", fmt_duration)
        } else {
            "".to_string()
        };

        println!("=> {}: {}{}", fmt_label, fmt_text, fmt_suffix);
    }

    pub fn new(year: u32, day: u32, parts: &'static Vec<SolutionPart>) -> Challenge {
        Challenge { year, day, parts }
    }
}
