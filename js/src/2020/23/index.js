import { CircularLinkedList, solution } from '../../utils/index.js';

const parse = (input) => input.split('').map(Number);

const play = (cups, { moves, flood }) => {
  const lowest = Math.min(...cups);
  let highest = Math.max(...cups);

  // When flood number is given, add a cup for each number up to flood number
  if (flood) {
    for (let cup = highest + 1; cup <= flood; ++cup) {
      cups.push(cup);
    }
    highest = flood;
  }

  // Convert the cups to a circular linked list representing the circle
  let current = CircularLinkedList.from(cups);

  // Lookup mechanism to find arbitrary cups by value in the circle
  const lookup = CircularLinkedList.toArray(current).reduce((map, cup) => {
    map.set(cup.value, cup);
    return map;
  }, new Map());

  // Play through the requested amount of moves
  for (let move = 1; move <= moves; ++move) {
    const picked = [current.next, current.next.next, current.next.next.next];

    const isNumberPicked = (number) => picked.some((cup) => cup.value === number);

    // Determine the destination cup and insert the picked cups correctly
    let next = current.value - 1;
    while (!lookup.has(next) || isNumberPicked(next)) {
      --next;
      if (next < lowest) {
        next = highest;
      }
    }
    let destination = lookup.get(next);
    for (const cup of picked) {
      cup.remove();
      destination.append(cup);
      destination = cup;
    }

    current = current.next;
  }

  return lookup;
};

export const partOne = solution((input, { moves = 100 }) => {
  const cups = parse(input);
  const lookup = play(cups, { moves });
  const cup1 = lookup.get(1);
  return CircularLinkedList.toValuesArray(cup1.next).slice(0, -1).join('');
});

export const partTwo = solution.inefficient((input, { moves = 10_000_000 }) => {
  const cups = parse(input);
  const lookup = play(cups, { moves, flood: 1_000_000 });
  const cup1 = lookup.get(1);
  return cup1.next.value * cup1.next.next.value;
});
