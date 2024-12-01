import { Grid, reduceMinBy, solution } from '../../utils/index.js';

const parse = (input) =>
  input
    .trim()
    .split('')
    .map((c) => (c === '<' ? -1 : 1));

const WIDTH = 7;

const EDGE = '+';
const FLOOR = '-';
const FALLING = '@';
const LANDED = '#';

const RockShape = {
  // ####
  lineh: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],

  //  #
  // ###
  //  #
  plus: [
    [0, -1],
    [1, -1],
    [2, -1],
    [1, -2],
    [1, 0],
  ],

  //   #
  //   #
  // ###
  corner: [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, -1],
    [2, -2],
  ],

  // #
  // #
  // #
  // #
  linev: [
    [0, 0],
    [0, -1],
    [0, -2],
    [0, -3],
  ],

  // ##
  // ##
  square: [
    [0, 0],
    [1, 0],
    [0, -1],
    [1, -1],
  ],
};

const shapes = Object.values(RockShape);

const simulate = (jets, { rounds }) => {
  const minX = 0;
  const maxX = WIDTH - 1;

  let minY = 0;
  const maxY = 0;

  const grid = new Grid();

  grid.set(minX - 1, maxY, EDGE);
  for (let x = minX; x <= maxX; ++x) {
    grid.set(x, maxY, FLOOR);
  }
  grid.set(maxX + 1, maxY, EDGE);

  const _visualize = (current) => {
    const vis = new Grid();
    for (const point of grid) {
      vis.set(point.x, point.y, point.value);
    }

    if (current) {
      for (const [x, y] of current.shape) {
        vis.set(current.x + x, current.y + y, FALLING);
      }
    }

    console.log();
    console.log(vis.toString());
    console.log();
  };

  let height = -minY;

  // Used for cycle detection
  const stats = new Map();
  const seen = new Map();

  const serialize = (stat) => {
    const current = stat;
    const prev = stats.get(current.round - 1);
    const prev2 = stats.get(current.round - 2);
    if (!prev || !prev2) return current.round;

    const hash = JSON.stringify([
      current.jet,
      current.rock.x,
      current.height + current.rock.y,

      prev.jet,
      prev.rock.x,
      prev.height + prev.rock.y,

      prev2.jet,
      prev2.rock.x,
      prev2.height + prev2.rock.y,
    ]);
    return hash;
  };

  let index = 0;
  for (let round = 1; round <= rounds; ++round) {
    const shape = shapes[(round - 1) % shapes.length];

    minY -= 1;

    const rock = {
      shape,
      x: minX + 2,
      y: minY - 3,
    };

    const isCollision = (dx, dy) => {
      for (const [x, y] of rock.shape) {
        const tx = rock.x + x + dx;
        const ty = rock.y + y + dy;

        if (tx < minX || tx > maxX) {
          return true;
        }

        if (grid.get(tx, ty)) {
          return true;
        }
      }
      return false;
    };

    while (true) {
      const jet = jets[index++ % jets.length];

      if (!isCollision(jet, 0)) {
        rock.x += jet;
      }

      if (!isCollision(0, 1)) {
        rock.y += 1;
      } else {
        for (const [x, y] of rock.shape) {
          grid.set(rock.x + x, rock.y + y, LANDED);
        }

        minY = reduceMinBy(grid.points, 'y').y;

        height = -minY;

        const stat = {
          round,
          height,
          rock,
          shape,
          jet: (index - 1) % jets.length,
        };
        stats.set(round, stat);

        const hash = serialize(stat);
        if (seen.has(hash)) {
          const entry = seen.get(hash);

          const cycleLength = round - entry.round;
          const cycleHeight = height - entry.height;

          const roundsRemaining = rounds - entry.round;
          const fullCycles = Math.floor(roundsRemaining / cycleLength);
          const remainder = roundsRemaining % cycleLength;

          height = cycleHeight * fullCycles + stats.get(entry.round + remainder).height;

          return { height };
        }
        seen.set(hash, { round, height });

        break;
      }
    }
  }

  return { height };
};

export const partOne = solution((input) => {
  const jets = parse(input);
  const { height } = simulate(jets, { rounds: 2022 });
  return height;
});

export const partTwo = solution((input) => {
  const jets = parse(input);
  const { height } = simulate(jets, { rounds: 1000000000000 });
  return height;
});
