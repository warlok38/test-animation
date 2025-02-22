import { useContext } from "react";
import { AudioManagerContext } from "../audio/AudioManagerContext";

export const useAudioManager = () => {
  const audioManager = useContext(AudioManagerContext);
  if (!audioManager) {
    throw new Error(
      "useAudioManager must be used within a AudioManagerProvider"
    );
  }
  return audioManager;
};
