import { cast, multiply, solution } from '../../utils/index.js';

const parse = (input) => {
  const nrs = input.trim().match(/\d+/g).map(cast);
  const races = [];
  for (let i = 0; i < nrs.length / 2; ++i) {
    races.push({ time: nrs[i], record: nrs[i + nrs.length / 2] });
  }
  return races;
};

const simulate = (race) => {
  const { time, record } = race;

  let wins = 0;
  for (let t = 1; t < time; ++t) {
    const speed = t;
    const distance = (race.time - t) * speed;
    if (distance > record) {
      ++wins;
    }
  }
  return wins;
};

export const partOne = solution((input) => {
  const races = parse(input);
  return multiply(races.map(simulate));
});

export const partTwo = solution((input) => {
  const races = parse(input.replaceAll(' ', ''));
  return multiply(races.map(simulate));
});
