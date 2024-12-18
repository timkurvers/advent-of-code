/* eslint-disable no-loop-func */

import minimist from 'minimist';

import { Challenge, cast } from './utils/index.js';

const args = minimist(process.argv.slice(2));
const { benchmark, 'exit-code': exitCode } = args;
let requested = args._.map(cast);

const isYear = (nr) => nr > 1000;

(async () => {
  try {
    const challenges = await Challenge.list();

    // Support running all editions when requested
    if (requested.length === 1 && requested[0] === 'all') {
      const byYear = Object.groupBy(challenges, (c) => c.year);
      requested = Object.keys(byYear).map(Number);
    }

    // If no specific year was requested, default to the current edition
    if (!isYear(requested[0])) {
      const current = challenges[challenges.length - 1];
      requested.unshift(current.year);
    }

    let year = null;
    for (let i = 0; i < requested.length; ++i) {
      const nr = requested[i];
      const next = requested[i + 1];

      if (isYear(nr)) {
        year = nr;

        // Let the next iteration handle executing days
        if (next && !isYear(next)) {
          continue;
        }

        // Collect and insert all available days for requested year (if any)
        const days = challenges.filter((c) => c.year === year).map((c) => c.day);
        if (!days.length) {
          throw new Error(`Could not find any days for year ${year}`);
        }
        requested.splice(i + 1, 0, ...days);
        continue;
      }

      // Find challenge for this requested year and day
      const challenge = challenges.find((c) => c.day === nr && c.year === year);
      if (challenge) {
        await challenge.run({ benchmark });
      } else {
        throw new Error(`Could not find year ${year} day ${nr}`);
      }
    }
  } catch (e) {
    console.error(e);
    process.exit(exitCode ? 1 : 0);
  }
})();
