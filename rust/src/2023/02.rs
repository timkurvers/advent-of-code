use regex::Regex;

use advent_of_code::utils::challenges::prelude::*;

lazy_static! {
    #[derive(Debug)]
    static ref REVEAL_MATCHER: Regex = Regex::new(r"(?x)
        (?P<amount>\d+)\ (?P<color>\w+)
    ").unwrap();
}

#[derive(Debug, Default)]
struct GameRound {
    pub red: u64,
    pub green: u64,
    pub blue: u64,
}

// Might as well re-use existing struct type
type CubeSet = GameRound;

impl GameRound {
    fn is_playable(&self, config: &CubeSet) -> bool {
        config.red >= self.red
        && config.green >= self.green
        && config.blue >= self.blue
    }
}

impl From<&str> for GameRound {
    fn from(str: &str) -> Self {
        let mut round = GameRound::default();

        for cap in REVEAL_MATCHER.captures_iter(str) {
            let amount = cap["amount"].parse::<u64>().unwrap();
            let color = &cap["color"];

            match color {
                "red" => { round.red += amount }
                "green" => { round.green += amount }
                "blue" => { round.blue += amount }
                _ => unimplemented!()
            }
        }

        round
    }
}

#[derive(Debug)]
struct Game {
    pub id: u64,
    pub rounds: Vec<GameRound>
}

impl Game {
    fn is_playable(&self, config: &CubeSet) -> bool {
        self.rounds.iter().all(|round| round.is_playable(config))
    }

    fn minimum_cubeset(&self) -> CubeSet {
        let mut minimums = CubeSet::default();
        for round in &self.rounds {
            minimums.red = minimums.red.max(round.red);
            minimums.green = minimums.green.max(round.green);
            minimums.blue = minimums.blue.max(round.blue);
        }
        minimums
    }

    fn power(&self) -> u64 {
        let minimums = self.minimum_cubeset();
        minimums.red * minimums.green * minimums.blue
    }
}

fn parse(input: &PuzzleInput) -> Vec<Game> {
    input.trim().lines().enumerate().map(|(index, line)| {
        let rounds = line.split(";").map(GameRound::from).collect();
        Game { id: (index + 1) as u64, rounds }
    }).collect()
}

fn part_one(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let games = parse(input);

    let available = CubeSet {
        red: 12,
        green: 13,
        blue: 14,
    };

    let possible = games.iter().filter(|game| game.is_playable(&available));
    Answer(possible.map(|game| game.id).sum())
}

fn part_two(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let games = parse(input);
    Answer(games.iter().map(|game| game.power()).sum())
}

solve!(part_one, part_two);
