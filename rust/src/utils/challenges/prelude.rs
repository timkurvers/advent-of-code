pub use lazy_static::lazy_static;
pub use paste::paste;

pub use self::super::{
    Challenge, PuzzleArg, PuzzleInput, RawPuzzleArgs, Solution, SolutionPart,
};
pub use self::super::Solution::{Answer, Unsolved};
pub use crate::{puzzle_args, puzzle_args_extract_value, solve};
