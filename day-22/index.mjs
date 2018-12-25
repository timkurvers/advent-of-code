#!/usr/bin/env node --experimental-modules --no-warnings

import Cave from './Cave';
import input from './input';
import { Tool } from './Region/WithTool';
import { astar, day, sum } from '../utils';

const cave = new Cave(input);

day(22).part(1).solution(() => (
  sum(cave.regions.filter(region => (
    region.x <= cave.targetX && region.y <= cave.targetY
  )).map(region => region.riskLevel))
));

day(22).part(2).solution(() => {
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
