import React from 'react';
import useBearStore from '../store';
import { Sides } from '../types';
import '../styles/pages/resume.styl';

const Resume: React.FC<{ winner: Sides }> = ({ winner }) => {
	const { name, color } = useBearStore((state) => state.game[winner]);
	return (
		<div className="resume">
			<h1 className="resume__title">Winner:</h1>
			<h3 className={`resume__winner resume__winner--${color}`}>
				{name}
			</h3>
		</div>
	);
};

export default Resume;
