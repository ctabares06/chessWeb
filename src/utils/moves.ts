import { Figures, Pawn } from "../types";

export function getMoveCalc(figure: Pawn, row: number, col: number) {
  switch (figure.name) {
    case Figures.pawn:
      return pawnMoveCalc(figure, row, col)
    default:
      throw new Error("unknown figure type")
  }
}

function pawnMoveCalc(figure: Pawn, row: number, col: number) {
  if(figure.firstMove) {
    // TODO: make pawn function 
  }
}