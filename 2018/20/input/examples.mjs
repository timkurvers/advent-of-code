import { example } from '../../../utils';

export default [
  example('^WNE$', 3),
  example('^ENWWW(NEEE|SSE(EE|N))$', 10),
  example('^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$', 18),
  example('^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$', 23),
  example('^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$', 31),
];
