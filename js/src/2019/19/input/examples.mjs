import fs from 'fs';
import path from 'path';

import { dirname, example } from '../../../utils';

const __dirname = dirname(import.meta.url);
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

export const partTwo = [
  example(input, 230030, { size: 4 }),
];
