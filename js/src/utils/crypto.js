/* eslint-disable import/prefer-default-export */

import crypto from 'crypto';

export const hexmd5 = (source) => {
  const hash = crypto.createHash('md5');
  hash.update(source);
  return hash.digest('hex');
};
