import React, { useState } from 'react';
import ConfigForm from '../components/Form/Form';
import Box from '../components/layout/Box';
import {
	setPlayerInfo,
	startGame,
	initVirualBoard,
	setPlayersColors,
} from '../store';
import { Color, ColorWithWhite, Sides } from '../types';
import { fillBoard } from '../utils/initializers';
import '../styles/pages/preGame.styl';

const PreGame: React.FC = () => {
	const [playerController, setPlayerController] = useState(0);
	const [disabledColors, setDisableColors] = useState<Record<Color, boolean>>(
		{
			pink: false,
			navy: false,
			yellow: false,
		}
	);
	const [playerColor, setPlayerColor] = useState<ColorWithWhite>('white');

	const fillForm = (name: string, color: Color) => {
		setDisableColors({ ...disabledColors, [color]: true });

		if (playerController === 0) {
			setPlayerInfo(name, Sides.white);
			setPlayersColors(Sides.white, playerColor as Color);
		} else {
			setPlayerInfo(name, Sides.black);
			setPlayersColors(Sides.black, playerColor as Color);
		}

		setPlayerColor('white');

		if (playerController === players.length - 1) {
			initVirualBoard(fillBoard());
			startGame();

			return;
		}
		setPlayerController((state) => state + 1);
	};

	const onChangeColor = (color: Color) => {
		setPlayerColor(color);
	};

	const players = [
		() => (
			<ConfigForm
				title="Player 1"
				key="player1"
				buttonText="next"
				color={playerColor}
				onSubmit={fillForm}
				onChangeColor={onChangeColor}
				disabledColors={disabledColors}
			/>
		),
		() => (
			<ConfigForm
				title="Player 2"
				key="player2"
				buttonText="start game"
				color={playerColor}
				onSubmit={fillForm}
				onChangeColor={onChangeColor}
				disabledColors={disabledColors}
			/>
		),
	];

	return (
		<div className="page">
			<div className="page__form">
				<Box color={playerColor}>{players[playerController]()}</Box>
			</div>
		</div>
	);
};

export default PreGame;
