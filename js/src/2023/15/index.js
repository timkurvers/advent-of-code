import { Cache, cast, solution, sum } from '../../utils';

const STEP_MATCHER = /(\w+)(=|-)(\d+)?/;

const parse = (input) => (
  input.trim().split(',').map((str) => {
    const [_, label, op, focalLength] = str.match(STEP_MATCHER);
    return { str, label, op, focalLength: cast(focalLength) };
  })
);

const hash = (str) => {
  const { length } = str;
  let value = 0;
  for (let i = 0; i < length; ++i) {
    const code = str.charCodeAt(i);
    value += code;
    value *= 17;
    value %= 256;
  }
  return value;
};

export const partOne = solution((input) => {
  const steps = parse(input);
  return sum(steps.map((step) => hash(step.str)));
});

export const partTwo = solution((input) => {
  const steps = parse(input);

  const boxes = new Cache({ init: () => [] });

  for (const { label, op, focalLength } of steps) {
    const nr = hash(label);
    const box = boxes.lookup(nr);

    const index = box.findIndex((candidate) => candidate.label === label);

    if (op === '-') {
      if (index !== -1) {
        box.splice(index, 1);
      }
    } else {
      const lens = { label, focalLength };
      if (index === -1) {
        box.push(lens);
      } else {
        box.splice(index, 1, lens);
      }
    }
  }

  let power = 0;
  for (const [boxnr, boxlenses] of boxes) {
    for (const [slot, lens] of boxlenses.entries()) {
      power += (boxnr + 1) * (slot + 1) * lens.focalLength;
    }
  }
  return power;
});
