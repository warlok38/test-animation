import { useMemo } from "react";
import { ControlsEnum } from "../consts";
import { KeyboardControlsEntry } from "@react-three/drei";

export const useControls = () => {
  const map: KeyboardControlsEntry[] = useMemo(
    () => [
      { name: ControlsEnum.forward, keys: ["ArrowUp", "KeyW"] },
      {
        name: ControlsEnum.back,
        keys: ["ArrowDown", "KeyS"],
      },
      {
        name: ControlsEnum.left,
        keys: ["ArrowLeft", "KeyA"],
      },
      {
        name: ControlsEnum.right,
        keys: ["ArrowRight", "KeyD"],
      },
      {
        name: ControlsEnum.jump,
        keys: ["Space"],
      },
    ],
    []
  );

  return { map };
};
