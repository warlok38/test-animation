import { Joystick, PlayerProfile, PlayerState } from "playroomkit";
import { ControlsEnum, StageCodesEnum } from "./consts";

export type StageCodes = Values<typeof StageCodesEnum>;
export type Controls = Values<typeof ControlsEnum>;

export type PlayerEntity = {
  state: PlayerState;
  controls: Joystick;
};

export type GameStateContextType = {
  stage: StageCodes;
  timer: number;
  players: PlayerEntity[];
  isHost: boolean;
  winner: PlayerProfile | null;
  startGame: () => void;
};
