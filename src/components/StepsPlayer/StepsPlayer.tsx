import React, { useState } from "react";
import ConfigForm from "../Form";
import { setPlayerInfo, startGame } from "../../store";
import { Sides } from "../../types";

const StepsPlayer: React.FC = () => {
  const [stepController, setStepController] = useState(0);
  const [defaultSide, setDefaultSide] = useState(Sides.white);

  const fillForm = (name: string, side: Sides) => {
      setPlayerInfo(name, side)
      if (side === Sides.white) {
        setDefaultSide(Sides.black)
      } else {
        setDefaultSide(Sides.white)
      }
      if (stepController === steps.length-1) {
        startGame()
        return
      }
      setStepController(state => state+1)
    };

  const steps = [
    () => (
      <ConfigForm
        title="Player 1"
        key="player1"
        buttonText="next"
        defaultSide={defaultSide}
        updatePlayer={fillForm}
      />
    ),
    () => (
      <ConfigForm
        title="Player 2"
        key="player2"
        buttonText="start game"
        defaultSide={defaultSide}
        updatePlayer={fillForm}
      />
    ),
  ];

  return <div>{steps[stepController]()}</div>;
};

export default StepsPlayer;
