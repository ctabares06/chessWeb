import { FC, useEffect, useRef } from 'react';
import _ from 'lodash';
import { MovingPiece, color } from '../../types';
import '../../styles/board/slot.styl'

interface EmptySlotType {
	slot: string;
	moving: MovingPiece | null;
	handleClick: () => void;
}

const EmptySlot: FC<EmptySlotType> = ({ slot, moving, handleClick }) => {
	const pieceContainer = useRef<HTMLDivElement | null>(null);

	const MarkedEl = (
		<div className={`slot__background slot__background--pink`}></div>
	)

	return (
		<div
			onClick={handleClick}
			ref={pieceContainer}
			className='slot'
		>
			{
				(moving && moving.avMoves.includes(slot)) && MarkedEl
			}
		</div>
	);
};

export default EmptySlot;
