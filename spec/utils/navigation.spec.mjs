import {
  Orientation,
  Rotation,
  TAU,
  dx,
  dy,
  nameForOrientation,
  normalizeOrientation,
  isHorizontalOrientation,
  isVerticalOrientation,
  isSameOrientation,
  isHorizontalRotation,
  isVerticalRotation,
  distance2D,
  distance3D,
} from '../../utils';

describe('navigation utilities', () => {
  describe('Orientation', () => {
    it('defines orientation constants', () => {
      expect(Orientation.EAST).toBeDefined();
      expect(Orientation.NORTH).toBeDefined();
      expect(Orientation.WEST).toBeDefined();
      expect(Orientation.SOUTH).toBeDefined();

      expect(Orientation.UP).toBeDefined();
      expect(Orientation.DOWN).toBeDefined();
      expect(Orientation.LEFT).toBeDefined();
      expect(Orientation.RIGHT).toBeDefined();
    });
  });

  describe('Rotation', () => {
    it('defines rotation constants', () => {
      expect(Rotation.TURN_LEFT).toBeDefined();
      expect(Rotation.TURN_RIGHT).toBeDefined();
      expect(Rotation.TURN_AROUND).toBeDefined();
      expect(Rotation.NONE).toBeDefined();
    });
  });

  describe('dx()', () => {
    it('returns horizontal translation for given orientation', () => {
      expect(dx(Orientation.EAST)).toEqual(1);
      expect(dx(Orientation.NORTH)).toEqual(0);
      expect(dx(Orientation.WEST)).toEqual(-1);
      expect(dx(Orientation.SOUTH)).toEqual(-0);

      expect(dx(Orientation.UP)).toEqual(-0);
      expect(dx(Orientation.DOWN)).toEqual(0);
      expect(dx(Orientation.LEFT)).toEqual(-1);
      expect(dx(Orientation.RIGHT)).toEqual(1);
    });
  });

  describe('dy()', () => {
    it('returns vertical translation for given orientation', () => {
      expect(dy(Orientation.EAST)).toEqual(0);
      expect(dy(Orientation.NORTH)).toEqual(1);
      expect(dy(Orientation.WEST)).toEqual(0);
      expect(dy(Orientation.SOUTH)).toEqual(-1);

      expect(dy(Orientation.UP)).toEqual(-1);
      expect(dy(Orientation.DOWN)).toEqual(1);
      expect(dy(Orientation.LEFT)).toEqual(0);
      expect(dy(Orientation.RIGHT)).toEqual(0);
    });
  });

  describe('nameForOrientation()', () => {
    it('returns string name for given orientation (if any)', () => {
      expect(nameForOrientation(Orientation.UP)).toBe('UP / SOUTH');
      expect(nameForOrientation(Orientation.SOUTH)).toBe('UP / SOUTH');
      expect(nameForOrientation(Orientation.DOWN)).toBe('DOWN / NORTH');
      expect(nameForOrientation(Orientation.NORTH)).toBe('DOWN / NORTH');
      expect(nameForOrientation(Orientation.LEFT)).toBe('LEFT / WEST');
      expect(nameForOrientation(Orientation.WEST)).toBe('LEFT / WEST');
      expect(nameForOrientation(Orientation.RIGHT)).toBe('RIGHT / EAST');
      expect(nameForOrientation(Orientation.EAST)).toBe('RIGHT / EAST');

      expect(nameForOrientation(Orientation.UP + Rotation.TURN_LEFT)).toBe('LEFT / WEST');
      expect(nameForOrientation(Orientation.UP + Rotation.TURN_RIGHT)).toBe('RIGHT / EAST');
      expect(nameForOrientation(Orientation.UP + Rotation.TURN_AROUND)).toBe('DOWN / NORTH');

      expect(nameForOrientation(Orientation.LEFT + Rotation.TURN_LEFT)).toBe('DOWN / NORTH');
      expect(nameForOrientation(Orientation.LEFT + Rotation.TURN_RIGHT)).toBe('UP / SOUTH');
      expect(nameForOrientation(Orientation.LEFT + Rotation.TURN_AROUND)).toBe('RIGHT / EAST');

      expect(nameForOrientation(Orientation.RIGHT + Rotation.TURN_LEFT)).toBe('UP / SOUTH');
      expect(nameForOrientation(Orientation.RIGHT + Rotation.TURN_RIGHT)).toBe('DOWN / NORTH');
      expect(nameForOrientation(Orientation.RIGHT + Rotation.TURN_AROUND)).toBe('LEFT / WEST');

      expect(nameForOrientation(Orientation.DOWN + Rotation.TURN_LEFT)).toBe('RIGHT / EAST');
      expect(nameForOrientation(Orientation.DOWN + Rotation.TURN_RIGHT)).toBe('LEFT / WEST');
      expect(nameForOrientation(Orientation.DOWN + Rotation.TURN_AROUND)).toBe('UP / SOUTH');

      expect(nameForOrientation(1)).toBe(null);
    });
  });

  describe('normalizeOrientation()', () => {
    it('normalizes given orientation to be between 0 and TAU', () => {
      expect(normalizeOrientation(Orientation.UP)).toBe(Orientation.UP);
      expect(normalizeOrientation(Orientation.DOWN)).toBe(Orientation.DOWN);
      expect(normalizeOrientation(Orientation.LEFT)).toBe(Orientation.LEFT);
      expect(normalizeOrientation(Orientation.RIGHT)).toBe(Orientation.RIGHT);
      expect(normalizeOrientation(Rotation.TURN_LEFT)).toBe(TAU + Rotation.TURN_LEFT);
      expect(normalizeOrientation(Orientation.RIGHT + TAU)).toBe(Orientation.RIGHT);
    });
  });

  describe('isHorizontalOrientation()', () => {
    it('returns whether given orientation is horizontal', () => {
      expect(isHorizontalOrientation(Orientation.UP)).toBe(false);
      expect(isHorizontalOrientation(Orientation.DOWN)).toBe(false);
      expect(isHorizontalOrientation(Orientation.LEFT)).toBe(true);
      expect(isHorizontalOrientation(Orientation.RIGHT)).toBe(true);
    });
  });

  describe('isVerticalOrientation()', () => {
    it('returns whether given orientation is horizontal', () => {
      expect(isVerticalOrientation(Orientation.UP)).toBe(true);
      expect(isVerticalOrientation(Orientation.DOWN)).toBe(true);
      expect(isVerticalOrientation(Orientation.LEFT)).toBe(false);
      expect(isVerticalOrientation(Orientation.RIGHT)).toBe(false);
    });
  });

  describe('isSameOrientation()', () => {
    it('returns whether given orientations are the same', () => {
      expect(isSameOrientation(Orientation.UP + TAU, Orientation.UP)).toBe(true);
      expect(isSameOrientation(Orientation.UP - TAU, Orientation.UP + TAU)).toBe(true);
      expect(isSameOrientation(Orientation.DOWN, Orientation.UP)).toBe(false);
    });

    it('supports matching orientations that are nearly equal', () => {
      let orientation = Orientation.UP;
      for (let i = 0; i < 10; ++i) {
        orientation += Rotation.TURN_AROUND;
      }
      expect(isSameOrientation(orientation, Orientation.UP)).toBe(true);
    });
  });

  describe('isHorizontalRotation()', () => {
    it('returns whether given rotation is horizontal', () => {
      expect(isHorizontalRotation(Rotation.NONE)).toBe(false);
      expect(isHorizontalRotation(Rotation.TURN_LEFT)).toBe(true);
      expect(isHorizontalRotation(Rotation.TURN_RIGHT)).toBe(true);
      expect(isHorizontalRotation(Rotation.TURN_AROUND)).toBe(false);
    });
  });

  describe('isVerticalRotation()', () => {
    it('returns whether given rotation is horizontal', () => {
      expect(isVerticalRotation(Rotation.NONE)).toBe(true);
      expect(isVerticalRotation(Rotation.TURN_LEFT)).toBe(false);
      expect(isVerticalRotation(Rotation.TURN_RIGHT)).toBe(false);
      expect(isVerticalRotation(Rotation.TURN_AROUND)).toBe(true);
    });
  });

  describe('distance2D()', () => {
    it('returns manhattan distance between (x1, y1) and (x2, y2)', () => {
      expect(distance2D(0, 0, 1, 1)).toEqual(2);
      expect(distance2D(0, -5, 1, 1)).toEqual(7);
    });
  });

  describe('distance3D()', () => {
    it('returns manhattan distance between (x1, y1, z1) and (x2, y2, z2)', () => {
      expect(distance3D(0, 0, 0, 1, 1, 1)).toEqual(3);
      expect(distance3D(0, -5, 1, 1, 1, 1)).toEqual(7);
    });
  });
});
