import React, { useEffect, useState } from "react";
import ConfigForm from "../Form";
import useBearStore, { setPlayerInfo, startGame } from "../../store";
import { PlayerNoGrave } from "../../types";

const StepsPlayer: React.FC = () => {
  const player1 = useBearStore((state) => state.game.player1);
  const player2 = useBearStore((state) => state.game.player2);
  const [stepController, setStepController] = useState(0);

  const setSelectedPlayerInfo =
    (isPlayer1: boolean) => (player: PlayerNoGrave) => {
      setPlayerInfo(player, isPlayer1)
      if (stepController === steps.length-1) {
        startGame()
        return
      }
      setStepController(state => state+1)
    };

  const steps = [
    () => (
      <ConfigForm
        player={player1}
        title="Player 1"
        key="player1"
        updatePlayer={setSelectedPlayerInfo(true)}
      />
    ),
    () => (
      <ConfigForm
        player={player2}
        title="Player 2"
        key="player2"
        updatePlayer={setSelectedPlayerInfo(false)}
      />
    ),
  ];

  return <div>{steps[stepController]()}</div>;
};

export default StepsPlayer;
