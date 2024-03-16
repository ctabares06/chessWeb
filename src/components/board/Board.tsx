import React from 'react';
import useBearStore from '../../store';
import Tile from './Tile';

type DivEl = React.HtmlHTMLAttributes<HTMLDivElement>

const Numbers: React.FC<DivEl> = ({ ...rest }) => (
	<div {...rest}>
		<h2>1</h2>
		<h2>2</h2>
		<h2>3</h2>
		<h2>4</h2>
		<h2>5</h2>
		<h2>6</h2>
		<h2>7</h2>
		<h2>8</h2>
	</div>
)

const Letters: React.FC<DivEl> = ({ ...rest }) => (
	<div {...rest}>
		<h2>A</h2>
		<h2>B</h2>
		<h2>C</h2>
		<h2>D</h2>
		<h2>E</h2>
		<h2>F</h2>
		<h2>G</h2>
		<h2>H</h2>
	</div>
)

const Board: React.FC<DivEl & { color: string }> = ({ color = '', className = '' }) => {
	const board = useBearStore((state) => state.board);

	return (
		<div className={`board board--${color} ${className}`}>
			<Numbers className={`board__numbers board__numbers--${color}`} />
			<Numbers className={`board__numbers board__numbers--${color} board__numbers--reverse`} />
			<Letters className={`board__letters board__numbers--${color}`} />
			<Letters className={`board__letters board__numbers--${color} board__letters--reverse`} />
			<div className='board__chess'>
				{board.map((file, idx) => (
					<Tile key={idx} row={file} />
				))}
			</div>
		</div>
	);
};

export default Board;
