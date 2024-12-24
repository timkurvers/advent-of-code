import {
  Grid,
  Orientation,
  Rotation,
  astar,
  bfs,
  dx,
  dy,
  normalizeOrientation,
  solution,
} from '../../utils/index.js';

const isWall = (point) => point.value === '#';

const parse = (input) => {
  const maze = Grid.from(input);
  const start = maze.find((point) => point.value === 'S');
  const end = maze.find((point) => point.value === 'E');
  return { maze, start, end };
};

const traverse = ({ method, start, end }, options) => {
  const hash = (entry) => `${entry.point.label}:${entry.facing}`;

  const seen = new Map();

  const initial = { point: start, facing: Orientation.EAST };

  return method(initial, null, {
    cost: (from, to) => (from.point === to.point ? 1000 : 1),
    done: (current) => current.point === end,
    hash,
    neighborsFor: (current, cost) => {
      const { point, facing } = current;

      if ((seen.get(hash(current)) ?? cost) !== cost) {
        return [];
      }
      seen.set(hash(current), cost);

      const nodes = [
        { point, facing: normalizeOrientation(facing + Rotation.TURN_RIGHT) },
        { point, facing: normalizeOrientation(facing + Rotation.TURN_LEFT) },
      ];

      const forwards = point.grid.getPoint(point.x + dx(facing), point.y + dy(facing));
      if (forwards && !isWall(forwards)) {
        nodes.push({ point: forwards, facing });
      }
      return nodes;
    },
    ...options,
  });
};

export const partOne = solution((input) => {
  const { start, end } = parse(input);
  return traverse({ method: astar, start, end }).score;
});

export const partTwo = solution.inefficient((input) => {
  const { start, end } = parse(input);

  const best = traverse({ method: astar, start, end });

  const results = traverse(
    {
      method: bfs,
      start,
      end,
    },
    {
      maxCost: best.score,
    },
  );

  const spots = new Set();
  for (const result of results) {
    for (const entry of result.path) {
      spots.add(entry.point);
    }
  }
  return spots.size;
});
