import { reduceMinBy, solution } from '../../utils/index.js';

import { Dir, File } from './fs.js';

// Behold the monstrosity!
const parse = (input) => {
  const root = new Dir();
  const commands = input.trim().split('$ ').map((cmd) => cmd.trim());

  let stack = [root];
  let current = root;
  for (const command of commands) {
    if (!command) continue;

    const op = command[0] + command[1];
    switch (op) {
      case 'cd': {
        const target = command.slice(3);
        if (target === '..') {
          stack.pop();
          current = stack[stack.length - 1];
        } else if (target === '/') {
          stack = [root];
          current = root;
        } else {
          current = current.get(target);
          stack.push(current);
        }
      } break;

      case 'ls': {
        const entries = command.split('\n').slice(1);
        for (const entry of entries) {
          const [dirOrSize, name] = entry.split(' ');
          if (dirOrSize === 'dir') {
            current.create(new Dir(name));
          } else {
            current.create(new File(name, +dirOrSize));
          }
        }
      } break;

      default:
        throw new Error(`unknown cmd: ${op}`);
    }
  }
  return root;
};

export const partOne = solution((input) => {
  const fs = parse(input);

  const dirs = fs.filter((node) => (
    node instanceof Dir && node.size <= 100000
  ));

  return dirs.reduce((total, dir) => total + dir.size, 0);
});

export const partTwo = solution((input) => {
  const fs = parse(input);

  const MAX_SPACE = 70000000;
  const REQ_SPACE = 30000000;

  const used = fs.size;
  const unused = MAX_SPACE - used;
  const needed = REQ_SPACE - unused;

  const candidates = fs.filter((node) => (
    node instanceof Dir && node.size >= needed
  ));

  return reduceMinBy(candidates, 'size').size;
});
