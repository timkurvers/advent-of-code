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
use super::durations::DurationExt;

pub mod macros;
pub mod prelude;

pub const PUZZLE_ROOT: &str = "../puzzles";

type Day = u8;
type Year = u16;
pub type PuzzleInput = String;
type PartIdentifier = String;

#[derive(Clone, Debug, Deserialize, PartialEq)]
#[serde(untagged)]
pub enum Solution {
    Answer(u64),
    StringAnswer(String),
    Unsolved,
    MissingInput,
}

impl fmt::Display for Solution {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", match self {
            Solution::Answer(nr) => nr.to_string(),
            Solution::StringAnswer(str) => format!("'{}'", str),
            Solution::Unsolved => "Unsolved".to_string(),
            Solution::MissingInput => "MissingInput".to_string(),
        })
    }
}

type SolutionFn = fn(&PuzzleInput, &RawPuzzleArgs) -> Solution;

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

#[derive(Debug)]
struct Bench {
    pub avg: Duration,
    pub min: Duration,
    pub max: Duration,
    pub first: Duration,
}

#[derive(Debug, Deserialize)]
#[serde(untagged)]
pub enum PuzzleArg {
    Boolean(bool),
    Number(u64),
    String(String),
}

pub type RawPuzzleArgs = BTreeMap<String, PuzzleArg>;

#[derive(Debug, Deserialize)]
struct Example {
    pub input: PuzzleInput,
    pub answer: Solution,
    #[serde(default)]
    pub args: RawPuzzleArgs,
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

        fs::read_to_string(&path).unwrap_or_default()
    }

    fn examples(&self) -> ExamplesByPart {
        let mut path: PathBuf = self.puzzle_path();
        path.push("examples.yaml");

        let contents = fs::read_to_string(&path)
            .expect(&format!("No examples in {:?}", path))

            // TODO: Do these replacements properly via Serde somehow
            .replace("part-one", "part_one")
            .replace("part-two", "part_two")
            .replace("override-memory", "override_memory");

        serde_yaml::from_str(&contents)
            .expect(&format!("Malformed YAML in {:?}", path))
    }

    fn puzzle_path(&self) -> PathBuf {
        let mut path: PathBuf = PathBuf::from(PUZZLE_ROOT);
        path.push(self.year.to_string());
        path.push(format!("{:02}", self.day));
        path
    }

    fn execute<'a>(
        &self,
        part: &SolutionPart,
        input: &'a PuzzleInput,
        args: &RawPuzzleArgs,
        iterations: i32,
    ) -> (Solution, Duration, Option<Bench>) {
        let mut runs = Vec::new();
        for _ in 1..=iterations {
            let start = Instant::now();
            let result = (part.solution_fn)(input, args);
            let duration = start.elapsed();
            runs.push((result, duration));
        }

        // Only care about answer from the first run
        let (result, duration) = runs.first().unwrap();

        let mut bench = None;
        if iterations > 1 {
            let durations: Vec<Duration> = runs.iter().map(|run| run.1).collect();
            bench = Some(Bench {
                avg: durations.iter().sum::<Duration>() / durations.len() as u32,
                min: *durations.iter().min().unwrap_or(&Duration::ZERO),
                max: *durations.iter().max().unwrap_or(&Duration::ZERO),
                first: *duration,
            });
        }
        (result.clone(), *duration, bench)
    }

    pub fn run(&self, iterations: i32) {
        let examples_by_part = self.examples();
        let input = self.input();
        let args = RawPuzzleArgs::new();

        lazy_static! {
            static ref WHITESPACE: Regex = Regex::new(r"\s+").unwrap();
        }

        'next_part: for part in self.parts {
            let fmt_header = format!(
                "{} · Day {} · {}", self.year, self.day, part.title(),
            ).cyan();
            println!("{}", fmt_header);

            if let Some(examples) = examples_by_part.get(&part.ident) {
                for Example {
                    input, answer: expected, args,
                } in examples {
                    let excerpt: String = WHITESPACE.replace_all(input, " ")
                        .chars().take(25).collect();
                    let (result, duration, bench) = self.execute(part, &input, &args, iterations);
                    self.output(&result, &duration, Some(expected), Some(&excerpt), bench);
                    if result != *expected {
                        println!();
                        continue 'next_part;
                    }
                }
            }

            if input.is_empty() {
                self.output(&Solution::MissingInput, &Duration::default(), None, None, None);
            } else {
                let (result, duration, bench) = self.execute(part, &input, &args, iterations);
                self.output(&result, &duration, None, None, bench);
            }
            println!();
        }
    }

    fn output(
        &self, result: &Solution, duration: &Duration,
        expected: Option<&Solution>, excerpt: Option<&str>, bench: Option<Bench>,
    ) {
        let is_example = expected.is_some();

        let fmt_label = if is_example {
            format!("Example {}", excerpt.unwrap().yellow()).normal()
        } else {
            "Answer".normal()
        };

        let fmt_text = match result {
            Solution::Answer(nr) => {
                if is_example && result != expected.unwrap() {
                    format!("{} (expected: {})", nr, expected.unwrap()).red()
                } else {
                    nr.to_string().green()
                }
            },
            Solution::StringAnswer(str) => {
                if is_example && result != expected.unwrap() {
                    format!("{} (expected: {})", str, expected.unwrap()).red()
                } else {
                    str.green()
                }
            },
            Solution::Unsolved => "[not yet solved]".red(),
            Solution::MissingInput => "[[no puzzle input provided]".red(),
        };

        let fmt_suffix = if bench.is_none() && matches!(result, Solution::Answer(_)) {
            format!(" {}", duration.humanize()).bright_black().to_string()
        } else {
            "".to_string()
        };

        println!(" => {}: {}{}", fmt_label, fmt_text, fmt_suffix);

        if let Some(bench) = bench {
            let fmt_bench = format!(
                "{{ avg: {: >5}, min: {: >5}, max: {: >5}, first: {: >5} }}",
                bench.avg.humanize(),
                bench.min.humanize(),
                bench.max.humanize(),
                bench.first.humanize(),
            ).bright_black();
            println!("    {}", fmt_bench);
        }
    }

    pub fn new(year: Year, day: Day, parts: &'static Vec<SolutionPart>) -> Challenge {
        Challenge { year, day, parts }
    }
}
