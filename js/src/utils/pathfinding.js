/* eslint-disable import/prefer-default-export */

import { PriorityQueue, Queue } from './data-structures/index.js';

const reconstruct = (cameFrom, goal) => {
  const path = [];
  let step = goal;
  do {
    path.push(step);
    step = cameFrom.get(step);
  } while (step);
  return path.reverse();
};

// See: https://www.redblobgames.com/pathfinding/a-star/introduction.html
// Also: https://en.wikipedia.org/wiki/A*_search_algorithm#Pseudocode
export const astar = (start, goal, {
  cost = () => 1,
  done = (current, _goal) => current === goal,
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
      return {
        path: reconstruct(cameFrom, current),
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

// See: https://en.wikipedia.org/wiki/Breadth-first_search
export const bfs = (start, goal, {
  done = (current, _goal) => current === goal,
  nodesFor,
  neighborsFor = nodesFor,
}) => {
  const visited = new Set();
  visited.add(start);

  const cameFrom = new Map();
  cameFrom.set(start, null);

  const frontier = new Queue();
  frontier.enqueue(start);

  while (!frontier.isEmpty) {
    const current = frontier.dequeue();

    if (done(current, goal)) {
      return {
        path: reconstruct(cameFrom, current),
        visited,
      };
    }

    for (const neighbor of neighborsFor(current)) {
      if (visited.has(neighbor)) {
        continue;
      }

      visited.add(neighbor);
      cameFrom.set(neighbor, current);
      frontier.enqueue(neighbor);
    }
  }

  return { path: null, visited };
};
