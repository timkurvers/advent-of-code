import fs from 'fs';
import path from 'path';

import { dirname } from '../../../utils';

const __dirname = dirname(import.meta.url);

export default fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
