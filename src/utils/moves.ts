import _ from "lodash"
import { Board, Figures, Pawn, axisFigure, virtualBoard } from "../types"

export function getMoveCalc(cell: axisFigure, board: Board, virtual: virtualBoard) : string[] {
  const { piece, row, col } = cell;
  switch (piece.name) {
    case Figures.pawn:
      return pawnMoveCalc(piece, row, col, board, virtual)
    case Figures.bishop:
      return bishopMoveCalc(row, col, board, virtual)
    case Figures.rook:
      return rookMoveCalc(row, col, board, virtual)
    case Figures.queen:
      return queenMoveCalc(row, col, board, virtual)
    case Figures.knight:
      return knightMoveCalc(row, col, board, virtual)
    case Figures.king:
      return kingMoveCalc(row, col, board, virtual)
    default:
      throw new Error("unknown figure type")
  }
}


// piece move calc

function pawnMoveCalc(figure: Pawn, row: number, col: number, board: Board, virtual: virtualBoard) {
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

function bishopMoveCalc(row: number, col: number, board: Board, virtual: virtualBoard) {
  const moves = [
    ...moveRightUp(row, col, board, virtual),
    ...moveLeftUp(row, col, board, virtual),
    ...moveLeftDown(row, col, board, virtual),
    ...moveRightDown(row, col, board, virtual),
  ]

  return moves
}

function rookMoveCalc(row: number, col: number, board: Board, virtual: virtualBoard) {
  const moves = [
    ...moveStraightUp(row, col, board, virtual),
    ...moveStraightLeft(row, col, board, virtual),
    ...moveStraightDown(row, col, board, virtual),
    ...moveStraightRight(row, col, board, virtual),
  ]

  return moves
}

function queenMoveCalc(row: number, col: number, board: Board, virtual: virtualBoard) {
  const moves = [
    ...moveStraightUp(row, col, board, virtual),
    ...moveStraightLeft(row, col, board, virtual),
    ...moveStraightDown(row, col, board, virtual),
    ...moveStraightRight(row, col, board, virtual),
    ...moveRightUp(row, col, board, virtual),
    ...moveLeftUp(row, col, board, virtual),
    ...moveLeftDown(row, col, board, virtual),
    ...moveRightDown(row, col, board, virtual),
  ]

  return moves
}

function knightMoveCalc(row: number, col: number, board: Board, virtual: virtualBoard) {
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

    if (_.isEmpty(virtual[pos].piece)) {
      moves.push(pos)
    }

  }

  return moves
}

function kingMoveCalc(row: number, col: number, board: Board, virtual: virtualBoard) {
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

    if (_.isEmpty(virtual[pos].piece)) {
      moves.push(pos)
    }

  }

  return moves
}

// movements

function moveStraightUp(row: number, col: number, board: Board, virtual: virtualBoard) {
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

    if (_.isEmpty(virtual[pos].piece)) {
      moves.push(pos)
    }
  }

  return moves
}

function moveStraightDown(row: number, col: number, board: Board, virtual: virtualBoard) {
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

    if (_.isEmpty(virtual[pos].piece)) {
      moves.push(pos)
    }
  }

  return moves
}

function moveStraightRight(row: number, col: number, board: Board, virtual: virtualBoard) {
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

    if (_.isEmpty(virtual[pos].piece)) {
      moves.push(pos)
    }
  }

  return moves
}

function moveStraightLeft(row: number, col: number, board: Board, virtual: virtualBoard) {
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

    if (_.isEmpty(virtual[pos].piece)) {
      moves.push(pos)
    }
  }

  return moves
}

function moveRightUp(row: number, col: number, board: Board, virtual: virtualBoard) {
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

    if (_.isEmpty(virtual[pos].piece)) {
      moves.push(pos)
    }  
  }

  return moves
}

function moveLeftUp(row: number, col: number, board: Board, virtual: virtualBoard) {
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

    if (_.isEmpty(virtual[pos].piece)) {
      moves.push(pos)
    }  
  }

  return moves
}

function moveRightDown(row: number, col: number, board: Board, virtual: virtualBoard) {
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

    if (_.isEmpty(virtual[pos].piece)) {
      moves.push(pos)
    }  
  }

  return moves
}

function moveLeftDown(row: number, col: number, board: Board, virtual: virtualBoard) {
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

    if (_.isEmpty(virtual[pos].piece)) {
      moves.push(pos)
    }  
  }

  return moves
}

// calc functions