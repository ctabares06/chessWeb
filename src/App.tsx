import "./App.css";
import Board from "./components/board/Board";
import ConfigForm from "./components/Form";
import StepsPlayer from "./components/StepsPlayer/StepsPlayer";
import { setPlayerInfo } from "./store";
import useBearStore from "./store";
import { GameStatus, PlayerNoGrave } from "./types";

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
