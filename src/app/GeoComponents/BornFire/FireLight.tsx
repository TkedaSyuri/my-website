import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FireLight = () => {
  const light = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    /* ---- ベース 80 ＋ ゆらぎ ±20 --------------- */
    const base = 120;              // 明るさの底上げ
    const wave = Math.sin(t * 6) * 20; // 揺らぎ幅
    const noise = (Math.random() - 0.5) * 10; // ランダム火花感
    light.current.intensity = base + wave + noise;
  });

  return (
    <pointLight
      ref={light}
      position={[0, 1, 0]}   /* 炎の少し上 */
      color="#ff9020"        /* 暖色を強めに */
      intensity={100}        /* 初期値（上書きされてもOK） */
      distance={30}          /* 影響半径 */
      decay={1.6}            /* 距離減衰：1.0〜2.0 */
      castShadow             /* 影を落とす */
      /* shadow.mapSize を下げたいなら↓ */
      // shadow-mapSize-width={512}
      // shadow-mapSize-height={512}
    />
  );
};

export default FireLight;
