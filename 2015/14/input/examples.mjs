import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
    Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.
  `, 1120, { time: 1000 }),
];

export const partTwo = [
  example(stripIndent`
    Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
    Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.
  `, 689, { time: 1000 }),
];
