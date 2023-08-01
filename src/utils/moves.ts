import _ from "lodash"
import { Board, Figures, Pawn, Piece, Sides, axisFigure, virtualBoard } from "../types"

export function getMoveCalc(cell: axisFigure, board: Board, virtual: virtualBoard) : string[] {
  const { piece, row, col } = cell;
  switch (piece.name) {
    case Figures.pawn:
      return pawnMoveCalc(piece, row, col, board, virtual, piece.color)
    case Figures.bishop:
      return bishopMoveCalc(row, col, board, virtual, piece.color)
    case Figures.rook:
      return rookMoveCalc(row, col, board, virtual, piece.color)
    case Figures.queen:
      return queenMoveCalc(row, col, board, virtual, piece.color)
    case Figures.knight:
      return knightMoveCalc(row, col, board, virtual, piece.color)
    case Figures.king:
      return kingMoveCalc(row, col, board, virtual, piece.color)
    default:
      throw new Error("unknown figure type")
  }
}


// piece move calc

function pawnMoveCalc(figure: Pawn, row: number, col: number, board: Board, virtual: virtualBoard, color: Sides) {
  const moves = []
  let counter = 1

  if (figure.firstMove) {
    counter = 2
  }

  for (let i = 1; i <= counter; i++) {
    if(board[col + i]) {
      const pos = board[col + i][row]
      if (_.isEmpty(virtual[pos].piece)) {
        moves.push(pos)
      }
    }
  }

  return moves
}

function bishopMoveCalc(row: number, col: number, board: Board, virtual: virtualBoard, color: Sides) {
  const moves = [
    ...moveRightUp(row, col, board, virtual, color),
    ...moveLeftUp(row, col, board, virtual, color),
    ...moveLeftDown(row, col, board, virtual, color),
    ...moveRightDown(row, col, board, virtual, color),
  ]

  return moves
}

function rookMoveCalc(row: number, col: number, board: Board, virtual: virtualBoard, color: Sides) {
  const moves = [
    ...moveStraightUp(row, col, board, virtual, color),
    ...moveStraightLeft(row, col, board, virtual, color),
    ...moveStraightDown(row, col, board, virtual, color),
    ...moveStraightRight(row, col, board, virtual, color),
  ]

  return moves
}

function queenMoveCalc(row: number, col: number, board: Board, virtual: virtualBoard, color: Sides) {
  const moves = [
    ...moveStraightUp(row, col, board, virtual, color),
    ...moveStraightLeft(row, col, board, virtual, color),
    ...moveStraightDown(row, col, board, virtual, color),
    ...moveStraightRight(row, col, board, virtual, color),
    ...moveRightUp(row, col, board, virtual, color),
    ...moveLeftUp(row, col, board, virtual, color),
    ...moveLeftDown(row, col, board, virtual, color),
    ...moveRightDown(row, col, board, virtual, color),
  ]

  return moves
}

function knightMoveCalc(row: number, col: number, board: Board, virtual: virtualBoard, color: Sides) {
  const moves = []
  const combinations = [
    {y: 2, x: 1}, {y: 2, x: -1}, {y: -2, x: 1}, {y: -2, x: -1},
    {y: 1, x: 2}, {y: 1, x: -2}, {y: -1, x: 2}, {y: -1, x: -2},
  ]

  for (let i = 0; i < combinations.length; i++) {
    const currentCom = combinations[i]
    console.log(col+currentCom.y, row+currentCom.x) 
    
    if(!board[col+currentCom.y]) {
      continue;
    }

    if(!board[col+currentCom.y][row+currentCom.x]) {
      continue;
    }

    const pos = board[col+currentCom.y][row+currentCom.x]

    if (isValidPos(virtual[pos].piece, color)) {
      moves.push(pos)
    }

  }

  return moves
}

function kingMoveCalc(row: number, col: number, board: Board, virtual: virtualBoard, color: Sides) {
  const moves = []
  const combinations = [
    {y: 1, x: -1}, {y: 1, x: 0}, {y: 1, x: 1}, {y: 1, x: 0},
    {y: -1, x: 1}, {y: -1, x: 0}, {y: -1, x: -1}, {y: 0, x: -1},
  ]

  for (let i = 0; i < combinations.length; i++) {
    const currentCom = combinations[i]
    console.log(col+currentCom.y, row+currentCom.x) 
    
    if(!board[col+currentCom.y]) {
      continue;
    }

    if(!board[col+currentCom.y][row+currentCom.x]) {
      continue;
    }

    const pos = board[col+currentCom.y][row+currentCom.x]

    if (isValidPos(virtual[pos].piece, color)) {
      moves.push(pos)
    }

  }

  return moves
}

