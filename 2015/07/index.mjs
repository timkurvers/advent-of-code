import { cast, isNumber } from '../../utils/types';
import { day } from '..';

import examples from './input/examples';
import puzzleInput from './input';
import * as operations from './operations';

const INSTRUCTION_MATCHER = /(?:(NOT) )?(.+?)(?: (.+?) (.+?))? -> (.+)/;

const parse = input => input.split('\n').map((line) => {
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

    const instruction = instructions.find(i => i.wire === identifier);
    const { a, opcode, b } = instruction;

    let value = resolve(a);
    if (opcode) {
      value = operations[opcode.toLowerCase()](value, b && resolve(b));
    }
    cache.set(identifier, value);
    return value;
  };

  const override = (wire, value) => {
    const instruction = instructions.find(i => i.wire === wire);
    Object.assign(instruction, {
      a: value,
      opcode: undefined,
      b: undefined,
    });
    cache.clear();
  };

  return { override, resolve };
};

day(7).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const instructions = parse(input);
  const circuit = build(instructions);
  return circuit.resolve('a');
});

day(7).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const instructions = parse(input);
  const circuit = build(instructions);
  circuit.override('b', circuit.resolve('a'));
  return circuit.resolve('a');
});
