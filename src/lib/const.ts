export const FACES = {
  FRONT: "front",
  BACK: "back",
  LEFT: "left",
  RIGHT: "right",
};

export const STATE = {
  IDLE: "idle",
  MOVING: "moving",
};

export const MOVES = {
  w: [
    { dir: FACES.FRONT, axis: "z", step: +1 },
    { dir: FACES.LEFT, axis: "x", step: -1 },
    { dir: FACES.BACK, axis: "z", step: -1 },
    { dir: FACES.RIGHT, axis: "x", step: +1 },
  ],
  s: [
    { dir: FACES.BACK, axis: "z", step: -1 },
    { dir: FACES.RIGHT, axis: "x", step: +1 },
    { dir: FACES.FRONT, axis: "z", step: +1 },
    { dir: FACES.LEFT, axis: "x", step: -1 },
  ],
  a: [
    { dir: FACES.LEFT, axis: "x", step: -1 },
    { dir: FACES.BACK, axis: "z", step: -1 },
    { dir: FACES.FRONT, axis: "x", step: +1 },
    { dir: FACES.RIGHT, axis: "z", step: +1 },
  ],
  d: [
    { dir: FACES.RIGHT, axis: "x", step: +1 },
    { dir: FACES.FRONT, axis: "z", step: +1 },
    { dir: FACES.BACK, axis: "x", step: -1 },
    { dir: FACES.LEFT, axis: "z", step: -1 },
  ],
};
