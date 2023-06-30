import reactLogo from './assets/react.svg'
import './App.css'
import Board from './components/board/Board'

function App() {
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Board />
    </>
  )
}

export default App
