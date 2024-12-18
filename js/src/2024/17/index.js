import { mod, solution } from '../../utils/index.js';

const NUMBER_MATCHER = /\d+/g;

const parse = (input) => {
  const parts = input.trim().split('\n\n');
  const registers = Array.from(parts[0].matchAll(NUMBER_MATCHER)).map(BigInt);
  const program = parts[1].slice(8).split(',').map(BigInt);
  return { program, registers };
};

const run = (program, registers) => {
  const [a, b, c] = [0, 1, 2];

  const resolve = (operand) => {
    if (operand >= 0n && operand <= 3n) return operand;
    if (operand === 7n) throw new Error('reserved');
    return registers[operand - 4n];
  };

  const output = [];

  let ip = 0n;

  const operations = {
    // adv
    0: (operand) => {
      registers[a] = (registers[a] / 2n ** resolve(operand)) | 0n;
    },

    // bxl
    1: (operand) => {
      registers[b] ^= operand;
    },

    // bst
    2: (operand) => {
      registers[b] = mod(resolve(operand), 8n);
    },

    // jnz
    3: (operand) => {
      if (registers[a] !== 0n) {
        ip = operand;
      }
    },

    // bxc
    4: (_operand) => {
      registers[b] ^= registers[c];
    },

    // out
    5: (operand) => {
      output.push(mod(resolve(operand), 8n));
    },

    // bdv
    6: (operand) => {
      registers[b] = (registers[a] / 2n ** resolve(operand)) | 0n;
    },

    // cdv
    7: (operand) => {
      registers[c] = (registers[a] / 2n ** resolve(operand)) | 0n;
    },
  };

  while (ip < program.length) {
    const opcode = program[ip++];
    const operand = program[ip++];

    const operation = operations[opcode];
    if (!operation) {
      throw new Error(`no operation for opcode: ${opcode}`);
    }
    operation(operand);
  }

  return output;
};

export const partOne = solution((input) => {
  const { program, registers } = parse(input);
  return run(program, registers).join(',');
});

export const partTwo = solution((input) => {
  const { program, registers } = parse(input);

  // Samples of `a` with the resulting outputs:
  //
  //   a = 7n    =>                 [ 0n ]
  //   a = 15n   =>             [ 1n, 0n ]
  //   a = 16n   =>             [ 2n, 0n ]
  //   a = 87n   =>         [ 2n, 1n, 0n ]
  //   a = 88n   =>         [ 3n, 1n, 0n ]
  //   a = 120n  =>         [ 7n, 1n, 0n ]  (a = 15n << 3)
  //   a = 960n  =>     [ 0n, 7n, 1n, 0n ]  (a = 15n << 6)
  //   a = 7680n => [ 0n, 0n, 7n, 1n, 0n ]  (a = 15n << 9)
  //
  // As seen in the last three examples, a position's output is directly linked to its triple (three-bit)
  // position in the `a` value, but in reverse: most significant bytes affect least significant output slots.

  let candidates = [0n];

  // For each output slot in the program, attempt to find candidate `a` values, until eventually we have
  // candidates that match the full program output
  for (const [index, _] of program.entries()) {
    const next = [];
    for (const shifta of candidates) {
      for (let a = 0n; a < 8n; ++a) {
        const candidate = (shifta << 3n) + a;
        const output = run(program, [candidate, ...registers.slice(1)]);
        if (output.at(-index - 1) === program.at(-index - 1)) {
          next.push(candidate);
        }
      }
    }
    candidates = next;
  }

  return Math.min(...candidates.map(Number));
});
