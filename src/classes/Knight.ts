import { Board, VirtualBoard } from '../types';
import Movements from './Movements';
import { BasePiece } from './BasePiece';

export default class Knight extends BasePiece {
	calcMove(
		row: number,
		col: number,
		board: Board,
		virtual: VirtualBoard,
		ignorePieces = false
	): string[] {
		const movement = new Movements(col, row, ignorePieces);
		return movement.lMovement(board, virtual, this.color);
	}
}
