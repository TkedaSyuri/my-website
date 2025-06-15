// src/app/components/SceneCanvas.tsx
"use client";

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import type { OrbitControls as ThreeOrbitControls } from "three-stdlib";

import GeoTexture from "../GeoComponents/GeoGround";
import BornFire from "../GeoComponents/BornFire/BornFire";
import { FireSound } from "../GeoComponents/BornFire/FireSound";
import { ClicketSound } from "../GeoComponents/ClicketSound";

const SceneCanvas: React.FC = () => {
  const controlsRef = useRef<ThreeOrbitControls>(null!);

  return (
    <div className="w-full h-screen bg-black absolute inset-0 z-10">
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={[7, 3, 10]}
          fov={60}
          near={0.1}
          far={1000}
        />

        <ambientLight intensity={0.5} />
        <BornFire />
        <GeoTexture />

        {/* 焚き火の位置に音源を追加 */}
        <FireSound
          url="/sounds/fire_sound.mp3"
          distance={5}
          volume={0.5}
          loop={true}
          position={[0, 0, 0]} // BornFire と同じ座標に置く
        />
        <ClicketSound
          url="/sounds/cricket_sound.mp3"
          distance={5}
          volume={0.5}
          loop={true}
          position={[0, 0, 0]} // BornFire と同じ座標に置く
        />

        <OrbitControls
          ref={controlsRef}
          autoRotate
          autoRotateSpeed={-0.4}
          enableDamping
          dampingFactor={0.1}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          enableZoom
          minDistance={5}
          maxDistance={20}
          zoomSpeed={0.8}
        />
      </Canvas>
    </div>
  );
};

export default SceneCanvas;
