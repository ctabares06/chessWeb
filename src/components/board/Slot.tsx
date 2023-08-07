import { FC, useEffect, useRef } from "react";
import _ from "lodash";
import useBearStore, { changeTurn, eatPiece, setMovingPiece, setPiecePostion } from "../../store";
import { BoardStore, Player } from "../../types";

const getTurnColor = (state: BoardStore) => {
  let player: Player;

  if (state.game.turn === state.game.player1.name) {
    player = state.game.player1;
  } else {
    player = state.game.player2;
  }

  return player.color;
};

const Slot: FC<{ slot: string }> = ({ slot }) => {
	const pieceContainer = useRef(null)
  const board = useBearStore((state) => state.virtualBoard);
  const moving = useBearStore((state) => state.moving);
  const game = useBearStore((state) => state.game);
  const color = useBearStore(getTurnColor);

  const cell = board[slot];
  const piece = cell.piece;

  const handleClickSlot = () => {
    if (_.isEmpty(moving) && _.isEmpty(piece)) {
      return;
    }

    if (!_.isEmpty(piece)) {
			if(color !== piece.color) {
				eatPiece(slot, piece, color)
        return changeTurn()
			}

      return setMovingPiece(cell, slot);
    }

    if (moving.avMoves.includes(slot)) {
      setPiecePostion(moving.position, slot);
      return changeTurn()
    }
  };

  const markIfAvMove = () => {
		if(pieceContainer.current) {
			if(moving.avMoves.includes(slot)) {
				pieceContainer.current.style.backgroundColor = "red"
			} else {
				pieceContainer.current.style.backgroundColor = "transparent"
			}
		}
  }

	useEffect(() => {
		markIfAvMove()
	}, [moving])

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
