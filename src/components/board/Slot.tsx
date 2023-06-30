import { FC } from 'react'
import useBearStore from '../../store'

const Slot: FC<{ slot: string }> = ({ slot }) => {
    const state = useBearStore((state) => state.virtualBoard)
    const spot = state[slot]

    return (
        <div style={{ display: 'inline-block', fontSize: '20px', border: '2px solid darkred', width: '50px', height: '50px' }}>
            {
                spot.name && spot.icon
            }
        </div>
    )
}

export default Slot