import _ from "lodash"
import { AvailablePositions, Board, Figures, Pawn, Piece, Sides, axisFigure, virtualBoard } from "../types"

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
  let selectedColor;

  const whiteMoves = [
    { x: 0, y: 1, eating: false },
    { x: -1, y: 1, eating: true },
    { x: 1, y: 1, eating: true },
  ]

  const blackMoves = [
    { x: 0, y: -1, eating: false },
    { x: -1, y: -1, eating: true },
    { x: 1, y: -1, eating: true },
  ]

  if (figure.firstMove) {
    whiteMoves.push({ x: 0, y: 2, eating: false })
    blackMoves.push({ x: 0, y: -2, eating: false })
  }

  if(color === Sides.white) {
    selectedColor = whiteMoves
  } else {
    selectedColor = blackMoves
  }

  for (let i = 0; i <selectedColor.length; i++) {
    const { x, y ,eating } = selectedColor[i]
    if (!board[col + y]) {
      continue;
    }

    if (!board[col + y][row + x]) {
      continue;
    }

    const pos = board[col + y][row + x];
    const validPosition = isValidPos(virtual[pos].piece, color)

    if (eating === false && validPosition === AvailablePositions.valid) {
      moves.push(pos)
    } else if (eating === true && validPosition === AvailablePositions.last) {
      moves.push(pos)
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

    const validPos = isValidPos(virtual[pos].piece, color)

    if (validPos === AvailablePositions.valid || validPos === AvailablePositions.last) {
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
    const validPos = isValidPos(virtual[pos].piece, color)

    if (validPos === AvailablePositions.valid || validPos === AvailablePositions.last) {
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
    const validPos = isValidPos(virtual[pos].piece, color)

    if (validPos === AvailablePositions.valid) {
      moves.push(pos)
      continue
    }

    if (validPos === AvailablePositions.last) {
      moves.push(pos)
      break
    }

    break
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
    const validPos = isValidPos(virtual[pos].piece, color)

    if (validPos === AvailablePositions.valid) {
      moves.push(pos)
      continue
    }

    if (validPos === AvailablePositions.last) {
      moves.push(pos)
      break
    }

    break
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
    const validPos = isValidPos(virtual[pos].piece, color)

    if (validPos === AvailablePositions.valid) {
      moves.push(pos)
      continue
    }

    if (validPos === AvailablePositions.last) {
      moves.push(pos)
      break
    }

    break
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
    const validPos = isValidPos(virtual[pos].piece, color)

    if (validPos === AvailablePositions.valid) {
      moves.push(pos)
      continue
    }

    if (validPos === AvailablePositions.last) {
      moves.push(pos)
      break
    }

    break
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
    const validPos = isValidPos(virtual[pos].piece, color)

    if (validPos === AvailablePositions.valid) {
      moves.push(pos)
      continue
    }

    if (validPos === AvailablePositions.last) {
      moves.push(pos)
      break
    }

    break
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
    const validPos = isValidPos(virtual[pos].piece, color)

    if (validPos === AvailablePositions.valid) {
      moves.push(pos)
      continue
    }

    if (validPos === AvailablePositions.last) {
      moves.push(pos)
      break
    }

    break
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
    const validPos = isValidPos(virtual[pos].piece, color)

    if (validPos === AvailablePositions.valid) {
      moves.push(pos)
      continue
    }

    if (validPos === AvailablePositions.last) {
      moves.push(pos)
      break
    }

    break
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
    const validPos = isValidPos(virtual[pos].piece, color)

    if (validPos === AvailablePositions.valid) {
      moves.push(pos)
      continue
    }

    if (validPos === AvailablePositions.last) {
      moves.push(pos)
      break
    }

    break
  }

  return moves
}

const isValidPos = (piece: Piece, color: Sides): AvailablePositions => {
  if(_.isEmpty(piece)) {
    return AvailablePositions.valid
  } else if (color !== piece.color) {
    return AvailablePositions.last
  } else {
    return AvailablePositions.invalid
  }
}

// calc functions