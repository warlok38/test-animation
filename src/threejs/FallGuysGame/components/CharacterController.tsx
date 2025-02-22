import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
  euler,
  quat,
  vec3,
} from "@react-three/rapier";
import { Joystick, PlayerState, setState } from "playroomkit";
import { useRef, useState } from "react";
import { Vector3 } from "three";
import { useAudioManager } from "../hooks/useAudioManager";
import { useGameState } from "../hooks/useGameState";
import { Character } from "./Character";
import { ControlsEnum, FLOOR_HEIGHT, FLOORS } from "../consts";
import * as THREE from "three";

const MOVEMENT_SPEED = 4.2;
const JUMP_FORCE = 8;
const ROTATION_SPEED = 2.5;
const vel = new Vector3();

type CharacterControllerProps = {
  isMyPlayer?: boolean;
  isFirstNonDeadPlayer?: boolean;
  state: PlayerState;
  controls: Joystick;
} & RigidBodyProps;

export const CharacterController = ({
  isMyPlayer = false,
  isFirstNonDeadPlayer = false,
  controls,
  state,
  ...props
}: CharacterControllerProps) => {
  const { playAudio } = useAudioManager();
  const isDead = state.getState("dead");
  const [animation, setAnimation] = useState("idle");
  const { stage } = useGameState();
  const [_, get] = useKeyboardControls();
  const rigitBodyRef = useRef<RapierRigidBody>(null!);
  const inTheAirRef = useRef(true);
  const landedRef = useRef(false);
  const cameraPositionRef = useRef<THREE.Group>(null!);
  const cameraLookAtRef = useRef<Vector3>(null!);

  useFrame(({ camera }) => {
    if (stage === "lobby") {
      return;
    }
    if ((isMyPlayer && !isDead) || isFirstNonDeadPlayer) {
      const rbPosition = vec3(rigitBodyRef.current.translation());
      if (!cameraLookAtRef.current) {
        cameraLookAtRef.current = rbPosition;
      }
      cameraLookAtRef.current.lerp(rbPosition, 0.05);
      camera.lookAt(cameraLookAtRef.current);
      const worldPos = rbPosition;
      cameraPositionRef.current.getWorldPosition?.(worldPos);
      camera.position.lerp(worldPos, 0.05);
    }

    if (stage !== "game") {
      return;
    }

    if (!isMyPlayer) {
      const pos = state.getState("pos");
      if (pos) {
        rigitBodyRef.current.setTranslation(pos, false);
      }
      const rot = state.getState("rot");
      if (rot) {
        rigitBodyRef.current.setRotation(rot, false);
      }
      const anim = state.getState("animation");

      setAnimation(anim);
      return;
    }

    const rotVel = {
      x: 0,
      y: 0,
      z: 0,
    };

    const curVel = rigitBodyRef.current.linvel();
    vel.x = 0;
    vel.y = 0;
    vel.z = 0;

    const angle = controls.angle();
    const joystickX = Math.sin(angle);
    const joystickY = Math.cos(angle);

    if (
      get()[ControlsEnum.forward] ||
      (controls.isJoystickPressed() && joystickY < -0.1)
    ) {
      vel.z += MOVEMENT_SPEED;
    }
    if (
      get()[ControlsEnum.back] ||
      (controls.isJoystickPressed() && joystickY > 0.1)
    ) {
      vel.z -= MOVEMENT_SPEED;
    }
    if (
      get()[ControlsEnum.left] ||
      (controls.isJoystickPressed() && joystickX < -0.1)
    ) {
      rotVel.y += ROTATION_SPEED;
    }
    if (
      get()[ControlsEnum.right] ||
      (controls.isJoystickPressed() && joystickX > 0.1)
    ) {
      rotVel.y -= ROTATION_SPEED;
    }

    rigitBodyRef.current.setAngvel(rotVel, false);
    // apply rotation to x and z to go in the right direction
    const eulerRot = euler().setFromQuaternion(
      quat(rigitBodyRef.current.rotation())
    );
    vel.applyEuler(eulerRot);
    if (
      (get()[ControlsEnum.jump] || controls.isPressed("Jump")) &&
      !inTheAirRef.current &&
      landedRef.current
    ) {
      vel.y += JUMP_FORCE;
      inTheAirRef.current = true;
      landedRef.current = false;
    } else {
      vel.y = curVel.y;
    }
    if (Math.abs(vel.y) > 1) {
      inTheAirRef.current = true;
      landedRef.current = false;
    } else {
      inTheAirRef.current = false;
    }
    rigitBodyRef.current.setLinvel(vel, false);
    state.setState("pos", rigitBodyRef.current.translation());
    state.setState("rot", rigitBodyRef.current.rotation());

    // ANIMATION
    const movement = Math.abs(vel.x) + Math.abs(vel.z);
    if (inTheAirRef.current && vel.y > 2) {
      setAnimation("jump_up");
      state.setState("animation", "jump_up");
    } else if (inTheAirRef.current && vel.y < -5) {
      setAnimation("fall");
      state.setState("animation", "fall");
    } else if (movement > 1 || inTheAirRef.current) {
      setAnimation("run");
      state.setState("animation", "run");
    } else {
      setAnimation("idle");
      state.setState("animation", "idle");
    }

    if (
      rigitBodyRef.current.translation().y < -FLOOR_HEIGHT * FLOORS.length &&
      !state.getState("dead")
    ) {
      state.setState("dead", true);
      setState("lastDead", state.getProfile(), true);
      playAudio("Dead", true);
    }
  });

  const startingPos = state.getState("startingPos");
  if (isDead || !startingPos) {
    return null;
  }

  return (
    <RigidBody
      {...props}
      position-x={startingPos.x}
      position-z={startingPos.z}
      colliders={false}
      canSleep={false}
      enabledRotations={[false, true, false]}
      ref={rigitBodyRef}
      onCollisionEnter={(e) => {
        if (e.other.rigidBodyObject?.name === "hexagon") {
          inTheAirRef.current = false;
          landedRef.current = true;
          const curVel = rigitBodyRef.current.linvel();
          curVel.y = 0;
          rigitBodyRef.current.setLinvel(curVel, false);
        }
      }}
      gravityScale={stage === "game" ? 2.5 : 0}
      name={isMyPlayer ? "isMyPlayer" : "other"}
    >
      <group ref={cameraPositionRef} position={[0, 8, -16]}></group>
      <Character
        scale={0.42}
        color={state.getProfile().color?.hexString}
        name={state.getProfile().name}
        position-y={0.2}
        animation={animation}
      />
      <CapsuleCollider args={[0.1, 0.38]} position={[0, 0.68, 0]} />
    </RigidBody>
  );
};
