import { createContext } from "react";

export type AudioContextType = {
  isAudioEnabled: boolean;
  playAudio: (file: string, force?: boolean) => void;
  setAudioEnabled: (value: boolean) => void;
};

export const AudioManagerContext = createContext<AudioContextType>(null!);
