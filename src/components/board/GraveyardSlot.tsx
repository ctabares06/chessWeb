import React from 'react';
import { ReactSVG } from 'react-svg';
import { BasePieceInstance } from '../../classes/types';
import { Color } from '../../types';

interface GraveyardSlotType {
    piece?: BasePieceInstance & { quantity: number }
    color: Color
}

const GraveyardSlot: React.FC<GraveyardSlotType> = ({ piece, color }) => {
    return (
        <div className='slot'>
            {
                piece &&
                <>
                    <ReactSVG src={piece.icon} className={`slot__piece slot__piece--${color}`} />
                    {
                        piece.quantity > 1 && <div className={`slot__counter slot__counter--${color}`}>{piece.quantity}</div>
                    }
                </>
            }
        </div>
    )
}

export default GraveyardSlot;