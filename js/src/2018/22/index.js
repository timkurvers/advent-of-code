import { astar, solution, sum } from '../../utils/index.js';

import Cave from './Cave.js';
import { Tool } from './Region/WithTool.js';

export const partOne = solution((input) => {
  const cave = new Cave(input);
  return sum(
    cave.regions
      .filter((region) => region.x <= cave.targetX && region.y <= cave.targetY)
      .map((region) => region.riskLevel),
  );
});

export const partTwo = solution((input) => {
  const cave = new Cave(input);
  const pathing = astar(cave.mouth.withTool(Tool.TORCH), cave.target.withTool(Tool.TORCH), {
    neighborsFor: (current) => current.options,
    cost: (current, neighbor) => current.costTowards(neighbor),
  });
  return pathing.score;
});
