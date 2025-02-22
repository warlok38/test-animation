import React, { useEffect } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { GAME_PUBLIC_PATH } from "../consts";
import { Arena } from "./Arena";
import { useGameState } from "../hooks/useGameState";
import { CharacterController } from "./CharacterController";
import { myPlayer } from "playroomkit";
import { Podium } from "./Podium";
import { useThree } from "@react-three/fiber";

export const Experience = () => {
  const { players, stage } = useGameState();
  const isMyPlayer = myPlayer();
  const camera = useThree((state) => state.camera);
  const firstNonDeadPlayer = players.find((p) => !p.state.getState("dead"));

  useEffect(() => {
    if (stage === "countdown") {
      camera.position.set(0, 50, -50);
    }
  }, [camera.position, stage]);

  return (
    <React.Fragment>
      <OrbitControls />
      <Environment files={`${GAME_PUBLIC_PATH}/hdrs/medieval_cafe_1k.hdr`} />
      {stage === "winner" ? (
        <Podium />
      ) : (
        <React.Fragment>
          {stage !== "lobby" && <Arena />}
          {players.map(({ state, controls }) => (
            <CharacterController
              key={state.id}
              state={state}
              controls={controls}
              isMyPlayer={isMyPlayer.id === state.id}
              isFirstNonDeadPlayer={firstNonDeadPlayer?.state.id === state.id}
              position-y={2}
            />
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
