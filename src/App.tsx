import './App.css'
import Board from './components/board/Board'
import ConfigForm from './components/config'
import useBearStore from './store'

function App() {
  const player1 = useBearStore((state) => state.game.player1)
  const player2 = useBearStore((state) => state.game.player2)

  return (
    <>
      <Board />
      <ConfigForm player={player1} title='Player 1' updatePlayer={console.log} key="player1" />
    </>
  )
}

export default App
