#!/usr/bin/env node --experimental-modules --no-warnings

import { CircularLinkedList } from '../../utils';
import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';

class Elf {
  constructor(id) {
    this.id = id;
    this.presents = 1;
  }
}

const play = (count) => {
  const elves = Array.from({ length: count }, (_, index) => (
    new Elf(index + 1)
  ));

  let current = CircularLinkedList.from(elves);
  while (true) {
    const currentElf = current.value;
    if (currentElf.presents === count) {
      break;
    }


    const target = current.next;
    currentElf.presents += target.value.presents;
    target.remove();

    current = current.next;
  }

  return current.value;
};

day(19).part(1).test(examples).feed(puzzleInput).inefficient.solution(input => (
  play(+input).id
));