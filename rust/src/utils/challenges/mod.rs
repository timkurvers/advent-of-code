use core::fmt::Debug;
use colored::*;

pub mod macros;
pub mod prelude;

#[derive(Debug)]
pub enum Solution {
    Answer,
    Unsolved,
}

type SolutionFn = fn(&'static str) -> Solution;

#[derive(Debug)]
pub struct Part {
    pub ident: &'static str,
    pub solution_fn: SolutionFn,
}

impl Part {
    pub fn new(ident: &'static str, solution_fn: SolutionFn) -> Part {
        Part { ident, solution_fn }
    }
}

#[derive(Debug)]
pub struct Challenge {
    pub year: u32,
    pub day: u32,
    pub parts: &'static Vec<Part>,
}

impl Challenge {
    pub fn run(&self) {
        println!("running: {:#?}", self);

        let input = "some input?";

        for part in self.parts {
            let header = format!(
                "{} · Day {} · {}", self.year, self.day, part.ident,
            ).cyan();
            println!("{}", header);

            let answer = (part.solution_fn)(input);
            println!("Answer: {:?}", answer);
            println!()
        }
    }

    pub fn new(year: u32, day: u32, parts: &'static Vec<Part>) -> Challenge {
        Challenge { year, day, parts }
    }
}
