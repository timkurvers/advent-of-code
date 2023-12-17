import { Grid, Orientation, Rotation, astar, cast, dx, dy, normalizeOrientation, solution } from '../../utils';

const parse = (input) => Grid.from(input.trim(), { cast });

const serialize = (state) => (
  `${state.location.label};${state.orientation};${state.consecutive}`
);

const traverse = (grid, { isUltra = false } = {}) => {
  const start = grid.getPoint(0, 0);
  const goal = grid.getPoint(grid.maxX, grid.maxY);

  const initial = { location: start, orientation: null, consecutive: 1 };

  const cache = new Map();

  const result = astar(initial, null, {
    cost: (from, to) => to.location.value,
    done: (current) => (
      current.location === goal && (!isUltra || current.consecutive >= 4)
    ),
    neighborsFor: (current) => {
      const nodes = [];

      if (current.orientation === null) {
        nodes.push({ ...current, orientation: Orientation.DOWN });
        nodes.push({ ...current, orientation: Orientation.RIGHT });
      } else {
        const move = (rotation) => {
          let { consecutive, orientation } = current;

          // Verify that this move (moving forward, rotating left, or right) is allowed
          if (rotation === Rotation.NONE) {
            if (!isUltra && consecutive >= 3) {
              return;
            }
            if (isUltra && consecutive >= 10) {
              return;
            }
            ++consecutive;
          } else {
            if (isUltra && consecutive < 4) {
              return;
            }
            consecutive = 1;
          }

          // Apply the rotation and verify that the target point exists
          orientation += rotation;

          const { location: { x, y } } = current;
          const target = grid.getPoint(x + dx(orientation), y + dy(orientation));
          if (target) {
            let next = {
              location: target,
              orientation: normalizeOrientation(orientation),
              consecutive,
            };

            const hash = serialize(next);
            next = cache.get(hash) || next;
            nodes.push(next);
            cache.set(hash, next);
          }
        };

        move(Rotation.TURN_LEFT);
        move(Rotation.TURN_RIGHT);
        move(Rotation.NONE);
      }

      return nodes;
    },
  });

  return { result, start, goal };
};

export const partOne = solution.inefficient((input) => {
  const grid = parse(input);
  const { result: { score }, start } = traverse(grid);
  return score - start.value;
});

export const partTwo = solution.inefficient((input) => {
  const grid = parse(input);
  const { result: { score }, start } = traverse(grid, { isUltra: true });
  return score - start.value;
});
