import { Board, BoardWithList, Figures, Sides, virtualBoard } from "../types";

export function boardGenerator(size: number): BoardWithList {
    const initialLetter = 65

    const rows: Board = []
    const pieces: virtualBoard = {}

    for (let i = 0; i < size; i++) {
        rows[i] = []
        for(let j = 0; j < size; j++) {
            const code = `${i + 1}${String.fromCharCode(initialLetter + j)}`
            rows[i][j] = code
            Object.assign(pieces, {[code]: {
                row: j,
                col: i,
                piece: {}
            }})
        }
    }

    return {
        board: rows,
        list: pieces
    }
}

export function fillBoard(virtual: virtualBoard): void {
    virtual["8H"].piece = {
        name: Figures.pawn,
        icon: "A",
        color: Sides.white,
        firstMove: true
    }

    virtual["2A"].piece = {
        name: Figures.pawn,
        icon: "C",
        color: Sides.white,
        firstMove: true
    }
}