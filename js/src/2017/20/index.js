import { reduceMinBy, solution } from '../../utils/index.js';

const parse = (input) => {
  const matches = Array.from(input.matchAll(/p=<(.+),(.+),(.+)>, v=<(.+),(.+),(.+)>, a=<(.+),(.+),(.+)>/g));
  return matches.map((match, id) => {
    const [, px, py, pz, vx, vy, vz, ax, ay, az] = match.map(Number);
    const aavg = (Math.abs(ax) + Math.abs(ay) + Math.abs(az)) / 3;
    return {
      id,
      px,
      py,
      pz,
      vx,
      vy,
      vz,
      ax,
      ay,
      az,
      aavg,
    };
  });
};

export const partOne = solution((input) => {
  const particles = parse(input);
  return reduceMinBy(particles, 'aavg').id;
});

export const partTwo = solution((input) => {
  const particles = new Set(parse(input));

  // Assume simulation is complete once no collisions take place for a while
  let ok = 0;
  while (ok < 100) {
    const collisions = new Map();
    for (const p of particles) {
      p.vx += p.ax;
      p.px += p.vx;
      p.vy += p.ay;
      p.py += p.vy;
      p.vz += p.az;
      p.pz += p.vz;
      const entry = `${p.px},${p.py},${p.pz}`;
      const collision = collisions.get(entry) || new Set();
      collision.add(p);
      collisions.set(entry, collision);
    }
    ++ok;
    for (const [, collision] of collisions) {
      if (collision.size > 1) {
        ok = 0;
        for (const p of collision) {
          particles.delete(p);
        }
      }
    }
  }
  return particles.size;
});
