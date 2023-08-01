import { GameStatus, PlayerNoGrave, axisFigure, movingPiece, virtualBoard } from "../types"
import { fillBoard } from "../utils/initializers"
import { getMoveCalc } from "../utils/moves"
import useBearStore from "./store"

export const setMovingPiece = (cell: axisFigure, position: string) => useBearStore.setState((state) => {
  const { piece } = cell
  const avPos = getMoveCalc(cell, state.board, state.virtualBoard)
  const moving: movingPiece = Object({
      ...piece,
      avMoves: avPos,
      position
  })

  return {
      moving: {...moving}
  }
})

export const setPiecePostion = (origin: string, destiny: string) => useBearStore.setState((state) => {
  const copy: virtualBoard = Object(state.virtualBoard)
  const piece = copy[origin].piece
  if (piece.firstMove) {
    piece.firstMove = false
  }
  copy[destiny].piece = piece
  copy[origin].piece = {}

  changeTurn()
  return {
      virtualBoard: {...copy},
      moving: {}
  }
      
})

export const setGameStatus = (status: GameStatus) => useBearStore.setState((state) => {
  const game = state.game;
  game.status = status

  return {
    game
  }
})

export const setPlayerInfo = (player: PlayerNoGrave, isPlayer1: boolean) => useBearStore.setState((state) => {
  const playerKey = isPlayer1 === true ? 'player1' : 'player2'
  const game = state.game;

  return {
    game : {
      ...game,
      [playerKey]: {
        ...game[playerKey],
        ...player
      }
    }
  }
})

export const startGame = () => useBearStore.setState((state) => {
  const game = state.game
  game.status = GameStatus.started
  game.turn = game.player1.name
  fillBoard(state.virtualBoard)
  return {
    game
  }
})

export const changeTurn = () => useBearStore.setState((state) => {
  const { player1, player2 } = state.game
  let { turn } = state.game

  if (turn === player1.name) {
    turn = player2.name
  } else {
    turn = player1.name
  }

  return {
    game: {
      ...state.game,
      turn,
    }
  }
})