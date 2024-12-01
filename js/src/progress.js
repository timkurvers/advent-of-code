/* eslint-disable array-callback-return, consistent-return, no-loop-func */

import colors from 'colors';
import minimist from 'minimist';
import table from 'table';

import { Challenge, groupBy, range } from './utils/index.js';

const args = minimist(process.argv.slice(2));
const markInefficient = args['mark-inefficient'];

const DAYS = range({ start: 1, end: 25 });
const EMPTY_CELL = '';
const STAR = '★';

const progressFor = (solution) => (
  markInefficient && solution.inefficient ? colors.red.bold(STAR) : colors.yellow.bold(STAR)
);

(async () => {
  try {
    const challenges = await Challenge.list();
    const years = Array.from(groupBy(challenges, 'year').keys());

    const data = [];

    // Counting stars
    let acquired = 0;
    const total = years.length * 25 * 2;

    // Year headings
    data.push([EMPTY_CELL, ...years]);

    // List calendar days in reverse order ala Advent of Code website
    for (const day of DAYS.reverse()) {
      // Collect solutions from all years (if any) for this day
      const entries = await Promise.all(years.map(async (year) => {
        const entry = challenges.find((c) => c.year === year && c.day === day);
        if (entry) {
          const parts = Object.values(await entry.parts());
          // Hand out second star for day 25 automatically
          if (day === 25 && parts.length === 1) {
            parts.push(true);
          }
          const stars = parts.map(progressFor).join('');
          acquired += parts.length;
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
    console.log(`Stars acquired: ${colors.yellow.bold(`${acquired}`)}`, colors.gray(`(out of ${total} total)`));
    console.log();
  } catch (e) {
    console.error(e);
    process.exit();
  }
})();
