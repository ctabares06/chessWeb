import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { BoardStore, Game, GameStatus, Sides } from '../types'
import { boardGenerator, fillBoard } from '../utils/initializers';

const game: Game = {
    [Sides.white]: {
        name: "",
        check: false,
        graveyard: [],
    },
    [Sides.black]: {
        name: "",
        check: false,
        graveyard: [],
    },
    status: GameStatus.waiting,
    turn: null
}

const useBearStore = create<BoardStore>()(devtools((set) => {
    const { board, list } = boardGenerator(8)
    // fillBoard(list)

    return {
        game: game,
        board: board,
        virtualBoard: list,
        moving: {
            avMoves: [],
        },
    }
}, { name: "chess" }))

export default useBearStore;