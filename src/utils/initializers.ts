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
    virtual["1A"].piece = {
        name: Figures.bishop,
        icon: "B",
        color: Sides.white,
    }

    virtual["1B"].piece = {
        name: Figures.pawn,
        icon: "C",
        color: Sides.white,
        firstMove: true
    }

    virtual["1C"].piece = {
        name: Figures.queen,
        icon: "Q",
        color: Sides.white
    }

    virtual["1D"].piece = {
        name: Figures.rook,
        icon: "R",
        color: Sides.white
    }
    virtual["1E"].piece = {
        name: Figures.knight,
        icon: "K",
        color: Sides.white
    }
    virtual["1F"].piece = {
        name: Figures.king,
        icon: "W",
        color: Sides.white
    }
}