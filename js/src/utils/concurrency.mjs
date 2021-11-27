import { performance } from 'perf_hooks';

export const time = async (procedure) => {
  const start = performance.now();
  const result = await procedure();
  const end = performance.now();
  const duration = end - start;
  return [duration, result];
};

export const wait = (duration = 0) => {
  if (!duration) {
    return new Promise((resolve) => setImmediate(resolve));
  }
  return new Promise((resolve) => setTimeout(resolve, duration));
};
