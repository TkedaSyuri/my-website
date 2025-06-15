// src/components/FireSound.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { PositionalAudio } from "@react-three/drei";
import type { PositionalAudio as PositionalAudioImpl } from "three";

// AudioContext を持つことを保証する型
type AudioWithContext = PositionalAudioImpl & { context: AudioContext };

interface ClicketSoundProps {
  /** 音声ファイルのパス (public フォルダからの相対) */
  url: string;
  /** 音が減衰し始める距離 */
  distance?: number;
  /** 音量 (0〜1) */
  volume?: number;
  /** ループ再生 */
  loop?: boolean;
  /** 音源を置く位置 */
  position?: [number, number, number];
}

export const ClicketSound: React.FC<ClicketSoundProps> = ({
  url,
  distance = 5,
  volume = 0.5,
  loop = true,
  position = [0, 0, 0],
}) => {
  const soundRef = useRef<AudioWithContext>(null!);

  useEffect(() => {
    const tryPlay = () => {
      const audio = soundRef.current;
      if (!audio) {
        // ref がまだ割り当てられていなければ50ms後に再トライ
        setTimeout(tryPlay, 50);
        return;
      }
      // AudioContext がサスペンドなら再開
      const ctx = audio.context;
      if (ctx.state === "suspended") ctx.resume();

      // パラメータ設定＆再生
      audio.setRefDistance(distance);
      audio.setLoop(loop);
      audio.setVolume(volume);
      audio.play();
    };
    tryPlay();
  }, [distance, loop, volume]);

  return (
    <group position={position}>
      <PositionalAudio
        ref={soundRef}
        url={url}
        distance={distance}
        loop={loop}
        autoplay
      />
    </group>
  );
};
