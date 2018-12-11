#!/usr/bin/env node --experimental-modules --no-warnings

import fs from 'fs';

const days = fs.readdirSync('.').reduce((list, entry) => {
  const match = entry.match(/day-(\d+)/);
  if (match) {
    list.push(+match[1]);
  }
  return list;
}, []).sort((a, b) => a - b);

let [,, ...requested] = process.argv;
if (!requested.length) {
  requested = days;
}

(async () => {
  for (const nr of requested) {
    if (days.includes(+nr)) {
      try {
        await import(`./day-${nr}`);
      } catch (e) {
        console.error(e);
      }
    }
  }
})();
