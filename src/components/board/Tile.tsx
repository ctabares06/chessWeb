import { FC } from 'react';
import SlotSelector from './SlotSelector';

interface TileProps {
	row: string[];
}

const Tile: FC<TileProps> = ({ row }) => {
	return (
		<div style={{ display: 'flex' }}>
			{row.map((slot) => (
				<SlotSelector key={slot} slot={slot} />
			))}
		</div>
	);
};

export default Tile;
