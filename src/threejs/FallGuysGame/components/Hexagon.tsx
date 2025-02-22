import { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GAME_PUBLIC_PATH, TIME_AFTER_HIT } from "../consts";
import { Color, MeshStandardMaterial } from "three";
import { MathUtils, randFloat, randInt } from "three/src/math/MathUtils.js";
import { RigidBody, RigidBodyProps } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useAudioManager } from "../audio";

type HexagonProps = {
  color: string;
  isHit: boolean;
  onHit: () => void;
} & RigidBodyProps;

export function Hexagon({ color, isHit, onHit, ...props }: HexagonProps) {
  const [isHexagonDisabled, setHexagonDisabled] = useState(false);
  const standardNaterialRef = useRef<MeshStandardMaterial>(null!);
  const { playAudio } = useAudioManager();

  const { nodes, materials } = useGLTF(
    `${GAME_PUBLIC_PATH}/models/hexagon.glb`,
    `${GAME_PUBLIC_PATH}/draco/gltf/`
  );

  const randomizedColor = useMemo(() => {
    const alteredColor = new Color(color);
    alteredColor.multiplyScalar(randFloat(0.5, 1.2));
    return alteredColor;
  }, [color]);

  useFrame((_, delta) => {
    if (isHit && !isHexagonDisabled) {
      standardNaterialRef.current.opacity = MathUtils.lerp(
        standardNaterialRef.current.opacity,
        0,
        delta * 1.2
      );
    }
  });

  useEffect(() => {
    if (isHit) {
      playAudio(`Pop${randInt(1, 5)}`);

      setTimeout(() => {
        setHexagonDisabled(true);
      }, TIME_AFTER_HIT);
    }
  }, [isHit, playAudio]);

  if (isHexagonDisabled) {
    return null;
  }

  return (
    <RigidBody
      {...props}
      type="fixed"
      name="hexagon"
      colliders="hull"
      onCollisionEnter={(e) => {
        if (e.other.rigidBodyObject?.name === "isMyPlayer") {
          onHit();
        }
      }}
    >
      {/* @ts-ignore */}
      <mesh geometry={nodes.Hexagon.geometry} material={materials.hexagon}>
        <meshStandardMaterial
          ref={standardNaterialRef}
          {...materials.hexagon}
          color={isHit ? "orange" : randomizedColor}
          transparent
        />
      </mesh>
    </RigidBody>
  );
}

useGLTF.preload(
  `${GAME_PUBLIC_PATH}/models/hexagon.glb`,
  `${GAME_PUBLIC_PATH}/draco/gltf/`
);
