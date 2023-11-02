import React, { FC, useEffect, useRef } from "react";
import _ from "lodash";
import useBearStore, { changeTurn, eatPiece, setMovingPiece, setPiecePostion } from "../../store";
import { BoardStore, Figures } from "../../types";
import { kingAllPossibleChecks } from "../../utils/moves";

const getTurnColor = (state: BoardStore) => {
  return state.game.turn
};

const Slot: FC<{ slot: string }> = ({ slot }) => {
  const pieceContainer = useRef<HTMLDivElement | null>(null);
  const board = useBearStore((state) => state.board);
  const virtualBoard = useBearStore((state) => state.virtualBoard);
  const moving = useBearStore((state) => state.moving);
  const game = useBearStore((state) => state.game);
  const color = useBearStore(getTurnColor);

  const cell = virtualBoard[slot];
  const piece = cell.piece;

  const isKingCheck = () => {
    if (piece.name === Figures.king) {
      kingAllPossibleChecks(cell, board, virtualBoard).then(results => console.log(results))
    }
  }

  const handleClickSlot = () => {
    if (_.isEmpty(moving) && _.isEmpty(piece)) {
      return;
    }

    if (!_.isEmpty(piece)) {
      if (color !== piece.color && moving.avMoves.includes(slot)) {
        eatPiece(slot, piece, color)
        return changeTurn()
      }

      if (color === piece.color) {
        return setMovingPiece(cell, slot);
      }
    }

    if (moving.avMoves.includes(slot)) {
      setPiecePostion(moving.position, slot);
      return changeTurn()
    }
  };

  const markIfAvMove = () => {
    if (pieceContainer.current) {
      if (moving.avMoves.includes(slot)) {
        pieceContainer.current.style.backgroundColor = "red"
      } else {
        pieceContainer.current.style.backgroundColor = "transparent"
      }
    }
  }


  useEffect(() => {
    markIfAvMove()
  }, [moving])

  useEffect(() => {
    console.log(slot);
    isKingCheck()
  }, [piece])

  return (
    <div
      onClick={handleClickSlot}
      data-testid="slot"
      ref={pieceContainer}
      style={{
        display: "inline-block",
        fontSize: "20px",
        border: "2px solid darkred",
        width: "50px",
        height: "50px",
        color: piece.color,
      }}
    >
      {
        piece && piece.icon
      }
    </div>
  );
};

export default Slot;
