import React from 'react';
import Board from '../components/board/Board';
import Graveyard from '../components/board/Graveyard';
import '../styles/pages/game.styl'
import useBearStore from '../store';
import { Sides } from '../types';


const Game: React.FC = () => {
    const color = useBearStore((state) => state.game.color)
    const { graveyard: whiteGraveyard, name: whiteName, color: whiteColor } = useBearStore(state => state.game[Sides.white])
    const { graveyard: blackGraveyard, name: blackName, color: blackColor } = useBearStore(state => state.game[Sides.black])
    const playerTurn = useBearStore(state => state.game[state.game.turn].name)

    return (
        <div className='game'>
            <h1 className='game__title'>{playerTurn} turn</h1>
            <div className='game__content'>
                <Graveyard pieces={whiteGraveyard} player={whiteName} key={whiteName} color={whiteColor} />
                <Board color={color} />
                <Graveyard pieces={blackGraveyard} player={blackName} key={blackName} color={blackColor} />
            </div>
        </div>
    )
}

export default Game