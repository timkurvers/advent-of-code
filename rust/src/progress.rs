mod utils;

use crate::utils::challenges::prelude::*;

preload_challenges!(into CHALLENGES);

fn main() {
    println!("{:?}", CHALLENGES.len());
}
