import _ from "lodash"
import { AvailablePositions, Board, Sides, virtualBoard } from "../types"
import { BasePieceInstance } from "./types"

export default class Movements {
    column: number
    row: number

    constructor(col: number, row: number) {
        this.column = col
        this.row = row
    }

    isValidPosition(piece: BasePieceInstance | undefined, color: Sides) {
        if (_.isEmpty(piece)) {
            return AvailablePositions.valid
        } else if (color !== piece.color) {
            return AvailablePositions.last
        } else {
            return AvailablePositions.invalid
        }
    }

    moveStraightUp(board: Board, virtual: virtualBoard, color: Sides): string[] {
        const moves = []
        let done = false;
        let currentCol = this.column;

        while (!done) {
            currentCol += 1

            if (!board[currentCol]) {
                done = true;
                break;
            }
            const pos = board[currentCol][this.row]
            const validPos = this.isValidPosition(virtual[pos].piece, color)

            if (validPos === AvailablePositions.valid) {
                moves.push(pos)
                continue
            }

            if (validPos === AvailablePositions.last) {
                moves.push(pos)
                break
            }

            break
        }

        return moves
    }

    moveStraightRight(board: Board, virtual: virtualBoard, color: Sides): string[] {
        const moves = []
        let done = false;
        let currentRow = this.row;

        while (!done) {
            currentRow += 1

            if (!board[this.column][currentRow]) {
                done = true;
                break;
            }

            const pos = board[this.column][currentRow]
            const validPos = this.isValidPosition(virtual[pos].piece, color)

            if (validPos === AvailablePositions.valid) {
                moves.push(pos)
                continue
            }

            if (validPos === AvailablePositions.last) {
                moves.push(pos)
                break
            }

            break
        }

        return moves
    }

    moveStraightDown(board: Board, virtual: virtualBoard, color: Sides): string[] {
        const moves = []
        let done = false;
        let currentCol = this.column;

        while (!done) {
            currentCol -= 1

            if (!board[currentCol]) {
                done = true;
                break;
            }
            const pos = board[currentCol][this.row]
            const validPos = this.isValidPosition(virtual[pos].piece, color)

            if (validPos === AvailablePositions.valid) {
                moves.push(pos)
                continue
            }

            if (validPos === AvailablePositions.last) {
                moves.push(pos)
                break
            }

            break
        }

        return moves
    }

    moveStraightLeft(board: Board, virtual: virtualBoard, color: Sides): string[] {
        const moves = []
        let done = false;
        let currentRow = this.row;

        while (!done) {
            currentRow -= 1

            if (!board[this.column][currentRow]) {
                done = true;
                break;
            }

            const pos = board[this.column][currentRow]
            const validPos = this.isValidPosition(virtual[pos].piece, color)

            if (validPos === AvailablePositions.valid) {
                moves.push(pos)
                continue
            }

            if (validPos === AvailablePositions.last) {
                moves.push(pos)
                break
            }

            break
        }

        return moves
    }

    moveRightUp(board: Board, virtual: virtualBoard, color: Sides): string[] {
        const moves = []
        let done = false;
        let currentRow = this.row
        let currentCol = this.column

        while (!done) {
            currentRow += 1;
            currentCol += 1;

            if (!board[currentCol]) {
                done = true;
                break;

            }

            if (!board[currentCol][currentRow]) {
                done = true;
                break;
            }

            const pos = board[currentCol][currentRow]
            const validPos = this.isValidPosition(virtual[pos].piece, color)

            if (validPos === AvailablePositions.valid) {
                moves.push(pos)
                continue
            }

            if (validPos === AvailablePositions.last) {
                moves.push(pos)
                break
            }

            break
        }

        return moves
    }

    moveRightDown(board: Board, virtual: virtualBoard, color: Sides): string[] {
        const moves = []
        let done = false;
        let currentRow = this.row
        let currentCol = this.column

        while (!done) {
            currentRow += 1;
            currentCol -= 1;

            if (!board[currentCol]) {
                done = true;
                break;

            }

            if (!board[currentCol][currentRow]) {
                done = true;
                break;
            }

            const pos = board[currentCol][currentRow]
            const validPos = this.isValidPosition(virtual[pos].piece, color)

            if (validPos === AvailablePositions.valid) {
                moves.push(pos)
                continue
            }

            if (validPos === AvailablePositions.last) {
                moves.push(pos)
                break
            }

            break
        }

        return moves
    }

    moveLeftDown(board: Board, virtual: virtualBoard, color: Sides): string[] {
        const moves = []
        let done = false;
        let currentRow = this.row
        let currentCol = this.column

        while (!done) {
            currentRow -= 1;
            currentCol -= 1;

            if (!board[currentCol]) {
                done = true;
                break;

            }

            if (!board[currentCol][currentRow]) {
                done = true;
                break;
            }

            const pos = board[currentCol][currentRow]
            const validPos = this.isValidPosition(virtual[pos].piece, color)

            if (validPos === AvailablePositions.valid) {
                moves.push(pos)
                continue
            }

            if (validPos === AvailablePositions.last) {
                moves.push(pos)
                break
            }

            break
        }

        return moves
    }

    moveLeftUp(board: Board, virtual: virtualBoard, color: Sides): string[] {
        const moves = []
        let done = false;
        let currentRow = this.row
        let currentCol = this.column

        while (!done) {
            currentRow -= 1;
            currentCol += 1;

            if (!board[currentCol]) {
                done = true;
                break;

            }

            if (!board[currentCol][currentRow]) {
                done = true;
                break;
            }

            const pos = board[currentCol][currentRow]
            const validPos = this.isValidPosition(virtual[pos].piece, color)

            if (validPos === AvailablePositions.valid) {
                moves.push(pos)
                continue
            }

            if (validPos === AvailablePositions.last) {
                moves.push(pos)
                break
            }

            break
        }

        return moves
    }
    lMovement(board: Board, virtual: virtualBoard, color: Sides): string[] {
        const moves = []
        const combinations = [
            { y: 2, x: 1 }, { y: 2, x: -1 }, { y: -2, x: 1 }, { y: -2, x: -1 },
            { y: 1, x: 2 }, { y: 1, x: -2 }, { y: -1, x: 2 }, { y: -1, x: -2 },
        ]

        for (let i = 0; i < combinations.length; i++) {
            const currentCom = combinations[i]

            if (!board[this.column + currentCom.y]) {
                continue;
            }

            if (!board[this.column + currentCom.y][this.row + currentCom.x]) {
                continue;
            }

            const pos = board[this.column + currentCom.y][this.row + currentCom.x]

            const validPos = this.isValidPosition(virtual[pos].piece, color)

            if (validPos === AvailablePositions.valid || validPos === AvailablePositions.last) {
                moves.push(pos)
            }

        }

        return moves
    }

}