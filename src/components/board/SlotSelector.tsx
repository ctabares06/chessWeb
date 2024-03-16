import React, { useCallback } from 'react';
import useBearStore, {
	changeTurn,
	eatPiece,
	setMovingPiece,
	setPiecePostion,
} from '../../store';
import Slot from './Slot';
import EmptySlot from './EmptySlot';
import _ from 'lodash';
import { Figures } from '../../types';
import SlotKing from './SlotKing';
import King from '../../classes/King';

const SlotSelector: React.FC<{ slot: string }> = ({ slot }) => {
	const {
		game,
		board,
		moving,
		virtualBoard: virtual,
	} = useBearStore((state) => state);
	const turn = game.turn;
	const cell = virtual[slot];
	const piece = cell.piece;

	const handlerSlotClick = () => {
		if (!moving && piece) {
			const isCheck = game[piece.color].check;
			if (turn === piece.color && !isCheck) {
				return setMovingPiece(cell, slot);
			} else if (turn === piece.color && piece.name === Figures.king) {
				return setMovingPiece(cell, slot);
			}
		} else if (moving && piece) {
			const isCheck = game[piece.color].check;
			if (turn === piece.color && !isCheck) {
				return setMovingPiece(cell, slot)
			}
			else if (turn !== piece.color && moving.avMoves.includes(slot)) {
				if (virtual[slot].piece?.name === Figures.king) {
					return;
				}
				eatPiece(slot, piece, turn);
				return changeTurn();
			}
		} else {
			return;
		}
	};

	const handleEmptySlotClick = () => {
		if (!moving) {
			return;
		}

		if (moving.avMoves.includes(slot)) {
			setPiecePostion(moving.position, slot);
			return changeTurn();
		}
	};

	const pieceSelector = useCallback(() => {
		if (!piece) {
			return (
				<EmptySlot
					slot={slot}
					moving={moving}
					handleClick={handleEmptySlotClick}
					key={slot}
				/>
			);
		} else if (piece instanceof King) {
			return (
				<SlotKing
					piece={piece}
					slot={slot}
					moving={moving}
					state={{
						board,
						virtual,
						col: cell.col,
						row: cell.row,
					}}
					handleClick={handlerSlotClick}
					key={slot}
				/>
			);
		} else {
			return (
				<Slot
					piece={piece}
					slot={slot}
					moving={moving}
					handleClick={handlerSlotClick}
					key={slot}
				/>
			);
		}
	}, [piece, moving, cell, game]);

	return pieceSelector();
};

export default SlotSelector;
