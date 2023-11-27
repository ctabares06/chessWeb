import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BoardStore, Game, GameStatus, Sides } from '../types';
import { boardGenerator } from '../utils/initializers';

const game: Game = {
	[Sides.white]: {
		name: '',
		check: false,
		graveyard: [],
	},
	[Sides.black]: {
		name: '',
		check: false,
		graveyard: [],
	},
	status: GameStatus.waiting,
	turn: Sides.white,
};

const useBearStore = create<BoardStore>()(
	devtools(
		(set) => {
			const { board, list } = boardGenerator(8);

			return {
				game: game,
				board: board,
				virtualBoard: list,
				moving: {
					avMoves: [],
				},
				resume: {
					winner: null,
				},
			};
		},
		{ name: 'chess' }
	)
);

export default useBearStore;
