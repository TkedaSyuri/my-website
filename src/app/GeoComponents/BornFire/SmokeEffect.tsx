import React, { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, MathUtils, TextureLoader } from "three";
import * as THREE from "three";

const SmokeEffect = () => {
  /* ① 煙の枚数を 30 → 60 へ増量 */
  const particleCount = 60;

  /* 各パーティクルを保持する参照配列 */
  const smokeRefs = useRef<Mesh[]>([]);

  /* 半透明 PNG をロード（public/texture/smoke.png）*/
  const smokeTexture = useLoader(TextureLoader, "/textures/smoke2.png");

  /* 初期データをランダム生成（放射状＋高さ・大きさ・透明度） */
  const smokeParticles = useMemo(
    () =>
      [...Array(particleCount)].map(() => {
        const angle = Math.random() * Math.PI * 2;        // 放射角度
        const radius = MathUtils.randFloat(0.2, 1.2);     // 放射距離を少し広げた
        return {
          x: Math.cos(angle) * radius,
          z: Math.sin(angle) * radius,
          scale: MathUtils.randFloat(0.5, 1.0),           // ほんの少し大きめ
          speed: MathUtils.randFloat(0.002, 0.006),       // 上昇はゆっくり
          phase: Math.random() * Math.PI * 2,             // 揺れの時間ずらし
          opacity: MathUtils.randFloat(0.25, 0.5),        // 濃いめスタート
          baseY: MathUtils.randFloat(0.2, 0.5),           // 地面付近位置
        };
      }),
    []
  );

  /* 毎フレーム：上昇・フェード・ゆらぎ・リセット */
  useFrame(() => {
    smokeRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const data = smokeParticles[i];
      const mat = ref.material as THREE.MeshStandardMaterial;

      /* 上昇 */
      ref.position.y += data.speed;

      /* ② フェードを緩やかに（-0.1 → -0.01） */
      mat.opacity -= 0.01;

      /* 高すぎる or 透明になりすぎたらリセットして循環 */
      if (ref.position.y > 2.2 || mat.opacity <= 0.02) {
        ref.position.y = data.baseY;
        mat.opacity = data.opacity;
      }

      /* ③ ゆらゆら揺れ幅を少し強調 */
      const t = Date.now() * 0.001 + data.phase;
      ref.position.x = data.x + Math.sin(t * 1.2) * 0.12;
      ref.position.z = data.z + Math.cos(t * 1.0) * 0.08;

      /* ビルボード化：常に中央を向く（簡易） */
      ref.lookAt(0, ref.position.y, 0);
    });
  });

  /* パーティクル描画 */
  return (
    <>
      {smokeParticles.map((d, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) smokeRefs.current[i] = el; }}
          position={[d.x, d.baseY, d.z]}
          scale={[d.scale, d.scale, d.scale]}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial
            map={smokeTexture}
            transparent
            opacity={d.opacity}
            depthWrite={false}         /* 重なりを自然に */
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  );
};

export default SmokeEffect;
