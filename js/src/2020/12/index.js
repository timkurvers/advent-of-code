import {
  Orientation, Rotation, dx, dy, solution,
} from '../../utils/index.js';

const NAV_INSTRUCTION_MATCHER = /(.)(\d+)\s?/g;

const parse = (input) => (
  Array.from(input.trim().matchAll(NAV_INSTRUCTION_MATCHER)).map((match) => ({
    action: match[1],
    value: +match[2],
  }))
);

const navigate = (instructions, { usingWaypoint = false } = {}) => {
  const ship = {
    x: 0,
    y: 0,
    facing: Orientation.EAST,
    get dx() { return dx(this.facing); },
    get dy() { return dy(this.facing); },
    rotate(rotation) { this.facing += rotation; },
  };

  // Waypoint is always relative to the ship, so its x/y represents that delta
  const waypoint = {
    x: 10,
    y: -1,
    get dx() { return this.x; },
    get dy() { return this.y; },
    rotate(rotation) {
      const { x, y } = this;
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      this.x = x * cos - y * sin;
      this.y = y * cos + x * sin;
    },
  };

  // Generic target of most operations below based on mode
  const target = usingWaypoint ? waypoint : ship;

  for (const { action, value } of instructions) {
    switch (action) {
      default:
      case 'N':
        target.y -= value;
        break;
      case 'S':
        target.y += value;
        break;
      case 'E':
        target.x += value;
        break;
      case 'W':
        target.x -= value;
        break;
      case 'L': {
        const rotation = Rotation.TURN_LEFT * (value / 90);
        target.rotate(rotation);
      } break;
      case 'R': {
        const rotation = Rotation.TURN_RIGHT * (value / 90);
        target.rotate(rotation);
      } break;
      case 'F':
        ship.x += target.dx * value;
        ship.y += target.dy * value;
        break;
    }
  }
  return ship;
};

export const partOne = solution((input) => {
  const instructions = parse(input);
  const { x, y } = navigate(instructions);
  return Math.abs(x) + Math.abs(y);
});

export const partTwo = solution((input) => {
  const instructions = parse(input);
  const { x, y } = navigate(instructions, { usingWaypoint: true });
  return Math.abs(x) + Math.abs(y);
});
