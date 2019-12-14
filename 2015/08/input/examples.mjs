import fs from 'fs';
import path from 'path';

import { dirname, example } from '../../../utils';

const __dirname = dirname(import.meta.url);

export const partOne = [
  example(fs.readFileSync(path.join(__dirname, 'example.txt'), 'utf8'), 12),
];

export const partTwo = [
  example(partOne[0].input, 19),
];
