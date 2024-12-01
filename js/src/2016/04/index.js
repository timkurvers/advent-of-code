import { solution, sum } from '../../utils/index.js';

const ALPHABET_START = 'a'.charCodeAt(0);
const ROOM_MATCHER = /([a-z-]+)-(\d+)\[([a-z]+)\]/;

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((row) => {
      const [, name, id, checksum] = row.match(ROOM_MATCHER);
      return { name, id: +id, checksum };
    });

const verify = (room) => {
  const counts = {};
  for (const char of room.name) {
    if (char === '-') continue;
    counts[char] = (counts[char] || 0) + 1;
  }

  const checksum = Object.keys(counts)
    .sort((a, b) => {
      const diff = counts[b] - counts[a];
      if (diff === 0) {
        if (a > b) return 1;
        if (a < b) return -1;
      }
      return diff;
    })
    .slice(0, 5)
    .join('');

  return checksum === room.checksum;
};

const decrypt = (room) => {
  const name = room.name
    .split('')
    .map((char) => {
      if (char === '-') {
        return ' ';
      }
      const index = char.charCodeAt(0) - ALPHABET_START;
      const shifted = ALPHABET_START + ((index + room.id) % 26);
      return String.fromCharCode(shifted);
    })
    .join('');
  return { ...room, name };
};

export const partOne = solution((input) =>
  sum(
    parse(input)
      .filter(verify)
      .map((room) => room.id),
  ),
);

export const partTwo = solution((input) => {
  const rooms = parse(input).filter(verify).map(decrypt);
  return rooms.find((room) => room.name === 'northpole object storage').id;
});
