import { useCallback } from 'react';
import PreGame from './pages/PreGame';
import useBearStore from './store';
import { GameStatus } from './types';
import styles from './styles/app.module.styl';
import Game from './pages/Game';

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
				return <>winner: {winner}</>;

			default:
				throw new Error('invalid status');
		}
	}, [gameStatus]);

	return <div className={styles.container}>{gamePhase()}</div>;
}

export default App;
