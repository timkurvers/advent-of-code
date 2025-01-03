import { cast, isNumber, solution } from '../../utils/index.js';

import * as operations from './operations.js';

const INSTRUCTION_MATCHER = /(?:(NOT) )?(.+?)(?: (.+?) (.+?))? -> (.+)/;

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const [, not, a, opcode, b, wire] = line.match(INSTRUCTION_MATCHER);
      return {
        a: cast(a),
        opcode: not || opcode,
        b: cast(b),
        wire,
      };
    });

const build = (instructions) => {
  const cache = new Map();

  const resolve = (identifier) => {
    if (isNumber(identifier)) {
      return identifier;
    }

    if (cache.has(identifier)) {
      return cache.get(identifier);
    }

    const instruction = instructions.find((i) => i.wire === identifier);
    const { a, opcode, b } = instruction;

    let value = resolve(a);
    if (opcode) {
      value = operations[opcode.toLowerCase()](value, b && resolve(b));
    }
    cache.set(identifier, value);
    return value;
  };

  const override = (wire, value) => {
    const instruction = instructions.find((i) => i.wire === wire);
    Object.assign(instruction, {
      a: value,
      opcode: undefined,
      b: undefined,
    });
    cache.clear();
  };

  return { override, resolve };
};

export const partOne = solution((input) => {
  const instructions = parse(input);
  const circuit = build(instructions);
  return circuit.resolve('a');
});

export const partTwo = solution((input) => {
  const instructions = parse(input);
  const circuit = build(instructions);
  circuit.override('b', circuit.resolve('a'));
  return circuit.resolve('a');
});
