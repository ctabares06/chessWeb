import _ from "lodash"
import { Board, Figures, Pawn, axisFigure, virtualBoard } from "../types"

export function getMoveCalc(cell: axisFigure, board: Board, virtual: virtualBoard) : string[] {
  const { piece, row, col } = cell;
  switch (piece.name) {
    case Figures.pawn:
      return pawnMoveCalc(piece, row, col, board, virtual)
    default:
      throw new Error("unknown figure type")
  }
}

// function pawnMoveCalc(figure: Pawn, row: number, col: number, board: Board, virtual: virtualBoard) {
//   const moves = []
//   let counter = 1

//   if (figure.firstMove) {
//     counter = 2
//   }

//   for (let i = 1; i <= counter; i++) {
//     if(board[col + i]) {
//       const pos = board[col + i][row]
//       if (_.isEmpty(virtual[pos].piece)) {
//         moves.push(pos)
//       }
//     }
//   }

//   return moves
// }

function pawnMoveCalc(figure: Pawn, row: number, col: number, board: Board, virtual: virtualBoard) {
  let counter = 1

  if (figure.firstMove) {
    counter = 2
  }

  const moves = [
    ...moveRightUp(row, col, board, virtual),
    ...moveLeftUp(row, col, board, virtual),
    ...moveLeftDown(row, col, board, virtual),
    ...moveRightDown(row, col, board, virtual),
  ]

  return moves
}

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
    console.log(pos)

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
    console.log(pos)

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