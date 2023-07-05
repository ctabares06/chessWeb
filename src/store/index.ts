import { create } from 'zustand'
import { BoardStore, Piece } from '../types'
import { boardGenerator, fillBoard } from '../utils/initializers';

const useBearStore = create<BoardStore>()((set) => {
    const { board, list } = boardGenerator(8)
    fillBoard(list)

    return {
        board: board,
        virtualBoard: list,
        moving: {},
        setPiecePostion: (origin: string, destiny: string) => set((state) => {
            const copy = Object(state.virtualBoard)
            copy[destiny] = copy[origin]
            copy[origin] = {}

            return {
                virtualBoard: {...copy}
            }
                
        }),
        setMovingPiece: (spot: Piece) => set(() => {
            return {
                moving: {...spot}
            }
        })
    }
})

export default useBearStore;