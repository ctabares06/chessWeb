import React from 'react';
import useBearStore, { changeTurn, eatPiece, setMovingPiece, setPiecePostion } from '../../store';
import Slot from './Slot';
import EmptySlot from './EmptySlot';
import _ from 'lodash';


const SlotSelector: React.FC<{ slot: string }> = ({ slot }) => {
    const cell = useBearStore(state => state.virtualBoard[slot]);
    const turn = useBearStore(state => state.game.turn);
    const moving = useBearStore(state => state.moving);
    const piece = cell.piece!;

    const handlerSlotClick = () => {
        if (_.isEmpty(moving)) {
            return;
        }

        if (!_.isEmpty(piece)) {
            if (turn !== piece.color && moving.avMoves.includes(slot)) {
                eatPiece(slot, piece, turn)
                return changeTurn()
            }

            if (turn === piece.color) {
                return setMovingPiece(cell, slot);
            }
        }
    }

    const handleEmptySlotClick = () => {
        if (_.isEmpty(moving)) {
            return;
        }

        if (moving.avMoves.includes(slot)) {
            setPiecePostion(moving.position, slot);
            return changeTurn()
        }
    }

    return (
        <>
            {
                cell.piece ? 
                    <Slot 
                        piece={piece} 
                        slot={slot} 
                        moving={moving} 
                        handleClick={handlerSlotClick} 
                        key={slot} 
                    /> : 
                    <EmptySlot 
                        slot={slot}   
                        moving={moving} 
                        handleClick={handleEmptySlotClick}
                        key={slot} 
                    />
            }
        </>
    );
}

export default SlotSelector;