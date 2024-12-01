import {
  Grid,
  astar,
  cast,
  solution,
} from '../../utils/index.js';

const NODE_MATCHER = /.+?node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)%/g;

const Type = {
  EMPTY: '_',
  OTHER: '.',
  FULL: '#',
};

const parse = (input) => (
  Array.from(input.matchAll(NODE_MATCHER)).map((match) => {
    const [, x, y, size, used, avail, share] = match;
    return {
      x: cast(x),
      y: cast(y),
      size: cast(size),
      used: cast(used),
      avail: cast(avail),
      share: cast(share),
    };
  })
);

const isViablePair = (a, b) => {
  if (a === b) {
    return false;
  }
  if (a.used === 0) {
    return false;
  }
  return a.used < b.avail;
};

export const partOne = solution((input) => {
  const nodes = parse(input);
  let count = 0;
  for (const a of nodes) {
    for (const b of nodes) {
      if (isViablePair(a, b)) {
        ++count;
      }
    }
  }
  return count;
});

export const partTwo = solution((input) => {
  const nodes = parse(input);

  const grid = new Grid();
  for (const node of nodes) {
    let value = Type.OTHER;
    if (node.used === 0) {
      value = Type.EMPTY;
    } else if (node.size > 10 && node.share > 85) {
      value = Type.FULL;
    }
    grid.set(node.x, node.y, value);
  }

  // This approach assumes there is only one empty node in the grid
  const empty = grid.find((point) => point.value === Type.EMPTY);

  // Reference the data node
  const data = grid.getPoint(grid.maxX, 0);

  // First, path from the empty node to the node left of the data node
  // avoiding any full nodes along the way
  const goal = data.left;
  const result = astar(empty, goal, {
    neighborsFor: (current) => (
      current.adjacentNeighbors.filter((point) => point.value !== Type.FULL)
    ),
    heuristic: (next) => next.distanceToPoint(goal),
  });

  // To shift the goal data towards the target when there is an empty node to
  // the left of the data node takes 1 step for the initial swap and then an
  // additional 5 steps to move the empty node to the left again
  //
  // .._G  => ._G.
  // ....     ....
  return result.score + 1 + (grid.width - 2) * 5;
});
