export const Orientation = {
  EAST: Math.PI * 0,
  NORTH: Math.PI * 0.5,
  WEST: Math.PI * 1,
  SOUTH: Math.PI * 1.5,

  // UP / DOWN are flipped to ensure proper vertical movements in grids
  UP: Math.PI * 1.5,
  DOWN: Math.PI * 0.5,
  LEFT: Math.PI * 1,
  RIGHT: Math.PI * 0,
};

export const Rotation = {
  // TURN_LEFT / TURN_RIGHT are flipped to ensure proper vertical movements in grids
  TURN_LEFT: -Math.PI * 0.5,
  TURN_RIGHT: Math.PI * 0.5,
  TURN_AROUND: Math.PI,
  NONE: 0,
};

export const dx = (orientation) => Math.round(Math.cos(orientation));
export const dy = (orientation) => Math.round(Math.sin(orientation));

export const isHorizontalOrientation = (orientation) => dx(orientation) !== 0;
export const isVerticalOrientation = (orientation) => dy(orientation) !== 0;

export const distance2D = (x1, y1, x2, y2) => (
  Math.abs(x1 - x2) + Math.abs(y1 - y2)
);

export const distance3D = (x1, y1, z1, x2, y2, z2) => (
  Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(z1 - z2)
);
