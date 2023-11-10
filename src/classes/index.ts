import { Figures, Sides } from "../types"
import Bishop from "./Bishop"
import King from "./King"
import Knight from "./Knight"
import Pawn from "./Pawn"
import Queen from "./Queen"
import Rook from "./Rook"
import { BasePieceInstance } from "./types"

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