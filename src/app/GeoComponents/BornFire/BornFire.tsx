import { useTexture } from "@react-three/drei";
import FireEffect from "./FireEffect";
import FireLight from "./FireLight";
import SmokeEffect from "./SmokeEffect";
import * as THREE from "three";

const BornFire = () => {
  /* ① 木目テクスチャを一度だけ読み込み */
  const barkTex = useTexture("/textures/firewood3.jpg");
  barkTex.wrapS = barkTex.wrapT = THREE.RepeatWrapping; // タイル可
  barkTex.repeat.set(2, 1); // 横方向 2 周期

  return (
    <group>
      {[...Array(10)].map((_, i) => {
        const angle = (Math.PI / 5) * i; // 360°/40本
        const offset = (Math.random() - 0.5) * 0.1; // 高さばらつき

        return (
          <group key={i} rotation={[0, angle, 0]}>
            <mesh
              position={[0, offset, -0.5]}
              rotation={[1.4, 0, 0]}
              castShadow
            >
              {/* 幅 / 長さ / 奥行き（細い角材） */}
              <cylinderGeometry args={[0.15, 0.15, 2, 3]} />{" "}
              <meshStandardMaterial
                map={barkTex} /* 木目テクスチャをそのまま流用可 */
              />
            </mesh>
          </group>
        );
      })}

      {/* 焚き火の炎・光・煙 */}
      <FireEffect />
      <FireLight />
      <SmokeEffect />
    </group>
  );
};

export default BornFire;
