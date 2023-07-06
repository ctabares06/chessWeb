import { FC } from 'react'
import _ from 'lodash'
import useBearStore from '../../store'

const Slot: FC<{ slot: string }> = ({ slot }) => {
    const board = useBearStore((state) => state.virtualBoard)
    const moving = useBearStore(state => state.moving)
    const setPosition = useBearStore(state => state.setPiecePostion)
    const setMoving = useBearStore(state => state.setMovingPiece)
    const cell = board[slot]
    const piece = cell.piece

    const handleClickSlot = () => {
        if(_.isEmpty(moving) && _.isEmpty(piece)) {
            return
        }

        if(!_.isEmpty(piece)) {
            console.log(cell)
            return setMoving(cell)
        }
    }

    const renderSpot = () => {
        if(!_.isEmpty(piece)) {
            return piece.icon
        }
        return
    }

    return (
        <div onClick={handleClickSlot} data-testid="slot" style={{ display: 'inline-block', fontSize: '20px', border: '2px solid darkred', width: '50px', height: '50px' }}>
            {
              renderSpot()
            }
        </div>
    )
}

export default Slot