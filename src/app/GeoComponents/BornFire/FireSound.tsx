// src/components/FireSound.tsx
"use client";

import React, { useEffect, useRef } from "react";

interface FireSoundProps {
  /** public/sounds 以下の相対パス */
  url: string;
  /** 音量 (0〜1) */
  volume?: number;
  /** ループ再生 */
  loop?: boolean;
}

/**
 * ページ開いた瞬間に「ミュートで自動再生→アンミュート」で
 * クリックなしに音を鳴らすシンプルなコンポーネント
 */
export const FireSound: React.FC<FireSoundProps> = ({
  url,
  volume = 0.5,
  loop = true,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const tryPlay = () => {
      const a = audioRef.current;
      if (!a) {
        // audio 要素がまだマウントされていなければ 50ms 後に再トライ
        setTimeout(tryPlay, 50);
        return;
      }
      a.loop = loop;
      a.muted = true;     // まずミュートで再生をリクエスト
      a.play()
        .then(() => {
          // 自動再生が許可されたらアンミュート＆音量セット
          a.muted = false;
          a.volume = volume;
        })
        .catch(() => {
          // ミュート再生ならほとんどの場合この then が呼ばれます
        });
    };
    tryPlay();
  }, [url, volume, loop]);

  return (
    <audio
      ref={audioRef}
      src={url}
      autoPlay
      playsInline
      style={{ display: "none" }}
    />
  );
};
