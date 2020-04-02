/* eslint-disable array-callback-return, consistent-return */

import colors from 'colors';
import table from 'table';

import { Challenge, groupBy, range } from './utils';

const DAYS = range({ start: 1, end: 25 });
const EMPTY_CELL = '';
const STAR = '★';

const progressFor = (solution) => (
  solution.inefficient ? colors.yellow(STAR) : colors.yellow.bold(STAR)
);

(async () => {
  try {
    const challenges = await Challenge.list();
    const years = Array.from(groupBy(challenges, 'year').keys());

    const data = [];

    // Year headings
    data.push([EMPTY_CELL, ...years]);

    // List calendar days in reverse order ala Advent of Code website
    for (const day of DAYS.reverse()) {
      // Collect solutions from all years (if any) for this day
      const entries = await Promise.all(years.map(async (year) => {
        const entry = challenges.find((c) => c.year === year && c.day === day);
        if (entry) {
          const parts = await entry.parts();
          const stars = Object.values(parts).map(progressFor).join('');
          return ` ${stars} `;
        }
        return EMPTY_CELL;
      }));
      data.push([day, ...entries]);
    }

    // Generate and display progress as a table
    const progress = table.table(data, {
      columns: [
        { alignment: 'right' },
      ],
      columnDefault: {
        paddingLeft: 2,
        paddingRight: 2,
      },
      border: table.getBorderCharacters('void'),
      drawHorizontalLine: () => false,
    });
    console.log();
    console.log(progress);
  } catch (e) {
    console.error(e);
    process.exit();
  }
})();
