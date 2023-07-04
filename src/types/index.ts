export type Board = Array<Array<Piece | {}>>

export type BoardWithList = {
    board: Board,
    list: object
}

export interface BoardStore {
    board: Board
    virtualBoard: object
    moving: object
    setPiecePostion: (origin: string, destiny: string) => void
    setMovingPiece: (spot: Piece) => void
}

export interface Piece {
    name: string
    avMoves: Array<string>
    icon: string
}