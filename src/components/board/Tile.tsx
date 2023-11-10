import { FC } from 'react'
import SlotSelector from './SlotSelector'

interface TileProps {
    row: Array<string>
}

const Tile: FC<TileProps> = ({ row }) => {
    return (
        <div style={{ display: "flex" }}>
            {
                row.map((slot) => (<SlotSelector key={slot} slot={slot} />))
            }
        </div>
    )
}

export default Tile