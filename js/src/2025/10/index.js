import { astar, solution } from '../../utils/index.js';

const ON = '#';

const unwrap = (str, separator = ',') => str.slice(1, -1).split(separator);

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const parts = line.split(' ');
      const lights = unwrap(parts.shift(), '').map((char) => +(char === ON));
      const joltages = unwrap(parts.pop()).map(Number);
      const buttons = parts.map((part) => unwrap(part).map(Number));
      return { target: { lights, joltages }, buttons, line };
    });

const init = (state) => state.map(() => 0);

const toggle = (state, button) => {
  const next = [...state];
  for (const index of button) {
    next[index] = +!next[index];
  }
  return next;
};

const matches = (state, target) => state.every((light, index) => light === target[index]);

export const partOne = solution.inefficient((input) => {
  const machines = parse(input);

  let total = 0;
  for (const machine of machines) {
    const start = { state: init(machine.target.lights), presses: [] };

    const result = astar(start, null, {
      done: (current, _goal) => matches(current.state, machine.target.lights),
      nodesFor: (current) => {
        const next = [];
        for (const button of machine.buttons) {
          // Do not allow pressing button twice
          if (current.presses.at(-1) === button) {
            continue;
          }

          const state = toggle(current.state, button);
          const entry = { state, presses: [...current.presses, button] };

          if (matches(state, machine.target.lights)) {
            return [entry];
          }

          next.push(entry);
        }

        return next;
      },
    });

    total += result.score;
  }

  return total;
});

// Haven't had time yet for p2 :(
