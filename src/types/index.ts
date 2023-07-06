export type Board = Array<Array<string>>

export type BoardWithList = {
    board: Board
    list: virtualBoard
}

export type axisFigure = {
    col: number
    row: number
    piece: Piece | Record<string,never>
}

export type virtualBoard = {
    [key: string]: axisFigure
}

export type movingPiece = Piece & {
    position: string
} | Record<string, never>

export interface BoardStore {
    board: Board
    virtualBoard: virtualBoard
    moving: movingPiece
    setPiecePostion: (origin: string, destiny: string) => void
    setMovingPiece: (cell: axisFigure) => void
}

export interface Piece {
    name: Figures
    icon: string
    color: Sides
}

export interface Pawn extends Piece {
    firstMove: boolean
}

export enum Sides {
    white, black
}

export enum Figures {
    pawn,
    rook,
    bishop,
    knight,
    queen,
    king,
}