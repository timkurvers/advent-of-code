use std::env;

mod utils;

use crate::utils::challenges::prelude::*;

preload_challenges!(into CHALLENGES);

fn main() {
    // TODO: Only run requested challenges
    for argument in env::args() {
        println!("{}", argument)
    }

    for challenge in &*CHALLENGES {
        challenge.run();
    }
}
