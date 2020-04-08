import fs from 'fs-extra';
import path from 'path';

const [,, ...target] = process.argv;

(async () => {
  try {
    await fs.copy('.skeleton', path.join(...target), {
      overwrite: false,
      errorOnExist: true,
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
