export type Board = Array<Array<Piece | {}>>

export type BoardWithList = {
    board: Board,
    list: object
}

export interface BoardStore {
    board: Board
    virtualBoard: object,
    setPiecePostion: (origin: string, destiny: string) => void
}

export interface Piece {
    name: string
    avMoves: Array<string>
    icon: string
}