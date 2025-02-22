import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { FiberBox } from "../../components/FiberBox";
import { Floor } from "../../components/Floor";
import { Physics } from "@react-three/cannon";

export const Scene = () => {
  return (
    <Suspense fallback={null}>
      <Canvas>
        <Physics>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />
          <FiberBox boxRefProps={{ position: [0, 5, 0] }} />
          <FiberBox boxRefProps={{ position: [1, 3, 1] }} />
          <FiberBox boxRefProps={{ position: [1, -2, 0] }} />
          <Floor />
        </Physics>
      </Canvas>
    </Suspense>
  );
};
