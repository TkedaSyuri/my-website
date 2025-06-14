import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

const FireShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    color: new THREE.Color('orange'),
  },
  // vertex shader
  `
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // 🔥 炎の基本的な揺らぎ（激しく）
      pos.x += sin(pos.x * 20.0 + uTime * 5.0) * 0.4;
      pos.y += sin(pos.z * 20.0 + uTime * 5.0) * 0.4;

      // 🌬️ 風になびくように横にゆっくり揺れる
      pos.x += sin(pos.y * 5.0 + uTime * 1.5) * 0.15;

      // ⬆️ とがらせる（縦に強調）
      pos.y *= 2.0;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // fragment shader
  `
    uniform vec3 color;
    varying vec2 vUv;

    void main() {
      float strength = 1.0 - vUv.y;

      // 徐々に薄くなる炎のアルファ（透明度）
      vec3 finalColor = color * strength;
      gl_FragColor = vec4(finalColor, strength);
    }
  `
);

extend({ FireShaderMaterial });

export { FireShaderMaterial };
