"use client";

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
// ← Drei の内部で使われている three-stdlib の OrbitControls 型を取ってくる
import type { OrbitControls as ThreeOrbitControls } from "three-stdlib";

import GeoTexture from "../GeoComponents/GeoGround";
import BornFire from "../GeoComponents/BornFire/BornFire";

const SceneCanvas: React.FC = () => {
  // three-stdlib の OrbitControls 型をジェネリックに渡して初期値は null!
  const controlsRef = useRef<ThreeOrbitControls>(null!);

  return (
    <div className="w-full h-screen bg-black absolute inset-0 z-10">
      <Canvas>
        {/* カメラは先に定義しておくと良い */}
        <PerspectiveCamera
          makeDefault
          position={[7, 3, 10]}
          fov={60}
          near={0.1}
          far={1000}
        />

        {/* シーンの中身 */}
        <ambientLight intensity={0.5} />
        <BornFire />
        <GeoTexture />

        {/* 自動回転付き OrbitControls */}
        <OrbitControls
          ref={controlsRef}
          autoRotate           // 自動回転 ON
          autoRotateSpeed={-0.4}// 回転速度
          enableDamping        // 慣性を有効化
          dampingFactor={0.1}  // 減衰係数
        />
      </Canvas>
    </div>
  );
};

export default SceneCanvas;
