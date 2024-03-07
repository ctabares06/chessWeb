import { FC, useRef } from 'react';
import _ from 'lodash';
import { MovingPiece, Color } from '../../types';
import '../../styles/board/slot.styl'
import useBearStore from '../../store';

interface EmptySlotType {
	slot: string;
	moving: MovingPiece | null;
	handleClick: () => void;
}

const EmptySlot: FC<EmptySlotType> = ({ slot, moving, handleClick }) => {
	const color = useBearStore(state => state.game[state.game.turn].color)
	const pieceContainer = useRef<HTMLDivElement | null>(null);

	const MarkedEl = (
		<div className={`slot__background slot__background--${color}`}></div>
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
