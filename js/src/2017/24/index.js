/* eslint-disable no-cond-assign */

import { reduceMaxBy, solution, sum } from '../../utils/index.js';

const parse = (input) => (
  input.trim().split('\n').map((line) => line.split('/').map(Number))
);

const generate = (components) => {
  const frontier = [];
  const initial = {
    bridge: [],
    remaining: components,
    connect: null,
  };

  const queue = (state, component, port) => {
    let connect = component.find((p) => p !== port);
    if (connect === undefined) {
      connect = port;
    }
    const next = {
      ...state,
      bridge: state.bridge.concat([component]),
      remaining: state.remaining.filter((c) => c !== component),
      connect,
    };
    frontier.push(next);
  };

  const roots = components.filter((c) => c.includes(0));
  for (const root of roots) {
    queue(initial, root, 0);
  }

  const bridges = [];
  let current;
  while (current = frontier.pop()) {
    const { bridge, remaining, connect } = current;

    const candidates = remaining.filter((c) => c.includes(connect));
    if (!candidates.length) {
      bridges.push(bridge);
    }

    for (const candidate of candidates) {
      queue(current, candidate, connect);
    }
  }
  return bridges;
};

export const partOne = solution.inefficient((input) => {
  const components = parse(input);
  const bridges = generate(components).map((bridge) => ({
    bridge,
    strength: sum(bridge.flat()),
  }));
  return reduceMaxBy(bridges, 'strength').strength;
});

export const partTwo = solution.inefficient((input) => {
  const components = parse(input);
  const bridges = generate(components).map((bridge) => ({
    bridge,
    length: bridge.length,
    strength: sum(bridge.flat()),
  }));

  // Sort bridges by length descending and - if equal - by strength descending
  const sorted = bridges.sort((a, b) => {
    const diff = b.length - a.length;
    if (diff === 0) {
      return b.strength - a.strength;
    }
    return diff;
  });
  return sorted[0].strength;
});
