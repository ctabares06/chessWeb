import { Board, Figures, Sides, VirtualBoard } from '../types';

export abstract class BasePiece {
	name: Figures;
	icon: string;
	color: Sides;

	constructor(name: Figures, icon: string, color: Sides) {
		this.name = name;
		this.icon = icon;
		this.color = color;
	}

	abstract calcMove(
		row: number,
		col: number,
		board: Board,
		virtual: VirtualBoard,
		ignorePieces: boolean
	): string[];
}
