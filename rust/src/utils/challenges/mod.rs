use colored::*;
use core::fmt::Debug;
use serde::{Deserialize,Serialize};
use std::collections::BTreeMap;
use std::fmt;
use std::fs;
use std::path::PathBuf;
use std::time::{Duration, Instant};

pub mod macros;
pub mod prelude;

pub const PUZZLE_ROOT: &str = "../puzzles";

type Day = u32;
type Year = u32;
pub type PuzzleInput = String;
type PartIdentifier = String;

#[derive(Debug)]
pub enum Solution {
    Answer(&'static str),
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
    pub fn title(&self) -> &str {
        &self.ident
    }

    pub fn new(ident: &'static str, solution_fn: SolutionFn) -> SolutionPart {
        SolutionPart { ident: ident.to_string(), solution_fn }
    }
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
enum PuzzleArgument {
    String(String),
    Integer(u64),
}

#[derive(Debug, Serialize, Deserialize)]
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
            .expect(&format!("No examples in {:?}", path));

        serde_yaml::from_str(&contents)
            .expect(&format!("Malformed YAML in {:?}", path))
    }

    fn puzzle_path(&self) -> PathBuf {
        let mut path: PathBuf = PathBuf::from(PUZZLE_ROOT);
        path.push(self.year.to_string());
        path.push(format!("{:02}", self.day));
        path
    }

    fn execute(&self, part: &SolutionPart, input: &PuzzleInput) -> (Solution, Duration) {
        let start = Instant::now();
        let result = (part.solution_fn)(input);
        let duration = start.elapsed();
        (result, duration)
    }

    pub fn run(&self) {
        let examples_by_part = self.examples();

        // let output! =

        for part in self.parts {
            let header = format!(
                "{} · Day {} · {}", self.year, self.day, part.title(),
            ).cyan();
            println!("{}", header);

            if let Some(examples) = examples_by_part.get(&part.ident) {
                for Example {
                    input,
                    answer: expected,
                    ..
                } in examples {
                    let (result, duration) = self.execute(part, input);
                    self.output("Example", &result, Some(expected), &duration);
                }
            }

            let (result, duration) = self.execute(part, &self.input());
            self.output("Answer", &result, None, &duration);
            println!();
        }
    }

    fn output(&self, prefix: &str, result: &Solution, _expected: Option<&String>, duration: &Duration) {
        println!("=> {}: {:?} duration: {:?}", prefix, result, duration);
    }

    pub fn new(year: u32, day: u32, parts: &'static Vec<SolutionPart>) -> Challenge {
        Challenge { year, day, parts }
    }
}
