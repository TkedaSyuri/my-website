import { Plane, useTexture } from "@react-three/drei";
import React from "react";
import { DoubleSide } from "three";

const GeoTexture = () => {
  const glassFieldTexture = useTexture("/texture/grass2.jpg");
  return (
    <>
      <Plane
        args={[20, 20, 128, 128]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.3, 0]}
      >
        <meshStandardMaterial
          map={glassFieldTexture}
          side={DoubleSide}
          displacementMap={glassFieldTexture}
          displacementScale={0.5}
        />
      </Plane>
    </>
  );
};

export default GeoTexture;
