import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { AudioManagerContext } from "./AudioManagerContext";
import { GAME_PUBLIC_PATH } from "../consts";

export const AudioManagerProvider = ({ children }: PropsWithChildren) => {
  const [isAudioEnabled, setAudioEnabled] = useState(false);

  const lastAudioPlayed = useRef(new Date().getTime());

  const playAudio = (file: string, force = false) => {
    if (!isAudioEnabled) {
      return;
    }
    if (!force && new Date().getTime() - lastAudioPlayed.current < 100) {
      return;
    }
    lastAudioPlayed.current = new Date().getTime();
    const audio = new Audio(`${GAME_PUBLIC_PATH}/audios/${file}.mp3`);
    audio.volume = 0.08;
    audio.play();
  };

  const bgAudio = useRef(new Audio(`${GAME_PUBLIC_PATH}/audios/bg.mp3`));
  bgAudio.current.volume = 0.01;

  useEffect(() => {
    if (isAudioEnabled) {
      bgAudio.current.play();
      bgAudio.current.loop = true;
    } else {
      bgAudio.current.pause();
    }
  }, [isAudioEnabled]);

  return (
    <AudioManagerContext.Provider
      value={{ playAudio, isAudioEnabled, setAudioEnabled }}
    >
      {children}
    </AudioManagerContext.Provider>
  );
};
