use crate::utils::challenges::prelude::*;

mod intcode;
use intcode::Intcode;

fn part_one(input: &PuzzleInput, _raw_args: &RawPuzzleArgs) -> Solution {
    let mut machine = Intcode::from(input);
    machine.input.push_back(1);
    machine.run();
    Answer(machine.output.pop_back().unwrap() as u64)
}

fn part_two(input: &PuzzleInput, _raw_args: &RawPuzzleArgs) -> Solution {
    let mut machine = Intcode::from(input);
    machine.input.push_back(5);
    machine.run();
    Answer(machine.output.pop_back().unwrap() as u64)
}

solve!(part_one, part_two);
