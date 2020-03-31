import fs from 'fs-extra';

const [,, target] = process.argv;

(async () => {
  try {
    await fs.copy('.skeleton', target, {
      overwrite: false,
      errorOnExist: true,
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
