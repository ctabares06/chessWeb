import { FC, useEffect, useRef } from 'react';
import { MovingPiece, color } from '../../types';
import { BasePieceInstance } from '../../classes/types';
import { ReactSVG } from 'react-svg'
import '../../styles/board/slot.styl'

interface SlotType {
	piece: BasePieceInstance;
	moving: MovingPiece | null;
	slot: string;
	color: color
	handleClick: () => void;
}

const Slot: FC<SlotType> = ({ piece, slot, moving, color = '', handleClick }) => {
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
			className='slot'
		>
			<ReactSVG src={piece.icon} className={`slot__piece slot__piece--${color}`} />
		</div>
	);
};

export default Slot;
