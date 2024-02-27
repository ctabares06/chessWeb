import React, { useState } from 'react';
import ConfigForm from '../components/Form/Form';
import Box from '../components/layout/Box';
import { setPlayerInfo, startGame, initVirualBoard } from '../store';
import { Sides } from '../types';
import { fillBoard } from '../utils/initializers';
import '../styles/pages/preGame.styl';

const PreGame: React.FC = () => {
	const [stepController, setStepController] = useState(0);
	const [defaultSide, setDefaultSide] = useState(Sides.white);

	const fillForm = (name: string, side: Sides) => {
		setPlayerInfo(name, side);
		if (side === Sides.white) {
			setDefaultSide(Sides.black);
		} else {
			setDefaultSide(Sides.white);
		}
		if (stepController === steps.length - 1) {
			initVirualBoard(fillBoard());
			startGame();

			return;
		}
		setStepController((state) => state + 1);
	};

	const steps = [
		() => (
			<ConfigForm
				title="Player 1"
				key="player1"
				buttonText="next"
				defaultSide={defaultSide}
				updatePlayer={fillForm}
			/>
		),
		() => (
			<ConfigForm
				title="Player 2"
				key="player2"
				buttonText="start game"
				defaultSide={defaultSide}
				updatePlayer={fillForm}
			/>
		),
	];

	return (
		<div className="page">
			<Box color="yellow" className="page__form">
				{steps[stepController]()}
			</Box>
		</div>
	);
};

export default PreGame;
