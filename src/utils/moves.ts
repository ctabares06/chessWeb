import { Figures, Pawn, axisFigure } from "../types";

export function getMoveCalc(cell: axisFigure) : string[] {
  const { piece, row, col } = cell;
  switch (piece.name) {
    case Figures.pawn:
      return pawnMoveCalc(piece, row, col)
    default:
      throw new Error("unknown figure type")
  }
}

function pawnMoveCalc(figure: Pawn, row: number, col: number) {
  return []
}