import {
  GridPoint,
  Orientation,
  Rotation,
  dx,
  dy,
} from '../../utils';
import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

const rotations = {
  R: Rotation.TURN_RIGHT,
  L: Rotation.TURN_LEFT,
};

const parse = input => (
  input.split(', ').map(instruction => ({
    rotation: rotations[instruction[0]],
    blocks: +instruction.slice(1),
  }))
);

const follow = (instructions, { stopOnSeen = false } = {}) => {
  const seen = new Set();

  let orientation = Orientation.UP;
  const position = new GridPoint();
  for (const { rotation, blocks } of instructions) {
    orientation += rotation;

    for (let step = 0; step < blocks; ++step) {
      const { label } = position;
      if (stopOnSeen && seen.has(label)) {
        break;
      }
      seen.add(label);
      position.x += dx(orientation);
      position.y += dy(orientation);
    }
  }

  const distance = Math.abs(position.x) + Math.abs(position.y);
  return { distance };
};

day(1).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const instructions = parse(input);
  return follow(instructions).distance;
});

day(1).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const instructions = parse(input);
  return follow(instructions, { stopOnSeen: true }).distance;
});
