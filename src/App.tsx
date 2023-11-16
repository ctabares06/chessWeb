import { useCallback } from "react";
import "./App.css";
import Board from "./components/board/Board";
import StepsPlayer from "./components/StepsPlayer/StepsPlayer";
import useBearStore from "./store";
import { GameStatus } from "./types";

function App() {
  const { status: gameStatus } = useBearStore((state) => state.game);
  const { winner } = useBearStore(state => state.resume);

  const gamePhase = useCallback(() => {
    switch (gameStatus) {
      case GameStatus.waiting:
        return <StepsPlayer />
      case GameStatus.started:
        return <Board />
      case GameStatus.ended:
        return <>
          winner: {winner}
        </>

      default:
        throw new Error("invalid status")
    }
  }, [gameStatus])

  return gamePhase();
}

export default App;
