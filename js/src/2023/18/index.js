import { Orientation, cast, dx, dy, solution } from '../../utils/index.js';

const INSTRUCTION_MATCHER = /(\w) (\d+) \(#(\w{6})\)/;

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const match = line.match(INSTRUCTION_MATCHER);
      const [_, op, count, color] = match;
      return { op, count: cast(count), color };
    });

const OPERATIONS = {
  R: Orientation.RIGHT,
  D: Orientation.DOWN,
  L: Orientation.LEFT,
  U: Orientation.UP,
};

const excavate = (plan) => {
  let current = { x: 0, y: 0 };

  let perimeter = 0;
  let area = 0;
  for (const { op, count } of plan) {
    const orientation = OPERATIONS[op];
    const next = {
      x: current.x + dx(orientation) * count,
      y: current.y + dy(orientation) * count,
    };

    // See: https://en.wikipedia.org/wiki/Shoelace_formula
    area += current.x * next.y - current.y * next.x;
    perimeter += count;

    current = next;
  }

  // See: https://en.wikipedia.org/wiki/Pick%27s_theorem
  return (area + perimeter) / 2 + 1;
};

export const partOne = solution((input) => {
  const plan = parse(input);
  return excavate(plan);
});

export const partTwo = solution((input) => {
  const adjust = (entry) => {
    const op = Object.keys(OPERATIONS)[entry.color.at(-1)];
    const count = parseInt(entry.color.slice(0, 5), 16);
    return { op, count };
  };

  const plan = parse(input).map(adjust);
  return excavate(plan);
});
