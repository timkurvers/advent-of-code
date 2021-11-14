import fs from 'fs-extra';
import path from 'path';

import { SRC_ROOT } from './utils/challenges/Challenge';

const [,, ...target] = process.argv;

(async () => {
  try {
    await fs.copy('.skeleton', path.join(SRC_ROOT, ...target), {
      overwrite: false,
      errorOnExist: true,
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
