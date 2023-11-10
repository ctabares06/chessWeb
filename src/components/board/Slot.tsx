import React, { FC, useEffect, useRef } from "react";
import _ from "lodash";
import useBearStore, { changeTurn, eatPiece, setMovingPiece, setPiecePostion, setCheck } from "../../store";
import { Figures } from "../../types";

const Slot: FC<{ slot: string }> = ({ slot }) => {
  const pieceContainer = useRef<HTMLDivElement | null>(null);
  const board = useBearStore((state) => state.board);
  const virtualBoard = useBearStore((state) => state.virtualBoard);
  const moving = useBearStore((state) => state.moving);
  const color = useBearStore((state) => state.game.turn);
  
  const cell = virtualBoard[slot];
  const piece = cell.piece;

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

  // useEffect(() => {
  //   if (piece?.name === Figures.king) {
  //     isKingCheck(cell, board, virtualBoard, slot)
  //       .then(isCheck => setCheck(piece.color, isCheck))
  //   }
  // }, [virtualBoard])

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
      }}
    >
      {
        piece && piece.icon
      }
    </div>
  );
};

export default Slot;
