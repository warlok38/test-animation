import { Box } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { getState, PlayerProfile } from "playroomkit";
import { useEffect } from "react";
import { useAudioManager } from "../hooks/useAudioManager";
import { Character } from "./Character";
import { useGameState } from "../hooks/useGameState";

export const Podium = () => {
  const { winner } = useGameState();
  const winnerProfile =
    winner || (getState("lastDead") as unknown as PlayerProfile);
  const camera = useThree((state) => state.camera);
  const { playAudio } = useAudioManager();

  useEffect(() => {
    camera.position.set(5, 4, 12);
    camera.lookAt(0, 2, 0);
    playAudio("Kids Cheering", false);

    return () => {
      camera.position.set(0, 16, 10);
      camera.lookAt(0, 0, 0);
    };
  }, [camera, playAudio]);

  return (
    <group>
      <Character
        name={winnerProfile?.name}
        color={winnerProfile?.color.hexString}
        position-y={0.5}
      />
      <Box scale-x={4} scale-z={2}>
        <meshStandardMaterial color="white" />
      </Box>
    </group>
  );
};
