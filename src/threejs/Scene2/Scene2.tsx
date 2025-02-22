import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, BakeShadows } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import { easing } from "maath";
import { Instances, Computers } from "./Computers";

export const Scene2 = () => {
  const CameraRig = () => {
    return useFrame((state, delta) => {
      easing.damp3(
        state.camera.position,
        [
          -1 + (state.pointer.x * state.viewport.width) / 3,
          (1 + state.pointer.y) / 2,
          5.5,
        ],
        0.5,
        delta
      );
      state.camera.lookAt(0, 0, 0);
    });
  };

  return (
    <Suspense fallback={null}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [-1.5, 1, 5.5], fov: 45, near: 1, far: 20 }}
        eventSource={document.getElementById("root") || undefined}
        eventPrefix="client"
      >
        {/* Lights */}
        <color attach="background" args={["black"]} />
        <hemisphereLight intensity={0.15} groundColor="black" />
        <spotLight
          decay={0}
          position={[10, 20, 10]}
          angle={0.12}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={1024}
        />
        {/* Main scene */}
        <group position={[-0, -1, 0]}>
          {/* Auto-instanced sketchfab model */}
          <Instances>
            <Computers scale={0.5} />
          </Instances>
          {/* Plane reflections + distance blur */}
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 30]}
              resolution={2048}
              mixBlur={1}
              mixStrength={180}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#202020"
              metalness={0.8}
              mirror={1}
            />
          </mesh>
        </group>
        {/* Postprocessing */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0}
            mipmapBlur
            luminanceSmoothing={0.0}
            intensity={5}
          />
          <DepthOfField
            target={[0, 0, 13]}
            focalLength={0.3}
            bokehScale={15}
            height={700}
          />
        </EffectComposer>
        {/* Camera movements */}
        <CameraRig />
        {/* Small helper that freezes the shadows for better performance */}
        <BakeShadows />
      </Canvas>
    </Suspense>
  );
};
