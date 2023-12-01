import { Board, VirtualBoard } from '../types';
import Movements from './Movements';
import { BasePiece } from './BasePiece';

export default class Bishop extends BasePiece {
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
		];

		return moves;
	}
}
