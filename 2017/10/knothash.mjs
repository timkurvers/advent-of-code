import { CircularLinkedList } from '../../utils';

export const parse = (source, { asASCII = false } = {}) => {
  if (asASCII) {
    return source.split('').map(char => char.charCodeAt(0));
  }
  return source.split(',').map(Number);
};

export const createRange = (range = 256) => (
  new Array(range).fill(0).map((_, index) => index)
);

export const twist = (root, lengths, { rounds = 1 } = {}) => {
  let position = root;
  let skip = 0;
  for (let round = 0; round < rounds; ++round) {
    for (const length of lengths) {
      let start = position;
      let end = start.seek(length - 1);
      for (let i = 0; i < length / 2; ++i) {
        const temp = start.value;
        start.value = end.value;
        end.value = temp;

        start = start.next;
        end = end.prev;
      }
      position = position.seek(length + skip);
      ++skip;
    }
  }
};

const densify = (sparse) => {
  const dense = [];
  for (let i = 0; i < 16; ++i) {
    const slice = sparse.slice(i * 16, i * 16 + 16);
    const block = slice.reduce((xor, current) => xor ^ current);
    dense.push(block);
  }
  return dense;
};

const hexhash = dense => (
  dense.map(number => number.toString(16).padStart(2, '0')).join('')
);

export const knothash = (source, { range } = {}) => {
  const lengths = parse(source, { asASCII: true });
  lengths.push(17, 31, 73, 47, 23);
  const root = CircularLinkedList.from(createRange(range));
  twist(root, lengths, { rounds: 64 });
  const sparse = CircularLinkedList.toArray(root);
  return densify(sparse);
};

export const hexknothash = (source, options) => (
  hexhash(knothash(source, options))
);
