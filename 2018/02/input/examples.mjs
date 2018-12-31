import { example } from '../../../utils';

export default [
  example(`abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab`, 12),

  example(`abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz`, null, 'fgij'),
];
