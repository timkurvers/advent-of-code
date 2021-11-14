import { combine, solution, sum } from '../../utils';

const MEM_MATCHER = /mem\[(\d+)\] = (\d+)/;
const SIZE = 36;

// Calculates AND/OR masks for given raw string and tracks floating bits
const masksFor = (str) => {
  let and = 0n;
  let or = 0n;
  const floats = [];
  for (const [index, bit] of str.split('').entries()) {
    and <<= 1n;
    or <<= 1n;
    if (bit === 'X') {
      and |= 1n;
      floats.push(BigInt(2 ** (SIZE - index - 1)));
    } else if (bit === '1') {
      and |= 1n;
      or |= 1n;
    }
  }
  return {
    and, or, floats, raw: str,
  };
};

const parse = (input) => {
  const lines = input.trim().split('\n');
  let masks = null;

  const operations = [];
  for (const line of lines) {
    if (line.startsWith('mask')) {
      masks = masksFor(line.slice(-SIZE));
      continue;
    }
    const match = line.match(MEM_MATCHER);
    const operation = {
      masks,
      offset: +match[1],
      value: +match[2],
    };
    operations.push(operation);
  }
  return operations;
};

// ORs given values onto given base value
const or = (base, values) => values.reduce((result, next) => result | next, base);

export const partOne = solution((input) => {
  const operations = parse(input);
  const memory = [];
  for (const { masks, offset, value } of operations) {
    memory[offset] = Number((BigInt(value) | masks.or) & masks.and);
  }
  return sum(memory);
});

export const partTwo = solution((input) => {
  const operations = parse(input);

  // Calculates addresses for offset by exploring all floating bit permutations
  const float = (offset, masks) => {
    // Ensure that all floating bits start of as 0
    const base = masks.floats.reduce((result, next) => result & ~next, offset);

    // Process all permutations of floating bits
    const combinations = Array.from(combine(masks.floats));
    return [
      base,
      ...combinations.map((combination) => or(base, combination)),
    ];
  };

  // Reducing an array of ~3 798 464 504 items is not feasible, so sum manually
  let result = 0;
  const memory = [];
  for (const { masks, offset, value } of operations) {
    const base = BigInt(offset) | masks.or;
    for (const address of float(base, masks)) {
      const current = memory[address] || 0;
      if (value === 0) {
        result -= current;
      } else {
        result += value - current;
      }
      memory[address] = value;
    }
  }
  return result;
});
