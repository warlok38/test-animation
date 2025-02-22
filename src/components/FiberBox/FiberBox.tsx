import * as THREE from "three";
import { forwardRef, Ref, useState } from "react";
import { ThreeElements, useLoader } from "@react-three/fiber";
import { BoxProps, useBox } from "@react-three/cannon";

type FiberBoxProps = {
  boxRefProps?: BoxProps;
} & ThreeElements["mesh"];

export const FiberBox = forwardRef(
  ({ boxRefProps, ...props }: FiberBoxProps, ref: Ref<THREE.Mesh>) => {
    const [woodBox] = useLoader(THREE.TextureLoader, [
      "/textures/woodBox.jpg",
      "/textures/floor.jpg",
    ]);
    const [meshRef] = useBox<THREE.Mesh>(() => ({
      position: [0, 5, 0],
      mass: 1,
      ...boxRefProps,
    }));
    const [active, setActive] = useState(false);

    return (
      <mesh
        {...props}
        ref={ref || meshRef}
        scale={active ? 1.5 : 1}
        onClick={() => setActive(!active)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial map={woodBox} />
      </mesh>
    );
  }
);
