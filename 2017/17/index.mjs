import { CircularLinkedList, LinkedListNode, solution } from '../../utils';

export const partOne = solution((input) => {
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

export const partTwo = solution((input) => {
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
