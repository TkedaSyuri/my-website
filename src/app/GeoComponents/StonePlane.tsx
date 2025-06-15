"use client";

import React from "react";
import { Circle, useTexture } from "@react-three/drei";
import { DoubleSide } from "three";

const StoneCircle: React.FC = () => {
  const map = useTexture("/textures/drei.jpg");

  return (
    <Circle
      args={[2, 128]}               // [radius, segments]
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.2, 0]}
    >
      <meshStandardMaterial
        map={map}
        side={DoubleSide}
        displacementMap={map}
        displacementScale={0.1}
      />
    </Circle>
  );
};

export default StoneCircle;
