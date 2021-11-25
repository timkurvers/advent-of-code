import { solution } from '../../utils';

const process = (input, strangerThings = false) => {
  const registry = input.trim().split('\n').map(Number);

  let pointer = 0;
  let step = 0;
  while (true) {
    if (!(pointer in registry)) {
      return { steps: step, registry };
    }

    const current = pointer;
    const offset = registry[pointer];
    pointer += offset;

    const adjustment = strangerThings && offset >= 3 ? -1 : 1;
    registry[current] += adjustment;
    ++step;
  }
};

export const partOne = solution((input) => (
  process(input).steps
));

export const partTwo = solution((input) => (
  process(input, true).steps
));
