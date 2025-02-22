import { Canvas } from "@react-three/fiber";
import { AudioManagerProvider } from "./audio";
import { Experience } from "./components/Experience";
import { GameStateProvider } from "./gameState/GameStateProvider";
import { UI } from "./components/UI";
import { Physics } from "@react-three/rapier";
import { KeyboardControls } from "@react-three/drei";
import { useControls } from "./hooks/useControls";

export const FallGuysGame = () => {
  const { map } = useControls();

  return (
    <KeyboardControls map={map}>
      <AudioManagerProvider>
        <GameStateProvider>
          <Canvas shadows camera={{ position: [0, 16, 10], fov: 42 }}>
            <color attach="background" args={["#041c0b"]} />
            <Physics>
              <Experience />
            </Physics>
          </Canvas>
          <UI />
        </GameStateProvider>
      </AudioManagerProvider>
    </KeyboardControls>
  );
};
