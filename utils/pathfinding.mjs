/* eslint-disable import/prefer-default-export */

// See: https://en.wikipedia.org/wiki/A*_search_algorithm#Pseudocode
// And: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Pseudocode
export const astar = (start, goal, { neighborsFor, cost }) => {
  // For each node, which node it can most efficiently be reached from.
  // If a node can be reached from many nodes, cameFrom will eventually contain the
  // most efficient previous step.
  const cameFrom = new Map();

  // For each node, the cost of getting from the start node to that node.
  const score = new Map();

  // The set of nodes already evaluated
  const closedSet = new Set();

  // The set of currently discovered nodes that are not evaluated yet.
  // Initially, only the start node is known.
  const openSet = new Set([start]);

  // The cost of going from start to start is zero.
  score.set(start, 0);

  while (openSet.size) {
    const current = Array.from(openSet).reduce((found, next) => (
      score.get(next) < score.get(found) ? next : found
    ));

    if (current === goal) {
      const path = [];
      let step = goal;
      do {
        path.push(step);
        step = cameFrom.get(step);
      } while (step);

      return {
        path: path.reverse(),
        score: score.get(goal),
      };
    }

    openSet.delete(current);
    closedSet.add(current);

    for (const neighbor of neighborsFor(current)) {
      if (closedSet.has(neighbor)) {
        continue;
      }

      // The distance from start to a neighbor
      const scoreTentative = score.get(current) + cost(current, neighbor);

      // Discover a new node
      if (!openSet.has(neighbor)) {
        openSet.add(neighbor);
      } else if (scoreTentative >= score.get(neighbor)) {
        continue;
      }

      // Best path until now
      cameFrom.set(neighbor, current);
      score.set(neighbor, scoreTentative);
    }
  }

  return null;
};
