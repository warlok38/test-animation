import {
  Joystick,
  PlayerProfile,
  isHost as isHostPlayroom,
  onPlayerJoin,
  useMultiplayerState,
} from "playroomkit";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { randFloat } from "three/src/math/MathUtils.js";
import {
  HEX_X_SPACING,
  HEX_Z_SPACING,
  NB_COLUMNS,
  NB_ROWS,
  StageCodesEnum,
} from "../consts";
import { PlayerEntity, StageCodes } from "../types";
import { GameStateContext } from "./GameStateContext";

const NEXT_STAGE = {
  lobby: StageCodesEnum.countdown,
  countdown: StageCodesEnum.game,
  game: StageCodesEnum.winner,
  winner: StageCodesEnum.lobby,
};

const TIMER_STAGE = {
  lobby: -1,
  countdown: 1,
  game: 0,
  winner: 5,
};

export const GameStateProvider = ({ children }: PropsWithChildren) => {
  const [winner, setWinner] = useMultiplayerState<PlayerProfile | null>(
    "winner",
    null
  );
  const [stage, setStage] = useMultiplayerState<StageCodes>(
    "gameStage",
    "lobby"
  );
  const [timer, setTimer] = useMultiplayerState("timer", TIMER_STAGE.lobby);
  const [players, setPlayers] = useState<PlayerEntity[]>([]);
  const [isSoloGame, setIsSoloGame] = useState(false);

  const isHost = isHostPlayroom();
  const isInit = useRef(false);

  useEffect(() => {
    if (isInit.current) {
      return;
    }
    isInit.current = true;
    onPlayerJoin((state) => {
      const controls = new Joystick(state, {
        type: "angular",
        buttons: [{ id: "Jump", label: "Jump" }],
      });
      const newPlayer = { state, controls };

      if (isHost) {
        state.setState("dead", stage === "game");
        state.setState("startingPos", {
          x: randFloat(
            (-(NB_COLUMNS - 1) * HEX_X_SPACING) / 2,
            ((NB_COLUMNS - 1) * HEX_X_SPACING) / 2
          ),
          z: randFloat(
            (-(NB_ROWS - 1) * HEX_Z_SPACING) / 2,
            ((NB_ROWS - 1) * HEX_Z_SPACING) / 2
          ),
        });
      }

      setPlayers((players) => [...players, newPlayer]);
      state.onQuit(() => {
        setPlayers((players) => players.filter((p) => p.state.id !== state.id));
      });
    });
  }, [isHost, stage]);

  useEffect(() => {
    if (!isHost) {
      return;
    }
    if (stage === "lobby") {
      return;
    }
    const timeout = setTimeout(() => {
      let newTime = stage === "game" ? timer + 1 : timer - 1;
      if (newTime === 0) {
        const nextStage = NEXT_STAGE[stage];
        if (nextStage === "lobby") {
          // RESET PLAYERS
          players.forEach((p) => {
            p.state.setState("dead", false);
            p.state.setState("pos", null);
            p.state.setState("rot", null);
          });
        }
        setStage(nextStage, true);
        newTime = TIMER_STAGE[nextStage];
      } else {
        // CHECK GAME END
        if (stage === "game") {
          const playersAlive = players.filter((p) => !p.state.getState("dead"));
          if (playersAlive.length < (isSoloGame ? 1 : 2)) {
            setStage("winner", true);
            setWinner(playersAlive[0]?.state.getProfile(), true);
            newTime = TIMER_STAGE.winner;
          }
        }
      }
      setTimer(newTime, true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [
    isHost,
    isSoloGame,
    players,
    setStage,
    setTimer,
    setWinner,
    stage,
    timer,
  ]);

  const startGame = () => {
    setStage("countdown");
    setTimer(TIMER_STAGE.countdown);
    setIsSoloGame(players.length === 1);
  };

  return (
    <GameStateContext.Provider
      value={{
        stage,
        timer,
        players,
        isHost,
        winner,
        startGame,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};
