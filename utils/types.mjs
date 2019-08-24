/* eslint-disable import/prefer-default-export */

export const cast = (value) => {
  const number = parseInt(value, 10);
  if (!Number.isNaN(number)) {
    return number;
  }
  return value;
};
