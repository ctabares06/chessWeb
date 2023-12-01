import { Figures, Sides } from '../types';
import Bishop from './Bishop';
import King from './King';
import Knight from './Knight';
import Pawn from './Pawn';
import Queen from './Queen';
import Rook from './Rook';
import { BasePieceInstance } from './types';

export function pieceDiscriminator(name: Figures, color: Sides) {
	switch (name) {
		case Figures.pawn:
			return new Pawn(name, 'P', color);
		case Figures.bishop:
			return new Bishop(name, 'B', color);
		case Figures.knight:
			return new Knight(name, 'K', color);
		case Figures.rook:
			return new Rook(name, 'R', color);
		case Figures.queen:
			return new Queen(name, 'Q', color);
		case Figures.king:
			return new King(name, 'W', color);
		default:
			throw new Error('Figure type is not allowed');
	}
}
