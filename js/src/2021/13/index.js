import { Grid, solution } from '../../utils/index.js';

const FOLD_MATCHER = /(x|y)=(\d+)/;

const DOT = '#';

const parse = (input) => {
  const parts = input.trim().split('\n\n').map((lines) => (
    lines.split('\n')
  ));
  const dots = parts[0].map((str) => str.split(',').map(Number));
  const folds = parts[1].map((str) => {
    const match = FOLD_MATCHER.exec(str);
    return { direction: match[1], offset: Number(match[2]) };
  });

  const grid = new Grid();
  for (const dot of dots) {
    grid.set(dot[0], dot[1], DOT);
  }
  return { grid, folds };
};

const apply = (fold, grid) => {
  if (fold.direction === 'x') {
    for (const point of grid.points) {
      if (point.x > fold.offset) {
        if (point.value === DOT) {
          grid.set(fold.offset - (point.x - fold.offset), point.y, DOT);
        }
        grid.remove(point.x, point.y);
      }
    }
  } else if (fold.direction === 'y') {
    for (const point of grid.points) {
      if (point.y > fold.offset) {
        if (point.value === DOT) {
          grid.set(point.x, fold.offset - (point.y - fold.offset), DOT);
        }
        grid.remove(point.x, point.y);
      }
    }
  }
};

export const partOne = solution((input) => {
  const { grid, folds } = parse(input);
  apply(folds[0], grid);
  return grid.filter((point) => point.value === DOT).length;
});

export const partTwo = solution((input) => {
  const { grid, folds } = parse(input);
  for (const fold of folds) {
    apply(fold, grid);
  }
  console.log(grid.toString());
  return '<see visually above>';
});
