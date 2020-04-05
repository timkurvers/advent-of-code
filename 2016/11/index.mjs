/* eslint-disable consistent-return */

import {
  astar,
  combine,
  solution,
} from '../../utils';

import Component from './Component';

const COMPONENT_MATCHER = /[\w-]+ (microchip|generator)+/g;
const ELEVATOR_BIT = 1 << 0;
const TOP_FLOOR_INDEX = 3;

const parse = (input) => {
  const components = [];
  const floors = [];

  // Generate a bit field for all floors
  // Example: 0b00011011 (first bit marks elevator, the others components)
  input.trim().split('\n').forEach((line) => {
    let floor = 0;
    for (const match of line.match(COMPONENT_MATCHER) || []) {
      const component = new Component(components.length, match);
      components.push(component);
      floor |= component.bit;
    }
    floors.push(floor);
  });

  // Mark elevator bit for the first floor
  floors[0] |= ELEVATOR_BIT;

  return { components, floors };
};

const componentsFor = (floor, components) => {
  const available = [];
  const chips = [];
  const generators = [];
  for (const component of components) {
    if (floor & component.bit) {
      available.push(component);
      if (component.type === 'microchip') {
        chips.push(component);
      } else {
        generators.push(component);
      }
    }
  }
  return { available, chips, generators };
};

const validate = (floors, components) => (
  floors.every((floor) => {
    const { chips, generators } = componentsFor(floor, components);
    return chips.every((chip) => {
      let intact = true;
      for (const generator of generators) {
        if (generator.compound === chip.compound) {
          return true;
        }
        intact = false;
      }
      return intact;
    });
  })
);

const serialize = (floors, components) => {
  const { length } = components;
  return floors.map((floor) => {
    const { chips, generators } = componentsFor(floor, components);

    // Pairs are interchangable, ensure serializiation takes this into account
    // Example: 0b00000001 00010001 (high part indicates one pair)
    let pairless = floor;
    let pairs = 0;

    for (const chip of chips) {
      for (const generator of generators) {
        if (generator.compound === chip.compound) {
          ++pairs;
          pairless ^= chip.bit;
          pairless ^= generator.bit;
        }
      }
    }

    return (pairs << (length + 1)) | pairless;
  }).join();
};

const simulate = (floors, components) => {
  const cache = new Map();

  const done = components.reduce((mask, component) => (
    mask ^ component.bit
  ), 0);

  const transition = (current, scenario, index, diff) => {
    const offset = index + diff;

    // Bail out if target floor does not exist
    if (!(offset in current)) {
      return;
    }

    // Create a clone to add to the frontier
    const next = current.slice();

    // Toggle components on both floors (switching location)
    for (const component of scenario) {
      const { bit } = component;
      next[index] ^= bit;
      next[offset] ^= bit;
    }

    // Move elevator to target floor
    next[index] ^= ELEVATOR_BIT;
    next[offset] ^= ELEVATOR_BIT;

    const hash = serialize(next, components);
    const cached = cache.get(hash);
    if (cached) {
      return cached;
    }
    if (validate(next, components)) {
      cache.set(hash, next);
      return next;
    }
  };

  return astar(floors, null, {
    nodesFor: (current) => {
      // Locate elevator, the current floor and its components
      const index = current.findIndex((f) => f & ELEVATOR_BIT);
      const floor = current[index];
      const { available } = componentsFor(floor, components);

      // Scenarios of bringing one or two components (elevator requirement)
      const scenarios = [
        ...combine(available, { k: 1 }),
        ...combine(available, { k: 2 }),
      ];

      const nodes = [];
      for (const scenario of scenarios) {
        const up = transition(current, scenario, index, 1);
        if (up) {
          nodes.push(up);
        }
        const down = transition(current, scenario, index, -1);
        if (down) {
          nodes.push(down);
        }
      }
      return nodes;
    },
    done: (current) => (current[TOP_FLOOR_INDEX] & done) === done,
    heuristic: (current) => (
      current.reduce((heuristic, floor, index) => {
        const { available } = componentsFor(floor, components);

        const distance = TOP_FLOOR_INDEX - index;
        let steps = Math.ceil(available.length / 2) * distance * 2;
        if (floor & ELEVATOR_BIT) {
          steps -= distance;
        }
        return heuristic + steps;
      }, 0)
    ),
  });
};

export const partOne = solution.inefficient((input) => {
  const { components, floors } = parse(input);
  return simulate(floors, components).score;
});

export const partTwo = solution.inefficient((input) => {
  const { components, floors } = parse(input);

  const extras = [
    'elerium generator',
    'elerium-compatible microchip',
    'dilithium generator',
    'dilithium-compatible microchip',
  ];

  for (const extra of extras) {
    const component = new Component(components.length, extra);
    components.push(component);
    floors[0] |= component.bit;
  }

  return simulate(floors, components).score;
});
