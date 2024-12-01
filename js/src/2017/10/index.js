import { CircularLinkedList, solution } from '../../utils/index.js';

import {
  createRange,
  hexknothash,
  parse,
  twist,
} from './knothash.js';

export const partOne = solution((input, { size = undefined }) => {
  const lengths = parse(input);
  const root = CircularLinkedList.from(createRange(size));
  twist(root, lengths);
  return root.value * root.next.value;
});

export const partTwo = solution((input) => (
  hexknothash(input)
));
