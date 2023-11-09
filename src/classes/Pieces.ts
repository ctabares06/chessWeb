import Movements from './Movements'
import { AvailablePositions, Board, Figures, Sides, virtualBoard } from '../types'
import { BasePieceInstance } from './types'

export abstract class BasePiece {
    name: Figures
    icon: string
    color: Sides
    waitNotification: boolean

    constructor(name: Figures, icon: string, color: Sides, waitNotification: boolean) {
        this.name = name
        this.icon = icon
        this.color = color
        this.waitNotification = waitNotification
    }

    abstract notify(): void
    abstract calcMove(row: number, col: number, board: Board, virtual: virtualBoard): string[]
}

export class Pawn extends BasePiece {
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

export class Knight extends BasePiece {
    notify(): void {
        
    }
    calcMove(row: number, col: number, board: Board, virtual: virtualBoard): string[] {
        const movement = new Movements(col, row)
        const moves = []
        const combinations = [
            { y: 2, x: 1 }, { y: 2, x: -1 }, { y: -2, x: 1 }, { y: -2, x: -1 },
            { y: 1, x: 2 }, { y: 1, x: -2 }, { y: -1, x: 2 }, { y: -1, x: -2 },
        ]

        for (let i = 0; i < combinations.length; i++) {
            const currentCom = combinations[i]

            if (!board[col + currentCom.y]) {
                continue;
            }

            if (!board[col + currentCom.y][row + currentCom.x]) {
                continue;
            }

            const pos = board[col + currentCom.y][row + currentCom.x]

            const validPos = movement.isValidPosition(virtual[pos].piece, this.color)

            if (validPos === AvailablePositions.valid || validPos === AvailablePositions.last) {
                moves.push(pos)
            }

        }

        return moves
    }
}

export class Rook extends BasePiece {
    notify(): void {
        
    }
    calcMove(row: number, col: number, board: Board, virtual: virtualBoard): string[] {
        const movement = new Movements(col, row);
        const moves = [
            ...movement.moveStraightUp(board, virtual, this.color),
            ...movement.moveStraightRight(board, virtual, this.color),
            ...movement.moveStraightDown(board, virtual, this.color),
            ...movement.moveStraightLeft(board, virtual, this.color)
        ]

        return moves
    }
}

export class Bishop extends BasePiece {
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

export class Queen extends BasePiece {
    notify(): void {
        
    }
    calcMove(row: number, col: number, board: Board, virtual: virtualBoard): string[] {
        const movement = new Movements(col, row);
        const moves = [
            ...movement.moveStraightUp(board, virtual, this.color),
            ...movement.moveRightUp(board, virtual, this.color),
            ...movement.moveStraightRight(board, virtual, this.color),
            ...movement.moveRightDown(board, virtual, this.color),
            ...movement.moveStraightDown(board, virtual, this.color),
            ...movement.moveLeftDown(board, virtual, this.color),
            ...movement.moveLeftUp(board, virtual, this.color),
            ...movement.moveStraightLeft(board, virtual, this.color),
        ]

        return moves
    }
}

export class King extends BasePiece {
    notify(): void {
        
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

            if (!board[col + currentCom.y]) {
                continue;
            }

            if (!board[col + currentCom.y][row + currentCom.x]) {
                continue;
            }

            const pos = board[col + currentCom.y][row + currentCom.x]
            const validPos = movement.isValidPosition(virtual[pos].piece, this.color)

            if (validPos === AvailablePositions.valid || validPos === AvailablePositions.last) {
                moves.push(pos)
            }

        }

        return moves
    }
}

export function pieceDiscriminator(name: Figures, color: Sides): BasePieceInstance {
    switch (name) {
        case Figures.pawn:
            return new Pawn(name, 'P', color, true)
        case Figures.bishop:
            return new Bishop(name, 'B', color, false)
        case Figures.knight:
            return new Knight(name, 'K', color, false)
        case Figures.rook:
            return new Rook(name, 'R', color, false)
        case Figures.queen:
            return new Queen(name, 'Q', color, false)
        case Figures.king:
            return new King(name, 'W', color, true)
        default:
            throw new Error("Figure type is not allowed")
    }
}