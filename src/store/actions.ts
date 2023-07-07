import { axisFigure } from "../types"
import { getMoveCalc } from "../utils/moves"
import useBearStore from "./store"

export const setMovingPiece = (cell: axisFigure) => useBearStore.setState(() => {
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

export const setPiecePostion = (origin: string, destiny: string) => useBearStore.setState((state) => {
  const copy = Object(state.virtualBoard)
  copy[destiny].piece = copy[origin].piece
  copy[origin].piece = {}

  return {
      virtualBoard: {...copy}
  }
      
})