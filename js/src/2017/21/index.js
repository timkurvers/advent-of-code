import { solution, stripIndent } from '../../utils/index.js';

const Pixel = {
  ON: '#',
  OFF: '.',
};

const start = stripIndent`
  .#.
  ..#
  ###
`.trim();

const serialize = (mat) => mat.map((row) => row.join('')).join('\n');
const deserialize = (str) => str.split(/\n|\//).map((line) => line.split(''));

// Flips given matrix horizontally
const flipX = (mat) => mat.map((row) => [...row].reverse());

// Tranposes given matrix swapping rows and columns (leaves original intact)
const transpose = (mat) => mat[0].map((_, i) => mat.map((row) => row[i]));

// Rotates given matrix 90 degrees clockwise (leaves original intact)
const rotate = (mat) => transpose(mat).map((row) => row.reverse());

// Splits given matrix into parts of given size (leaves original intact)
const split = (mat, { psize }) => {
  const { length: size } = mat;
  let x = 0;
  let y = 0;

  const parts = [];
  while (y < size) {
    const part = [];
    for (let p = 0; p < psize; ++p) {
      part.push(mat[y + p].slice(x, x + psize));
    }
    parts.push(part);
    x += psize;
    if (x >= size) {
      x = 0;
      y += psize;
    }
  }
  return parts;
};

// Merges given parts into a matrix
const merge = (parts) => {
  const { length: psize } = parts[0];
  const count = Math.sqrt(parts.length);
  const size = count * psize;
  return Array.from({ length: size }, (_, y) => {
    const index = y / psize | 0;
    let row = [];
    for (let p = 0; p < count; ++p) {
      const slice = parts[index * count + p][y % psize];
      row = row.concat(slice);
    }
    return row;
  });
};

const parse = (input) => {
  const rules = new Map();
  for (const line of input.trim().split('\n')) {
    const [rule, output] = line.split(' => ');
    const replacement = serialize(deserialize(output));

    let normal = deserialize(rule);
    let flipped = flipX(normal);
    // Rotate in 90 degree steps and add both normal/flipped variation to ruleset
    for (let i = 1; i <= 4; ++i) {
      rules.set(serialize(normal), replacement);
      rules.set(serialize(flipped), replacement);
      normal = rotate(normal);
      flipped = rotate(flipped);
    }
  }
  return rules;
};

const generate = (rules, { numIterations }) => {
  const morph = (mat) => {
    const str = serialize(mat);
    return deserialize(rules.get(str) || str);
  };

  let current = deserialize(start);
  let count = 0;
  while (++count <= numIterations) {
    const { length: size } = current[0];
    const psize = size % 2 === 0 ? 2 : 3;
    const parts = split(current, { psize });
    current = merge(parts.map(morph));
  }
  return current;
};

export const partOne = solution((input, { numIterations = 5 }) => {
  const rules = parse(input);
  const result = generate(rules, { numIterations });
  return result.flat().filter((pixel) => pixel === Pixel.ON).length;
});

export const partTwo = solution.inefficient((input, { numIterations = 18 }) => {
  const rules = parse(input);
  const result = generate(rules, { numIterations });
  return result.flat().filter((pixel) => pixel === Pixel.ON).length;
});
