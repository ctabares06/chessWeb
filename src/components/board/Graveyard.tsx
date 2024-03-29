import React from 'react';
import Box from '../layout/Box';
import { Color, Figures } from '../../types';
import GraveyardSlot from './GraveyardSlot';
import { BasePiece } from '../../classes/BasePiece';

interface GraveyardType {
	pieces: BasePiece[];
	player: string;
	color: Color;
}

type CountedPiecesType = Partial<
	Record<Figures, BasePiece & { quantity: number }>
>;

const Graveyard: React.FC<GraveyardType> = ({ pieces, player, color }) => {
	const countedPieces = pieces.reduce<CountedPiecesType>((acc, piece) => {
		let accPiece = acc[piece.name];
		if (accPiece) {
			accPiece.quantity++;
		} else {
			accPiece = {
				quantity: 1,
				calcMove: piece.calcMove,
				color: piece.color,
				icon: piece.icon,
				name: piece.name,
			};
		}

		return {
			...acc,
			[piece.name]: accPiece,
		};
	}, {});

	return (
		<div>
			<h1 className="game__title">{player}'s graveyard</h1>
			<Box color={color}>
				<GraveyardSlot piece={countedPieces.pawn} color={color} />
				<GraveyardSlot piece={countedPieces.bishop} color={color} />
				<GraveyardSlot piece={countedPieces.queen} color={color} />
				<GraveyardSlot piece={countedPieces.knight} color={color} />
				<GraveyardSlot piece={countedPieces.rook} color={color} />
			</Box>
		</div>
	);
};

export default Graveyard;
