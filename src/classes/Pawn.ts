import { AvailablePositions, Board, Figures, Sides, virtualBoard } from "../types";
import Movements from "./Movements";
import { BasePiece } from "./BasePiece";

export default class Pawn extends BasePiece {
    firstMove: boolean

    constructor(name: Figures, icon: string, color: Sides, waitNotification: boolean) {
        super(name, icon, color, waitNotification)
        this.firstMove = true;
    }

    calcMove(row: number, col: number, board: Board, virtual: virtualBoard): string[] {
        const movement = new Movements(col, row);
        const moves = []
        let selectedColor;

        const whiteMoves = [
            { x: 0, y: 1, eating: false },
            { x: -1, y: 1, eating: true },
            { x: 1, y: 1, eating: true },
        ]

        const blackMoves = [
            { x: 0, y: -1, eating: false },
            { x: -1, y: -1, eating: true },
            { x: 1, y: -1, eating: true },
        ]

        if (this.firstMove) {
            whiteMoves.push({ x: 0, y: 2, eating: false })
            blackMoves.push({ x: 0, y: -2, eating: false })
        }

        if (this.color === Sides.white) {
            selectedColor = whiteMoves
        } else {
            selectedColor = blackMoves
        }

        for (let i = 0; i < selectedColor.length; i++) {
            const { x, y, eating } = selectedColor[i]
            if (!board[col + y]) {
                continue;
            }

            if (!board[col + y][row + x]) {
                continue;
            }

            const pos = board[col + y][row + x];
            const validPosition = movement.isValidPosition(virtual[pos].piece, this.color)

            if (eating === false && validPosition === AvailablePositions.valid) {
                moves.push(pos)
            } else if (eating === true && validPosition === AvailablePositions.last) {
                moves.push(pos)
            }

        }

        return moves
    }

    notify() {
        if (this.firstMove) {
            this.firstMove = false;
        }
    }

}