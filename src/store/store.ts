import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { BoardStore } from '../types'
import { boardGenerator, fillBoard } from '../utils/initializers';

const useBearStore = create<BoardStore>()(devtools((set) => {
    const { board, list } = boardGenerator(8)
    fillBoard(list)

    return {
        board: board,
        virtualBoard: list,
        moving: {},
    }
}, { name: "chess" }))

export default useBearStore;