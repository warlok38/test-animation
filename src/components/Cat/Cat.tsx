import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { forwardRef, Ref } from "react";
import * as THREE from "three";

export const Cat = forwardRef((props: GroupProps, ref: Ref<THREE.Group>) => {
  const { nodes, materials } = useGLTF("./models/cat/cat.glb");
  return (
    <group {...props} ref={ref}>
      <mesh
        //@ts-ignore
        geometry={nodes.Maxwell.geometry}
        material={materials.Dingus}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        //@ts-ignore
        geometry={nodes.whiskers.geometry}
        material={materials.Whiskers}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
});

useGLTF.preload("./models/cat/cat.glb");
