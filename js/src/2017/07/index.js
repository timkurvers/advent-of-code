import { solution } from '../../utils/index.js';

import Program from './Program.js';

export const partOne = solution((input) => {
  const { root } = Program.parse(input);
  return root.id;
});

export const partTwo = solution((input) => {
  const { root } = Program.parse(input);

  let current = root;
  while (current.isImbalanced) {
    const next = Array.from(current.children).find((child) => child.isImbalanced);
    if (!next) {
      break;
    }
    current = next;
  }

  return current.imbalance.targetWeight;
});
