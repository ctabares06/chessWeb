import { axisFigure, movingPiece } from "../types"
import { getMoveCalc } from "../utils/moves"
import useBearStore from "./store"

export const setMovingPiece = (cell: axisFigure, position: string) => useBearStore.setState((state) => {
  const { piece } = cell
  const avPos = getMoveCalc(cell, state.board, state.virtualBoard)
  const moving: movingPiece = Object({
      ...piece,
      avMoves: avPos,
      position
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
      virtualBoard: {...copy},
      moving: {}
  }
      
})