#!/usr/bin/env node --experimental-modules --no-warnings

import { day } from '..';
import { astar, sum } from '../../utils';

import Cave from './Cave';
import examples from './input/examples';
import puzzleInput from './input';
import { Tool } from './Region/WithTool';

day(22).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const cave = new Cave(input);
  return sum(cave.regions.filter(region => (
    region.x <= cave.targetX && region.y <= cave.targetY
  )).map(region => region.riskLevel));
});

day(22).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const cave = new Cave(input);
  const pathing = astar(
    cave.mouth.withTool(Tool.TORCH),
    cave.target.withTool(Tool.TORCH),
    {
      neighborsFor: current => current.options,
      cost: (current, neighbor) => current.costTowards(neighbor),
    },
  );
  return pathing.score;
});
