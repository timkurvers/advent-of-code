import { CircularLinkedList, LinkedList, solution } from '../../utils';

const parse = (input) => (
  Array.from(input.trim().matchAll(/-?\d+/g)).map(Number)
);

const decrypt = (list, { rounds = 1 } = {}) => {
  const root = CircularLinkedList.from(list);
  const nodes = LinkedList.toArray(root);
  const { length } = nodes;

  let zero;
  for (let round = 1; round <= rounds; ++round) {
    for (const node of nodes) {
      let { value } = node;
      if (value === 0) {
        zero = node;
        continue;
      }

      if (Math.abs(value) > length) {
        value %= length - 1;
      }

      const target = node.seek(value);
      node.remove();
      if (value > 0) {
        target.append(node);
      } else {
        target.prepend(node);
      }
    }
  }

  return zero.seek(1000).value + zero.seek(2000).value + zero.seek(3000).value;
};

export const partOne = solution((input) => {
  const list = parse(input);
  return decrypt(list);
});

export const partTwo = solution.inefficient((input) => {
  const deckey = 811589153;
  const list = parse(input).map((number) => number * deckey);
  return decrypt(list, { rounds: 10 });
});
