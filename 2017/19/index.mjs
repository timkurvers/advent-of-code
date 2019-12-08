import {
  Orientation,
  Rotation,
  dx,
  dy,
  solution,
} from '../../utils';

import Diagram from './Diagram';

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

export const partOne = solution((input) => {
  const diagram = Diagram.from(input);
  return follow(diagram).seen;
});

export const partTwo = solution((input) => {
  const diagram = Diagram.from(input);
  return follow(diagram).steps;
});
