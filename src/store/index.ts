import { create } from 'zustand'
import { BoardStore } from '../types'
import { boardGenerator, fillBoard } from '../utils/initializers';

const useBearStore = create<BoardStore>()((set) => {
    const { board, list } = boardGenerator(8)
    fillBoard(list)

    return {
        board: board,
        virtualBoard: list,
        setPiecePostion: (origin: string, destiny: string) => set((state) => {
            const copy = Object(state.virtualBoard)
            copy[destiny] = copy[origin]
            copy[origin] = {}

            return {
                virtualBoard: {...copy}
            }
                
        })
    }
})

export default useBearStore;