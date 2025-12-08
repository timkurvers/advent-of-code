import { combine, multiply, solution } from '../../utils/index.js';

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((line, index) => {
      const [x, y, z] = line.split(',').map(Number);
      const box = { index, x, y, z };
      box.circuit = [box];
      return box;
    });

const distance3D = (x1, y1, z1, x2, y2, z2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);

// Attempts to connect given boxes into circuits
const connect = (boxes, { maxConnections = Infinity } = {}) => {
  const circuits = new Set(boxes.map((box) => box.circuit));

  // Pairs of boxes sorted by Euclidean distance (closest first)
  const closest = Array.from(combine(boxes, { k: 2 })).sort(
    ([a, b], [c, d]) => distance3D(a.x, a.y, a.z, b.x, b.y, b.z) - distance3D(c.x, c.y, c.z, d.x, d.y, d.z),
  );

  let index = 0;
  for (; index < maxConnections; ++index) {
    const [a, b] = closest[index];

    const from = b.circuit;
    const to = a.circuit;

    // Not doing anything counts as a connection :'(
    if (from === to) {
      continue;
    }

    for (const box of from) {
      circuits.delete(box.circuit);
      box.circuit = to;
    }
    to.push(...from);

    if (circuits.size === 1) {
      break;
    }
  }

  const last = closest[index];
  return { circuits, last };
};

export const partOne = solution((input, { maxConnections = 1000 }) => {
  const boxes = parse(input);

  const { circuits } = connect(boxes, { maxConnections });

  const sizes = Array.from(circuits).map((circuit) => circuit.length);
  sizes.sort((a, b) => b - a);
  return multiply(sizes.slice(0, 3));
});

export const partTwo = solution((input) => {
  const boxes = parse(input);

  const { last } = connect(boxes);
  const [a, b] = last;
  return a.x * b.x;
});
