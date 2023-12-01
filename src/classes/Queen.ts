import { Board, VirtualBoard } from '../types';
import Movements from './Movements';
import { BasePiece } from './BasePiece';

export default class Queen extends BasePiece {
	calcMove(
		row: number,
		col: number,
		board: Board,
		virtual: VirtualBoard,
		ignorePieces = false
	): string[] {
		const movement = new Movements(col, row, ignorePieces);
		const moves = [
			...movement.moveRightUp(board, virtual, this.color),
			...movement.moveRightDown(board, virtual, this.color),
			...movement.moveLeftDown(board, virtual, this.color),
			...movement.moveLeftUp(board, virtual, this.color),
			...movement.moveStraightUp(board, virtual, this.color),
			...movement.moveStraightRight(board, virtual, this.color),
			...movement.moveStraightDown(board, virtual, this.color),
			...movement.moveStraightLeft(board, virtual, this.color),
		];

		return moves;
	}
}
