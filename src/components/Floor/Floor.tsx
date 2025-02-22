import * as THREE from "three";
import { usePlane } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";

export const Floor = () => {
  const [floor] = useLoader(THREE.TextureLoader, ["/textures/floor.jpg"]);

  const [planeRef] = usePlane<THREE.Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [1, -2, -1],
  }));

  return (
    <mesh ref={planeRef}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial map={floor} />
    </mesh>
  );
};
