import { Graph, lcm, solution } from '../../utils';

const PATH_MATCHER = /(\w+) = \((\w+), (\w+)\)/g;

const parse = (input) => {
  const parts = input.trim().split('\n\n');

  const instructions = parts[0].split('').map((i) => (i === 'L' ? 0 : 1));

  const network = new Graph();
  for (const [_, from, a, b] of parts[1].matchAll(PATH_MATCHER)) {
    network.edge(from, a);
    network.edge(from, b);
  }

  return { instructions, network };
};

export const partOne = solution((input) => {
  const { network, instructions } = parse(input);

  const start = network.find('AAA');
  const goal = network.find('ZZZ');

  let current = start;
  let steps = 0;
  while (current !== goal) {
    const move = instructions[steps % instructions.length];
    const next = current.edges[move] || current.edges[0];
    current = next.to;
    ++steps;
  }

  return steps;
});

export const partTwo = solution((input) => {
  const { network, instructions } = parse(input);

  const starts = network.vertices.filter((v) => v.value.endsWith('A'));
  const atGoal = (ghost) => ghost.current.value.endsWith('Z');
  const hasCycle = (ghost) => ghost.cycle && ghost.cycle.length;

  const ghosts = starts.map((start) => ({
    current: start,
    cycle: null,
  }));
  let steps = 0;
  while (!ghosts.every(hasCycle)) {
    const move = instructions[steps % instructions.length];
    for (const ghost of ghosts) {
      const next = ghost.current.edges[move] || ghost.current.edges[0];
      ghost.current = next.to;
      if (atGoal(ghost)) {
        if (!ghost.cycle) {
          ghost.cycle = { start: steps };
        } else if (!ghost.cycle.length) {
          ghost.cycle.length = steps - ghost.cycle.start;
        }
      }
    }
    ++steps;
  }

  // We meet again AoC 2022 day 11! :o
  return lcm(ghosts.map((ghost) => ghost.cycle.length));
});
