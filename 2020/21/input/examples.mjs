import { example, stripIndent } from '../../../utils';

export const partOne = [
  example(stripIndent`
    mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
    trh fvjkl sbzzf mxmxvkd (contains dairy)
    sqjhc fvjkl (contains soy)
    sqjhc mxmxvkd sbzzf (contains fish)
  `, 5),
];

export const partTwo = [
  example(partOne[0].input, 'mxmxvkd,sqjhc,fvjkl'),
];
