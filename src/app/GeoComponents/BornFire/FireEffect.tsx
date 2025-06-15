import React, { useRef, useMemo, JSX } from "react";
import { useFrame } from "@react-three/fiber";
import { ShaderMaterial, MathUtils } from "three";
import "../../shaders/FireShaderMaterial"; // fireShaderMaterial を extend するだけ

// 型定義
type FireShaderMaterialType = {
  uTime: number;
};

declare module "@react-three/fiber" {
  interface ThreeElements {
    fireShaderMaterial: JSX.IntrinsicElements["meshStandardMaterial"] & {
      ref?: React.Ref<ShaderMaterial & { uTime: number }>;
      color?: string;
    };
  }
}

const FireEffect = () => {
  const materialRefs = useRef<(ShaderMaterial & FireShaderMaterialType)[]>([]);

  const flames = useMemo(
    () =>
      [...Array(6)].map(() => ({
        height: MathUtils.randFloat(0.8, 1.5),
        x: MathUtils.randFloatSpread(0.3),
        z: MathUtils.randFloatSpread(0.3),
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    materialRefs.current.forEach((mat, i) => {
      if (mat) mat.uTime = t + i * 0.3;
    });
  });

  // 🔥 各炎を回転させて重ねて配置
  return (
    <>
      {flames.map((flame, i) =>
        [0, Math.PI / 2, Math.PI / 4].map((angle, j) => (
          <mesh
            key={`${i}-${j}`}
            position={[flame.x, flame.height / 5 + 0.5, flame.z]}
            rotation={[0, angle, 0]}
            
          >
            <coneGeometry args={[0.4, flame.height, 18]} />
            <fireShaderMaterial
              ref={(el: ShaderMaterial & FireShaderMaterialType | null) => {
                if (el) materialRefs.current[i * 3 + j] = el;
              }}
              transparent
            />
          </mesh>
        ))
      )}
    </>
  );
};

export default FireEffect;
