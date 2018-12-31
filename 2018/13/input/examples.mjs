import { example } from '../../../utils';

export default [
  example(`/->-\\
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/`, '7,3'),

  example(`/>-<\\
|   |
| /<+-\\
| | | v
\\>+</ |
  |   ^
  \\<->/`, null, '6,4'),
];
