import { Board, BoardWithList, Figures, Sides, virtualBoard } from "../types";

export function boardGenerator(size: number): BoardWithList {
    const initialLetter = 65

    const rows: Board = []
    const pieces: virtualBoard = {}

    for (let i = 0; i < size; i++) {
        rows[i] = []
        for (let j = 0; j < size; j++) {
            const code = `${i + 1}${String.fromCharCode(initialLetter + j)}`
            rows[i][j] = code
            Object.assign(pieces, {
                [code]: {
                    row: j,
                    col: i,
                    piece: undefined
                }
            })
        }
    }

    return {
        board: rows,
        list: pieces
    }
}

export function fillBoard(): Array<{ name: Figures, color: Sides, position: string }> {
    return [...whitePieces(), ...blackPieces()]
}

const whitePieces = () => {

    const pieces = [
        {
            name: Figures.pawn,
            color: Sides.white,
            position: '2A'
        },
        // {
        //     name: Figures.rook,
        //     color: Sides.white,
        //     position: '1A'
        // },
        // {
        //     name: Figures.knight,
        //     color: Sides.white,
        //     position: '1B'
        // },
        // {
        //     name: Figures.bishop,
        //     color: Sides.white,
        //     position: '1C'
        // },
        // {
        //     name: Figures.queen,
        //     color: Sides.white,
        //     position: '1D'
        // },
        {
            name: Figures.king,
            color: Sides.white,
            position: '7H'
        },
        // {
        //     name: Figures.bishop,
        //     color: Sides.white,
        //     position: '1F'
        // },
        // {
        //     name: Figures.knight,
        //     color: Sides.white,
        //     position: '1G'
        // },
        // {
        //     name: Figures.rook,
        //     color: Sides.white,
        //     position: '1H'
        // }
    ]

    // for (let i = 0; i < 8; i++) {
    //     const pos = `2${String.fromCharCode(65 + i)}`;

    //     pieces.push(
    //         {
    //             name: Figures.pawn,
    //             color: Sides.white,
    //             position: pos,
    //         }
    //     )
    // }

    return pieces
}

const blackPieces = () => {

    const pieces = [
        {
            name: Figures.rook,
            color: Sides.black,
            position: '8A'
        },
        // {
        //     name: Figures.knight,
        //     color: Sides.black,
        //     position: '8B'
        // },
        // {
        //     name: Figures.bishop,
        //     color: Sides.black,
        //     position: '8C'
        // },
        {
            name: Figures.queen,
            color: Sides.black,
            position: '1G'
        },
        // {
        //     name: Figures.king,
        //     color: Sides.black,
        //     position: '8E'
        // },
        // {
        //     name: Figures.bishop,
        //     color: Sides.black,
        //     position: '8F'
        // },
        // {
        //     name: Figures.knight,
        //     color: Sides.black,
        //     position: '8G'
        // },
        // {
        //     name: Figures.rook,
        //     color: Sides.black,
        //     position: '8H'
        // }
    ]

    // for (let i = 0; i < 8; i++) {
    //     const pos = `7${String.fromCharCode(65 + i)}`;

    //     pieces.push(
    //         {
    //             name: Figures.pawn,
    //             color: Sides.black,
    //             position: pos,
    //         }
    //     )
    // }

    return pieces
}