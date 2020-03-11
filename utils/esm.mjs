import { dirname as pdirname } from 'path';
import { fileURLToPath } from 'url';

export const dirname = (url) => pdirname(fileURLToPath(url));
export const filename = (url) => fileURLToPath(url);
