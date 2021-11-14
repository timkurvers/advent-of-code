import { hexmd5, solution } from '../../utils';

const TRIPLET_MATCHER = /(\w)\1{2}/;

const hash = (input, { cache, iterations = 1 } = {}) => {
  let value = cache.get(input);
  if (!value) {
    value = input;
    for (let i = 0; i < iterations; ++i) {
      value = hexmd5(value);
    }
    cache.set(input, value);
  }
  return value;
};

function* generate(salt, { iterations } = {}) {
  const cache = new Map();

  let index = 0;
  while (true) {
    const key = hash(`${salt}${index}`, { cache, iterations });
    const match = key.match(TRIPLET_MATCHER);

    if (match) {
      const quintuple = match[1].repeat(5);
      for (let i = index + 1; i <= index + 1001; ++i) {
        const futureKey = hash(`${salt}${i}`, { cache, iterations });
        if (futureKey.includes(quintuple)) {
          yield { index, key };
          break;
        }
      }
    }

    ++index;
  }
}

export const partOne = solution((input) => {
  const generator = generate(input);
  const keys = Array.from({ length: 64 }, () => generator.next().value);
  return keys[keys.length - 1].index;
});

export const partTwo = solution.inefficient((input) => {
  const generator = generate(input, { iterations: 1 + 2016 });
  const keys = Array.from({ length: 64 }, () => generator.next().value);
  return keys[keys.length - 1].index;
});
