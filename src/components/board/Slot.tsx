import { FC } from 'react'
import _ from 'lodash'
import useBearStore from '../../store'

const Slot: FC<{ slot: string }> = ({ slot }) => {
    const board = useBearStore((state) => state.virtualBoard)
    const moving = useBearStore(state => state.moving)
    const setMoving = useBearStore(state => state.setMovingPiece)
    const setPosition = useBearStore(state => state.setPiecePostion)
    const spot = board[slot]

    const handleClickSlot = () => {
        if(_.isEmpty(moving) && _.isEmpty(spot)) {
            return
        }

        if(!_.isEmpty(moving)) {
            setPosition(moving.position, slot)
            return setMoving(Object())
        }

        if(!_.isEmpty(spot)) {
            const movingSpot = {...spot, position: slot}
            return setMoving(movingSpot)
        }
    }



    return (
        <div onClick={handleClickSlot} style={{ display: 'inline-block', fontSize: '20px', border: '2px solid darkred', width: '50px', height: '50px' }}>
            {
                spot.name && spot.icon
            }
        </div>
    )
}

export default Slot