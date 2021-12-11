use advent_of_code::utils::challenges::prelude::*;

type BitVec = Vec<u8>;

fn parse(input: &PuzzleInput) -> Vec<BitVec> {
    input.trim().lines().map(|line| (
        line.chars().map(|c| c.to_digit(10).unwrap() as u8).collect()
    )).collect()
}

fn most_common_bit_at(index: usize, nrs: &Vec<BitVec>) -> u8 {
    let length = nrs.len();
    let num_zeroes = nrs.iter().filter(|nr| nr[index] == 0).count();
    (num_zeroes <= length / 2).into()
}

fn reduce_nrs(nrs: &Vec<BitVec>, most_common: bool) -> BitVec {
    let bit_len = nrs[0].len();
    let indices = 0..bit_len;

    // Should really use `drain_filter`-here, y u not available! :(
    indices.fold(nrs.clone(), |remaining, index| {
        let most_common_bit = most_common_bit_at(index, &remaining);

        let target = if most_common {
            most_common_bit
        } else {
            !most_common_bit & 0b1
        };

        if remaining.len() > 1 {
            remaining.into_iter().filter(|nr| {
                nr[index] == target
            }).collect()
        } else {
            remaining
        }
    }).first().unwrap().to_vec()
}

fn bitvec_to_u64(nr: BitVec) -> u64 {
    nr.iter().fold(0, |val, &bit| (val << 1) | bit as u64)
}

fn part_one(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let nrs = parse(input);
    let bit_len = nrs[0].len();
    let indices = 0..bit_len;

    let gamma = indices.fold(0, |val, index| {
        if most_common_bit_at(index, &nrs) == 1 {
            val + (1 << (bit_len - index - 1))
        } else {
            val
        }
    });
    let epsilon = !gamma & (1 << bit_len) - 1;

    Answer(gamma * epsilon)
}

fn part_two(input: &PuzzleInput, _args: &RawPuzzleArgs) -> Solution {
    let nrs = parse(input);

    let oxygen = bitvec_to_u64(reduce_nrs(&nrs, true));
    let co2 = bitvec_to_u64(reduce_nrs(&nrs, false));

    Answer(oxygen * co2)
}

solve!(part_one, part_two);
