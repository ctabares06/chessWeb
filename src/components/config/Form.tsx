import React, { useState } from "react";
import { Player, Sides } from "../../types";

type PlayerNoGrave = Omit<Player, "graveyard">

const Form: React.FC<{
  title: string
  player: Player
  updatePlayer: (player: PlayerNoGrave) => void
}> = ({ player, updatePlayer, title }) => {
  const [name, setName] = useState(player.name)
  const [side, setSide] = useState<Sides|null>(player.color)

  const handleStateChange =
    (callback: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.FormEvent<HTMLInputElement>) => {
      callback(event.currentTarget.value);
    };

  const sendForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    updatePlayer({
      name,
      color: side
    })
  }

  return (
    <div>
      <form action="" onSubmit={sendForm}>
        <h3>player 1</h3>
        <input type="text" placeholder="name" value={name} onChange={handleStateChange(setName)} />
        <span>white</span>
        <input type="radio" name="side" id="" checked={side === 'white'} value="white" onChange={handleStateChange(setSide)}/>
        <span>black</span>
        <input type="radio" name="side" id="" checked={side === 'black'} value="black" onChange={handleStateChange(setSide)}/>
        <button type="submit">start</button>
      </form>
    </div>
  );
};

export default Form
