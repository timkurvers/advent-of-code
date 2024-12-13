import { solution, sum } from '../../utils/index.js';

const NUMBER_MATCHER = /\d+/g;

const parse = (input) =>
  input
    .trim()
    .split('\n\n')
    .map((section) => {
      const [adx, ady, bdx, bdy, px, py] = Array.from(section.matchAll(NUMBER_MATCHER)).map((match) =>
        Number(match[0]),
      );
      return {
        a: { dx: adx, dy: ady },
        b: { dx: bdx, dy: bdy },
        prize: { x: px, y: py },
      };
    });

const cheat = (machine) => {
  // Dealing with systems of linear equations, example:
  //   94a + 22b = 8400
  //   34a + 67b = 5400
  // See: https://en.wikipedia.org/wiki/Reduction_(mathematics)#Algebra

  const factors = { x: machine.a.dx, y: machine.a.dy };

  // Multiply each equation with its a (dx or dy) counterpart to normalize a:
  //   3196a + 748b = 285600
  //   3196a + 6298b = 507600
  const eq1 = {
    adx: machine.a.dx * factors.y,
    bdx: machine.b.dx * factors.y,
    rhs: machine.prize.x * factors.y,
  };
  const eq2 = {
    ady: machine.a.dy * factors.x,
    bdy: machine.b.dy * factors.x,
    rhs: machine.prize.y * factors.x,
  };

  // Now, strike a from both equations and subtract to end up with one equation:
  //   5550b = 222000
  const rhs = eq2.rhs - eq1.rhs;
  const lhsb = eq2.bdy - eq1.bdx;

  // Calculate b, and infer a by passing b into original equation
  const btimes = rhs / lhsb;
  const atimes = (machine.prize.x - machine.b.dx * btimes) / machine.a.dx;

  if (Number.isInteger(atimes) && Number.isInteger(btimes)) {
    return atimes * 3 + btimes;
  }
  return 0;
};

const harden = (machine) => {
  machine.prize.x += 10_000_000_000_000;
  machine.prize.y += 10_000_000_000_000;
  return machine;
};

export const partOne = solution((input) => {
  const machines = parse(input);
  return sum(machines.map(cheat));
});

export const partTwo = solution((input) => {
  const machines = parse(input).map(harden);
  return sum(machines.map(cheat));
});
