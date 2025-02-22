import * as THREE from "three";
import { useRef, useState } from "react";
import { GroupProps, useFrame } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import { Cat } from "@/components/Cat";

export function SpinningBox(props: GroupProps) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Group>(null!);
  // Hold state for hovered and clicked events
  const [isHover, setisHover] = useState(false);
  const [isActive, setActive] = useState(false);
  useCursor(isHover);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(
    (_, delta) => (ref.current.rotation.x = ref.current.rotation.y += delta)
  );
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <Cat
      {...props}
      ref={ref}
      scale={
        isActive
          ? (Number(props.scale) || 1) * 0.9
          : (Number(props.scale) || 1) * 0.8
      }
      onClick={() => setActive(!isActive)}
      onPointerOver={() => setisHover(true)}
      onPointerOut={() => setisHover(false)}
    />
  );
}
