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
    initWhitePieces(virtual)
    initBlackPieces(virtual)
}

const initWhitePieces = (virtual: virtualBoard) => {
    virtual["1A"].piece = {
        name: Figures.rook,
        icon: "R",
        color: Sides.white,
    }

    virtual["1B"].piece = {
        name: Figures.knight,
        icon: "K",
        color: Sides.white,
    }

    virtual["1C"].piece = {
        name: Figures.bishop,
        icon: "B",
        color: Sides.white
    }
    virtual["1D"].piece = {
        name: Figures.queen,
        icon: "Q",
        color: Sides.white
    }
    virtual["1E"].piece = {
        name: Figures.king,
        icon: "W",
        color: Sides.white
    }
    virtual["1F"].piece = {
        name: Figures.bishop,
        icon: "B",
        color: Sides.white
    }
    virtual["1G"].piece = {
        name: Figures.knight,
        icon: "K",
        color: Sides.white
    }
    virtual["1H"].piece = {
        name: Figures.rook,
        icon: "R",
        color: Sides.white
    }
    for (let i = 0; i < 8; i++) {
        const pos = `2${String.fromCharCode(65 + i)}`;

        virtual[pos].piece = {
            name: Figures.pawn,
            icon: "P",
            color: Sides.white,
            firstMove: true,
        }
    }
}

const initBlackPieces = (virtual: virtualBoard) => {
    virtual["8A"].piece = {
        name: Figures.rook,
        icon: "R",
        color: Sides.white,
    }

    virtual["8B"].piece = {
        name: Figures.knight,
        icon: "K",
        color: Sides.white,
    }

    virtual["8C"].piece = {
        name: Figures.bishop,
        icon: "B",
        color: Sides.white
    }
    virtual["8E"].piece = {
        name: Figures.queen,
        icon: "Q",
        color: Sides.white
    }
    virtual["8D"].piece = {
        name: Figures.king,
        icon: "W",
        color: Sides.white
    }
    virtual["8F"].piece = {
        name: Figures.bishop,
        icon: "B",
        color: Sides.white
    }
    virtual["8G"].piece = {
        name: Figures.knight,
        icon: "K",
        color: Sides.white
    }
    virtual["8H"].piece = {
        name: Figures.rook,
        icon: "R",
        color: Sides.white
    }
    for (let i = 0; i < 8; i++) {
        const pos = `7${String.fromCharCode(65 + i)}`;

        virtual[pos].piece = {
            name: Figures.pawn,
            icon: "P",
            color: Sides.white,
            firstMove: true,
        }
    }
}