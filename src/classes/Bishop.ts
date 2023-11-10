import { Board, virtualBoard } from "../types";
import Movements from "./Movements";
import { BasePiece } from "./Pieces";

export default class Bishop extends BasePiece {
    notify(): void {

    }
    calcMove(row: number, col: number, board: Board, virtual: virtualBoard): string[] {
        const movement = new Movements(col, row);
        const moves = [
            ...movement.moveRightUp(board, virtual, this.color),
            ...movement.moveRightDown(board, virtual, this.color),
            ...movement.moveLeftDown(board, virtual, this.color),
            ...movement.moveLeftUp(board, virtual, this.color)
        ]

        return moves
    }
}