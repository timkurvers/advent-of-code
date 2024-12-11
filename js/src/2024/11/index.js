import { solution, sum } from '../../utils/index.js';

const parse = (input) => input.trim().split(' ').map(Number);

const blink = (stone, { times, cache = new Map() }) => {
  // A stone is just a single stone at one point
  if (times === 0) {
    return 1;
  }

  const hash = `${stone}x${times}`;
  if (cache.has(hash)) {
    return cache.get(hash);
  }

  const opts = { times: times - 1, cache };

  const str = String(stone);
  let result;
  if (stone === 0) {
    result = blink(1, opts);
  } else if (str.length % 2 === 0) {
    result = blink(+str.slice(0, str.length / 2), opts) + blink(+str.slice(str.length / 2), opts);
  } else {
    result = blink(stone * 2024, opts);
  }
  cache.set(hash, result);
  return result;
};

export const partOne = solution((input, { blinks: times = 25 }) => {
  const stones = parse(input);
  return sum(stones.map((stone) => blink(stone, { times })));
});

export const partTwo = solution((input, { blinks: times = 75 }) => {
  const stones = parse(input);
  return sum(stones.map((stone) => blink(stone, { times })));
});
