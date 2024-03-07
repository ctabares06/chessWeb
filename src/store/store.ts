import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BoardStore, Game, GameStatus, Sides } from '../types';
import { boardGenerator } from '../utils/initializers';

const useBoardStore = create<BoardStore>()(
	devtools(
		(set) => {
			const game: Game = {
				[Sides.white]: {
					name: '',
					check: false,
					graveyard: [],
					color: 'pink'
				},
				[Sides.black]: {
					name: '',
					check: false,
					graveyard: [],
					color: 'navy'
				},
				status: GameStatus.waiting,
				turn: Sides.white,
				color: 'yellow'
			};

			const { board, list } = boardGenerator(8);

			return {
				game: game,
				board: board,
				virtualBoard: list,
				moving: null,
				resume: {
					winner: null,
				},
			};
		},
		{ name: 'chess' }
	)
);

export default useBoardStore;
