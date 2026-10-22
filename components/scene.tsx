"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group } from "three";

function PortraitRibbon() {
  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    group.current.position.y = Math.sin(time * 0.5) * 0.014;
    group.current.rotation.x = 0.35 + Math.sin(time * 0.36) * 0.012;
    group.current.rotation.y = 0.4 + Math.sin(time * 0.31) * 0.018;
    group.current.rotation.z = -0.5 + Math.cos(time * 0.33) * 0.008;
  });

  return <group ref={group} rotation={[0.35, 0.4, -0.5]} scale={[1, 0.8, 1]}>
    <mesh>
      <torusGeometry args={[1.65, 0.014, 6, 96, Math.PI * 1.5]} />
      <meshStandardMaterial color="#b9cb69" roughness={0.58} metalness={0.35} />
    </mesh>
  </group>;
}

function ContextLifecycle({ onReady, onUnavailable }: { onReady: () => void; onUnavailable: () => void }) {
  const gl = useThree(state => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", onUnavailable);
    canvas.addEventListener("webglcontextrestored", onReady);
    return () => {
      canvas.removeEventListener("webglcontextlost", onUnavailable);
      canvas.removeEventListener("webglcontextrestored", onReady);
    };
  }, [gl, onReady, onUnavailable]);
  return null;
}

export default function Scene({ active, onReady, onUnavailable }: { active: boolean; onReady: () => void; onUnavailable: () => void }) {
  return <Canvas onCreated={onReady} dpr={[1, 1.5]} frameloop={active ? "always" : "never"} camera={{ position: [0, 0, 7.2], fov: 35 }} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}>
    <ambientLight intensity={1.1} />
    <directionalLight position={[-3, 4, 6]} intensity={2} color="#f4f5e9" />
    <PortraitRibbon />
    <ContextLifecycle onReady={onReady} onUnavailable={onUnavailable} />
  </Canvas>;
}
