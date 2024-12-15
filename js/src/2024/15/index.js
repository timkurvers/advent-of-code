import { Grid, solution, sum } from '../../utils/index.js';

const ROBOT = '@';
const BOX = 'O';
const BOXL = '[';
const BOXR = ']';
const WALL = '#';
const EMPTY = '.';

const isRobot = (point) => point.value === ROBOT;
const isWideBox = (point) => point.value === BOXL || point.value === BOXR;
const isBox = (point) => point.value === BOX || isWideBox(point);
const isWall = (point) => point.value === WALL;

const isFree = (point) => !isBox(point) && !isWall(point);

const Move = {
  '>': 'right',
  '<': 'left',
  '^': 'up',
  v: 'down',
};

const parse = (input, { widen = false } = {}) => {
  const parts = input.trim().split('\n\n');

  let map = Grid.from(parts[0]);

  if (widen) {
    const widened = new Grid();

    for (const point of map) {
      let left = point.value;
      let right = EMPTY;
      if (point.value === ROBOT) {
        right = EMPTY;
      } else if (point.value === BOX) {
        left = BOXL;
        right = BOXR;
      } else if (point.value === WALL) {
        right = WALL;
      }
      widened.set(point.x * 2, point.y, left);
      widened.set(point.x * 2 + 1, point.y, right);
    }

    map = widened;
  }

  const robot = map.find(isRobot);

  const moves = parts[1]
    .replaceAll('\n', '')
    .split('')
    .map((move) => Move[move]);

  return { robot, map, moves };
};

// Whether given box can be pushed in this direction
const isPushable = (box, direction) => {
  if (isWideBox(box)) {
    const left = box.value === BOXL ? box : box.left;
    const right = box.value === BOXR ? box : box.right;

    if (direction === 'up' || direction === 'down') {
      const leftTarget = left[direction];
      const rightTarget = right[direction];
      return (
        (isFree(leftTarget) || (isBox(leftTarget) && isPushable(leftTarget, direction))) &&
        (isFree(rightTarget) || (isBox(rightTarget) && isPushable(rightTarget, direction)))
      );
    }

    const target = direction === 'left' ? left[direction] : right[direction];
    return isFree(target) || (isBox(target) && isPushable(target, direction));
  }

  const target = box[direction];
  return isFree(target) || (isBox(target) && isPushable(target, direction));
};

// Attempts to push given box (including any consecutive ones) and returns whether it actually succeeded
const push = (box, direction) => {
  if (isWideBox(box)) {
    const left = box.value === BOXL ? box : box.left;
    const right = box.value === BOXR ? box : box.right;

    if (direction === 'up' || direction === 'down') {
      const leftTarget = left[direction];
      const rightTarget = right[direction];

      if (isBox(leftTarget)) {
        push(leftTarget, direction);
      }
      leftTarget.value = left.value;
      left.value = EMPTY;

      if (isBox(rightTarget)) {
        push(rightTarget, direction);
      }
      rightTarget.value = right.value;
      right.value = EMPTY;
    } else {
      const target = direction === 'left' ? left[direction] : right[direction];
      if (isBox(target)) {
        push(target, direction);
      }

      if (direction === 'left') {
        target.value = left.value;
        left.value = right.value;
        right.value = EMPTY;
      } else {
        target.value = right.value;
        right.value = left.value;
        left.value = EMPTY;
      }
    }
    return;
  }

  const target = box[direction];
  if (isBox(target)) {
    push(target, direction);
  }
  target.value = box.value;
};

// Runs robot according to moves
const run = (robot, map, moves) => {
  for (const direction of moves) {
    const target = robot[direction];

    if (isWall(target)) {
      continue;
    }

    if (isBox(target)) {
      if (!isPushable(target, direction)) {
        continue;
      }
      push(target, direction);
    }

    robot.value = EMPTY;
    robot = target;
    target.value = '@';
  }
};

// Calculates GPS coordinate score
const gps = (point) => point.y * 100 + point.x;

export const partOne = solution((input) => {
  const { robot, map, moves } = parse(input);
  run(robot, map, moves);
  return sum(map.filter(isBox).map(gps));
});

export const partTwo = solution((input) => {
  const { robot, map, moves } = parse(input, { widen: true });
  run(robot, map, moves);
  return sum(map.filter((point) => point.value === BOXL).map(gps));
});
