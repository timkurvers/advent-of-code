pub use colored::*;
pub use lazy_static::lazy_static;
pub use paste::paste;

pub use self::super::{
    Challenge, PuzzleArg, PuzzleInput, RawPuzzleArgs, Solution, SolutionPart,
};
pub use self::super::Solution::{Answer, Unsolved};
pub use crate::{p, puzzle_args, puzzle_args_extract_value, solve};
