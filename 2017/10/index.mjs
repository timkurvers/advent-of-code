import { CircularLinkedList, solution } from '../../utils';

import {
  createRange,
  hexknothash,
  parse,
  twist,
} from './knothash';

export const partOne = solution((input, isExample) => {
  const lengths = parse(input);
  const root = CircularLinkedList.from(createRange(isExample ? 5 : undefined));
  twist(root, lengths);
  return root.value * root.next.value;
});

export const partTwo = solution(input => (
  hexknothash(input)
));
