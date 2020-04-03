/* eslint-disable import/prefer-default-export */

import { PriorityQueue } from './data-structures';

// See: https://www.redblobgames.com/pathfinding/a-star/introduction.html
// Also: https://en.wikipedia.org/wiki/A*_search_algorithm#Pseudocode
export const astar = (start, goal, {
  cost = () => 1,
  done = (current) => current === goal,
  heuristic = () => 0,
  nodesFor,
  neighborsFor = nodesFor,
}) => {
  const frontier = new PriorityQueue();
  frontier.put(start, 0);

  const cameFrom = new Map();
  const costSoFar = new Map();
  cameFrom.set(start, null);
  costSoFar.set(start, 0);

  while (!frontier.isEmpty) {
    const current = frontier.get();

    if (done(current, goal)) {
      const path = [];
      let step = current;
      do {
        path.push(step);
        step = cameFrom.get(step);
      } while (step);

      return {
        path: path.reverse(),
        score: costSoFar.get(current),
      };
    }

    for (const neighbor of neighborsFor(current)) {
      const newCost = costSoFar.get(current) + cost(current, neighbor);
      if (!costSoFar.has(neighbor) || newCost < costSoFar.get(neighbor)) {
        costSoFar.set(neighbor, newCost);
        const priority = newCost + heuristic(neighbor, goal);
        frontier.put(neighbor, priority);
        cameFrom.set(neighbor, current);
      }
    }
  }

  return null;
};
