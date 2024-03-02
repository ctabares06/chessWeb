import React from 'react';
import Board from '../components/board/Board';
import '../styles/pages/game.styl'


const Game: React.FC = () => {
    return (
        <div className='game'>
            <h1 className='game__title'>Player 1 turn</h1>
            <div className='game__content'>
                <Board color='yellow' />
            </div>
        </div>
    )
}

export default Game