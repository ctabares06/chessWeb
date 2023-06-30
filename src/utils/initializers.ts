import { Board, BoardWithList, Piece } from "../types";

export function boardGenerator(size: number): BoardWithList {
    const initialLetter = 65

    const rows: Board = []
    const pieces: object = {}

    for (let i = 0; i < size; i++) {
        rows[i] = []
        for(let j = 0; j < size; j++) {
            const code = `${i + 1}${String.fromCharCode(initialLetter + j)}`
            rows[i][j] = code
            Object.assign(pieces, {[code]: {}})
        }
    }

    return {
        board: rows,
        list: pieces
    }
}

export function fillBoard(virtual: object): void {
    virtual["1A"] = {
        name: "pawn",
        avMoves: [],
        icon: "P"
    }
}