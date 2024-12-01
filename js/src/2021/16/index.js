/* eslint-disable no-cond-assign, no-param-reassign */

import { solution, sum } from '../../utils/index.js';

// Parses given hex string into a bit stream (keeping leading zero bits)
const parse = (hex) => {
  const num = BigInt(`0x${hex.trim()}`);
  const bits = num.toString(2).split('').map(Number);
  while (bits.length % 8 !== 0) {
    bits.unshift(0);
  }
  const stream = { bits, pos: 0 };
  return stream;
};

const read = (stream, numBits = 1) => {
  let value = 0;
  for (let i = 0; i < numBits; ++i) {
    value *= 2;
    value += stream.bits[stream.pos++];
  }
  return value;
};

const process = (stream) => {
  const version = read(stream, 3);
  const typeID = read(stream, 3);
  const packet = { version, typeID, packets: [] };

  // Literal value
  if (typeID === 4) {
    let value = 0;
    let sentinel = null;
    do {
      sentinel = read(stream);
      value *= 16;
      value += read(stream, 4);
    } while (sentinel !== 0);
    return { ...packet, value };
  }

  const lengthID = read(stream);
  switch (lengthID) {
    // Total length in bits
    case 0: {
      const length = read(stream, 15);
      const end = stream.pos + length;
      while (stream.pos < end) {
        packet.packets.push(process(stream));
      }
    } break;
    // Number of sub packets
    case 1: {
      const count = read(stream, 11);
      for (let i = 0; i < count; ++i) {
        packet.packets.push(process(stream));
      }
    } break;
    default:
      throw new Error(`invalid length ID: ${lengthID}`);
  }

  const subvalues = packet.packets.map((sub) => sub.value);
  switch (typeID) {
    // Sum
    case 0:
      packet.value = sum(subvalues);
      break;
    // Product
    case 1:
      packet.value = subvalues.reduce((product, value) => product * value, 1);
      break;
    // Maximum
    case 3:
      packet.value = Math.max(...subvalues);
      break;
    // Minimum
    case 2:
      packet.value = Math.min(...subvalues);
      break;
    // Greater than
    case 5:
      packet.value = subvalues[0] > subvalues[1] ? 1 : 0;
      break;
    // Less than
    case 6:
      packet.value = subvalues[0] < subvalues[1] ? 1 : 0;
      break;
    // Equal to
    case 7:
      packet.value = subvalues[0] === subvalues[1] ? 1 : 0;
      break;
    default:
      throw new Error(`invalid type ID: ${typeID}`);
  }
  return packet;
};

export const partOne = solution((input) => {
  const stream = parse(input);
  const versionize = (packet) => (
    packet.version + sum(packet.packets.map(versionize))
  );
  const root = process(stream);
  return versionize(root);
});

export const partTwo = solution((input) => {
  const stream = parse(input);
  const root = process(stream);
  return root.value;
});
