import { Figures, Sides } from '../types';
import Bishop from './Bishop';
import King from './King';
import Knight from './Knight';
import Pawn from './Pawn';
import Queen from './Queen';
import Rook from './Rook';
import pawnIcon from '../assets/svg/pawn.svg';
import bishopIcon from '../assets/svg/bishop.svg';
import rookIcon from '../assets/svg/rook.svg';
import knightIcon from '../assets/svg/knight.svg';
import queenIcon from '../assets/svg/queen.svg';
import kingIcon from '../assets/svg/king.svg';

export function pieceDiscriminator(name: Figures, color: Sides) {
	switch (name) {
		case Figures.pawn:
			return new Pawn(name, pawnIcon, color);
		case Figures.bishop:
			return new Bishop(name, bishopIcon, color);
		case Figures.knight:
			return new Knight(name, knightIcon, color);
		case Figures.rook:
			return new Rook(name, rookIcon, color);
		case Figures.queen:
			return new Queen(name, queenIcon, color);
		case Figures.king:
			return new King(name, kingIcon, color);
		default:
			throw new Error('Figure type is not allowed');
	}
}
