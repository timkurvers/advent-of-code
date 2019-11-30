#!/usr/bin/env node --experimental-modules --es-module-specifier-resolution=node --no-warnings

import fs from 'fs';
import path from 'path';

const years = fs.readdirSync(path.resolve('.')).reduce((list, entry) => {
  const match = entry.match(/\d{4}/);
  if (match) {
    list.push(match[0]);
  }
  return list;
}, []).sort();

let [,, year, ...requested] = process.argv;

if (!year || !year.match(/\d{4}/)) {
  if (year) {
    requested.unshift(year);
  }
  year = years[years.length - 1];
}

if (!years.includes(year)) {
  console.error(new Error(`No solutions for ${year}`));
  process.exit(0);
}

const days = fs.readdirSync(path.resolve(year)).reduce((list, entry) => {
  const match = entry.match(/^\d{2}$/);
  if (match) {
    list.push(match[0]);
  }
  return list;
}, []).sort();

if (!requested.length) {
  requested = days;
}

(async () => {
  try {
    for (const nr of requested) {
      const padded = nr.padStart(2, '0');
      if (days.includes(padded)) {
        await import(path.resolve(year, padded));
      } else {
        throw new Error(`No solutions for ${year} day ${nr}`);
      }
    }
  } catch (e) {
    console.error(e);
    process.exit();
  }
})();
