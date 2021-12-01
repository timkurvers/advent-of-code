use std::env;

mod utils;

use crate::utils::challenges::prelude::*;

preload_challenges!(into CHALLENGES);

fn is_year(nr: &u16) -> bool { nr > &1000 }

fn main() {
    let challenges = &*CHALLENGES;

    let mut requested: Vec<u16> = env::args().skip(1)
        .map(|s| s.parse().unwrap()).collect();

    // If no specific year was requested, default to the current edition
    if !is_year(requested.get(0).unwrap_or(&0)) {
        let last = &*CHALLENGES.last().unwrap();
        requested.insert(0, last.year);
    }

    let mut year = 0;
    while !requested.is_empty()  {
        let nr = requested.remove(0);
        let next = requested.get(0);

        if is_year(&nr) {
            year = nr;

            // Let the next iteration handle executing days
            if next.is_some() && !is_year(next.unwrap()) {
                continue;
            }

            // Collect and insert all available days for requested year (if any)
            let days: Vec<u16> = challenges.iter()
                .filter(|c| c.year == year)
                .map(|c| c.day as u16)
                .collect();
            if days.is_empty() {
                panic!("Could not find any days for year {}", year);
            }
            requested.splice(0..0, days);
            continue;
        }

        // Find challenge for this requested year and day
        if let Some(challenge) = challenges
            .iter()
            .find(|c| c.day as u16 == nr && c.year == year)
        {
            challenge.run();
        } else {
            panic!("Could not find year {} day {}", year, nr);
        }
    }
}
