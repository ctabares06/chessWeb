import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { BoardStore, axisFigure } from '../types'
import { boardGenerator, fillBoard } from '../utils/initializers';
import { getMoveCalc } from '../utils/moves';

const useBearStore = create<BoardStore>()(devtools((set) => {
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
        setMovingPiece: (cell: axisFigure) => set((state) => {
            const { piece } = cell
            const avPos = getMoveCalc(cell)
            const moving = Object({
                ...piece,
                avMoves: avPos
            })
        
            return {
                moving: {...moving}
            }
        })
    }
}, { name: "chess" }))

// export const setMovingPiece = (cell: axisFigure) => useBearStore.setState(() => {
//     const { piece } = cell
//     const avPos = getMoveCalc(cell)
//     console.log("Moving")

//     return {
//         moving: Object({
//             ...piece,
//             avMoves: avPos
//         })
//     }
// })

export default useBearStore;