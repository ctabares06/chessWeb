import { FC, useEffect, useRef } from "react";
import _ from "lodash";
import { Board, Figures, movingPiece, virtualBoard } from "../../types";
import { KingInstance } from "../../classes/types";
import { setCheck } from "../../store";

type SlotType = {
  piece: KingInstance
  moving: movingPiece
  slot: string
  state: {
    board: Board,
    virtual: virtualBoard,
    col: number,
    row: number,
  }
  handleClick: () => void
}

const SlotKing: FC<SlotType> = ({ piece, slot, moving, state, handleClick }) => {
  const pieceContainer = useRef<HTMLDivElement | null>(null);

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
    if (piece && piece.name === Figures.king) {
        setCheck(piece.color, piece.isKingCheck(state.row, state.col, state.board, state.virtual));
    }
}, [state.row, state.col])

  useEffect(() => {
    markIfAvMove()
  }, [moving])

  return (
    <div
      onClick={handleClick}
      data-testid="slot"
      ref={pieceContainer}
      style={{
        display: "inline-block",
        fontSize: "20px",
        border: "2px solid darkred",
        width: "50px",
        height: "50px",
        color: piece.color
      }}
    >
      {
        piece.icon
      }
    </div>
  );
};

export default SlotKing;
