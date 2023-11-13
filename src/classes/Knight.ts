import { Board, virtualBoard } from "../types"
import Movements from "./Movements"
import { BasePiece } from "./BasePiece"

export default class Knight extends BasePiece {
    notify(): void {

    }
    calcMove(row: number, col: number, board: Board, virtual: virtualBoard, ignorePieces: boolean = false): string[] {
        const movement = new Movements(col, row, ignorePieces)
        return movement.lMovement(board, virtual, this.color)
    }
}