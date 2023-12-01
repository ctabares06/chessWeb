import { FC, useEffect, useRef } from 'react';
import _ from 'lodash';
import { MovingPiece } from '../../types';
import { BasePieceInstance } from '../../classes/types';

interface SlotType {
	piece: BasePieceInstance;
	moving: MovingPiece | null;
	slot: string;
	handleClick: () => void;
};

const Slot: FC<SlotType> = ({ piece, slot, moving, handleClick }) => {
	const pieceContainer = useRef<HTMLDivElement | null>(null);

	const markIfAvMove = () => {
		if (pieceContainer.current) {
			if (moving && moving.avMoves.includes(slot)) {
				pieceContainer.current.style.backgroundColor = 'red';
			} else {
				pieceContainer.current.style.backgroundColor = 'transparent';
			}
		}
	};

	useEffect(() => {
		markIfAvMove();
	}, [moving]);

	return (
		<div
			onClick={handleClick}
			data-testid="slot"
			ref={pieceContainer}
			style={{
				display: 'inline-block',
				fontSize: '20px',
				border: '2px solid darkred',
				width: '50px',
				height: '50px',
				color: piece.color,
			}}
		>
			{piece.icon}
		</div>
	);
};

export default Slot;
