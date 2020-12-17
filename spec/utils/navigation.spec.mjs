import {
  Orientation,
  Rotation,
  dx,
  dy,
  isHorizontalOrientation,
  isVerticalOrientation,
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
