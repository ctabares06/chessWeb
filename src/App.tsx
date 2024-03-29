import { useCallback } from 'react';
import PreGame from './pages/PreGame';
import useBearStore from './store';
import { GameStatus, Sides } from './types';
import Game from './pages/Game';
import './styles/app.styl';
import Resume from './pages/Resume';

function App() {
	const { status: gameStatus } = useBearStore((state) => state.game);
	const { winner } = useBearStore((state) => state.resume);

	const gamePhase = useCallback(() => {
		switch (gameStatus) {
			case GameStatus.waiting:
				return <PreGame />;
			case GameStatus.started:
				return <Game />;
			case GameStatus.ended:
				return <Resume winner={winner as Sides} />;

			default:
				throw new Error('invalid status');
		}
	}, [gameStatus]);

	return <div className="app">{gamePhase()}</div>;
}

export default App;
