import { Board, Figures, Sides, virtualBoard } from '../types';

export abstract class BasePiece {
	name: Figures;
	icon: string;
	color: Sides;
	waitNotification: boolean;

	constructor(
		name: Figures,
		icon: string,
		color: Sides,
		waitNotification: boolean
	) {
		this.name = name;
		this.icon = icon;
		this.color = color;
		this.waitNotification = waitNotification;
	}

	abstract notify(): void;
	abstract calcMove(
		row: number,
		col: number,
		board: Board,
		virtual: virtualBoard,
		ignorePieces: boolean
	): string[];
}
