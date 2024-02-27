import { FC, useEffect, useRef } from 'react';
import _ from 'lodash';
import { Board, Figures, Sides, MovingPiece, VirtualBoard } from '../../types';
import { KingInstance } from '../../classes/types';
import { setCheck, setCheckMate } from '../../store';

interface SlotType {
	piece: KingInstance;
	moving: MovingPiece | null;
	slot: string;
	state: {
		board: Board;
		virtual: VirtualBoard;
		col: number;
		row: number;
	};
	handleClick: () => void;
}

const SlotKing: FC<SlotType> = ({
	piece,
	slot,
	moving,
	state,
	handleClick,
}) => {
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
		const isCheck = piece.isKingCheck(
			state.row,
			state.col,
			state.board,
			state.virtual
		);
		const avMoves = piece.calcMove(
			state.row,
			state.col,
			state.board,
			state.virtual
		);
		if (isCheck && avMoves.length === 0) {
			const winner =
				piece.color === Sides.white ? Sides.black : Sides.white;
			setCheckMate(winner);
		} else {
			setCheck(piece.color, isCheck);
		}
	}, [state.virtual]);

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

export default SlotKing;
