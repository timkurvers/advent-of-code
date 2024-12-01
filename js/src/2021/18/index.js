/* eslint-disable no-labels */

import { clone, combine, solution } from '../../utils/index.js';

const parse = (input) => input.trim().split('\n').map(JSON.parse);

const isPair = Array.isArray;
const isLiteral = (value) => !isPair(value);

const print = (sf) => JSON.stringify(sf);
const add = (a, b) => [a, b];

const reduce = (sf) => {
  const current = sf;

  let stack = [-1];
  let exploded = false;
  do {
    const index = ++stack[stack.length - 1];
    const parent = stack.slice(0, -1).reduce((v, i) => v[i], current);
    if (!(index in parent)) {
      stack.pop();

      // Keep reducing if explosions were performed but stack is empty
      if (!stack.length && exploded) {
        exploded = false;
        stack.push(-1);
      }
      continue;
    }
    const value = parent[index];

    if (isPair(value)) {
      if (stack.length < 4) {
        stack.push(-1);
        continue;
      }

      const [a, b] = value;
      exploded = true;
      parent[index] = 0;

      let upstack = [...stack];
      explodeLeft: while (upstack.length) {
        let x = upstack.pop() - 1;
        let layer = upstack.reduce((v, i) => v[i], current);
        for (; x >= 0; --x) {
          while (isPair(layer[x])) {
            layer = layer[x];
            x = layer.length - 1;
          }
          if (isLiteral(layer[x])) {
            layer[x] += a;
            break explodeLeft;
          }
        }
      }

      upstack = [...stack];
      explodeRight: while (upstack.length) {
        let x = upstack.pop() + 1;
        let layer = upstack.reduce((v, i) => v[i], current);
        for (; x < layer.length; ++x) {
          while (isPair(layer[x])) {
            layer = layer[x];
            x = 0;
          }
          if (isLiteral(layer[x])) {
            layer[x] += b;
            break explodeRight;
          }
        }
      }
      stack = [-1];
    }

    if (!exploded && value >= 10) {
      const half = value / 2;
      parent[index] = [Math.floor(half), Math.ceil(half)];
      stack = [-1];
    }
  } while (stack.length);

  return current;
};

const score = (sf) => {
  if (isLiteral(sf)) {
    return sf;
  }
  const left = sf[0];
  const right = sf[sf.length - 1];
  return 3 * score(left) + 2 * score(right);
};

export const partOne = solution((input, { magnitude = true }) => {
  const lines = parse(input);
  const result = lines.reduce((acc, line) => reduce(add(acc, line)));
  if (!magnitude) {
    return print(result);
  }
  return score(result);
});

export const partTwo = solution((input) => {
  const lines = parse(input);
  let max = -Infinity;
  const combinations = combine(lines, { k: 2 });
  for (const [a, b] of combinations) {
    const result = score(reduce(add(clone(a), clone(b))));
    if (result > max) {
      max = result;
    }
    const flipped = score(reduce(add(clone(b), clone(a))));
    if (flipped > max) {
      max = flipped;
    }
  }
  return max;
});
