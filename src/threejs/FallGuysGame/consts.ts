export const GAME_PUBLIC_PATH = "/models/game";

export const HEX_X_SPACING = 2.25;
export const HEX_Z_SPACING = 1.95;
export const NB_ROWS = 7;
export const NB_COLUMNS = 7;
export const FLOOR_HEIGHT = 10;
export const TIME_AFTER_HIT = 600;

export const FLOORS = [
  {
    color: "red",
  },
  {
    color: "blue",
  },
  {
    color: "green",
  },
  {
    color: "yellow",
  },
  {
    color: "purple",
  },
];

export const StageCodesEnum = {
  lobby: "lobby",
  countdown: "countdown",
  game: "game",
  winner: "winner",
} as const;

export const ControlsEnum = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
} as const;
