import { cast, solution, wrap } from '../../utils/index.js';

const DISC_MATCHER = /Disc #(\d+) has (\d+) .+ position (\d+)./g;

const parse = (input) =>
  Array.from(input.matchAll(DISC_MATCHER)).map((match) => {
    const [, id, positions, start] = match;
    return { id: cast(id), positions: cast(positions), start: cast(start) };
  });

const probe = (discs, t) =>
  discs.every((disc, index) => {
    const offset = wrap(disc.start + index + 1 + t, disc.positions);
    return offset === 0;
  });

const bruteforce = (discs) => {
  for (let t = 0; ; ++t) {
    if (probe(discs, t)) {
      return t;
    }
  }
};

export const partOne = solution((input) => {
  const discs = parse(input);
  return bruteforce(discs);
});

export const partTwo = solution((input) => {
  const discs = parse(input);
  discs.push({ positions: 11, start: 0 });
  return bruteforce(discs);
});
