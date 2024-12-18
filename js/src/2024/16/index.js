import {
  Cache,
  Grid,
  Orientation,
  Rotation,
  astar,
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

const speedrun = ({ maze, start, end }) => {
  const initial = { point: start, facing: Orientation.EAST };

  const hash = (entry) => `${entry.point.label}:${entry.facing}`;
  const cache = new Cache({ hash });

  const best = astar(initial, null, {
    cost: (from, to) => (from.point === to.point ? 1000 : 1),
    done: (current) => current.point === end,
    nodesFor: ({ point, facing }) => {
      const nodes = [
        cache.lookup({ point, facing: normalizeOrientation(facing + Rotation.TURN_RIGHT) }),
        cache.lookup({ point, facing: normalizeOrientation(facing + Rotation.TURN_LEFT) }),
      ];

      const forwards = maze.getPoint(point.x + dx(facing), point.y + dy(facing));
      if (forwards && !isWall(forwards)) {
        nodes.push(cache.lookup({ point: forwards, facing }));
      }
      return nodes;
    },
  });

  return best;
};

export const partOne = solution((input) => {
  const { maze, start, end } = parse(input);
  return speedrun({ method: astar, maze, start, end }).score;
});

// TODO: Part two requires signficant changes to generic bfs implementation: later ;)
