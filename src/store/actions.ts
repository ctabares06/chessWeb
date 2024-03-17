import { BasePieceInstance } from '../classes/types';
import { pieceDiscriminator } from '../classes';
import {
	Figures,
	GameStatus,
	Sides,
	AxisFigure,
	VirtualBoard,
	Color,
} from '../types';
import useBearStore from './store';
import Pawn from '../classes/Pawn';

export const setMovingPiece = (cell: AxisFigure, position: string) =>
	useBearStore.setState((state) => {
		const { piece } = cell;

		if (!piece) return { state }

		const avPos = piece.calcMove(
			cell.row,
			cell.col,
			state.board,
			state.virtualBoard,
			false
		);

		return {
			moving: {
				name: piece.name,
				icon: piece.icon,
				color: piece.color,
				calcMove: piece.calcMove,
				avMoves: avPos,
				position,
			},
		};
	});

export const initVirualBoard = (
	list: { name: Figures; color: Sides; position: string }[]
) =>
	useBearStore.setState((state) => {
		const copy = Object(state.virtualBoard);
		list.forEach((item) => {
			copy[item.position] = {
				...copy[item.position],
				piece: pieceDiscriminator(item.name, item.color),
			};
		});

		return {
			virtualBoard: {
				...copy,
			},
		};
	});

export const setPiecePostion = (origin: string, destiny: string) =>
	useBearStore.setState((state) => {
		const copy: VirtualBoard = Object(state.virtualBoard);
		const piece = copy[origin].piece;

		copy[destiny].piece = piece;
		copy[origin].piece = undefined;

		if (piece instanceof Pawn) {
			piece.notify();
		}

		return {
			virtualBoard: { ...copy },
			moving: null,
		};
	});

export const setGameStatus = (status: GameStatus) =>
	useBearStore.setState((state) => {
		const game = state.game;
		game.status = status;

		return {
			game,
		};
	});

export const setPlayerInfo = (name: string, side: Sides) =>
	useBearStore.setState((state) => {
		const game = state.game;

		return {
			game: {
				...game,
				[side]: {
					...game[side],
					name,
				},
			},
		};
	});

export const startGame = () =>
	useBearStore.setState((state) => {
		const game = state.game;
		game.status = GameStatus.started;

		const colors: Color[] = ['pink', 'navy', 'yellow']
		const usedColors: Color[] = [state.game[Sides.white].color, state.game[Sides.black].color]

		const boardColor = colors.filter(color => color !== usedColors[0] && color !== usedColors[1]);
		game.color = boardColor[0]


		return {
			game,
		};
	});

export const changeTurn = () =>
	useBearStore.setState((state) => {
		let { turn } = state.game;

		if (turn === Sides.white) {
			turn = Sides.black;
		} else {
			turn = Sides.white;
		}

		return {
			game: {
				...state.game,
				turn,
			},
		};
	});

export const eatPiece = (
	slot: string,
	piece: BasePieceInstance,
	color: Sides
) =>
	useBearStore.setState((state) => {
		const virtual = state.virtualBoard;
		const game = state.game;
		const newFigure = virtual[state.moving!.position].piece;
		virtual[slot].piece = newFigure;
		virtual[state.moving!.position].piece = undefined;

		if (color === Sides.white) {
			game[Sides.black].graveyard.push(piece);
		} else {
			game[Sides.white].graveyard.push(piece);
		}

		return {
			game: { ...game },
			virtualBoard: { ...virtual },
			moving: null,
		};
	});

export const setCheck = (side: Sides, check: boolean) =>
	useBearStore.setState((state) => {
		const player = state.game[side];
		return {
			...state,
			game: {
				...state.game,
				[side]: {
					...player,
					check,
				},
			},
		};
	});

export const setCheckMate = (side: Sides) =>
	useBearStore.setState((state) => {
		return {
			game: {
				...state.game,
				status: GameStatus.ended,
			},
			resume: {
				winner: side,
			},
		};
	});

export const setPlayersColors = (player: Sides, color: Color) => useBearStore.setState((state) => {
	return {
		game: {
			...state.game,
			[player]: {
				...state.game[player],
				color: color,
			}
		}
	}
})
