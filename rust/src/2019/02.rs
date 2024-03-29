use advent_of_code::utils::challenges::prelude::*;

pub mod intcode;
use intcode::Intcode;

puzzle_args!(override_memory: bool = true);

fn override_memory(machine: &mut Intcode, noun: i32, verb: i32) {
    machine.memory[1] = noun;
    machine.memory[2] = verb;
}

fn part_one(input: &PuzzleInput, raw_args: &RawPuzzleArgs) -> Solution {
    let args = PuzzleArgs::from(raw_args);

    let mut machine = Intcode::from(input);
    if args.override_memory {
        override_memory(&mut machine, 12, 2);
    }
    machine.run();
    Answer(machine.memory[0] as u64)
}

fn part_two(input: &PuzzleInput, _raw_args: &RawPuzzleArgs) -> Solution {
    let target = 19690720;

    let mut machine = Intcode::from(input);
    for noun in 0..=99 {
        for verb in 0..=99 {
            machine.reset();
            override_memory(&mut machine, noun, verb);
            machine.run();
            if machine.memory[0] == target {
                return Answer((100 * noun + verb) as u64)
            }
        }
    }
    Unsolved
}

solve!(part_one, part_two);
