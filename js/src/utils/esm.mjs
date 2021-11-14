import { basename as pbasename, dirname as pdirname } from 'path';
import { fileURLToPath } from 'url';

export const basename = (url) => pbasename(fileURLToPath(url));
export const dirname = (url) => pdirname(fileURLToPath(url));
