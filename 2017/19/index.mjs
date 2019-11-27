import {
  Orientation,
  Rotation,
  dx,
  dy,
} from '../../utils';
import { day } from '..';

import Diagram from './Diagram';
import examples from './input/examples';
import puzzleInput from './input';

const follow = (diagram) => {
  const position = diagram.start.clone();
  const letters = [];

  let orientation = Orientation.DOWN;
  let steps = -1;
  let char;
  do {
    char = diagram.get(position.x, position.y);
    switch (char) {
      case '-':
      case '|':
        break;
      case '+': {
        const options = [Rotation.NONE, Rotation.TURN_RIGHT, Rotation.TURN_LEFT];
        for (const rotation of options) {
          const x = position.x + dx(orientation + rotation);
          const y = position.y + dy(orientation + rotation);
          if (diagram.get(x, y)) {
            orientation += rotation;
            break;
          }
        }
      } break;
      default:
        letters.push(char);
    }

    position.x += dx(orientation);
    position.y += dy(orientation);
    ++steps;
  } while (char);

  return {
    seen: letters.join(''),
    steps,
  };
};

day(19).part(1).test(examples).feed(puzzleInput).solution((input) => {
  const diagram = Diagram.from(input);
  return follow(diagram).seen;
});

day(19).part(2).test(examples).feed(puzzleInput).solution((input) => {
  const diagram = Diagram.from(input);
  return follow(diagram).steps;
});
