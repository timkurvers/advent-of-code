import { solution } from '../../utils';

import Network from './Network';

export const partOne = solution(async (input) => {
  const network = new Network(input);
  const packet = await network.run();
  return packet.y;
});

export const partTwo = solution(async (input) => {
  const seen = new Set();

  let result;

  const NAT = {
    last: {},
    message(x, y) {
      this.last.x = x;
      this.last.y = y;
    },
    kickstart(network) {
      const { x, y } = this.last;

      if (seen.has(y)) {
        network.halt();
        result = y;
      }
      seen.add(y);

      network[0].message(x, y);
    },
  };

  const network = new Network(input, { NAT });
  await network.run();

  return result;
});
