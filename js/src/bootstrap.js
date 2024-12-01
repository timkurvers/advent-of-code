import fs from 'fs-extra';
import path from 'path';

import { PUZZLE_ROOT, SRC_ROOT } from './utils/index.js';

const [, , ...target] = process.argv;

(async () => {
  try {
    await fs.copy('../puzzles/.skeleton', path.join(PUZZLE_ROOT, ...target), {
      overwrite: false,
      errorOnExist: false,
    });
    await fs.copy('.skeleton', path.join(SRC_ROOT, ...target), {
      overwrite: false,
      errorOnExist: true,
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
