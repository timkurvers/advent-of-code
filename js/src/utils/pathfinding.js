import { Cache, PriorityQueue, Queue } from './data-structures/index.js';

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
export const astar = (
  start,
  goal,
  {
    cost = () => 1,
    done = (current, _goal) => current === goal,
    hash = (node) => node,
    heuristic = () => 0,
    nodesFor,
    neighborsFor = nodesFor,
  },
) => {
  const frontier = new PriorityQueue();
  frontier.put(start, 0);

  const cameFrom = new Map();
  const costSoFar = new Map();
  cameFrom.set(start, null);
  costSoFar.set(start, 0);

  const cache = new Cache({ hash });

  while (!frontier.isEmpty) {
    const current = frontier.get();

    if (done(current, goal)) {
      return {
        path: reconstruct(cameFrom, current),
        score: costSoFar.get(current),
      };
    }

    for (const neighborUncached of neighborsFor(current)) {
      const neighbor = cache.lookup(neighborUncached);
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

// Breadth-first search returning all paths (if any)
// See: https://en.wikipedia.org/wiki/Breadth-first_search
export const bfs = (
  start,
  goal,
  {
    cost = () => 1,
    done = (current, _goal, _path, _cost) => current === goal,
    hash = (node) => node,
    nodesFor,
    neighborsFor = nodesFor,
    maxCost = Infinity,
    maxResults = Infinity,
  },
) => {
  const frontier = new Queue();
  frontier.enqueue({ path: [start], cost: 0 });

  const cache = new Cache({ hash });

  const results = [];
  while (!frontier.isEmpty) {
    const entry = frontier.dequeue();
    const current = entry.path.at(-1);

    if (done(current, goal, entry.path, entry.cost)) {
      results.push({ path: entry.path, score: entry.cost });

      if (results.length >= maxResults) {
        break;
      }
    }

    for (const neighbor of neighborsFor(current)) {
      const node = cache.lookup(neighbor);
      if (entry.path.includes(node)) {
        continue;
      }

      const newCost = entry.cost + cost(current, neighbor);
      if (newCost > maxCost) {
        continue;
      }
      frontier.enqueue({ path: [...entry.path, node], cost: newCost });
    }
  }

  return results;
};

// Floodfills returning a single shortest path (if any) + visited nodes
export const floodfill = (
  start,
  goal,
  { done = (current, _goal) => current === goal, nodesFor, neighborsFor = nodesFor },
) => {
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
