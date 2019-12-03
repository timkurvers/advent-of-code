import { CircularLinkedList, LinkedListNode } from '../../utils';
import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

day(17).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const steps = +input;

  let value = 0;
  const root = CircularLinkedList.from([value]);
  let current = root;
  do {
    ++value;
    const target = current.seek(steps);
    current = new LinkedListNode(value);
    target.append(current);
  } while (value < 2017);

  return current.next.value;
});

day(17).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const steps = +input;

  let index = 0;
  let latest = null;
  for (let value = 1; value <= 50000000; ++value) {
    index = (index + steps) % value;
    ++index;
    if (index === 1) {
      latest = value;
    }
  }
  return latest;
});
