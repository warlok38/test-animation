import { createContext } from "react";
import { GameStateContextType } from "../types";

export const GameStateContext = createContext<GameStateContextType>(null!);
