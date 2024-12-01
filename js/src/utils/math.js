/* eslint-disable no-param-reassign */

import { Cache } from './index.js';

// Allows for implementations to be Number / BigInt agnostic
const variations = {
  [BigInt]: {
    ZERO: 0n, ONE: 1n, TWO: 2n, type: BigInt,
  },
  [Number]: {
    ZERO: 0, ONE: 1, TWO: 2, type: Number,
  },
};
const variance = (value) => variations[value.constructor];

export const TAU = 2 * Math.PI;

export const bitsNeededFor = (n) => Math.log2(n) + 1 | 0;

export const multiply = (array) => array.reduce((total, next) => total * next, 1);
export const sum = (array) => array.reduce((total, next) => total + next, 0);

export const maxIndex = (array) => array.reduce((current, value, index) => (
  value > array[current] ? index : current
), 0);

export const groupBy = (array, prop) => array.reduce((groups, current) => {
  const value = current[prop];
  const group = groups.lookup(value);
  group.push(current);
  return groups;
}, new Cache({ init: () => [] }));

export const reduceMinBy = (array, prop) => array.reduce((candidate, other) => (
  candidate[prop] > other[prop] ? other : candidate
));

export const reduceMaxBy = (array, prop) => array.reduce((candidate, other) => (
  candidate[prop] < other[prop] ? other : candidate
));

// Adjusted from: https://gist.github.com/axelpale/3118596
export function* combine(array, { k } = {}) {
  const n = array.length;
  if (k === undefined) {
    for (k = 1; k <= n; ++k) {
      yield* combine(array, { k });
    }
    return;
  }

  if (k > n || k <= 0) {
    return;
  }

  if (k === 1) {
    for (let i = 0; i < n; ++i) {
      yield [array[i]];
    }
    return;
  }

  for (let i = 0; i < n - k + 1; ++i) {
    const head = array.slice(i, i + 1);
    const subsets = combine(array.slice(i + 1), { k: k - 1 });
    for (const subset of subsets) {
      yield head.concat(subset);
    }
  }
}

// See: https://stackoverflow.com/a/37580979
export function* permute(array) {
  const { length } = array;
  const c = Array(length).fill(0);
  let i = 1;
  let k = null;
  let p = null;

  yield array.slice();
  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = array[i];
      array[i] = array[k];
      array[k] = p;
      ++c[i];
      i = 1;
      yield array.slice();
    } else {
      c[i] = 0;
      ++i;
    }
  }
}

// Executes dynamic nested for-loops for given boundaries
// See: https://stackoverflow.com/questions/52456836/dynamically-generating-a-flexible-number-of-nested-for-loops
export function* dfor(boundaries) {
  const mins = boundaries.map((b) => b.min);
  const maxs = boundaries.map((b) => b.max);
  const total = boundaries.reduce((accu, b) => accu * (b.max - b.min + 1), 1);

  // Emit the initial iteration of all minimum values
  const vars = [...mins];
  yield vars.slice();

  let i = 1;
  while (i < total) {
    // Current loop index
    let index = boundaries.length - 1;

    let looping = true;
    while (looping && index >= 0) {
      vars[index]++;

      // If this iteration level spills over its max, change upper levels
      if (vars[index] > maxs[index]) {
        vars[index] = mins[index];
      } else {
        looping = false;
        yield vars.slice();
        ++i;
      }

      // Set focus to one iteration level up
      --index;
    }
  }
}

// Mathematical modulo (as opposed to JavaScript's remainder operator)
// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
export const mod = (a, m) => ((a % m) + m) % m;

// Modular multiplicative inverse
// See: https://rosettacode.org/wiki/Chinese_remainder_theorem#JavaScript
export const modMulInv = (a, m) => {
  const { ZERO, ONE, type } = variance(a);

  const m0 = m;
  let [x0, x1] = [ZERO, ONE];

  if (m === ONE) {
    return ONE;
  }
  while (a > ONE) {
    let q = a / m;
    if (type === Number) {
      q = Math.floor(q);
    }
    [a, m] = [m, a % m];
    [x0, x1] = [x1 - q * x0, x0];
  }
  if (x1 < ZERO) {
    x1 += m0;
  }
  return x1;
};

// Calculates base to power of given exponent over given modulo
// See: https://github.com/juanelas/bigint-crypto-utils
export const modPow = (b, e, m) => {
  const {
    ZERO, ONE, TWO, type,
  } = variance(b);

  if (m === ZERO) {
    throw new RangeError('modulus cannot be 0');
  } else if (m === ONE) {
    return ZERO;
  }

  b %= m;
  b = (b < 0) ? b + m : b;

  if (e < ZERO) {
    return modMulInv(modPow(b, -e, m), m);
  }

  let r = ONE;
  while (e > ZERO) {
    if ((e % TWO) === ONE) {
      r = (r * b) % m;
    }
    e /= TWO;
    if (type === Number) {
      e = Math.floor(e);
    }
    b = (b ** TWO) % m;
  }
  return r;
};

// Greatest common divisor / least common multiple of two or more integers
// See: https://stackoverflow.com/a/34955386
export const gcd2 = (a, b) => {
  if (!b) {
    return b === 0 ? a : NaN;
  }
  return gcd2(b, a % b);
};
export const lcm2 = (a, b) => (a * b) / gcd2(a, b);
export const gcd = (array) => array.reduce(gcd2);
export const lcm = (array) => array.reduce(lcm2);
