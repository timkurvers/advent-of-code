import { Grid, cast, isNumber, multiply, solution, sum } from '../../utils/index.js';

const EMPTY = '.';
const GEAR = '*';

const parse = (input) => Grid.from(input, { cast });

const isGear = (point) => point.value === GEAR;
const isSymbol = (point) => !isNumber(point.value) && point.value !== EMPTY;

const process = (schema) => {
  const parts = [];
  let current = { part: 0, gears: new Set(), valid: false };
  for (const point of schema.points) {
    const { neighbors, value } = point;

    if (!isNumber(value)) continue;

    current.part = current.part * 10 + value;

    for (const neighbor of neighbors) {
      if (isSymbol(neighbor)) {
        current.valid = true;
      }
      if (isGear(neighbor)) {
        current.gears.add(neighbor);
      }
    }

    if (!point.right || !isNumber(point.right.value)) {
      if (current.valid) {
        // Have reached the end of a valid part number
        parts.push(current.part);
        for (const gear of current.gears) {
          (gear.parts ||= []).push(current.part);
        }
      }
      current = { part: 0, gears: new Set(), valid: false };
    }
  }

  const gears = schema.filter((point) => (
    isGear(point) && point.parts.length === 2
  ));

  return { parts, gears };
};

export const partOne = solution((input) => {
  const schema = parse(input);
  const { parts } = process(schema);
  return sum(parts);
});

export const partTwo = solution((input) => {
  const schema = parse(input);
  const { gears } = process(schema);
  return sum(gears.map((gear) => multiply(gear.parts)));
});
