import { FC } from 'react';
import useBearStore from '../../store';
import Tile from './Tile';

const Board: FC<{}> = () => {
    const board = useBearStore((state) => state.board)
    const virtualBoard = useBearStore((state) => state.virtualBoard)
    const setPos = useBearStore(state => state.setPiecePostion)

    return (
        <>
        <h1>Board</h1>
        <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            {
                board.map((file, idx) => (<Tile key={idx} row={file} />))
            }
        </div>
        <button onClick={() => {
            setPos('1A', '2A')
        }}>move</button>
        </>
    )
};

export default Board;