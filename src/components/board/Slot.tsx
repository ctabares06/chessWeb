import { FC, useEffect, useRef } from 'react';
import { MovingPiece } from '../../types';
import { BasePieceInstance } from '../../classes/types';
// import pawnIcon from '../../assets/svg/pawn.svg';
// import bishopIcon from '../../assets/svg/bishop.svg';
// import rookIcon from '../../assets/svg/rook.svg';
// import knightIcon from '../../assets/svg/knight.svg';
// import queenIcon from '../../assets/svg/queen.svg';

interface SlotType {
	piece: BasePieceInstance;
	moving: MovingPiece | null;
	slot: string;
	handleClick: () => void;
}

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
			<img src={piece.icon} alt="" />
		</div>
	);
};

export default Slot;
