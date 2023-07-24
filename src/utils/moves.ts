import _ from "lodash"
import { Board, Figures, Pawn, axisFigure, virtualBoard } from "../types"

export function getMoveCalc(cell: axisFigure, board: Board, virtual: virtualBoard) : string[] {
  const { piece, row, col } = cell;
  switch (piece.name) {
    case Figures.pawn:
      return pawnMoveCalc(piece, row, col, board, virtual)
    default:
      throw new Error("unknown figure type")
  }
}

function pawnMoveCalc(figure: Pawn, row: number, col: number, board: Board, virtual: virtualBoard) {
  const moves = []
  let counter = 1

  if (figure.firstMove) {
    counter = 2
  }

  for (let i = 1; i <= counter; i++) {
    const pos = board[col + i][row]
    console.log(pos, virtual[pos])
    if (_.isEmpty(virtual[pos].piece)) {
      moves.push(pos)
    }
  }

  return moves
}