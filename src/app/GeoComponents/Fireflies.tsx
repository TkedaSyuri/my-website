"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type { PointsMaterial } from "three";
import { AdditiveBlending, BufferAttribute, Points as ThreePoints } from "three";

export const Fireflies: React.FC = () => {
  const count = 60;
  const R = 7;
  const r = 1;
  const yVariance = 0.5;
  const scale = 1.5;

  // 初期データ
  const { thetas, offsets, baseY, angSpeed, positions } = useMemo(() => {
    const thetas = new Float32Array(count);
    const offsets = new Float32Array(count);
    const baseY   = new Float32Array(count);
    const angSpeed = new Float32Array(count);
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      thetas[i]   = Math.random() * Math.PI * 2;
      offsets[i]  = (Math.random() - 0.5) * r * 2;
      baseY[i]    = (Math.random() - 0.5) * yVariance * 2 + 2;
      angSpeed[i] = Math.random() * 0.5 + 0.2;
    }
    return { thetas, offsets, baseY, angSpeed, positions };
  }, [count, r, yVariance]);

  // THREE.Points と 材質の ref
  const pointsRef = useRef<ThreePoints>(null!);
  const matRef    = useRef<PointsMaterial>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // 位置再計算
    for (let i = 0; i < count; i++) {
      thetas[i] += angSpeed[i] * 0.001;
      const radius = (R + offsets[i]) * scale;
      positions[3*i + 0] = Math.cos(thetas[i]) * radius;
      positions[3*i + 2] = Math.sin(thetas[i]) * radius;
      positions[3*i + 1] = baseY[i] + Math.sin(t * angSpeed[i] * 2) * 0.3;
    }

    // BufferAttribute を取得して copyArray → needsUpdate
    const pts = pointsRef.current!;
    const posAttr = pts.geometry.getAttribute("position") as BufferAttribute;
    posAttr.copyArray(positions);
    posAttr.needsUpdate = true;

    // 明滅アニメーション
    const m = matRef.current!;
    m.size    = 0.07 + Math.sin(t * 5) * 0.005;
    m.opacity = 0.7  + Math.sin(t * 3) * 0.1;
  });

  return (
    <>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          ref={matRef}
          color="green"
          size={0.09}
          sizeAttenuation
          transparent
          opacity={1}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </Points>
    </>
  );
};
