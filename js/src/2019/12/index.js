import { combine, lcm, solution, sum } from '../../utils/index.js';

import Moon from './Moon.js';

const step = (moons) => {
  const pairs = combine(moons, { k: 2 });
  for (const [a, b] of pairs) {
    const xdiff = a.x - b.x;
    if (xdiff < 0) {
      ++a.dx;
      --b.dx;
    } else if (xdiff > 0) {
      --a.dx;
      ++b.dx;
    }
    const ydiff = a.y - b.y;
    if (ydiff < 0) {
      ++a.dy;
      --b.dy;
    } else if (ydiff > 0) {
      --a.dy;
      ++b.dy;
    }
    const zdiff = a.z - b.z;
    if (zdiff < 0) {
      ++a.dz;
      --b.dz;
    } else if (zdiff > 0) {
      --a.dz;
      ++b.dz;
    }
  }
  for (const moon of moons) {
    moon.x += moon.dx;
    moon.y += moon.dy;
    moon.z += moon.dz;
  }
};

const snapshot = (moons, prop) => {
  const dprop = `d${prop}`;
  return moons.map((moon) => `${moon[prop]},${moon[dprop]}`).join(';');
};

export const partOne = solution((input, { steps = 1000 }) => {
  const moons = Moon.from(input);
  for (let i = 1; i <= steps; ++i) {
    step(moons);
  }
  return sum(moons.map((moon) => moon.energy));
});

export const partTwo = solution((input) => {
  const moons = Moon.from(input);

  const xseen = {};
  const yseen = {};
  const zseen = {};

  let xcycle = null;
  let ycycle = null;
  let zcycle = null;

  for (let i = 0; !xcycle || !ycycle || !zcycle; ++i) {
    step(moons);

    if (!xcycle) {
      const xhash = snapshot(moons, 'x');
      if (xhash in xseen) xcycle = i;
      xseen[xhash] = true;
    }

    if (!ycycle) {
      const yhash = snapshot(moons, 'y');
      if (yhash in yseen) ycycle = i;
      yseen[yhash] = true;
    }

    if (!zcycle) {
      const zhash = snapshot(moons, 'z');
      if (zhash in zseen) zcycle = i;
      zseen[zhash] = true;
    }
  }

  return lcm([xcycle, ycycle, zcycle]);
});
