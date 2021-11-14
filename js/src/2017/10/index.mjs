import { CircularLinkedList, solution } from '../../utils';

import {
  createRange,
  hexknothash,
  parse,
  twist,
} from './knothash';

export const partOne = solution((input, { size = undefined }) => {
  const lengths = parse(input);
  const root = CircularLinkedList.from(createRange(size));
  twist(root, lengths);
  return root.value * root.next.value;
});

export const partTwo = solution((input) => (
  hexknothash(input)
));
