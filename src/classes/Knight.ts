import { Board, virtualBoard } from "../types"
import Movements from "./Movements"
import { BasePiece } from "./Pieces"

export default class Knight extends BasePiece {
    notify(): void {

    }
    calcMove(row: number, col: number, board: Board, virtual: virtualBoard): string[] {
        const movement = new Movements(col, row)
        return movement.lMovement(board, virtual, this.color)
    }
}