import { BasePieceInstance } from "../classes/types"
import { pieceDiscriminator } from "../classes/Pieces"
import { Figures, GameStatus, Sides, axisFigure, movingPiece, virtualBoard } from "../types"
import useBearStore from "./store"

export const setMovingPiece = (cell: axisFigure, position: string) => useBearStore.setState((state) => {
  const { piece } = cell
  const avPos = piece?.calcMove(cell.row, cell.col, state.board, state.virtualBoard)
  const moving: movingPiece = Object({
    ...piece,
    avMoves: avPos,
    position
  })

  return {
    moving: { ...moving }
  }
})

export const initVirualBoard = (list: Array<{ name: Figures, color: Sides, position: string }>) => useBearStore.setState((state) => {
  const copy = Object(state.virtualBoard);
  list.forEach((item) => {
    copy[item.position] = { ...copy[item.position], piece: pieceDiscriminator(item.name, item.color) }
  })

  return {
    virtualBoard: {
      ...copy
    }
  }
})

export const setPiecePostion = (origin: string, destiny: string) => useBearStore.setState((state) => {
  const copy: virtualBoard = Object(state.virtualBoard)
  const piece = copy[origin].piece

  copy[destiny].piece = piece
  copy[origin].piece = undefined

  if (piece?.waitNotification) {
    piece.notify()
  }

  return {
    virtualBoard: { ...copy },
    moving: {
      avMoves: []
    }
  }

})

export const setGameStatus = (status: GameStatus) => useBearStore.setState((state) => {
  const game = state.game;
  game.status = status

  return {
    game
  }
})

export const setPlayerInfo = (name: string, side: Sides) => useBearStore.setState((state) => {
  const game = state.game;

  return {
    game: {
      ...game,
      [side]: {
        ...game[side],
        name,
      }
    }
  }
})

export const startGame = () => useBearStore.setState((state) => {
  const game = state.game
  game.status = GameStatus.started

  return {
    game
  }
})

export const changeTurn = () => useBearStore.setState((state) => {
  let { turn } = state.game

  if (turn === Sides.white) {
    turn = Sides.black
  } else {
    turn = Sides.white
  }

  return {
    game: {
      ...state.game,
      turn,
    }
  }
})

export const eatPiece = (slot: string, piece: BasePieceInstance, color: Sides) => useBearStore.setState((state) => {
  const virtual = state.virtualBoard
  const game = state.game
  const newFigure = virtual[state.moving.position].piece
  virtual[slot].piece = newFigure
  virtual[state.moving.position].piece = undefined

  if (color === Sides.white) {
    game[Sides.black].graveyard.push(piece)
  } else {
    game[Sides.white].graveyard.push(piece)
  }

  return {
    game: { ...game },
    virtualBoard: { ...virtual },
    moving: {
      avMoves: [],
    }
  }
})

export const setCheck = (side: Sides, check: boolean) => useBearStore.setState((state) => {
  const player = state.game[side];
  return {
    ...state,
    game: {
      ...state.game,
      [side]: {
        ...player,
        check,
      }
    }
  }
})