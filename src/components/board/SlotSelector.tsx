import React, { useEffect } from 'react';
import useBearStore, { changeTurn, eatPiece, setCheck, setMovingPiece, setPiecePostion } from '../../store';
import Slot from './Slot';
import EmptySlot from './EmptySlot';
import _ from 'lodash';
import { Figures } from '../../types';


const SlotSelector: React.FC<{ slot: string }> = ({ slot }) => {
    const { game, board, moving, virtualBoard: virtual } = useBearStore(state => state);
    const turn = game.turn;
    const cell = virtual[slot];
    const piece = cell.piece!;

    const handlerSlotClick = () => {
        if (_.isEmpty(moving)) {
            return;
        }

        if (!_.isEmpty(piece)) {
            const isCheck = game[piece.color].check;
            if (turn !== piece.color && moving.avMoves.includes(slot)) {
                eatPiece(slot, piece, turn)
                return changeTurn()
            }

            if (turn === piece.color && !isCheck) {
                return setMovingPiece(cell, slot);
            } else if (turn === piece.color && piece.name === Figures.king) {
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

    useEffect(() => {
        if (piece && piece.name === Figures.king) {
            setCheck(piece.color, piece.isKingCheck(cell.row, cell.col, board, virtual));
        }
    }, [virtual])

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