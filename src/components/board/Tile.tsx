import { FC } from 'react'
import Slot from './Slot'
import { Piece } from '../../types'

interface TileProps {
    row: Array<Piece | {}>
}

const Tile: FC<TileProps> = ({ row }) => {
    return (
        <div>
            {
                row.map(slot => (<Slot key={slot} slot={slot} />))
            }
        </div>
    )
}

export default Tile