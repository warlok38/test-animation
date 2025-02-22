import { useEffect, useMemo, useRef } from "react";
import { Text, useAnimations, useGLTF } from "@react-three/drei";
import { GroupProps, useFrame, useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import { GAME_PUBLIC_PATH } from "../consts";
import * as THREE from "three";

type HexagonProps = {
  color?: string;
  animation?: string;
  name?: string;
} & GroupProps;

export function Character({
  animation = "wave",
  color = "yellow",
  name = "Player",
  ...props
}: HexagonProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const nameRef = useRef<THREE.Group>(null!);

  const { scene, animations } = useGLTF(
    `${GAME_PUBLIC_PATH}/models/character.glb`,
    `${GAME_PUBLIC_PATH}/draco/gltf/`
  );

  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, groupRef);

  useFrame(({ camera }) => {
    if (nameRef.current) {
      nameRef.current.lookAt(camera.position);
    }
  });

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.1).play();

    return () => {
      actions[animation]?.fadeOut(0.1);
    };
  }, [actions, animation]);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group ref={nameRef}>
        <Text position-y={2.8} fontSize={0.5} anchorX="center" anchorY="middle">
          {name}
          <meshBasicMaterial color="white" />
        </Text>
        <Text
          position-y={2.78}
          position-x={0.02}
          position-z={-0.02}
          fontSize={0.5}
          anchorX="center"
          anchorY="middle"
        >
          {name}
          <meshBasicMaterial color="black" />
        </Text>
      </group>
      <group name="Scene">
        <group name="fall_guys">
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            name="body"
            //@ts-expect-error
            geometry={nodes.body.geometry}
            //@ts-expect-error
            skeleton={nodes.body.skeleton}
          >
            <meshStandardMaterial {...materials.Material_0} color={color} />
          </skinnedMesh>
          <skinnedMesh
            name="eye"
            //@ts-expect-error
            geometry={nodes.eye.geometry}
            material={materials.Material_2}
            //@ts-expect-error
            skeleton={nodes.eye.skeleton}
          >
            <meshStandardMaterial {...materials.Material_2} color={"white"} />
          </skinnedMesh>
          <skinnedMesh
            name="hand-"
            //@ts-expect-error
            geometry={nodes["hand-"].geometry}
            //@ts-expect-error
            skeleton={nodes["hand-"].skeleton}
          >
            <meshStandardMaterial {...materials.Material_0} color={color} />
          </skinnedMesh>
          <skinnedMesh
            name="leg"
            //@ts-expect-error
            geometry={nodes.leg.geometry}
            //@ts-expect-error
            skeleton={nodes.leg.skeleton}
          >
            <meshStandardMaterial {...materials.Material_0} color={color} />
          </skinnedMesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(
  `${GAME_PUBLIC_PATH}/models/character.glb`,
  `${GAME_PUBLIC_PATH}/draco/gltf/`
);
