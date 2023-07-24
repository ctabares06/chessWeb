import { axisFigure, movingPiece, virtualBoard } from "../types"
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
  const copy: virtualBoard = Object(state.virtualBoard)
  const piece = copy[origin].piece
  if (piece.firstMove) {
    piece.firstMove = false
  }
  copy[destiny].piece = piece
  copy[origin].piece = {}

  return {
      virtualBoard: {...copy},
      moving: {}
  }
      
})