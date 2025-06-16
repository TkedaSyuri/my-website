"use client";

import React, { useEffect, useRef } from "react";
import { PositionalAudio } from "@react-three/drei";
import type { PositionalAudio as PositionalAudioImpl } from "three";

type AudioWithContext = PositionalAudioImpl & { context: AudioContext };

interface ClicketSoundProps {
  url: string;
  distance?: number;
  volume?: number;
  loop?: boolean;
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
        // まだセットされてなければ再トライ
        setTimeout(tryPlay, 50);
        return;
      }
      // AudioContext resume & パラメータ
      if (audio.context.state === "suspended") audio.context.resume();
      audio.setRefDistance(distance);
      audio.setLoop(loop);
      audio.setVolume(volume);

      // すでに鳴っていなければ play()
      if (!audio.isPlaying) {
        audio.play();
      }
    };
    tryPlay();
  }, [url, distance, loop, volume]);

  return (
    <group position={position}>
      <PositionalAudio
        ref={soundRef}
        url={url}
        distance={distance}
        loop={loop}
        autoplay={false} // 自前で制御するので data-autoplay は false に
      />
    </group>
  );
};
