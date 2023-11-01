import { FC } from 'react'
import Slot from './Slot'

interface TileProps {
    row: Array<string>
}

const Tile: FC<TileProps> = ({ row }) => {
    return (
        <div style={{ display: "flex" }}>
            {
                row.map((slot) => (<Slot key={slot} slot={slot} />))
            }
        </div>
    )
}

export default Tile