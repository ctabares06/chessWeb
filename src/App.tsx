import "./App.css";
import Board from "./components/board/Board";
import StepsPlayer from "./components/StepsPlayer/StepsPlayer";
import useBearStore from "./store";
import { GameStatus } from "./types";

function App() {
  const gameStatus = useBearStore((state) => state.game.status);

  return (
    <>
      {gameStatus === GameStatus.waiting ? (
        <StepsPlayer/>
      ) : (
        <Board />
      )}
    </>
  );
}

export default App;
