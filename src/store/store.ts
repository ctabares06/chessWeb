import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { BoardStore, Game, GameStatus } from '../types'
import { boardGenerator, fillBoard } from '../utils/initializers';

const game: Game = {
    player1: {
        name: "",
        color: null,
        graveyard: [],
    },
    player2: {
        name: "",
        color: null,
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
        moving: {},
    }
}, { name: "chess" }))

export default useBearStore;