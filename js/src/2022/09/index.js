import { Grid, solution } from '../../utils/index.js';

const parse = (input) => (
  input.trim().split('\n').map((line) => {
    const parts = line.split(' ');
    return { dir: parts[0], steps: +parts[1] };
  })
);

const HEAD = 'H';
const TAIL = 'T';
const VISITED = '#';

const DirDeltas = {
  U: [0, -1],
  D: [0, 1],
  L: [-1, 0],
  R: [1, 0],
};

const simulate = (motions, { knots: length }) => {
  const grid = new Grid();
  grid.set(0, 0, VISITED);

  const knots = Array.from({ length }, () => ({ x: 0, y: 0 }));
  const [head, ...body] = knots;
  const tail = body[body.length - 1];

  const _visualize = () => {
    const vis = new Grid();

    vis.set(head.x, head.y, HEAD);

    for (const [index, knot] of body.entries()) {
      if (!vis.get(knot.x, knot.y)) {
        vis.set(knot.x, knot.y, knot === tail ? TAIL : index + 1);
      }
    }

    console.log();
    console.log(vis.toString());
    console.log();
  };

  for (const { dir, steps } of motions) {
    const dxdy = DirDeltas[dir];

    for (let step = 1; step <= steps; ++step) {
      head.x += dxdy[0];
      head.y += dxdy[1];

      let prev = head;
      for (const knot of body) {
        const dx = prev.x - knot.x;
        const dy = prev.y - knot.y;

        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          knot.x += Math.sign(dx);
          knot.y += Math.sign(dy);

          if (knot === tail) {
            grid.set(knot.x, knot.y, VISITED);
          }
        }

        prev = knot;
      }
    }
  }

  return grid;
};

export const partOne = solution((input) => {
  const motions = parse(input);
  const result = simulate(motions, { knots: 2 });
  return result.points.length;
});

export const partTwo = solution((input) => {
  const motions = parse(input);
  const result = simulate(motions, { knots: 10 });
  return result.points.length;
});
