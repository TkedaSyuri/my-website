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
          autoRotate
          autoRotateSpeed={-0.4}
          enableDamping
          dampingFactor={0.1}
          // 上下回転の制限
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          // ✨ここからズーム制御✨
          enableZoom // ズームを有効化（省略可）
          minDistance={5} // 寄りすぎない距離の下限（例: 5）
          maxDistance={20} // 離れすぎない距離の上限（例: 20）
          zoomSpeed={0.8} // ズーム感度（0.1～4程度が目安）
        />{" "}
      </Canvas>
    </div>
  );
};

export default SceneCanvas;
