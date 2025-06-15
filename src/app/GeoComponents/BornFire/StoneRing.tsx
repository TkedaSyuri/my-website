"use client";

import React, { useMemo } from "react";
import { useTexture } from "@react-three/drei";

interface StoneRingProps {
  radius?: number;
  count?: number;
}

export const StoneRing: React.FC<StoneRingProps> = ({
  radius = 1.8,
  count  = 19,
}) => {
  const stoneTex = useTexture("/textures/stone.jpg");

  const stones = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.3;
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.3;
      const scale = 0.4 + Math.random() * 0.3;
      const y     = scale * 0.2;
      const rotY  = Math.random() * Math.PI * 2;
      return { position: [x, y, z] as [number, number, number], scale, rotY };
    });
  }, [radius, count]);

  return (
    <group>
      {stones.map(({ position, scale, rotY }, idx) => (
        <mesh
          key={idx}
          position={position}
          scale={[scale * 1.5, scale, scale]}
          rotation={[0, rotY, 0]}
        >
          {/*
            Icosahedron:
            ・第1引数: 半径(1.0がデフォルト)
            ・第2引数: detail (0→20面、1→最初の面をさらに分割して80面、など)
          */}
          <icosahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            map={stoneTex}
            metalness={0.1}
            roughness={1.5}     // マットにしてゴツゴツ感UP
            displacementMap={stoneTex}
            displacementScale={0.1}
            side={2}
          />
        </mesh>
      ))}
    </group>
  );
};
