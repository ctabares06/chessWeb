import { FC, useEffect, useRef } from 'react';
import _ from 'lodash';
import { movingPiece } from '../../types';

type EmptySlotType = {
	slot: string;
	moving: movingPiece;
	handleClick: () => void;
};

const EmptySlot: FC<EmptySlotType> = ({ slot, moving, handleClick }) => {
	const pieceContainer = useRef<HTMLDivElement | null>(null);

	const markIfAvMove = () => {
		if (pieceContainer.current) {
			if (moving.avMoves.includes(slot)) {
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
			ref={pieceContainer}
			style={{
				display: 'inline-block',
				fontSize: '20px',
				border: '2px solid darkred',
				width: '50px',
				height: '50px',
			}}
		></div>
	);
};

export default EmptySlot;
