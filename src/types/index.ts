import Pawn from '../classes/Pawn';
import { BasePieceInstance } from '../classes/types';

export type Board = string[][];

export interface BoardWithList {
	board: Board;
	list: VirtualBoard;
}

export interface AxisFigure {
	col: number;
	row: number;
	piece?: BasePieceInstance | Pawn;
}

export interface VirtualBoard {
	[key: string]: AxisFigure;
}

export interface MovingPiece extends BasePieceInstance {
	avMoves: string[];
	position: string;
}

export interface BoardStore {
	game: Game;
	board: Board;
	virtualBoard: VirtualBoard;
	moving: MovingPiece | null;
	resume: {
		winner: Sides | null;
	};
}

export interface Piece {
	name: Figures;
	icon: string;
	color: Sides;
}

export enum Sides {
	white = 'white',
	black = 'black',
}

export enum Figures {
	pawn = 'pawn',
	rook = 'rook',
	bishop = 'bishop',
	knight = 'knight',
	queen = 'queen',
	king = 'king',
}

export enum GameStatus {
	waiting = 'waiting',
	started = 'started',
	ended = 'ended',
}

export enum AvailablePositions {
	valid = 'valid',
	invalid = 'invalid',
	last = 'lat',
}

export interface Player {
	graveyard: BasePieceInstance[];
	name: string;
	check: boolean;
}

export interface Game {
	status: GameStatus;
	[Sides.white]: Player;
	[Sides.black]: Player;
	turn: Sides;
}
