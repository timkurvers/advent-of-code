#!/usr/bin/env node --experimental-modules --no-warnings

import { CircularLinkedList } from '../../utils';
import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

const parse = (input, { asASCII = false } = {}) => {
  if (asASCII) {
    return input.split('').map(char => char.charCodeAt(0));
  }
  return input.split(',').map(Number);
};

const range = (isExample = false) => (
  new Array(isExample ? 5 : 256).fill(0).map((_, index) => index)
);

const twist = (root, lengths, { rounds = 1 } = {}) => {
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

day(10).part(1).test(examples).feed(puzzleInput).solution((input, isExample) => {
  const lengths = parse(input);
  const root = CircularLinkedList.from(...range(isExample));
  twist(root, lengths);
  return root.value * root.next.value;
});

day(10).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const lengths = parse(input, { asASCII: true });
  lengths.push(17, 31, 73, 47, 23);
  const root = CircularLinkedList.from(...range());
  twist(root, lengths, { rounds: 64 });
  const sparse = CircularLinkedList.toArray(root);
  return hexhash(densify(sparse));
});
