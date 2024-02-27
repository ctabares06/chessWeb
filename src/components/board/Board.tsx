import { FC } from 'react';
import useBearStore from '../../store';
import Tile from './Tile';

const Board: FC = () => {
	const board = useBearStore((state) => state.board);

	return (
		<>
			<h1>Board</h1>
			<div>
				<div
					style={{ display: 'flex', flexDirection: 'column-reverse' }}
				>
					{board.map((file, idx) => (
						<Tile key={idx} row={file} />
					))}
				</div>
			</div>
		</>
	);
};

export default Board;
