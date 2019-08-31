#!/usr/bin/env node --experimental-modules --no-warnings

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

const follow = (instructions) => {
  let orientation = Orientation.UP;
  const position = new GridPoint();
  for (const { rotation, blocks } of instructions) {
    orientation += rotation;
    position.x += dx(orientation) * blocks;
    position.y += dy(orientation) * blocks;
  }

  const distance = Math.abs(position.x) + Math.abs(position.y);
  return { distance };
};

day(1).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const instructions = parse(input);
  return follow(instructions).distance;
});