// movements

function moveStraightUp(row: number, col: number, board: Board, virtual: virtualBoard, color: Sides) {
  const moves = []
  let done = false;
  let currentCol = col;

  while (!done) {
    currentCol += 1

    if(!board[currentCol]) {
      done = true;
      break;
    }
    const pos = board[currentCol][row]

    if (isValidPos(virtual[pos].piece, color)) {
      moves.push(pos)
      continue
    }

    break;
  }

  return moves
}

function moveStraightDown(row: number, col: number, board: Board, virtual: virtualBoard, color: Sides) {
  const moves = []
  let done = false;
  let currentCol = col;

  while (!done) {
    currentCol -= 1

    if(!board[currentCol]) {
      done = true;
      break;
    }
    const pos = board[currentCol][row]

    if (isValidPos(virtual[pos].piece, color)) {
      moves.push(pos)
      continue
    }

    break;
  }

  return moves
}

function moveStraightRight(row: number, col: number, board: Board, virtual: virtualBoard, color: Sides) {
  const moves = []
  let done = false;
  let currentRow = row;

  while (!done) {
    currentRow += 1

    if(!board[col][currentRow]) {
      done = true;
      break;
    }

    const pos = board[col][currentRow]

    if (isValidPos(virtual[pos].piece, color)) {
      moves.push(pos)
      continue
    }

    break;
  }

  return moves
}

function moveStraightLeft(row: number, col: number, board: Board, virtual: virtualBoard, color: Sides) {
  const moves = []
  let done = false;
  let currentRow = row;

  while (!done) {
    currentRow -= 1

    if(!board[col][currentRow]) {
      done = true;
      break;
    }

    const pos = board[col][currentRow]

    if (isValidPos(virtual[pos].piece, color)) {
      moves.push(pos)
      continue
    }

    break;
  }

  return moves
}

function moveRightUp(row: number, col: number, board: Board, virtual: virtualBoard, color: Sides) {
  const moves = []
  let done = false;
  let currentRow = row
  let currentCol = col

  while(!done) {
    currentRow += 1;
    currentCol += 1;

    if(!board[currentCol]) {
      done = true;
      break;

    }

    if(!board[currentCol][currentRow]) {
      done = true;
      break;
    }

    const pos = board[currentCol][currentRow]

    if (isValidPos(virtual[pos].piece, color)) {
      moves.push(pos)
      continue
    }

    break;
  }

  return moves
}

function moveLeftUp(row: number, col: number, board: Board, virtual: virtualBoard, color: Sides) {
  const moves = []
  let done = false;
  let currentRow = row
  let currentCol = col

  while(!done) {
    currentRow -= 1;
    currentCol += 1;

    if(!board[currentCol]) {
      done = true;
      break;

    }

    if(!board[currentCol][currentRow]) {
      done = true;
      break;
    }

    const pos = board[currentCol][currentRow]

    if (isValidPos(virtual[pos].piece, color)) {
      moves.push(pos)
      continue
    }

    break;
  }

  return moves
}

function moveRightDown(row: number, col: number, board: Board, virtual: virtualBoard, color: Sides) {
  const moves = []
  let done = false;
  let currentRow = row
  let currentCol = col

  while(!done) {
    currentRow += 1;
    currentCol -= 1;

    if(!board[currentCol]) {
      done = true;
      break;

    }

    if(!board[currentCol][currentRow]) {
      done = true;
      break;
    }

    const pos = board[currentCol][currentRow]

    if (isValidPos(virtual[pos].piece, color)) {
      moves.push(pos)
      continue
    }

    break;
  }

  return moves
}

function moveLeftDown(row: number, col: number, board: Board, virtual: virtualBoard, color: Sides) {
  const moves = []
  let done = false;
  let currentRow = row
  let currentCol = col

  while(!done) {
    currentRow -= 1;
    currentCol -= 1;

    if(!board[currentCol]) {
      done = true;
      break;

    }

    if(!board[currentCol][currentRow]) {
      done = true;
      break;
    }

    const pos = board[currentCol][currentRow]

    if (isValidPos(virtual[pos].piece, color)) {
      moves.push(pos)
      continue
    }

    break;
  }

  return moves
}

const isValidPos = (piece: Piece, color: Sides) => {
  if(_.isEmpty(piece)) {
    return true
  } else if (color !== piece.color) {
    return true
  } else {
    return false
  }
}

// calc functions