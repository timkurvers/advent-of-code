import { reduceMaxBy, solution } from '../../utils/index.js';

const REINDEER_MATCHER = /(\w+) .+ (\d+) .+ (\d+) .+ (\d+)/g;

const parse = (input) => {
  const participants = [];
  for (const reindeer of input.matchAll(REINDEER_MATCHER)) {
    const [, name, speed, duration, rest] = reindeer;
    participants.push({
      name,
      speed: +speed,
      duration: +duration,
      rest: +rest,
      points: 0,
    });
  }
  return participants;
};

const pinpoint = (reindeer, t) => {
  const { duration, rest, speed } = reindeer;
  const cycle = duration + rest;
  const cycles = (t / cycle) | 0;
  const remainder = t % cycle;
  const flown = (cycles * duration + Math.min(remainder, duration));
  return flown * speed;
};

export const partOne = solution((input, { time = 2503 } = {}) => {
  const participants = parse(input);
  const results = participants.map((reindeer) => pinpoint(reindeer, time));
  return Math.max(...results);
});

export const partTwo = solution((input, { time = 2503 }) => {
  const participants = parse(input);

  for (let t = 1; t <= time; ++t) {
    const results = participants.map((reindeer) => ({
      distance: pinpoint(reindeer, t),
      reindeer,
    }));

    const leading = reduceMaxBy(results, 'distance');
    for (const entry of results) {
      // Ensure tied leaders all receive points
      if (entry.distance === leading.distance) {
        entry.reindeer.points++;
      }
    }
  }

  const winner = reduceMaxBy(participants, 'points');
  return winner.points;
});
