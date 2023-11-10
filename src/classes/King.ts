import { AvailablePositions, Board, virtualBoard } from "../types";
import Movements from "./Movements";
import { BasePiece } from "./Pieces";

export default class King extends BasePiece {
    notify(): void {

    }

    getAccesiblePositions(row: number, col: number, board: Board, virtual: virtualBoard) {
        const movement = new Movements(col, row);
        const list = new Set([
            ...movement.moveStraightUp(board, virtual, this.color),
            ...movement.moveRightUp(board, virtual, this.color),
            ...movement.moveStraightRight(board, virtual, this.color),
            ...movement.moveRightDown(board, virtual, this.color),
            ...movement.moveStraightDown(board, virtual, this.color),
            ...movement.moveLeftDown(board, virtual, this.color),
            ...movement.moveStraightLeft(board, virtual, this.color),
            ...movement.moveLeftUp(board, virtual, this.color),
            ...movement.lMovement(board, virtual, this.color),
        ])

        return list;
    }

    blockedMove(row: number, col: number, board: Board, virtual: virtualBoard): boolean {
        const pos = board[col][row];
        const possiblePositions = this.getAccesiblePositions(row, col, board, virtual);

        for (let position of possiblePositions) {
            if (virtual[position].piece && virtual[position].piece?.color !== this.color) {
                const pointerCol = virtual[position].col;
                const pointerRow = virtual[position].row;
                const pointerPiece = virtual[position].piece;

                const pieceMoves = pointerPiece?.calcMove(pointerRow, pointerCol, board, virtual);
                for (let slot of pieceMoves!) {
                    if (slot === pos) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    calcMove(row: number, col: number, board: Board, virtual: virtualBoard): string[] {
        const movement = new Movements(col, row);
        const moves = []
        const combinations = [
            { y: 1, x: -1 }, { y: 1, x: 1 }, { y: 1, x: 0 }, { y: -1, x: 1 },
            { y: -1, x: 0 }, { y: -1, x: -1 }, { y: 0, x: -1 }, { y: 0, x: 1 }
        ]

        for (let i = 0; i < combinations.length; i++) {
            const currentCom = combinations[i]
            const pointerRow = row + currentCom.x
            const pointerCol = col + currentCom.y

            if (!board[pointerCol]) {
                continue;
            }

            if (!board[pointerCol][pointerRow]) {
                continue;
            }

            if (this.blockedMove(pointerRow, pointerCol, board, virtual)) {
                continue;
            }

            const pos = board[pointerCol][pointerRow]
            const validPos = movement.isValidPosition(virtual[pos].piece, this.color)

            if (validPos === AvailablePositions.valid || validPos === AvailablePositions.last) {
                moves.push(pos)
            }

        }

        return moves
    }
}