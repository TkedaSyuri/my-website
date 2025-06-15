import { Plane, useTexture } from "@react-three/drei";
import React from "react";
import { DoubleSide } from "three";

const GeoTexture = () => {
  const glassFieldTexture = useTexture("/textures/grass2.jpg");
  return (
    <>
      <Plane
        args={[50, 50, 128, 128]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.3, 0]}
      >
        <meshStandardMaterial
          map={glassFieldTexture}
          side={DoubleSide}
          displacementMap={glassFieldTexture}
          displacementScale={0.8}
        />
      </Plane>
    </>
  );
};

export default GeoTexture;
