import { FC, useRef } from 'react';
import { MovingPiece } from '../../types';
import { BasePieceInstance } from '../../classes/types';
import { ReactSVG } from 'react-svg';
import useBearStore from '../../store';

interface SlotType {
	piece: BasePieceInstance;
	moving: MovingPiece | null;
	slot: string;
	handleClick: () => void;
}

const Slot: FC<SlotType> = ({ piece, slot, moving, handleClick }) => {
	const color = useBearStore((state) => state.game[piece.color].color);
	const pieceContainer = useRef<HTMLDivElement | null>(null);

	const MarkedEl = (
		<div className={`slot__background slot__background--red`}>
			<ReactSVG
				src={piece.icon}
				className={`slot__piece slot__piece--${color}`}
			/>
		</div>
	);

	return (
		<div
			onClick={handleClick}
			data-testid="slot"
			ref={pieceContainer}
			className="slot"
		>
			{moving && moving.avMoves.includes(slot) ? (
				MarkedEl
			) : (
				<ReactSVG
					src={piece.icon}
					className={`slot__piece slot__piece--${color}`}
				/>
			)}
		</div>
	);
};

export default Slot;
