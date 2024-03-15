import React from 'react';
import Box from '../layout/Box';
import useBearStore from '../../store';
import { BasePieceInstance } from '../../classes/types';

interface GraveyardType {
    pieces: BasePieceInstance[]

}

const Graveyard: React.FC<GraveyardType> = ({ pieces }) => {
    const color = useBearStore(state => state.game.color)
    return (
        <Box color={color}>
            <div></div>
        </Box>
    )
}

export default Graveyard; 