import { create } from 'zustand'
import { BoardStore } from '../types'
import { boardGenerator, fillBoard } from '../utils/initializers';

const useBearStore = create<BoardStore>()((set) => {
    const { board, list } = boardGenerator(8)
    fillBoard(list)

    return {
        board: board,
        virtualBoard: list,
        moving: {},
        setPiecePostion: (origin, destiny) => set((state) => {
            const copy = Object(state.virtualBoard)
            copy[destiny].piece = copy[origin].piece
            copy[origin].piece = {}

            return {
                virtualBoard: {...copy}
            }
                
        }),
        setMovingPiece: (spot) => set(() => {
            return {
                moving: {...spot}
            }
        })
    }
})

export default useBearStore;