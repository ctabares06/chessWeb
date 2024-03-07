import React from 'react';
import Board from '../components/board/Board';
import '../styles/pages/game.styl'
import useBearStore from '../store';


const Game: React.FC = () => {
    const color = useBearStore((state) => state.game.color)

    return (
        <div className='game'>
            <h1 className='game__title'>Player 1 turn</h1>
            <div className='game__content'>
                <Board color={color} />
            </div>
        </div>
    )
}

export default Game