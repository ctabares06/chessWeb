export type Board = Array<Array<string>>

export type BoardWithList = {
    board: Board
    list: virtualBoard
}

export type axisFigure = {
    col: number
    row: number
    piece: Piece | Pawn | Record<string,never>
}

export type virtualBoard = {
    [key: string]: axisFigure
}

export type movingPiece = Piece & {
    avMoves: Array<string>,
    position: string
} | Record<string, never>

export interface BoardStore {
    game: Game
    board: Board
    virtualBoard: virtualBoard
    moving: movingPiece
}

export interface Piece {
    player: string
    name: Figures
    icon: string
    color: Sides
}

export interface Pawn extends Piece {
    firstMove: boolean
}

export enum Sides {
    white = "white", 
    black = "black"
}

export enum Figures {
    pawn,
    rook,
    bishop,
    knight,
    queen,
    king,
}

export enum GameStatus {
    waiting, started, ended
}

export interface Player {
    graveyard: Array<Piece>
    name: string | null
    color: Sides | null
}

export type Game = {
    status: GameStatus,
    player1: Player
    player2: Player
    turn: string | null
}