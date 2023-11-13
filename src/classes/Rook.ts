import { Board, virtualBoard } from "../types";
import Movements from "./Movements";
import { BasePiece } from "./BasePiece";

export default class Rook extends BasePiece {
    notify(): void {

    }
    calcMove(row: number, col: number, board: Board, virtual: virtualBoard, ignorePieces: boolean = false): string[] {
        const movement = new Movements(col, row, ignorePieces);
        const moves = [
            ...movement.moveStraightUp(board, virtual, this.color),
            ...movement.moveStraightRight(board, virtual, this.color),
            ...movement.moveStraightDown(board, virtual, this.color),
            ...movement.moveStraightLeft(board, virtual, this.color)
        ]

        return moves
    }
}