import React, { useState } from 'react';
import ConfigForm from '../components/Form/Form';
import Box from '../components/layout/Box';
import useBearStore, {
	setPlayerInfo,
	startGame,
	initVirualBoard,
	setPlayersColors,
} from '../store';
import { Color, ColorWithWhite, Sides } from '../types';
import { fillBoard } from '../utils/initializers';
import '../styles/pages/preGame.styl';

const PreGame: React.FC = () => {
	const { name: playerOneName } = useBearStore(
		(state) => state.game[Sides.white]
	);
	const [playerController, setPlayerController] = useState(0);
	const [disabledColors, setDisableColors] = useState<Record<Color, boolean>>(
		{
			pink: false,
			navy: false,
			yellow: false,
		}
	);
	const [playerColor, setPlayerColor] = useState<ColorWithWhite>('white');

	const setupPlayer1 = (name: string, color: Color) => {
		setPlayerInfo(name, Sides.white);
		setPlayersColors(Sides.white, playerColor as Color);
		setPlayerColor('white');
		setDisableColors({ ...disabledColors, [color]: true });
		setPlayerController((state) => state + 1);
	};

	const setupPlayer2 = (name: string) => {
		if (playerOneName === name) {
			alert('choose a diferent name');
			return;
		}
		setPlayerInfo(name, Sides.black);
		setPlayersColors(Sides.black, playerColor as Color);
		initVirualBoard(fillBoard());
		startGame();
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
				onSubmit={setupPlayer1}
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
				onSubmit={setupPlayer2}
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
